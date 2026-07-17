export interface User {
  _id: string;
  name: string;
  email: string;
  avatar?: string;
  provider: "email" | "google";
  role: "user" | "admin";
  createdAt: string;
  updatedAt: string;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data: {
    user: User;
    token: string;
  };
}
