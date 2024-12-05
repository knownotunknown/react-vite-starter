import { useEffect, useState } from "react";
import * as webllm from "@mlc-ai/web-llm";

interface ChatResponse {
  response: string | null;
  loading: boolean;
  error: string | null;
}

export const useLLMEngine = () => {
  const [engine, setEngine] = useState<webllm.MLCEngineInterface | null>(null);

  useEffect(() => {
    const initializeEngine = async () => {
      try {
        const initProgressCallback = (report: webllm.InitProgressReport) => {
          console.log("Initialization Progress:", report.text);
        };

        const selectedModel = "Llama-3.1-8B-Instruct-q4f32_1-MLC";
        const newEngine = await webllm.CreateMLCEngine(
          selectedModel,
          {
            initProgressCallback: initProgressCallback,
            logLevel: "INFO",
          },
          {
            context_window_size: 2048,
          }
        );
        setEngine(newEngine);
      } catch (error) {
        console.error("Error initializing engine:", error);
      }
    };

    initializeEngine();
  }, []);

  const generateResponse = async (
    prompt: string
  ): Promise<ChatResponse> => {
    if (!engine) return { response: null, loading: false, error: "Engine not initialized." };

    try {
      const response = await engine.chat.completions.create({
        messages: [{ role: "user", content: prompt }],
        temperature: 1.5,
        max_tokens: 256,
      });

      return { response: response.choices[0]?.message.content ?? "No response", loading: false, error: null };
    } catch (error) {
      return { response: null, loading: false, error: "Error generating response." };
    }
  };

  return { generateResponse, engineLoaded: engine !== null };
};