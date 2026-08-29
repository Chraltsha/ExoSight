import os

from dotenv import load_dotenv
from openai import OpenAI

load_dotenv()

client = OpenAI(
    api_key=os.getenv("OPENAI_API_KEY")
)


def interpret_prediction(satellites) -> str:

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

    response = client.responses.create(
        model="gpt-5.5",
        input=prompt,
    )

    return response.output_text