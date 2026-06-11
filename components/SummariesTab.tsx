"use client";

import { useState } from "react";
import { BookOpen, Tag, ChevronDown, ChevronUp, Sparkles } from "lucide-react";
import { lectureSummaries, LectureSummary } from "@/lib/mockData";

type FilterType = "all" | "important" | "review";

function LectureCard({ lecture }: { lecture: LectureSummary }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <div className="glass-card glass-card-hover rounded-xl overflow-hidden">
      {/* Card header */}
      <div className="p-5">
        <div className="flex items-start justify-between gap-3 mb-3">
          <div className="flex items-start gap-3">
            <div className="bg-gradient-to-br from-purple-600/80 to-blue-600/70 rounded-lg px-2.5 py-1.5 flex-shrink-0">
              <span className="text-white text-[10px] font-bold tracking-wider">
                {lecture.lectureNumber}
              </span>
            </div>
            <div>
              <h4 className="text-white font-semibold text-sm leading-snug">
                {lecture.title}
              </h4>
              <p className="text-gray-500 text-xs mt-0.5">{lecture.duration}</p>
            </div>
          </div>
          <div className="flex items-center gap-1.5 flex-shrink-0">
            <span className="badge-completed">Completed</span>
            <span
              className={
                lecture.importance === "High" ? "badge-high" : "badge-medium"
              }
            >
              {lecture.importance}
            </span>
          </div>
        </div>

        {/* Summary text */}
        <p className="text-gray-400 text-xs leading-relaxed">
          {expanded
            ? lecture.summary
            : lecture.summary.slice(0, 120) + "..."}
        </p>
      </div>

      {/* Key topics */}
      <div className="px-5 pb-4">
        <p className="text-gray-500 text-[10px] uppercase tracking-wider font-medium mb-2">
          Key Topics
        </p>
        <div className="flex flex-wrap gap-1.5">
          {lecture.keyTopics.map((topic, i) => (
            <span
              key={i}
              className="flex items-center gap-1 bg-purple-500/8 border border-purple-500/20 text-purple-300 text-[11px] px-2 py-0.5 rounded-md"
            >
              <Tag className="w-2.5 h-2.5" />
              {topic}
            </span>
          ))}
        </div>
      </div>

      {/* Expand toggle */}
      <button
        onClick={() => setExpanded((v) => !v)}
        className="w-full flex items-center justify-center gap-1.5 py-2.5 border-t border-white/[0.05] text-gray-500 text-xs hover:text-gray-300 hover:bg-white/[0.02] transition-all"
      >
        {expanded ? (
          <>
            <ChevronUp className="w-3 h-3" />
            Show less
          </>
        ) : (
          <>
            <ChevronDown className="w-3 h-3" />
            Show full summary
          </>
        )}
      </button>
    </div>
  );
}

export default function SummariesTab() {
  const [filter, setFilter] = useState<FilterType>("all");

  const filters: { key: FilterType; label: string }[] = [
    { key: "all", label: "All Lectures" },
    { key: "important", label: "Important Topics" },
    { key: "review", label: "Needs Review" },
  ];

  const filtered = lectureSummaries.filter((l) => {
    if (filter === "important") return l.importance === "High";
    if (filter === "review") return l.importance === "Medium";
    return true;
  });

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-center justify-between mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <BookOpen className="w-4.5 h-4.5 text-purple-400 w-[18px] h-[18px]" />
            <h2 className="text-white font-bold text-lg">Lecture Summaries</h2>
          </div>
          <p className="text-gray-500 text-xs">
            AI-generated summaries for all uploaded lectures
          </p>
        </div>
        <div className="flex items-center gap-1.5 bg-purple-500/8 border border-purple-500/20 rounded-lg px-2.5 py-1.5">
          <Sparkles className="w-3 h-3 text-purple-400" />
          <span className="text-purple-300 text-xs font-medium">
            {lectureSummaries.length} Lectures
          </span>
        </div>
      </div>

      {/* Filter tabs */}
      <div className="flex gap-2 mb-5">
        {filters.map((f) => (
          <button
            key={f.key}
            onClick={() => setFilter(f.key)}
            className={`px-3.5 py-2 rounded-lg text-xs font-medium transition-all ${
              filter === f.key
                ? "bg-gradient-to-r from-purple-600/80 to-blue-600/70 text-white shadow-lg shadow-purple-900/20 border border-purple-500/30"
                : "btn-ghost"
            }`}
          >
            {f.label}
          </button>
        ))}
      </div>

      {/* Cards grid */}
      {filtered.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-16 text-gray-500">
          <BookOpen className="w-10 h-10 mb-3 opacity-30" />
          <p className="text-sm">No lectures match this filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-4">
          {filtered.map((lecture) => (
            <LectureCard key={lecture.id} lecture={lecture} />
          ))}
        </div>
      )}
    </div>
  );
}
