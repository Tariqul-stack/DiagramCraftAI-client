import { useMutation, useQuery } from "@tanstack/react-query";
import api from "@/lib/api";
import queryClient from "@/lib/queryClient";
import { Diagram, DiagramsResponse, DiagramType, DiagramCategory } from "@/types/diagram.types";

// ─── Types ────────────────────────────────────────────────────────────────────

interface GetAllDiagramsParams {
  search?: string;
  diagramType?: DiagramType;
  category?: DiagramCategory;
  sort?: string;
  page?: number;
}

// ─── useGetAllDiagrams ────────────────────────────────────────────────────────

export function useGetAllDiagrams(params: GetAllDiagramsParams = {}) {
  return useQuery<DiagramsResponse>({
    queryKey: ["diagrams", params],
    queryFn: async () => {
      const response = await api.get<DiagramsResponse>("/api/diagrams", { params });
      return response.data;
    },
  });
}

// ─── useGetDiagramById ────────────────────────────────────────────────────────

export function useGetDiagramById(id: string) {
  return useQuery<Diagram>({
    queryKey: ["diagram", id],
    queryFn: async () => {
      const response = await api.get<{ success: boolean; data: { diagram: Diagram } }>(`/api/diagrams/${id}`);
      return response.data.data.diagram;
    },
    enabled: !!id,
  });
}

// ─── useGetMyDiagrams ─────────────────────────────────────────────────────────

export function useGetMyDiagrams() {
  return useQuery<Diagram[]>({
    queryKey: ["myDiagrams"],
    queryFn: async () => {
      const response = await api.get<{ success: boolean; data: { diagrams: Diagram[] } }> ("/api/diagrams/user/my");
      return response.data.data.diagrams ?? [];
    },
  });
}

// ─── useCreateDiagram ─────────────────────────────────────────────────────────

export function useCreateDiagram() {
  return useMutation<Diagram, Error, Partial<Diagram>>({
    mutationFn: async (data) => {
      const response = await api.post<{ success: boolean; data: Diagram }>("/api/diagrams", data);
      return response.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diagrams"] });
      queryClient.invalidateQueries({ queryKey: ["myDiagrams"] });
    },
  });
}

// ─── useDeleteDiagram ─────────────────────────────────────────────────────────

export function useDeleteDiagram() {
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await api.delete(`/api/diagrams/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["diagrams"] });
      queryClient.invalidateQueries({ queryKey: ["myDiagrams"] });
    },
  });
}

// ─── useToggleLike ────────────────────────────────────────────────────────────

export function useToggleLike() {
  return useMutation<void, Error, string>({
    mutationFn: async (id) => {
      await api.post(`/api/diagrams/${id}/like`);
    },
    onSuccess: (_data, id) => {
      queryClient.invalidateQueries({ queryKey: ["diagram", id] });
      queryClient.invalidateQueries({ queryKey: ["diagrams"] });
      queryClient.invalidateQueries({ queryKey: ["myDiagrams"] });
    },
  });
}
