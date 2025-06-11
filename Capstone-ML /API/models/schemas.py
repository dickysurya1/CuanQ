from pydantic import BaseModel
from typing import List, Optional

class InputText(BaseModel):
    text: str

class DataItem(BaseModel):
    date: str
    value: str

class ForecastRequest(BaseModel):
    data_income: List[DataItem]
    data_expenses: List[DataItem]
    periods: Optional[int] = 7