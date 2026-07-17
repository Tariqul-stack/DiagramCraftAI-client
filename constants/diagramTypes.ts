import { DiagramType } from "@/types/diagram.types";

export const DIAGRAM_TYPES: {
  value: DiagramType;
  label: string;
  description: string;
  icon: string;
}[] = [
  {
    value: "flowchart",
    label: "Flowchart",
    description: "Process flows, decision trees, user journeys",
    icon: "GitBranch",
  },
  {
    value: "sequence",
    label: "Sequence Diagram",
    description: "API calls, system interactions, user-system flow",
    icon: "ArrowLeftRight",
  },
  {
    value: "erd",
    label: "Entity Relationship",
    description: "Database schema, data modeling",
    icon: "Database",
  },
  {
    value: "class",
    label: "Class Diagram",
    description: "OOP design, system architecture",
    icon: "Layers",
  },
  {
    value: "mindmap",
    label: "Mind Map",
    description: "Brainstorming, concept mapping",
    icon: "Brain",
  },
  {
    value: "gantt",
    label: "Gantt Chart",
    description: "Project timelines, sprint planning",
    icon: "CalendarDays",
  },
];
