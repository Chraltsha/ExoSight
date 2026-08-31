from pathlib import Path

from dotenv import load_dotenv
from openai import OpenAI

BACKEND_DIR = Path(__file__).resolve().parents[2] # backend dir
load_dotenv(BACKEND_DIR / ".env") # only load .env of backend, specify

client = OpenAI() # automatic read of openai_api_key


def interpret_prediction(satellites: list[object]) -> str:

    prompt = f"""
You are an astronomy assistant.

A telescope observation was checked for potential satellite interference.

The following satellites were found to intersect the telescope's
field of view:

{satellites}

Explain the result to the user in clear, concise, and easy-to-understand
language.

Your response should:
- State whether satellite interference was detected.
- If satellites were detected, explain what the results mean and provide
  useful insights based only on the information provided, such as which
  satellites were detected, when they may cross the field of view, and
  their position in the sky.
- Help the user understand the potential impact on their observation
  without assuming or exaggerating the severity of the interference.
- If the list is empty, explain that no satellite interference was
  detected and briefly state what that means for the observation.
- Use plain language and avoid unnecessary technical jargon.

Do not invent information, make assumptions, or perform additional
astronomical calculations. Only interpret and explain the information
provided.
"""

    response = client.chat.completions.create(
        model="gpt-5.6-terra",
        messages=[{"role": "user", "content": prompt}],
    )

    return response.choices[0].message.content or ""
