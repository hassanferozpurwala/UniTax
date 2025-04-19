# from fastapi import FastAPI, File, UploadFile, HTTPException
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel, Field
# import shutil
# import os

# app = FastAPI()

# # ✅ Allow frontend to safely talk to backend (CORS protection)
# # In production, change "*" to your real frontend URL for security
# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"],
# )

# # ✅ Set up a safe folder to store uploads (prevents writing anywhere on the system)
# UPLOAD_FOLDER = "uploads"
# os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# # ✅ Input validation: checks user-submitted info before using it
# class TaxFormInput(BaseModel):
#     name: str
#     ssn: str = Field(pattern=r'^\d{3}-\d{2}-\d{4}$')  # ✅ Checks SSN format is correct (like 123-45-6789)
#     email: strz
#     student_type: str  # "international" or "local"

# # ✅ API to validate tax form info (SSN, email, etc.)
# @app.post("/validate-input")
# def validate_input(data: TaxFormInput):
#     return {"message": "Valid input received", "data": data.dict()}

# # ✅ API to upload a file safely (only certain file types are allowed)
# @app.post("/upload")
# def upload_file(file: UploadFile = File(...)):
#     allowed_extensions = [".pdf", ".jpg", ".jpeg", ".png"]
#     filename = file.filename
#     ext = os.path.splitext(filename)[1].lower()

#     # ✅ Block risky file types (like .exe or .sh)
#     if ext not in allowed_extensions:
#         raise HTTPException(status_code=400, detail="Invalid file type")

#     # ✅ Save the file only into the controlled 'uploads' folder
#     safe_path = os.path.join(UPLOAD_FOLDER, filename)
#     with open(safe_path, "wb") as buffer:
#         shutil.copyfileobj(file.file, buffer)

#     return {"message": f"File '{filename}' uploaded successfully"}

# # ✅ Simple health check endpoint (can be used for monitoring)
# @app.get("/secure-check")
# def secure_check():
#     return {"status": "Secure backend running"}



from fastapi import FastAPI, File, UploadFile, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from uuid import uuid4
from cryptography.fernet import Fernet
import shutil
import os

app = FastAPI()

# ✅ Allow frontend to safely talk to backend (CORS protection)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Replace with frontend URL in production
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ✅ Create a secure folder for file storage
UPLOAD_FOLDER = "uploads"
os.makedirs(UPLOAD_FOLDER, exist_ok=True)

# ✅ Create a folder for encryption keys (if used)
KEY_FOLDER = "keys"
os.makedirs(KEY_FOLDER, exist_ok=True)

# ✅ Generate/load encryption key for file encryption
key_path = os.path.join(KEY_FOLDER, "file_key.key")
if not os.path.exists(key_path):
    with open(key_path, "wb") as f:
        f.write(Fernet.generate_key())
with open(key_path, "rb") as f:
    ENCRYPTION_KEY = f.read()
fernet = Fernet(ENCRYPTION_KEY)

# ✅ Input validation model
class TaxFormInput(BaseModel):
    name: str
    ssn: str = Field(pattern=r'^\d{3}-\d{2}-\d{4}$')  # Valid SSN pattern
    email: str
    student_type: str  # "international" or "local"

# ✅ Endpoint: Validate tax form info
@app.post("/validate-input")
def validate_input(data: TaxFormInput):
    return {"message": "Valid input received", "data": data.dict()}

# ✅ Endpoint: Secure file upload
@app.post("/upload")
def upload_file(file: UploadFile = File(...)):
    allowed_extensions = [".pdf", ".jpg", ".jpeg", ".png"]
    filename = file.filename
    ext = os.path.splitext(filename)[1].lower()

    # ✅ Only allow safe file types
    if ext not in allowed_extensions:
        raise HTTPException(status_code=400, detail="Invalid file type")

    # ✅ Use a UUID as a new filename to prevent guessing or overwriting
    new_filename = f"{uuid4().hex}{ext}"
    safe_path = os.path.join(UPLOAD_FOLDER, new_filename)

    # ✅ Read and encrypt the file before saving
    try:
        file_data = file.file.read()
        encrypted_data = fernet.encrypt(file_data)
        with open(safe_path, "wb") as buffer:
            buffer.write(encrypted_data)
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error saving file: {str(e)}")

    return {"message": "File uploaded and encrypted successfully", "id": new_filename}

# ✅ Endpoint: Health check
@app.get("/secure-check")
def secure_check():
    return {"status": "Secure backend running"}
