import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { GenerateResponse } from "@/types/ai.types";

interface GeneratePayload {
  diagramType: string;
  prompt: string;
}

// ─── useAIGenerate ────────────────────────────────────────────────────────────

export function useAIGenerate() {
  return useMutation<string, Error, GeneratePayload>({
    mutationFn: async (data) => {
      const response = await api.post<GenerateResponse>("/api/ai/generate", data);
      return response.data.data.mermaidCode;
    },
  });
}

// ─── useAIRegenerate ─────────────────────────────────────────────────────────

export function useAIRegenerate() {
  return useMutation<string, Error, GeneratePayload>({
    mutationFn: async (data) => {
      const response = await api.post<GenerateResponse>("/api/ai/regenerate", data);
      return response.data.data.mermaidCode;
    },
  });
}
