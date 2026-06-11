"use client";

import { useState, useRef } from "react";
import {
  Upload,
  FileText,
  X,
  ChevronRight,
  Info,
  Plus,
  Brain,
} from "lucide-react";
import { defaultLectureFiles } from "@/lib/mockData";

interface UploadScreenProps {
  onContinue: (files: string[]) => void;
}

export default function UploadScreen({ onContinue }: UploadScreenProps) {
  const [uploadedFiles, setUploadedFiles] = useState<string[]>(defaultLectureFiles);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    const names = files.map((f) => f.name);
    setUploadedFiles((prev) => {
      const merged = [...prev];
      names.forEach((n) => {
        if (!merged.includes(n)) merged.push(n);
      });
      return merged;
    });
    e.target.value = "";
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    const names = files.map((f) => f.name);
    setUploadedFiles((prev) => {
      const merged = [...prev];
      names.forEach((n) => {
        if (!merged.includes(n)) merged.push(n);
      });
      return merged;
    });
  };

  const removeFile = (name: string) => {
    setUploadedFiles((prev) => prev.filter((f) => f !== name));
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative">
      {/* Background glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-purple-700/10 blur-[130px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-2xl animate-[slideUp_0.5s_ease-out]">
        {/* Header */}
        <div className="flex items-center gap-3 mb-8">
          <div className="bg-gradient-to-br from-purple-600 to-blue-500 p-2.5 rounded-xl shadow-lg shadow-purple-500/25">
            <Brain className="w-5 h-5 text-white" />
          </div>
          <span className="text-gray-300 font-semibold text-lg">
            Smart Study Assistant
          </span>
        </div>

        <div className="glass-card rounded-2xl p-8 shadow-2xl shadow-purple-900/15">
          {/* Title */}
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-2">
              Upload Your{" "}
              <span className="gradient-text">Course Lectures</span>
            </h2>
            <p className="text-gray-400 text-sm">
              Add your lecture files to get started with AI-powered summaries
              and quizzes.
            </p>
          </div>

          {/* Prototype info banner */}
          <div className="flex items-start gap-2.5 bg-blue-500/8 border border-blue-500/20 rounded-xl p-3.5 mb-5">
            <Info className="w-4 h-4 text-blue-400 flex-shrink-0 mt-0.5" />
            <p className="text-blue-300 text-xs leading-relaxed">
              <span className="font-semibold">Prototype Mode:</span> Files are
              displayed by name only — no content is read or processed. Mock
              data will be used for summaries and quizzes.
            </p>
          </div>

          {/* Drop zone */}
          <div
            className={`border-2 border-dashed rounded-xl p-8 text-center cursor-pointer transition-all duration-200 mb-5 ${
              isDragging
                ? "border-purple-400/60 bg-purple-500/10"
                : "border-purple-500/25 bg-white/[0.02] hover:border-purple-400/40 hover:bg-purple-500/5"
            }`}
            onDragOver={(e) => {
              e.preventDefault();
              setIsDragging(true);
            }}
            onDragLeave={() => setIsDragging(false)}
            onDrop={handleDrop}
            onClick={() => fileInputRef.current?.click()}
          >
            <div className="flex flex-col items-center gap-3">
              <div className="bg-purple-500/15 p-3 rounded-xl">
                <Upload className="w-6 h-6 text-purple-400" />
              </div>
              <div>
                <p className="text-gray-300 font-medium text-sm mb-1">
                  Drag & drop lecture files here
                </p>
                <p className="text-gray-500 text-xs">
                  or{" "}
                  <span className="text-purple-400 underline">
                    browse files
                  </span>{" "}
                  (PDF, PPT, DOCX, etc.)
                </p>
              </div>
            </div>
            <input
              ref={fileInputRef}
              type="file"
              className="hidden"
              multiple
              accept=".pdf,.ppt,.pptx,.doc,.docx,.txt"
              onChange={handleFileSelect}
            />
          </div>

          {/* File list */}
          {uploadedFiles.length > 0 && (
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2.5">
                <p className="text-gray-400 text-xs font-medium uppercase tracking-wider">
                  Lecture Files ({uploadedFiles.length})
                </p>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center gap-1 text-purple-400 text-xs hover:text-purple-300 transition-colors"
                >
                  <Plus className="w-3 h-3" />
                  Add more
                </button>
              </div>
              <div className="space-y-2 max-h-56 overflow-y-auto pr-1">
                {uploadedFiles.map((name, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-3 bg-white/[0.03] border border-white/[0.07] rounded-lg px-3.5 py-2.5 group"
                  >
                    <div className="bg-purple-500/15 p-1.5 rounded-md flex-shrink-0">
                      <FileText className="w-3.5 h-3.5 text-purple-400" />
                    </div>
                    <span className="text-gray-300 text-sm flex-1 truncate">
                      {name}
                    </span>
                    <span className="badge-completed flex-shrink-0">
                      Ready
                    </span>
                    <button
                      onClick={() => removeFile(name)}
                      className="text-gray-600 hover:text-red-400 transition-colors opacity-0 group-hover:opacity-100 ml-1"
                    >
                      <X className="w-3.5 h-3.5" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Continue button */}
          <button
            onClick={() => onContinue(uploadedFiles)}
            disabled={uploadedFiles.length === 0}
            className="btn-primary w-full py-3.5 flex items-center justify-center gap-2 text-sm font-semibold disabled:opacity-40 disabled:cursor-not-allowed disabled:transform-none disabled:shadow-none"
          >
            <span>Continue to Dashboard</span>
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
