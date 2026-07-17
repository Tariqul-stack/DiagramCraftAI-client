import { useMutation } from "@tanstack/react-query";
import api from "@/lib/api";
import { ChatMessage, ChatResponse } from "@/types/ai.types";

interface ChatPayload {
  diagramCode: string;
  history: ChatMessage[];
  message: string;
}

// ─── useAIChat ────────────────────────────────────────────────────────────────

export function useAIChat() {
  return useMutation<string, Error, ChatPayload>({
    mutationFn: async (data) => {
      const response = await api.post<ChatResponse>("/api/ai/chat", data);
      return response.data.data.reply;
    },
  });
}
