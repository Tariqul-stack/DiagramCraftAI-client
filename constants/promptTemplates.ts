import { DiagramType } from "@/types/diagram.types";

export const PROMPT_SUGGESTIONS: Record<DiagramType, string[]> = {
  flowchart: [
    "Show a user login and authentication flow",
    "Create an e-commerce checkout process flow",
    "Design an employee onboarding process",
  ],
  sequence: [
    "Show how a REST API handles a user request",
    "Illustrate a payment gateway integration flow",
    "Show user registration with email verification",
  ],
  erd: [
    "Design a database schema for an e-commerce app",
    "Create a schema for a blog with users and comments",
    "Design a school management system database",
  ],
  class: [
    "Design classes for a banking system",
    "Create a class diagram for a vehicle rental system",
    "Show OOP structure for a social media app",
  ],
  mindmap: [
    "Create a mindmap for learning web development",
    "Brainstorm ideas for a mobile app startup",
    "Map out the topics in machine learning",
  ],
  gantt: [
    "Create a 4 week web development project plan",
    "Plan a mobile app launch timeline",
    "Show a 3 month startup roadmap",
  ],
};
