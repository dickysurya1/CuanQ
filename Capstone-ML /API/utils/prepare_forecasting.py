import pandas as pd
from prophet import Prophet
from typing import List
from models.schemas import DataItem 

def prepare_df(data: List[DataItem]) -> pd.DataFrame:
    df = pd.DataFrame([{"ds": item.date, "y": float(item.value)} for item in data])
    df["ds"] = pd.to_datetime(df["ds"], dayfirst=True)  
    return df

def run_prophet(df: pd.DataFrame, periods: int = 7) -> pd.DataFrame:
    model = Prophet()
    model.fit(df)
    future = model.make_future_dataframe(periods=periods)
    forecast = model.predict(future)
    return forecast[["ds", "yhat"]].tail(periods)