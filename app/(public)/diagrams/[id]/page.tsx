"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import { useGetDiagramById, useToggleLike } from "@/hooks/useDiagrams";
import { AIChatPanel } from "@/components/ai/AIChatPanel";
import mermaid from "mermaid";
import { Heart, Share2, Copy, Check, ArrowLeft, Plus } from "lucide-react";

export default function DiagramDetailsPage() {
  const params = useParams();
  const id = params.id as string;

  const { data: diagram, isLoading, error } = useGetDiagramById(id);
  const { mutate: toggleLike } = useToggleLike();

  const [copiedCode, setCopiedCode] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  // Add a key to force re-render of mermaid container when code changes
  const [mermaidKey, setMermaidKey] = useState(0);

  useEffect(() => {
    if (diagram?.mermaidCode) {
      mermaid.initialize({ startOnLoad: false, theme: "default" });
      try {
        mermaid.run({ querySelector: "#mermaid-preview" });
      } catch (err) {
        console.error("Mermaid parsing error:", err);
      }
    }
  }, [diagram?.mermaidCode, mermaidKey]);

  // If the diagram object changes (e.g. from cache to network response),
  // we might need to recreate the container so mermaid can re-render.
  useEffect(() => {
    if (diagram) {
      setMermaidKey((prev) => prev + 1);
    }
  }, [diagram]);

  if (isLoading) {
    return (
      <div className="min-h-screen w-full bg-gray-50">
        <div className="bg-white border-b border-gray-200 py-6">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="h-4 bg-gray-200 rounded animate-pulse w-32 mb-4"></div>
            <div className="h-8 bg-gray-200 rounded animate-pulse w-3/4 max-w-md mb-4"></div>
            <div className="flex gap-2 mb-4">
              <div className="h-6 bg-gray-200 rounded-full animate-pulse w-20"></div>
              <div className="h-6 bg-gray-200 rounded-full animate-pulse w-24"></div>
            </div>
            <div className="h-4 bg-gray-200 rounded animate-pulse w-64"></div>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-8">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 h-96 animate-pulse"></div>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 h-48 animate-pulse"></div>
            </div>
            <div className="lg:col-span-1 space-y-6">
              <div className="bg-white rounded-2xl border border-gray-200 p-6 h-48 animate-pulse"></div>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 h-32 animate-pulse"></div>
              <div className="bg-white rounded-2xl border border-gray-200 p-6 h-64 animate-pulse"></div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !diagram) {
    return (
      <div className="min-h-screen w-full bg-gray-50 flex flex-col items-center justify-center p-4">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Diagram not found</h2>
        <Link
          href="/explore"
          className="flex items-center gap-2 px-4 py-2 bg-white border border-gray-200 rounded-xl hover:bg-gray-50 transition-colors text-sm font-medium text-gray-700"
        >
          <ArrowLeft size={16} />
          Back to Explore
        </Link>
      </div>
    );
  }

  const handleCopyCode = () => {
    navigator.clipboard.writeText(diagram.mermaidCode);
    setCopiedCode(true);
    setTimeout(() => setCopiedCode(false), 2000);
  };

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
  };

  const formattedDate = new Date(diagram.createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <div className="min-h-screen w-full bg-gray-50">
      {/* Page Header */}
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/explore"
            className="inline-flex items-center gap-2 text-sm text-gray-500 hover:text-indigo-600 mb-4 transition-colors"
          >
            <ArrowLeft size={16} />
            Back to Explore
          </Link>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">{diagram.title}</h1>
          <div className="flex flex-wrap items-center gap-2 mb-4">
            <span className="bg-indigo-100 text-indigo-700 text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
              {diagram.diagramType}
            </span>
            {diagram.category && (
              <span className="bg-purple-100 text-purple-700 text-xs font-semibold px-2.5 py-1 rounded-full capitalize">
                {diagram.category}
              </span>
            )}
            <span
              className={`text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                diagram.visibility === "private"
                  ? "bg-gray-100 text-gray-600"
                  : "bg-green-100 text-green-700"
              }`}
            >
              {diagram.visibility}
            </span>
          </div>
          <p className="text-sm text-gray-500">
            by <span className="font-medium text-gray-700">{diagram.author?.name || "Unknown"}</span> · {formattedDate} · {diagram.viewCount || 0} views
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            {/* Diagram Preview Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6 overflow-hidden">
              <h2 className="text-lg font-bold text-gray-900 mb-6">Diagram Preview</h2>
              
              <div className="w-full overflow-x-auto bg-gray-50 rounded-xl border border-gray-100 p-4 mb-6 flex justify-center min-h-[300px]">
                <div id="mermaid-preview" key={mermaidKey} className="w-full flex justify-center items-center">
                  {diagram.mermaidCode}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-bold text-gray-700">Mermaid Code</span>
                  <button
                    onClick={handleCopyCode}
                    className="flex items-center gap-1.5 text-xs font-medium text-gray-500 hover:text-indigo-600 transition-colors"
                  >
                    {copiedCode ? <Check size={14} className="text-green-500" /> : <Copy size={14} />}
                    {copiedCode ? "Copied!" : "Copy code"}
                  </button>
                </div>
                <pre className="bg-gray-900 text-green-400 rounded-xl p-4 text-xs overflow-x-auto whitespace-pre-wrap leading-relaxed">
                  {diagram.mermaidCode}
                </pre>
              </div>
            </div>

            {/* Description Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-lg font-bold text-gray-900 mb-4">About this Diagram</h2>
              <p className="text-gray-600 text-sm whitespace-pre-wrap mb-6 leading-relaxed">
                {diagram.description || "No description provided."}
              </p>
              
              {diagram.tags && diagram.tags.length > 0 && (
                <div>
                  <h3 className="text-sm font-semibold text-gray-900 mb-3">Tags</h3>
                  <div className="flex flex-wrap gap-2">
                    {diagram.tags.map((tag, i) => (
                      <span
                        key={i}
                        className="bg-indigo-50 border border-indigo-100 text-indigo-700 text-xs px-3 py-1.5 rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column */}
          <div className="lg:col-span-1 flex flex-col gap-6">
            {/* Actions Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <div className="grid grid-cols-2 gap-3 mb-4">
                <button
                  onClick={() => toggleLike(id)}
                  className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-red-200 group transition-colors"
                >
                  <Heart
                    size={20}
                    className="text-gray-400 group-hover:text-red-500 transition-colors"
                  />
                  <span className="text-xs font-medium text-gray-600 group-hover:text-red-600">
                    {diagram.likeCount || 0} Likes
                  </span>
                </button>
                <button
                  onClick={handleShare}
                  className="flex flex-col items-center justify-center gap-1.5 p-3 rounded-xl border border-gray-200 hover:bg-gray-50 hover:border-indigo-200 group transition-colors"
                >
                  {copiedLink ? (
                    <Check size={20} className="text-green-500" />
                  ) : (
                    <Share2
                      size={20}
                      className="text-gray-400 group-hover:text-indigo-500 transition-colors"
                    />
                  )}
                  <span className="text-xs font-medium text-gray-600 group-hover:text-indigo-600">
                    {copiedLink ? "Copied!" : "Share"}
                  </span>
                </button>
              </div>
              <Link
                href="/diagrams/add"
                className="w-full flex justify-center items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded-xl py-2.5 font-medium transition-colors"
              >
                <Plus size={18} />
                Create Similar
              </Link>
            </div>

            {/* Author Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Created by</h2>
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-700 font-bold text-sm shrink-0">
                    {diagram.author?.name ? diagram.author.name.substring(0, 2).toUpperCase() : "??"}
                  </div>
                  <div>
                    <p className="font-bold text-gray-900 text-sm">
                      {diagram.author?.name || "Unknown"}
                    </p>
                  </div>
                </div>
                <Link
                  href="#"
                  className="text-xs font-medium text-indigo-600 hover:text-indigo-800"
                >
                  View Profile
                </Link>
              </div>
            </div>

            <AIChatPanel diagramCode={diagram?.mermaidCode || ""} />

            {/* Details Card */}
            <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
              <h2 className="text-sm font-bold text-gray-900 mb-4 uppercase tracking-wider">Details</h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Type</span>
                  <span className="font-medium text-gray-900 capitalize">{diagram.diagramType}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Category</span>
                  <span className="font-medium text-gray-900 capitalize">{diagram.category || "None"}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Visibility</span>
                  <span className="font-medium text-gray-900 capitalize">{diagram.visibility}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Views</span>
                  <span className="font-medium text-gray-900">{diagram.viewCount || 0}</span>
                </div>
                <div className="flex justify-between border-b border-gray-100 pb-2">
                  <span className="text-gray-500">Likes</span>
                  <span className="font-medium text-gray-900">{diagram.likeCount || 0}</span>
                </div>
                <div className="flex justify-between pt-1">
                  <span className="text-gray-500">Created</span>
                  <span className="font-medium text-gray-900">{formattedDate}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
