import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import queryClient from "@/lib/queryClient";
import { AuthResponse, User } from "@/types/user.types";

// ─── useGetMe ────────────────────────────────────────────────────────────────

export function useGetMe() {
  return useQuery<User>({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await api.get<AuthResponse>("/api/auth/me");
      return response.data.data.user;
    },
    enabled: typeof window !== "undefined" && !!localStorage.getItem("token"),
    retry: false,
  });
}

// ─── useRegister ─────────────────────────────────────────────────────────────

export function useRegister() {
  return useMutation<
    AuthResponse,
    Error,
    { name: string; email: string; password: string }
  >({
    mutationFn: async (data) => {
      const response = await api.post<AuthResponse>("/api/auth/register", data);
      return response.data;
    },
    onSuccess: (response: any) => {
      const token = response?.data?.token || response?.token;
      if (token) {
        localStorage.setItem("token", token);
      }
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

// ─── useLogin ────────────────────────────────────────────────────────────────

export function useLogin() {
  return useMutation<AuthResponse, Error, { email: string; password: string }>({
    mutationFn: async (data) => {
      const response = await api.post<AuthResponse>("/api/auth/login", data);
      return response.data;
    },
    onSuccess: (response: any) => {
      const token = response?.data?.token || response?.token;
      if (token) {
        localStorage.setItem("token", token);
      }
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

// ─── useLogout ───────────────────────────────────────────────────────────────

export function useLogout() {
  return useMutation<void, Error, void>({
    mutationFn: () => api.post("/api/auth/logout").then(() => undefined),
    onSuccess: () => {
      localStorage.removeItem("token");
      queryClient.invalidateQueries({ queryKey: ["me"] });
      window.location.href = "/login";
    },
  });
}
