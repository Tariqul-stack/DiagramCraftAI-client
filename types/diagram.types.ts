export type DiagramType =
  | "flowchart"
  | "sequence"
  | "erd"
  | "class"
  | "mindmap"
  | "gantt";

export type DiagramCategory =
  | "business"
  | "tech"
  | "education"
  | "personal";

export type DiagramVisibility = "public" | "private";

export interface Diagram {
  _id: string;
  title: string;
  description?: string;
  mermaidCode: string;
  prompt?: string;
  diagramType: DiagramType;
  category?: DiagramCategory;
  tags: string[];
  visibility: DiagramVisibility;
  author: {
    _id: string;
    name: string;
    avatar?: string;
  };
  likeCount: number;
  viewCount: number;
  createdAt: string;
  updatedAt: string;
}

export interface DiagramsResponse {
  success: boolean;
  message: string;
  data: {
    diagrams: Diagram[];
    totalCount: number;
    currentPage: number;
    totalPages: number;
  };
}
