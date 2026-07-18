"use client";

import { useState } from "react";
import { Search } from "lucide-react";
import DiagramCard from "@/components/diagrams/DiagramCard";
import DiagramCardSkeleton from "@/components/diagrams/DiagramCardSkeleton";
import { useGetAllDiagrams } from "@/hooks/useDiagrams";
import { DiagramType, DiagramCategory } from "@/types/diagram.types";

export default function ExplorePage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [diagramType, setDiagramType] = useState<DiagramType | "">("");
  const [category, setCategory] = useState<DiagramCategory | "">("");
  const [sort, setSort] = useState("latest");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useGetAllDiagrams({
    search: searchTerm || undefined,
    diagramType: diagramType || undefined,
    category: category || undefined,
    sort,
    page,
  });

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setPage(1);
  };

  const handleDiagramTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDiagramType(e.target.value as DiagramType | "");
    setPage(1);
  };

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCategory(e.target.value as DiagramCategory | "");
    setPage(1);
  };

  const handleSortChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSort(e.target.value);
    setPage(1);
  };

  const diagrams = data?.data.diagrams || [];
  const totalCount = data?.data.totalCount || 0;
  const totalPages = data?.data.totalPages || 1;

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">Explore Diagrams</h1>
          <p className="text-gray-500 mt-2">Discover diagrams created by the community</p>
          <p className="text-sm text-gray-500 mt-4">Showing {totalCount} diagrams</p>
        </div>
      </div>

      {/* Filters Bar */}
      <div className="bg-white border-b border-gray-200 py-4 sticky top-16 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col sm:flex-row gap-4 items-center">
            {/* Search Input */}
            <div className="relative flex-1 w-full sm:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search diagrams..."
                value={searchTerm}
                onChange={handleSearchChange}
                className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-xl text-sm focus:outline-none focus:border-indigo-400 bg-white transition-colors"
              />
            </div>

            {/* Select dropdowns */}
            <select
              value={diagramType}
              onChange={handleDiagramTypeChange}
              className="w-full sm:w-auto border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-400 bg-white cursor-pointer transition-colors"
            >
              <option value="">All Types</option>
              <option value="flowchart">Flowchart</option>
              <option value="sequence">Sequence</option>
              <option value="erd">ERD</option>
              <option value="class">Class</option>
              <option value="mindmap">Mindmap</option>
              <option value="gantt">Gantt</option>
            </select>

            <select
              value={category}
              onChange={handleCategoryChange}
              className="w-full sm:w-auto border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-400 bg-white cursor-pointer transition-colors"
            >
              <option value="">All Categories</option>
              <option value="business">Business</option>
              <option value="tech">Tech</option>
              <option value="education">Education</option>
              <option value="personal">Personal</option>
            </select>

            <select
              value={sort}
              onChange={handleSortChange}
              className="w-full sm:w-auto border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-indigo-400 bg-white cursor-pointer transition-colors"
            >
              <option value="latest">Latest</option>
              <option value="oldest">Oldest</option>
              <option value="popular">Most Popular</option>
            </select>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {Array.from({ length: 8 }).map((_, i) => (
              <DiagramCardSkeleton key={i} />
            ))}
          </div>
        ) : diagrams.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-white p-6 rounded-full shadow-sm mb-4">
              <Search className="w-8 h-8 text-gray-400" />
            </div>
            <h3 className="text-xl font-bold text-gray-900 mb-2">No diagrams found</h3>
            <p className="text-gray-500 text-center">
              Try adjusting your filters or search terms
            </p>
          </div>
        ) : (
          <>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {diagrams.map((diagram) => (
                <DiagramCard key={diagram._id} diagram={diagram} />
              ))}
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="flex justify-center items-center gap-4 mt-12">
                <button
                  disabled={page === 1}
                  onClick={() => setPage((p) => Math.max(1, p - 1))}
                  className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Previous
                </button>
                <span className="text-sm text-gray-600 font-medium">
                  Page {page} of {totalPages}
                </span>
                <button
                  disabled={page >= totalPages}
                  onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
                  className="px-4 py-2 rounded-xl border border-gray-200 bg-white text-sm font-medium hover:border-indigo-400 hover:text-indigo-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                >
                  Next
                </button>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}
