import mermaid from "mermaid";

let initialized = false;

export function initMermaid() {
  if (initialized) {
    return;
  }

  mermaid.initialize({
    startOnLoad: false,
    theme: "default",
    securityLevel: "loose",
  });
  initialized = true;
}

export async function renderMermaid(selector: string) {
  initMermaid();

  try {
    await mermaid.run({ querySelector: selector });
  } catch (error) {
    // Ignore to prevent console errors on failed parses
  }
}
