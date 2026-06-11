"use client";

import { useState } from "react";
import { Brain, BookOpen, Zap, Files, LogOut, Menu, X } from "lucide-react";
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

  return (
    <div style={{ minHeight: "100vh", display: "flex", flexDirection: "column" }}>

      {/* ── HEADER (sticky, two rows) ── */}
      <header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 40,
          background: "rgba(6,4,15,0.92)",
          backdropFilter: "blur(16px)",
          borderBottom: "1px solid rgba(139,92,246,0.18)",
          flexShrink: 0,
        }}
      >
        {/* Row 1: logo + stats + actions */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            padding: "0 24px",
            height: "52px",
            borderBottom: "1px solid rgba(255,255,255,0.05)",
          }}
        >
          {/* Logo */}
          <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
            <div
              style={{
                background: "linear-gradient(135deg,#7c3aed,#3b82f6)",
                padding: "7px",
                borderRadius: "10px",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <Brain style={{ width: 16, height: 16, color: "white" }} />
            </div>
            <span style={{ color: "white", fontWeight: 700, fontSize: 14 }}>
              Smart Study Assistant
            </span>
          </div>

          {/* Center stat */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: 6,
              background: "rgba(255,255,255,0.04)",
              border: "1px solid rgba(255,255,255,0.08)",
              borderRadius: 8,
              padding: "5px 12px",
            }}
          >
            <Files style={{ width: 13, height: 13, color: "#a78bfa" }} />
            <span style={{ color: "#9ca3af", fontSize: 12 }}>
              {lectureFiles.length} lectures loaded
            </span>
          </div>

          {/* Actions */}
          <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
            <button
              onClick={() => setChatOpen((v) => !v)}
              className="lg:hidden"
              style={{
                background: "rgba(139,92,246,0.12)",
                border: "1px solid rgba(139,92,246,0.25)",
                color: "#c4b5fd",
                borderRadius: 8,
                padding: "6px 12px",
                fontSize: 12,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              {chatOpen ? <X style={{ width: 13, height: 13 }} /> : <Menu style={{ width: 13, height: 13 }} />}
              Assistant
            </button>
            <button
              onClick={onBack}
              style={{
                background: "rgba(139,92,246,0.12)",
                border: "1px solid rgba(139,92,246,0.25)",
                color: "#c4b5fd",
                borderRadius: 8,
                padding: "6px 14px",
                fontSize: 12,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                gap: 6,
              }}
            >
              <LogOut style={{ width: 13, height: 13 }} />
              Upload New
            </button>
          </div>
        </div>

        {/* Row 2: TAB NAVIGATION — always visible */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            padding: "0 24px",
            gap: 4,
            height: "48px",
          }}
        >
          {(
            [
              { key: "summaries" as TabType, label: "Lecture Summaries", icon: <BookOpen style={{ width: 15, height: 15 }} /> },
              { key: "quiz" as TabType, label: "Quiz  (20 Questions)", icon: <Zap style={{ width: 15, height: 15 }} /> },
            ] as { key: TabType; label: string; icon: React.ReactNode }[]
          ).map((tab) => {
            const active = activeTab === tab.key;
            return (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key)}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 7,
                  padding: "0 20px",
                  height: "100%",
                  fontSize: 13,
                  fontWeight: active ? 700 : 500,
                  color: active ? "#c4b5fd" : "#6b7280",
                  background: active ? "rgba(139,92,246,0.12)" : "transparent",
                  border: "none",
                  borderBottom: active ? "3px solid #a78bfa" : "3px solid transparent",
                  borderRadius: "8px 8px 0 0",
                  cursor: "pointer",
                  transition: "all 0.18s ease",
                  whiteSpace: "nowrap",
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLButtonElement).style.color = "#d1d5db";
                    (e.currentTarget as HTMLButtonElement).style.background = "rgba(255,255,255,0.03)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    (e.currentTarget as HTMLButtonElement).style.color = "#6b7280";
                    (e.currentTarget as HTMLButtonElement).style.background = "transparent";
                  }
                }}
              >
                <span style={{ color: active ? "#a78bfa" : "#6b7280" }}>{tab.icon}</span>
                {tab.label}
              </button>
            );
          })}
        </div>
      </header>

      {/* ── BODY ── */}
      <div style={{ flex: 1, display: "flex", overflow: "hidden", position: "relative" }}>

        {/* Left: Chat panel */}
        <aside
          style={{
            width: 290,
            flexShrink: 0,
            borderRight: "1px solid rgba(139,92,246,0.15)",
            background: "rgba(15,10,40,0.55)",
            backdropFilter: "blur(16px)",
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
          }}
          className="hidden lg:flex"
        >
          <ChatAssistant lectureFiles={lectureFiles} />
        </aside>

        {/* Mobile chat overlay */}
        {chatOpen && (
          <>
            <div
              onClick={() => setChatOpen(false)}
              style={{
                position: "fixed",
                inset: 0,
                background: "rgba(0,0,0,0.55)",
                zIndex: 20,
              }}
            />
            <aside
              style={{
                position: "fixed",
                left: 0,
                top: 100,
                bottom: 0,
                width: 290,
                zIndex: 30,
                borderRight: "1px solid rgba(139,92,246,0.2)",
                background: "rgba(10,6,30,0.97)",
                backdropFilter: "blur(20px)",
                display: "flex",
                flexDirection: "column",
              }}
            >
              <ChatAssistant lectureFiles={lectureFiles} />
            </aside>
          </>
        )}

        {/* Right: Tab content */}
        <main
          style={{
            flex: 1,
            overflowY: "auto",
            padding: "24px",
            minWidth: 0,
          }}
        >
          {activeTab === "summaries" ? <SummariesTab /> : <QuizTab />}
        </main>
      </div>
    </div>
  );
}
