import mermaid from "mermaid";

let initialized = false;

export async function renderMermaid(containerSelector: string, code: string) {
  if (!initialized) {
    mermaid.initialize({
      startOnLoad: false,
      theme: "default",
      securityLevel: "loose",
    });
    initialized = true;
  }

  try {
    const container = document.querySelector(containerSelector);
    if (!container) return;

    container.innerHTML = "";

    const id = "mermaid-svg-" + Date.now();
    const { svg } = await mermaid.render(id, code);
    container.innerHTML = svg;
  } catch (error) {
    console.error("Mermaid render error:", error);
  }
}
