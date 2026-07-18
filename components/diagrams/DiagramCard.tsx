import Link from "next/link";
import { Diagram, DiagramType } from "@/types/diagram.types";
import {
  GitBranch,
  ArrowLeftRight,
  Database,
  Layers,
  Brain,
  CalendarDays,
  User,
  Heart,
  FileBox,
} from "lucide-react";

interface DiagramCardProps {
  diagram: Diagram;
}

const getDiagramIcon = (type: DiagramType) => {
  const iconProps = { size: 48, className: "text-indigo-300" };
  switch (type) {
    case "flowchart":
      return <GitBranch {...iconProps} />;
    case "sequence":
      return <ArrowLeftRight {...iconProps} />;
    case "erd":
      return <Database {...iconProps} />;
    case "class":
      return <Layers {...iconProps} />;
    case "mindmap":
      return <Brain {...iconProps} />;
    case "gantt":
      return <CalendarDays {...iconProps} />;
    default:
      return <FileBox {...iconProps} />;
  }
};

export default function DiagramCard({ diagram }: DiagramCardProps) {
  const displayTags = diagram.tags?.slice(0, 2) || [];
  const remainingTagsCount = (diagram.tags?.length || 0) - 2;

  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-all duration-300 overflow-hidden h-full flex flex-col">
      {/* Top Preview Area */}
      <div className="bg-gradient-to-br from-indigo-50 to-purple-50 h-48 relative flex items-center justify-center shrink-0">
        <div className="absolute top-4 left-4 bg-indigo-100 text-indigo-700 text-xs font-semibold px-2 py-1 rounded-full capitalize">
          {diagram.diagramType}
        </div>
        
        {diagram.visibility === "private" ? (
          <div className="absolute top-4 right-4 bg-gray-100 text-gray-600 text-xs font-semibold px-2 py-1 rounded-full capitalize">
            Private
          </div>
        ) : (
          <div className="absolute top-4 right-4 bg-green-100 text-green-700 text-xs font-semibold px-2 py-1 rounded-full capitalize">
            Public
          </div>
        )}

        {getDiagramIcon(diagram.diagramType)}
      </div>

      {/* Content Area */}
      <div className="p-5 flex flex-col flex-grow">
        <h3 className="text-lg font-bold text-gray-900 truncate" title={diagram.title}>
          {diagram.title}
        </h3>
        <p className="text-sm text-gray-500 line-clamp-2 min-h-[2.5rem] mt-1">
          {diagram.description || "No description provided."}
        </p>

        {/* Meta Info Row */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-1.5 text-xs text-gray-400 truncate pr-2">
            <User size={14} className="shrink-0" />
            <span className="truncate">{diagram.author?.name || "Unknown Author"}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-gray-400 shrink-0">
            <Heart size={14} />
            <span>{diagram.likeCount || 0}</span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex items-center gap-2 mt-4 min-h-[24px]">
          {displayTags.map((tag, index) => (
            <span
              key={`${tag}-${index}`}
              className="bg-gray-100 text-gray-600 text-xs px-2 py-1 rounded-full truncate max-w-[80px]"
            >
              {tag}
            </span>
          ))}
          {remainingTagsCount > 0 && (
            <span className="text-xs text-gray-400 whitespace-nowrap">
              +{remainingTagsCount} more
            </span>
          )}
        </div>

        {/* View Details Button */}
        <div className="mt-auto pt-5">
          <Link
            href={`/diagrams/${diagram._id}`}
            className="w-full block text-center rounded-xl border border-indigo-200 text-indigo-600 hover:bg-indigo-50 py-2.5 font-medium transition-colors"
          >
            View Details
          </Link>
        </div>
      </div>
    </div>
  );
}
