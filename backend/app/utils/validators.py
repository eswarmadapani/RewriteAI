ALLOWED_TONES = {
    "formal",
    "semi-formal",
    "casual",
    "friendly",
    "persuasive",
    "empathetic"
}

ALLOWED_PLATFORMS = {
    "email",
    "whatsapp",
    "linkedin",
    "instagram"
}

ALLOWED_LENGTHS = {
    "short",
    "medium",
    "detailed"
}

def validate_inputs(message, tone, platform, length):
    if not message or not message.strip():
        raise ValueError("Message cannot be empty")

    if len(message) > 2000:
        raise ValueError("Message is too long")

    if tone.lower() not in ALLOWED_TONES:
        raise ValueError("Invalid tone selected")

    if platform.lower() not in ALLOWED_PLATFORMS:
        raise ValueError("Invalid platform selected")

    if length.lower() not in ALLOWED_LENGTHS:
        raise ValueError("Invalid length selected")
