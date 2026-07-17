export interface ChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface GenerateResponse {
  success: boolean;
  message: string;
  data: {
    mermaidCode: string;
  };
}

export interface ChatResponse {
  success: boolean;
  message: string;
  data: {
    reply: string;
  };
}
