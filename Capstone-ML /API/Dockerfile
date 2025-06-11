# Base image
FROM python:3.10

# Set working directory
WORKDIR /app

# Copy dependencies file dan install
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy seluruh source code ke dalam container
COPY . .

# Expose port FastAPI
EXPOSE 8000

# Jalankan FastAPI saat container dijalankan
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000"]
