from fastapi import FastAPI, APIRouter, Request, Response, HTTPException, Depends, status
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field, ConfigDict, BeforeValidator
from typing import List, Optional, Annotated, Any
import uuid
import bcrypt
import jwt
from datetime import datetime, timezone, timedelta
from bson import ObjectId

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# Setup logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# JWT Configurations
JWT_SECRET = os.environ.get("JWT_SECRET", "ea35a22bb0b79df52f82ba677fb6de5d233bebc567bfde637dfbe637dbbc567b")
JWT_ALGORITHM = "HS256"

# Create the main app
app = FastAPI()

# Setup CORS Origins from environment
cors_origins = os.environ.get("CORS_ORIGINS", "*").split(",")

app.add_middleware(
    CORSMiddleware,
    allow_origins=cors_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# MongoDB Adherence helpers
def check_object_id(v: Any) -> str:
    if isinstance(v, ObjectId):
        return str(v)
    if isinstance(v, str):
        return v
    raise ValueError("Invalid ObjectId type")

PyObjectId = Annotated[str, BeforeValidator(check_object_id)]

class BaseDocument(BaseModel):
    id: Optional[PyObjectId] = Field(default=None, alias="_id")

    model_config = ConfigDict(
        populate_by_name=True,
        arbitrary_types_allowed=True,
    )

    def to_mongo(self, exclude_id: bool = False) -> dict:
        doc = self.model_dump(by_alias=True, exclude_none=True)
        if exclude_id:
            doc.pop("_id", None)
        else:
            if "_id" in doc and doc["_id"] is not None:
                doc["_id"] = ObjectId(doc["_id"])
        return doc

    @classmethod
    def from_mongo(cls, doc: dict) -> Any:
        if doc is None:
            return None
        return cls(**doc)

# Database Models
class User(BaseDocument):
    email: str
    password_hash: str
    name: str = "Admin"
    role: str = "admin"
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class ContactSubmission(BaseDocument):
    name: str
    email: str
    what_are_you_working_on: str
    status: str = "new"  # new, in-progress, archived
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

class WaitlistSignup(BaseDocument):
    name: Optional[str] = ""
    email: str
    source: str  # financial-clarity-tool, podcast, blog
    created_at: datetime = Field(default_factory=lambda: datetime.now(timezone.utc))

# Create models for requests
class ContactCreate(BaseModel):
    name: str
    email: str
    what_are_you_working_on: str

class ContactStatusUpdate(BaseModel):
    status: str

class WaitlistCreate(BaseModel):
    name: Optional[str] = ""
    email: str
    source: str

class LoginRequest(BaseModel):
    email: str
    password: str

# Password hashing utilities
def hash_password(password: str) -> str:
    salt = bcrypt.gensalt()
    hashed = bcrypt.hashpw(password.encode("utf-8"), salt)
    return hashed.decode("utf-8")

def verify_password(plain_password: str, hashed_password: str) -> bool:
    return bcrypt.checkpw(plain_password.encode("utf-8"), hashed_password.encode("utf-8"))

# JWT Utility functions
def create_access_token(user_id: str, email: str) -> str:
    payload = {
        "sub": user_id,
        "email": email,
        "exp": datetime.now(timezone.utc) + timedelta(minutes=60),
        "type": "access"
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

def create_refresh_token(user_id: str) -> str:
    payload = {
        "sub": user_id,
        "exp": datetime.now(timezone.utc) + timedelta(days=7),
        "type": "refresh"
    }
    return jwt.encode(payload, JWT_SECRET, algorithm=JWT_ALGORITHM)

# Dependency for authenticating the current user
async def get_current_user(request: Request) -> dict:
    token = request.cookies.get("access_token")
    if not token:
        auth_header = request.headers.get("Authorization", "")
        if auth_header.startswith("Bearer "):
            token = auth_header[7:]
    
    if not token:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Not authenticated"
        )
    
    try:
        payload = jwt.decode(token, JWT_SECRET, algorithms=[JWT_ALGORITHM])
        if payload.get("type") != "access":
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Invalid token type"
            )
        
        user_id = payload.get("sub")
        user = await db.users.find_one({"_id": ObjectId(user_id)})
        if not user:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="User not found"
            )
        
        user["_id"] = str(user["_id"])
        user.pop("password_hash", None)
        return user
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token expired"
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid token"
        )

# Seed Admin User
async def seed_admin():
    admin_email = os.environ.get("ADMIN_EMAIL", "rafael.norat@rnbusiness.com").lower()
    admin_password = os.environ.get("ADMIN_PASSWORD", "RN_Admin_2026!")
    existing = await db.users.find_one({"email": admin_email})
    if existing is None:
        hashed = hash_password(admin_password)
        await db.users.insert_one({
            "email": admin_email,
            "password_hash": hashed,
            "name": "Rafael Norat",
            "role": "admin",
            "created_at": datetime.now(timezone.utc)
        })
        logger.info(f"Admin user seeded: {admin_email}")
    else:
        if not verify_password(admin_password, existing["password_hash"]):
            await db.users.update_one(
                {"email": admin_email},
                {"$set": {"password_hash": hash_password(admin_password)}}
            )
            logger.info("Admin user password updated")

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

@api_router.get("/")
async def root():
    return {
        "message": "RN Business Management API is running",
        "brand": "RN Business Management",
        "positioning": "Engineered for investors. Built for the busy."
    }

# Contact submissions
@api_router.post("/contact", response_model=ContactSubmission)
async def submit_contact(contact_data: ContactCreate):
    submission = ContactSubmission(
        name=contact_data.name,
        email=contact_data.email.strip().lower(),
        what_are_you_working_on=contact_data.what_are_you_working_on,
        status="new"
    )
    doc = submission.to_mongo(exclude_id=True)
    result = await db.contact_submissions.insert_one(doc)
    submission.id = str(result.inserted_id)
    return submission

# Waitlist/Newsletter registrations
@api_router.post("/waitlist", response_model=WaitlistSignup)
async def submit_waitlist(waitlist_data: WaitlistCreate):
    signup = WaitlistSignup(
        name=waitlist_data.name,
        email=waitlist_data.email.strip().lower(),
        source=waitlist_data.source
    )
    doc = signup.to_mongo(exclude_id=True)
    result = await db.waitlist_signups.insert_one(doc)
    signup.id = str(result.inserted_id)
    return signup

# Admin Auth Endpoints
@api_router.post("/auth/login")
async def login(login_req: LoginRequest, response: Response):
    email = login_req.email.strip().lower()
    user = await db.users.find_one({"email": email})
    if not user:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    if not verify_password(login_req.password, user["password_hash"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid email or password"
        )
    
    user_id = str(user["_id"])
    access_token = create_access_token(user_id, email)
    refresh_token = create_refresh_token(user_id)
    
    # Set cookies
    response.set_cookie(
        key="access_token",
        value=access_token,
        httponly=True,
        secure=False,  # Set to False to ease dev/preview access over cookies
        samesite="lax",
        max_age=3600,
        path="/"
    )
    response.set_cookie(
        key="refresh_token",
        value=refresh_token,
        httponly=True,
        secure=False,
        samesite="lax",
        max_age=604800,
        path="/"
    )
    
    return {
        "access_token": access_token,
        "token_type": "bearer",
        "user": {
            "id": user_id,
            "email": user["email"],
            "name": user["name"],
            "role": user["role"]
        }
    }

@api_router.post("/auth/logout")
async def logout(response: Response, current_user: dict = Depends(get_current_user)):
    response.delete_cookie(key="access_token", path="/")
    response.delete_cookie(key="refresh_token", path="/")
    return {"message": "Logged out successfully"}

@api_router.get("/auth/me")
async def get_me(current_user: dict = Depends(get_current_user)):
    return current_user

# Admin Submissions Endpoints
@api_router.get("/admin/submissions")
async def get_admin_submissions(current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden: Admin role required"
        )
    
    submissions = await db.contact_submissions.find({}).sort("created_at", -1).to_list(1000)
    for sub in submissions:
        sub["_id"] = str(sub["_id"])
    return submissions

@api_router.patch("/admin/submissions/{submission_id}")
async def update_admin_submission_status(
    submission_id: str,
    status_update: ContactStatusUpdate,
    current_user: dict = Depends(get_current_user)
):
    if current_user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden: Admin role required"
        )
    
    result = await db.contact_submissions.update_one(
        {"_id": ObjectId(submission_id)},
        {"$set": {"status": status_update.status}}
    )
    if result.matched_count == 0:
        raise HTTPException(status_code=404, detail="Submission not found")
    
    return {"message": "Submission updated successfully"}

@api_router.delete("/admin/submissions/{submission_id}")
async def delete_admin_submission(
    submission_id: str,
    current_user: dict = Depends(get_current_user)
):
    if current_user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden: Admin role required"
        )
    
    result = await db.contact_submissions.delete_one({"_id": ObjectId(submission_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Submission not found")
    return {"message": "Submission deleted successfully"}

# Admin Waitlist Endpoints
@api_router.get("/admin/waitlist")
async def get_admin_waitlist(current_user: dict = Depends(get_current_user)):
    if current_user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden: Admin role required"
        )
    
    waitlists = await db.waitlist_signups.find({}).sort("created_at", -1).to_list(1000)
    for wl in waitlists:
        wl["_id"] = str(wl["_id"])
    return waitlists

@api_router.delete("/admin/waitlist/{waitlist_id}")
async def delete_admin_waitlist(
    waitlist_id: str,
    current_user: dict = Depends(get_current_user)
):
    if current_user.get("role") != "admin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Access forbidden: Admin role required"
        )
    
    result = await db.waitlist_signups.delete_one({"_id": ObjectId(waitlist_id)})
    if result.deleted_count == 0:
        raise HTTPException(status_code=404, detail="Waitlist entry not found")
    return {"message": "Waitlist entry deleted successfully"}

# Include router
app.include_router(api_router)

@app.on_event("startup")
async def startup_event():
    # Setup Indexes
    await db.users.create_index("email", unique=True)
    # Seed admin user
    await seed_admin()

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()
