"use client";

import { useEffect, useRef } from "react";

interface MermaidRendererProps {
  code: string;
}

export default function MermaidRenderer({ code }: MermaidRendererProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!code || !containerRef.current) return;

    const render = async () => {
      try {
        const mermaid = (await import("mermaid")).default;

        mermaid.initialize({
          startOnLoad: false,
          theme: "default",
          securityLevel: "loose",
        });

        const container = containerRef.current;
        if (!container) return;

        container.innerHTML = "";

        const id = "mermaid-" + Date.now();
        const { svg } = await mermaid.render(id, code);
        container.innerHTML = svg;
      } catch (err) {
        if (containerRef.current) {
          containerRef.current.innerHTML =
            '<p class="text-red-400 text-sm p-4">Failed to render diagram</p>';
        }
      }
    };

    render();
  }, [code]);

  return (
    <div
      ref={containerRef}
      className="w-full flex justify-center items-center min-h-[200px]"
    >
      <div className="animate-pulse text-gray-400 text-sm">
        Rendering diagram...
      </div>
    </div>
  );
}
