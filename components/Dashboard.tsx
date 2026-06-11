"use client";

import { useState } from "react";
import {
  Brain,
  BookOpen,
  Zap,
  Files,
  LogOut,
  Menu,
  X,
} from "lucide-react";
import ChatAssistant from "./ChatAssistant";
import SummariesTab from "./SummariesTab";
import QuizTab from "./QuizTab";

type TabType = "summaries" | "quiz";

interface DashboardProps {
  lectureFiles: string[];
  onBack: () => void;
}

export default function Dashboard({ lectureFiles, onBack }: DashboardProps) {
  const [activeTab, setActiveTab] = useState<TabType>("summaries");
  const [chatOpen, setChatOpen] = useState(false);

  const tabs: { key: TabType; label: string; icon: React.ReactNode }[] = [
    { key: "summaries", label: "Summaries", icon: <BookOpen className="w-4 h-4" /> },
    { key: "quiz", label: "Quiz", icon: <Zap className="w-4 h-4" /> },
  ];

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top Navigation Bar */}
      <header className="flex-shrink-0 border-b border-white/[0.06] bg-black/20 backdrop-blur-sm sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 md:px-6 h-14">
          {/* Logo */}
          <div className="flex items-center gap-2.5">
            <div className="bg-gradient-to-br from-purple-600 to-blue-500 p-1.5 rounded-lg shadow-lg shadow-purple-500/25">
              <Brain className="w-4 h-4 text-white" />
            </div>
            <span className="text-white font-bold text-sm hidden sm:block">
              Smart Study Assistant
            </span>
            <span className="text-white font-bold text-sm sm:hidden">SSA</span>
          </div>

          {/* Center: lecture count */}
          <div className="hidden md:flex items-center gap-2 bg-white/[0.04] border border-white/[0.07] rounded-lg px-3 py-1.5">
            <Files className="w-3.5 h-3.5 text-purple-400" />
            <span className="text-gray-400 text-xs">
              {lectureFiles.length} lecture{lectureFiles.length !== 1 ? "s" : ""} loaded
            </span>
          </div>

          {/* Right actions */}
          <div className="flex items-center gap-2">
            {/* Mobile: chat toggle */}
            <button
              onClick={() => setChatOpen((v) => !v)}
              className="lg:hidden btn-ghost px-2.5 py-2 text-xs flex items-center gap-1.5"
            >
              {chatOpen ? <X className="w-3.5 h-3.5" /> : <Menu className="w-3.5 h-3.5" />}
              <span className="hidden sm:inline">Assistant</span>
            </button>

            <button
              onClick={onBack}
              className="btn-ghost flex items-center gap-1.5 px-3 py-2 text-xs"
            >
              <LogOut className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Upload New</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main layout */}
      <div className="flex-1 flex overflow-hidden">
        {/* ── Left panel: Chat ── */}
        <aside
          className={`
            flex-shrink-0 border-r border-white/[0.06]
            transition-all duration-300 overflow-hidden
            /* Mobile: slide-in overlay */
            lg:relative lg:translate-x-0 lg:w-[280px] xl:w-[300px]
            ${chatOpen
              ? "fixed inset-y-14 left-0 z-20 w-[280px] translate-x-0"
              : "fixed -translate-x-full lg:translate-x-0"
            }
            glass-card rounded-none
          `}
          style={{ top: "56px", bottom: 0 }}
        >
          <ChatAssistant lectureFiles={lectureFiles} />
        </aside>

        {/* Mobile overlay backdrop */}
        {chatOpen && (
          <div
            className="lg:hidden fixed inset-0 bg-black/50 z-10 top-14"
            onClick={() => setChatOpen(false)}
          />
        )}

        {/* ── Right panel: Tabs ── */}
        <main className="flex-1 flex flex-col min-w-0 overflow-hidden">
          {/* Tab bar */}
          <div className="flex-shrink-0 px-4 md:px-6 pt-4 pb-0">
            <div className="flex gap-0 border-b-2 border-purple-900/40">
              {tabs.map((tab) => (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2 px-6 py-3 text-sm font-bold border-b-2 -mb-[2px] transition-all duration-200 ${
                    activeTab === tab.key
                      ? "border-purple-400 text-purple-300 bg-purple-500/10"
                      : "border-transparent text-gray-500 hover:text-gray-200 hover:border-gray-600 hover:bg-white/[0.03]"
                  }`}
                >
                  {tab.icon}
                  {tab.label}
                  {tab.key === "quiz" && (
                    <span className="ml-1 bg-purple-500/25 text-purple-300 text-[10px] font-bold px-1.5 py-0.5 rounded-md border border-purple-500/30">
                      20 Q
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Tab content */}
          <div className="flex-1 overflow-y-auto p-4 md:p-6">
            {activeTab === "summaries" ? <SummariesTab /> : <QuizTab />}
          </div>
        </main>
      </div>
    </div>
  );
}
