import logging
import os
from collections.abc import Sequence
from pathlib import Path

from dotenv import load_dotenv
from openai import OpenAI, OpenAIError

BACKEND_DIR = Path(__file__).resolve().parents[2]
load_dotenv(BACKEND_DIR / ".env")

logger = logging.getLogger(__name__)


def interpret_prediction(satellites: Sequence[object]) -> str | None:
    """Explain a prediction, or return None when AI is unavailable."""

    api_key = os.getenv("OPENAI_API_KEY")
    if not api_key:
        logger.warning("Skipping AI interpretation because OPENAI_API_KEY is not set.")
        return None

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

    try:
        client = OpenAI(api_key=api_key, timeout=20.0, max_retries=1)
        response = client.chat.completions.create(
            model="gpt-5.6-terra",
            messages=[{"role": "user", "content": prompt}],
            reasoning_effort="none",
            max_completion_tokens=1000,
        )
    except OpenAIError:
        logger.exception("OpenAI interpretation failed; returning the computed result without it.")
        return None

    return response.choices[0].message.content or None
