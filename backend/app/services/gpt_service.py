from pathlib import Path

from dotenv import load_dotenv
from openai import OpenAI

BACKEND_DIR = Path(__file__).resolve().parents[2] # backend dir
load_dotenv(BACKEND_DIR / ".env") # only load .env of backend, specify

client = OpenAI() # automatic read of openai_api_key


def interpret_prediction(satellites: list[object]) -> str:

    prompt = f"""
You are an astronomy assistant.

A telescope observation was checked for satellite interference.
The following satellites were found to intersect the telescope's
field of view:

{satellites}

Explain this result to the user in clear and concise language.

If the list is empty, explain that no satellite interference was
detected.

Do not invent information or perform additional astronomical
calculations.
"""

    response = client.chat.completions.create(
        model="gpt-5.6-terra",
        messages=[{"role": "user", "content": prompt}],
    )

    return response.choices[0].message.content or ""
