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
  });
}

// ─── useRegister ─────────────────────────────────────────────────────────────

export function useRegister() {
  return useMutation<
    AuthResponse,
    Error,
    { name: string; email: string; password: string }
  >({
    mutationFn: (data) => api.post<AuthResponse>("/api/auth/register", data).then((res) => res.data),
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token);
      queryClient.invalidateQueries({ queryKey: ["me"] });
    },
  });
}

// ─── useLogin ────────────────────────────────────────────────────────────────

export function useLogin() {
  return useMutation<AuthResponse, Error, { email: string; password: string }>({
    mutationFn: (data) => api.post<AuthResponse>("/api/auth/login", data).then((res) => res.data),
    onSuccess: (data) => {
      localStorage.setItem("token", data.data.token);
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
