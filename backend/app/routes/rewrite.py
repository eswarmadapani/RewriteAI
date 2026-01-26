from fastapi import APIRouter, HTTPException
from app.schemas import RewriteRequest, RewriteResponse
from app.services.llm_service import rewrite_message
import traceback

router = APIRouter()

@router.post("/rewrite", response_model=RewriteResponse)
def rewrite(request: RewriteRequest):
    try:
        result = rewrite_message(
            message=request.message,
            tone=request.tone,
            platform=request.platform,
            length=request.length
        )
        return {"rewritten_message": result}

    except ValueError as ve:
        raise HTTPException(status_code=400, detail=str(ve))

    except Exception as e:
        # Log the actual error for debugging
        print(f"ERROR: {str(e)}")
        traceback.print_exc()
        raise HTTPException(status_code=500, detail=f"Internal server error: {str(e)}")

