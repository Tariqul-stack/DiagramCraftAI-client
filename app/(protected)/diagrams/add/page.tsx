"use client";

import { FormEvent, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  ArrowLeftRight,
  Brain,
  CalendarDays,
  Database,
  GitBranch,
  Layers,
  Loader2,
  type LucideIcon,
} from "lucide-react";
import { renderMermaid } from "@/lib/mermaid";
import { DIAGRAM_TYPES } from "@/constants/diagramTypes";
import { PROMPT_SUGGESTIONS } from "@/constants/promptTemplates";
import { useAIGenerate, useAIRegenerate } from "@/hooks/useAIGenerate";
import { useCreateDiagram } from "@/hooks/useDiagrams";
import type { DiagramType, DiagramVisibility } from "@/types/diagram.types";

const DIAGRAM_ICONS: Record<string, LucideIcon> = {
  GitBranch,
  ArrowLeftRight,
  Database,
  Layers,
  Brain,
  CalendarDays,
};

export default function DiagramAddPage() {
  const router = useRouter();
  const [selectedType, setSelectedType] = useState<DiagramType>("flowchart");
  const [prompt, setPrompt] = useState("");
  const [mermaidCode, setMermaidCode] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [tags, setTags] = useState("");
  const [visibility, setVisibility] = useState<DiagramVisibility>("public");
  const [hasGenerated, setHasGenerated] = useState(false);

  const aiGenerate = useAIGenerate();
  const aiRegenerate = useAIRegenerate();
  const createDiagram = useCreateDiagram();
  const isGenerating = aiGenerate.isPending || aiRegenerate.isPending;

  useEffect(() => {
    if (!mermaidCode) {
      return;
    }

    renderMermaid("#diagram-preview .mermaid");
  }, [mermaidCode]);

  const handleGenerate = () => {
    if (!prompt.trim() || isGenerating) {
      return;
    }

    aiGenerate.mutate(
      { diagramType: selectedType, prompt },
      {
        onSuccess: (generatedCode) => {
          setMermaidCode(generatedCode);
          setHasGenerated(true);
        },
      },
    );
  };

  const handleRegenerate = () => {
    if (!prompt.trim() || isGenerating) {
      return;
    }

    aiRegenerate.mutate(
      { diagramType: selectedType, prompt },
      {
        onSuccess: (generatedCode) => {
          setMermaidCode(generatedCode);
        },
      },
    );
  };

  const handleSave = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!title.trim() || !mermaidCode || createDiagram.isPending) {
      return;
    }

    createDiagram.mutate(
      {
        title: title.trim(),
        description: description.trim(),
        tags: tags
          .split(",")
          .map((tag) => tag.trim())
          .filter(Boolean),
        visibility,
        mermaidCode,
        prompt,
        diagramType: selectedType,
      },
      {
        onSuccess: () => {
          router.push("/diagrams/manage");
        },
      },
    );
  };

  return (
    <div className="min-h-screen w-full bg-gray-50">
      <div className="bg-white border-b border-gray-200 py-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <Link
            href="/dashboard"
            className="inline-flex items-center text-sm font-medium text-gray-600 hover:text-indigo-600 transition-colors mb-4"
          >
            ← Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-gray-900">
            Create New Diagram
          </h1>
          <p className="text-gray-500 mt-1">
            Describe your diagram and let AI generate it instantly
          </p>
        </div>
      </div>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div>
              <label className="block text-sm font-semibold text-gray-900 mb-3">
                Diagram Type
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {DIAGRAM_TYPES.map((type) => {
                  const Icon = DIAGRAM_ICONS[type.icon] ?? GitBranch;
                  const isSelected = selectedType === type.value;

                  return (
                    <button
                      key={type.value}
                      type="button"
                      onClick={() => setSelectedType(type.value)}
                      className={`min-h-24 rounded-xl border px-3 py-4 text-center transition-colors ${
                        isSelected
                          ? "bg-indigo-600 text-white border-indigo-600"
                          : "bg-white text-gray-700 border-gray-200 hover:border-indigo-200 hover:bg-indigo-50"
                      }`}
                    >
                      <Icon className="w-5 h-5 mx-auto mb-2" />
                      <span className="block text-sm font-semibold leading-snug">
                        {type.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>

            <div className="mt-6">
              <label
                htmlFor="diagram-prompt"
                className="block text-sm font-semibold text-gray-900 mb-3"
              >
                Describe your diagram
              </label>
              <textarea
                id="diagram-prompt"
                rows={5}
                value={prompt}
                onChange={(event) => setPrompt(event.target.value)}
                placeholder={`e.g. Show a user login flow
with email verification and OAuth options`}
                className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {PROMPT_SUGGESTIONS[selectedType].slice(0, 3).map((suggestion) => (
                  <button
                    key={suggestion}
                    type="button"
                    onClick={() => setPrompt(suggestion)}
                    className="text-xs bg-indigo-50 text-indigo-600 px-3 py-1 rounded-full cursor-pointer hover:bg-indigo-100 transition-colors"
                  >
                    {suggestion}
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-6 space-y-3">
              <button
                type="button"
                onClick={handleGenerate}
                disabled={!prompt.trim() || isGenerating}
                className="w-full bg-indigo-600 text-white rounded-xl py-3 text-sm font-semibold hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 transition-colors"
              >
                {isGenerating ? (
                  <span className="inline-flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin" />
                    Generating...
                  </span>
                ) : (
                  "✨ Generate Diagram"
                )}
              </button>

              {hasGenerated && (
                <button
                  type="button"
                  onClick={handleRegenerate}
                  disabled={!prompt.trim() || isGenerating}
                  className="w-full rounded-xl border border-indigo-600 bg-white text-indigo-600 py-3 text-sm font-semibold hover:bg-indigo-50 disabled:cursor-not-allowed disabled:opacity-60 transition-colors"
                >
                  🔄 Regenerate
                </button>
              )}
            </div>
          </section>

          <section className="bg-white rounded-2xl border border-gray-200 shadow-sm p-6">
            <div>
              <h2 className="text-lg font-bold text-gray-900 mb-4">
                Live Preview
              </h2>
              {!mermaidCode ? (
                <div className="min-h-80 rounded-xl border border-dashed border-gray-200 bg-gray-50 flex flex-col items-center justify-center text-center px-6">
                  <GitBranch className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-sm font-medium text-gray-500">
                    Your diagram will appear here after generation
                  </p>
                </div>
              ) : (
                <div
                  id="diagram-preview"
                  className="min-h-80 rounded-xl border border-gray-200 bg-gray-50 p-4 overflow-x-auto"
                >
                  <div key={mermaidCode} className="mermaid">
                    {mermaidCode}
                  </div>
                </div>
              )}
            </div>

            {mermaidCode && (
              <>
                <div className="mt-6">
                  <label className="block text-sm font-semibold text-gray-900 mb-3">
                    Generated Code
                  </label>
                  <pre className="bg-gray-900 text-green-400 text-xs rounded-xl p-4 overflow-x-auto">
                    <code>{mermaidCode}</code>
                  </pre>
                </div>

                <form onSubmit={handleSave} className="mt-6 space-y-4">
                  <input
                    type="text"
                    value={title}
                    onChange={(event) => setTitle(event.target.value)}
                    placeholder="Give your diagram a title"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  />
                  <textarea
                    rows={2}
                    value={description}
                    onChange={(event) => setDescription(event.target.value)}
                    placeholder="Optional description"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100 resize-none"
                  />
                  <input
                    type="text"
                    value={tags}
                    onChange={(event) => setTags(event.target.value)}
                    placeholder="Add tags separated by commas"
                    className="w-full rounded-xl border border-gray-200 px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-100"
                  />

                  <div className="grid grid-cols-2 gap-3">
                    {(["public", "private"] as const).map((option) => (
                      <button
                        key={option}
                        type="button"
                        onClick={() => setVisibility(option)}
                        className={`rounded-xl px-4 py-2.5 text-sm font-semibold capitalize transition-colors ${
                          visibility === option
                            ? "bg-indigo-600 text-white"
                            : "bg-white text-gray-600 border border-gray-200 hover:bg-gray-50"
                        }`}
                      >
                        {option}
                      </button>
                    ))}
                  </div>

                  <button
                    type="submit"
                    disabled={!title.trim() || createDiagram.isPending}
                    className="w-full bg-indigo-600 text-white rounded-xl py-3 text-sm font-semibold hover:bg-indigo-700 disabled:cursor-not-allowed disabled:opacity-60 transition-colors"
                  >
                    {createDiagram.isPending ? (
                      <span className="inline-flex items-center justify-center gap-2">
                        <Loader2 className="w-4 h-4 animate-spin" />
                        Saving...
                      </span>
                    ) : (
                      "💾 Save Diagram"
                    )}
                  </button>
                </form>
              </>
            )}
          </section>
        </div>
      </main>
    </div>
  );
}
