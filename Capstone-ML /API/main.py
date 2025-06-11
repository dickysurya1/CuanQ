from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import numpy as np
import tensorflow as tf
import pickle
from tensorflow.keras.models import load_model
from tensorflow.keras.preprocessing.sequence import pad_sequences
from datetime import datetime
from prophet import Prophet
from typing import List
import pandas as pd

from utils.text_preprocessing import full_preprocess, ekstract_amount
from utils.prepare_forecasting import prepare_df, run_prophet
from models.schemas import InputText, ForecastRequest

app = FastAPI()

# Load model dan tokenizer
MODEL_PATH = "model/nlp_model.h5"
TOKENIZER_PATH = "model/tokenizer.pkl"
MAX_LEN = 100  

model = load_model(MODEL_PATH)
with open(TOKENIZER_PATH, "rb") as f:
    tokenizer = pickle.load(f)

# Daftar kelas untuk prediksi
class_names = [
    'Food & Beverage', 'Health', 'Housing', 'Income', 'Lifestyle', 'Others','Transportation'
]


@app.get("/")
def root():
    return {"Hello World"}


@app.post("/classified")
async def predict(input: InputText):
    if not input.text or not input.text.strip():
        raise HTTPException(status_code=400, detail="Input text is empty.")

    try:
        cleaned_text = full_preprocess(input.text)
        if not cleaned_text.strip():
            raise HTTPException(status_code=400, detail="Cleaned text is empty after preprocessing.")

        amount = ekstract_amount(input.text)
        sequence = tokenizer.texts_to_sequences([cleaned_text])

        padded = pad_sequences(sequence, maxlen=MAX_LEN)
        prediction = model.predict(padded)

        predicted_index = int(np.argmax(prediction, axis=1)[0])
        probability = float(prediction[0][predicted_index])

        if probability >= 0.7:
            category = class_names[predicted_index]
        else:
            category = 'Others'

        predicted_type = "income" if category == "Income" else "Expense"
        timestamp = datetime.now().isoformat()

        return {
            "original_text": input.text,
            "confidence": probability,
            "predicted_category": category,
            "predicted_type": predicted_type,
            "amount": amount,
            "timestamp": timestamp
        }

    except HTTPException as e:
        raise e 
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
    

@app.post("/forecast/")
def forecast(request: ForecastRequest):
    try:
        if not request.data_income or not request.data_expenses:
            raise HTTPException(status_code=400, detail="Income and expense data must be provided.")

        df_income = prepare_df(request.data_income)
        df_expense = prepare_df(request.data_expenses)

        forecast_income = run_prophet(df_income, periods=request.periods)
        forecast_expense = run_prophet(df_expense, periods=request.periods)

        combined = pd.merge(forecast_income, forecast_expense, on="ds", suffixes=("_income", "_expense"))

        result = combined.to_dict(orient="records")
        return {"forecast": result}

    except ValueError as ve:
        raise HTTPException(status_code=422, detail=f"Data format error: {str(ve)}")
    except pd.errors.ParserError:
        raise HTTPException(status_code=422, detail="Date parsing failed. Ensure dates are in DD-MM-YYYY format.")
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")
