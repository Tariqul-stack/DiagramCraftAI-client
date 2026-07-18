import React from "react";

export default function DiagramCardSkeleton() {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl shadow-sm overflow-hidden h-full flex flex-col">
      {/* Preview area */}
      <div className="h-48 bg-gray-100 animate-pulse"></div>

      {/* Content area */}
      <div className="p-5 flex flex-col flex-grow">
        {/* Title skeleton */}
        <div className="h-5 bg-gray-200 rounded animate-pulse w-3/4 mb-2"></div>
        
        {/* Description skeleton */}
        <div className="h-4 bg-gray-200 rounded animate-pulse w-full mb-1"></div>
        <div className="h-4 bg-gray-200 rounded animate-pulse w-5/6 mb-4"></div>

        {/* Meta row skeleton */}
        <div className="flex items-center justify-between">
          <div className="h-3 bg-gray-200 rounded animate-pulse w-24"></div>
          <div className="h-3 bg-gray-200 rounded animate-pulse w-12"></div>
        </div>

        {/* Tags skeleton */}
        <div className="flex gap-2 mt-4">
          <div className="h-5 bg-gray-200 rounded-full animate-pulse w-16"></div>
          <div className="h-5 bg-gray-200 rounded-full animate-pulse w-12"></div>
        </div>

        {/* Button skeleton */}
        <div className="mt-auto">
          <div className="h-9 bg-gray-200 rounded-xl animate-pulse w-full mt-3"></div>
        </div>
      </div>
    </div>
  );
}
