from groq import Groq
from app.prompts.rewrite_prompt import build_rewrite_prompt
from app.utils.validators import validate_inputs
import os
from dotenv import load_dotenv

load_dotenv()

client = Groq(api_key=os.getenv("GROQ_API_KEY"))

def rewrite_message(message, tone, platform, length):
    validate_inputs(message, tone, platform, length)

    system_prompt, user_prompt = build_rewrite_prompt(
        message, tone, platform, length
    )

    completion = client.chat.completions.create(
        model="llama-3.1-8b-instant",
        messages=[
            {"role": "system", "content": system_prompt},
            {"role": "user", "content": user_prompt}
        ],
        temperature=0.4,
        max_tokens=300
    )

    return completion.choices[0].message.content.strip()
