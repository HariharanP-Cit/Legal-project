import os
import json
import openai
from app.config import OPENAI_API_KEY, MODEL_NAME
from app.services import search

openai.api_key = OPENAI_API_KEY

def _call_chat(prompt: str, system: str = "You are an assistant.", max_tokens=512, temperature=0.2):
    if not OPENAI_API_KEY:
        return {"error": "OPENAI_API_KEY not set"}
    messages = [{"role": "system", "content": system}, {"role": "user", "content": prompt}]
    try:
        resp = openai.ChatCompletion.create(
            model=MODEL_NAME,
            messages=messages,
            max_tokens=max_tokens,
            temperature=temperature,
        )
        return resp["choices"][0]["message"]["content"].strip()
    except Exception as e:
        return f"Error calling OpenAI: {e}"

def summarize_text(document_text: str) -> str:
    prompt = f"Summarize the following legal text in plain English, keep it concise and highlight obligations, deadlines, and parties:\n\n{document_text}"
    return _call_chat(prompt, max_tokens=600, temperature=0.25)

def extract_clauses(document_text: str):
    prompt = (
        "Extract key clauses from the legal text. Return a JSON object with fields: obligations, rights, prohibitions, dates, parties. "
        "Each field should be a list of objects with 'text' and optional 'section' if available.\n\n"
        f"Text:\n{document_text}"
    )
    out = _call_chat(prompt, max_tokens=700, temperature=0.1)
    # Try to parse JSON if LLM returned JSON
    try:
        parsed = json.loads(out)
        return parsed
    except Exception:
        # fallback: return raw text
        return {"extraction": out}

def answer_query(query: str, k: int = 5) -> str:
    results = search.hybrid_search(query, k=k)
    contexts = [r.get("text", "") for r in results]
    context_text = "\n\n---\n\n".join(contexts) if contexts else ""
    if not OPENAI_API_KEY:
        # if no API key show retrieved context as fallback
        return "No OPENAI_API_KEY set. Retrieved contexts:\n\n" + context_text
    prompt = (
        "You are an expert assistant for legal documents. Use the provided context (do NOT hallucinate). "
        "Answer the question concisely and refer to clause sections when possible.\n\n"
        f"Context:\n{context_text}\n\nQuestion: {query}\n\nAnswer:"
    )
    return _call_chat(prompt, max_tokens=500, temperature=0.2)
