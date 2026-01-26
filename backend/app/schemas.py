# Pydantic schemas
from pydantic import BaseModel

class RewriteRequest(BaseModel):
    message: str
    tone: str
    platform: str
    length: str
class RewriteResponse(BaseModel):
    rewritten_message: str
    