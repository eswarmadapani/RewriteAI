# Prompt templates for rewriting
def build_rewrite_prompt(message: str, tone: str, platform: str, length: str) -> str:
    system_prompt = (
    "You are a professional communication assistant. "
    "Rewrite messages while strictly preserving the original meaning and intent. "
    "Make the language natural, fluent, and human-like. "
    "Improve clarity, tone, and flow without changing facts. "
    "Do not add, remove, or assume any information."
)
    user_prompt = f"""
    Original Message: {message}
    Tone: {tone}
    Platform: {platform}
    Length: {length}
    Please rewrite the message accordingly.
    """

    return system_prompt, user_prompt