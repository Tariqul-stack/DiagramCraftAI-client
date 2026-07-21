"use client";

import Link from "next/link";
import {
  ArrowLeftRight,
  Brain,
  CalendarDays,
  Database,
  Eye,
  GitBranch,
  Heart,
  Layers,
  LayoutDashboard,
  Trash2,
  type LucideIcon,
} from "lucide-react";
import { DIAGRAM_TYPES } from "@/constants/diagramTypes";
import { useDeleteDiagram, useGetMyDiagrams } from "@/hooks/useDiagrams";
import type { Diagram, DiagramType, DiagramVisibility } from "@/types/diagram.types";

const DIAGRAM_ICONS: Record<DiagramType, LucideIcon> = {
  flowchart: GitBranch,
  sequence: ArrowLeftRight,
  erd: Database,
  class: Layers,
  mindmap: Brain,
  gantt: CalendarDays,
};

const DIAGRAM_LABELS = DIAGRAM_TYPES.reduce(
  (labels, type) => ({
    ...labels,
    [type.value]: type.label,
  }),
  {} as Record<DiagramType, string>,
);

const formatCreatedDate = (date: string) =>
  new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(date));

export default function DiagramManagePage() {
  const { data: diagrams = [], isLoading } = useGetMyDiagrams();
  const deleteDiagram = useDeleteDiagram();

  const publicCount = diagrams.filter(
    (diagram) => diagram.visibility === "public",
  ).length;
  const privateCount = diagrams.filter(
    (diagram) => diagram.visibility === "private",
  ).length;

  const handleDelete = (id: string) => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this diagram?",
    );

    if (confirmed) {
      deleteDiagram.mutate(id);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
          <div>
            <h1 className="text-2xl font-bold text-gray-900">My Diagrams</h1>
            <p className="text-gray-500 mt-1">
              Manage all your created diagrams
            </p>
          </div>
          <Link
            href="/diagrams/add"
            className="inline-flex items-center justify-center bg-indigo-600 text-whitepx-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
          >
            Create New
          </Link>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        <div className="flex flex-wrap gap-6 text-sm text-gray-600">
          <span>
            Total:{" "}
            <span className="font-semibold text-gray-900">
              {diagrams.length}
            </span>{" "}
            diagrams
          </span>
          <span>
            Public:{" "}
            <span className="font-semibold text-gray-900">{publicCount}</span>
          </span>
          <span>
            Private:{" "}
            <span className="font-semibold text-gray-900">{privateCount}</span>
          </span>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-8">
        <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden">
          {isLoading ? (
            <div className="divide-y divide-gray-100">
              {Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={index}
                  className="grid grid-cols-1 lg:grid-cols-[minmax(280px,1fr)_120px_120px_100px_140px_120px] gap-4 px-6 py-4 animate-pulse"
                >
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-lg bg-gray-200" />
                    <div className="space-y-2 flex-1">
                      <div className="h-4 w-48 max-w-full rounded bg-gray-200" />
                      <div className="h-3 w-64 max-w-full rounded bg-gray-100" />
                    </div>
                  </div>
                  <div className="h-6 w-20 rounded-full bg-gray-100" />
                  <div className="h-6 w-16 rounded-full bg-gray-100" />
                  <div className="h-5 w-12 rounded bg-gray-100" />
                  <div className="h-5 w-24 rounded bg-gray-100" />
                  <div className="h-9 w-20 rounded-lg bg-gray-100" />
                </div>
              ))}
            </div>
          ) : diagrams.length === 0 ? (
            <div className="py-16 px-6 text-center">
              <LayoutDashboard className="w-12 h-12 text-gray-300 mx-auto mb-4" />
              <h2 className="text-lg font-bold text-gray-900">
                No diagrams yet
              </h2>
              <p className="text-sm text-gray-500 mt-1 mb-6">
                Create your first AI-generated diagram
              </p>
              <Link
                href="/diagrams/add"
                className="inline-flex items-center justify-center bg-indigo-600 text-white px-4 py-2 rounded-xl text-sm font-semibold hover:bg-indigo-700 transition-colors"
              >
                Create Diagram
              </Link>
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-200">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Diagram
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Type
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Visibility
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Likes
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Created Date
                    </th>
                    <th className="px-6 py-3 text-left text-xs font-semibold text-gray-500 uppercase tracking-wider">
                      Actions
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {diagrams.map((diagram) => {
                    const Icon = DIAGRAM_ICONS[diagram.diagramType];

                    return (
                      <tr
                        key={diagram._id}
                        className="border-b border-gray-100 hover:bg-gray-50 transition-colors last:border-b-0"
                      >
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <span className="bg-indigo-50 rounded-lg p-2 w-fit inline-block">
                              <Icon className="w-5 h-5 text-indigo-600" />
                            </span>
                            <div className="min-w-0">
                              <div className="text-sm font-semibold text-gray-900 truncate max-w-xs">
                                {diagram.title}
                              </div>
                              <div className="text-xs text-gray-400 truncate max-w-xs mt-1">
                                {diagram.description || "No description"}
                              </div>
                            </div>
                          </div>
                        </td>
                        <td className="px-6 py-4">
                          <span className="bg-indigo-50 text-indigo-700 text-xs px-2 py-1 rounded-full font-medium">
                            {DIAGRAM_LABELS[diagram.diagramType]}
                          </span>
                        </td>
                        <td className="px-6 py-4">
                          <VisibilityBadge visibility={diagram.visibility} />
                        </td>
                        <td className="px-6 py-4">
                          <span className="inline-flex items-center gap-1.5 text-sm text-gray-500">
                            <Heart className="w-4 h-4" />
                            {diagram.likeCount || 0}
                          </span>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500">
                          {formatCreatedDate(diagram.createdAt)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-1">
                            <Link
                              href={`/diagrams/${diagram._id}`}
                              aria-label={`View ${diagram.title}`}
                              className="text-indigo-600 hover:text-indigo-800 p-2 rounded-lg hover:bg-indigo-50 transition-colors"
                            >
                              <Eye className="w-5 h-5" />
                            </Link>
                            <button
                              type="button"
                              onClick={() => handleDelete(diagram._id)}
                              disabled={deleteDiagram.isPending}
                              aria-label={`Delete ${diagram.title}`}
                              className="text-red-500 hover:text-red-700 p-2 rounded-lg hover:bg-red-50 disabled:cursor-not-allowed disabled:opacity-50 transition-colors"
                            >
                              <Trash2 className="w-5 h-5" />
                            </button>
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

function VisibilityBadge({ visibility }: { visibility: DiagramVisibility }) {
  const className =
    visibility === "public"
      ? "bg-green-50 text-green-700"
      : "bg-gray-100 text-gray-600";

  return (
    <span
      className={`${className} text-xs px-2 py-1 rounded-full font-medium capitalize`}
    >
      {visibility}
    </span>
  );
}
