import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import queryClient from "@/lib/queryClient";
import { AuthResponse, User } from "@/types/user.types";

function getToken() {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("token");
}

export function useGetMe() {
  return useQuery<User>({
    queryKey: ["me"],
    queryFn: async () => {
      const response = await api.get("/api/auth/me");
      return response.data?.data?.user;
    },
    enabled: !!getToken(),
    retry: false,
    staleTime: 1000 * 60 * 10,
  });
}

export function useRegister() {
  return useMutation({
    mutationFn: async (data: { name: string; email: string; password: string }) => {
      const response = await api.post("/api/auth/register", data);
      return response.data;
    },
    onSuccess: (response: any) => {
      const token = response?.data?.token;
      if (token) {
        localStorage.setItem("token", token);
        queryClient.invalidateQueries({ queryKey: ["me"] });
      }
    },
  });
}

export function useLogin() {
  return useMutation({
    mutationFn: async (data: { email: string; password: string }) => {
      const response = await api.post("/api/auth/login", data);
      return response.data;
    },
    onSuccess: (response: any) => {
      const token = response?.data?.token;
      if (token) {
        localStorage.setItem("token", token);
        queryClient.invalidateQueries({ queryKey: ["me"] });
      }
    },
  });
}

export function useLogout() {
  return useMutation({
    mutationFn: async () => {
      await api.post("/api/auth/logout");
    },
    onSuccess: () => {
      localStorage.removeItem("token");
      queryClient.clear();
      window.location.href = "/login";
    },
  });
}