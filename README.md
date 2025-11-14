# IBM Cloud Uploader

A simple Python tool that uploads files to IBM Cloud Object Storage. It includes a command-line uploader and an optional Flask API. This project was built to practice working with cloud storage APIs, environment variables, and clean Python project structure.

## 🚀 Features

- Upload a file to IBM Cloud Object Storage from the command line  
- Optional Flask API endpoint for HTTP-based uploads  
- Returns a JSON response with:
  - filename  
  - bucket  
  - status  
  - upload timestamp  
- Uses environment variables for configuration (no credentials in code)  
- Tests using pytest with mocked IBM SDK calls (no real cloud required)

## 🛠 Requirements

- Python 3.10+  
- An IBM Cloud Object Storage instance  
- The following environment variables set (usually via a .env file):  
  - IBM_COS_API_KEY  
  - IBM_COS_SERVICE_INSTANCE_ID  
  - IBM_COS_ENDPOINT  
  - IBM_COS_BUCKET_REGION  

## ⚙️ Setup

1. Clone the repository:  
   git clone https://github.com/YOUR_USERNAME/ibm-cloud-uploader.git  
   cd ibm-cloud-uploader  

2. Create a virtual environment (optional but recommended):  
   python -m venv .venv  
   source .venv/bin/activate  (on Windows: .venv\Scripts\activate)  

3. Install dependencies:  
   pip install -r requirements.txt  

4. Copy the example environment file and fill in your credentials:  
   cp .env.example .env  
   (Then open .env and add your IBM COS values.)

## ▶️ CLI Usage

To upload a file to a bucket:  

python upload.py <file_path> <bucket_name>  

Example:  

python upload.py ./example.jpg my-bucket  

A successful upload will return a JSON response similar to:  

{
  "filename": "example.jpg",
  "bucket": "my-bucket",
  "status": "success",
  "uploaded_at": "2025-02-14T20:42:11Z"
}

If something goes wrong (e.g., invalid credentials or bucket), the status field will indicate an error and include a short message.

## 🌐 Flask API (Optional)

If you enable the Flask API, you can upload files over HTTP.

1. Start the API server:  
   python api.py  

2. Upload a file via curl:  

   curl -X POST -F "file=@./example.jpg" http://localhost:5000/upload  

The API will respond with the same JSON structure as the CLI.

## 🧪 Tests

Tests are written with pytest and use mocked IBM Cloud SDK calls so you can run them without real cloud credentials (or charges).

Run all tests with:  

pytest  

## 📁 Project Structure

ibm-cloud-uploader/  
  upload.py          # CLI entry point for uploading a file  
  api.py             # Optional Flask API server  
  requirements.txt   # Python dependencies  
  .env.example       # Example environment config  
  tests/             # pytest test suite (with mocks)  
  README.md          # Project documentation  

## 🌱 Why I built this

I created this project to practice integrating with a cloud storage API, structuring a small Python project, handling configuration via environment variables, and writing tests with mocks so the code can be safely run and validated without requiring real cloud access.

## 🚧 Future Improvements

- Support multiple file uploads in a single command or request  
- Add basic validation (e.g., max file size or allowed extensions)  
- Include progress indicators for large uploads  
- Add logging and better error reporting  

## 🤝 Contributions

Contributions, bug reports, and suggestions are welcome. Feel free to open an issue or submit a pull request.
