// Local Ollama AI Integration Service for HireFlow
export interface OllamaResponse {
  success: boolean;
  data?: any;
  error?: string;
}

const OLLAMA_BASE_URL = process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434";
const OLLAMA_MODEL = process.env.OLLAMA_MODEL || "llama3";

export async function testOllamaConnection(): Promise<{
  connected: boolean;
  model: string;
  url: string;
  message: string;
}> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2500);

    const res = await fetch(`${OLLAMA_BASE_URL}/api/tags`, {
      method: "GET",
      signal: controller.signal,
    });
    clearTimeout(timeout);

    if (res.ok) {
      const data = await res.json();
      const models = data?.models?.map((m: any) => m.name) || [];
      const hasConfiguredModel = models.some((m: string) =>
        m.toLowerCase().includes(OLLAMA_MODEL.toLowerCase())
      );

      return {
        connected: true,
        model: OLLAMA_MODEL,
        url: OLLAMA_BASE_URL,
        message: hasConfiguredModel
          ? `Connected to Ollama. Model '${OLLAMA_MODEL}' is active and ready.`
          : `Connected to Ollama, but model '${OLLAMA_MODEL}' was not found in: ${models.join(", ") || "none"}. Please run 'ollama pull ${OLLAMA_MODEL}'.`,
      };
    }

    return {
      connected: false,
      model: OLLAMA_MODEL,
      url: OLLAMA_BASE_URL,
      message: "AI service is currently unavailable. Please start Ollama and try again.",
    };
  } catch {
    return {
      connected: false,
      model: OLLAMA_MODEL,
      url: OLLAMA_BASE_URL,
      message: "AI service is currently unavailable. Please start Ollama and try again.",
    };
  }
}

export async function generateOllamaResponse(
  prompt: string,
  systemPrompt?: string
): Promise<OllamaResponse> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 12000);

    const res = await fetch(`${OLLAMA_BASE_URL}/api/generate`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      signal: controller.signal,
      body: JSON.stringify({
        model: OLLAMA_MODEL,
        prompt: prompt,
        system: systemPrompt || "You are HireFlow AI, an enterprise recruitment intelligence assistant.",
        stream: false,
      }),
    });
    clearTimeout(timeout);

    if (res.ok) {
      const json = await res.json();
      return {
        success: true,
        data: json.response,
      };
    }

    return {
      success: false,
      error: "AI service is currently unavailable. Please start Ollama and try again.",
    };
  } catch {
    return {
      success: false,
      error: "AI service is currently unavailable. Please start Ollama and try again.",
    };
  }
}

