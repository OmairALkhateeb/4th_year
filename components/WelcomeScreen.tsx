"use client";

import { Brain, Sparkles, BookOpen, MessageSquare, FileCheck } from "lucide-react";

interface WelcomeScreenProps {
  onGetStarted: () => void;
}

export default function WelcomeScreen({ onGetStarted }: WelcomeScreenProps) {
  const features = [
    {
      icon: <BookOpen className="w-4 h-4" />,
      text: "AI-powered lecture summaries",
    },
    {
      icon: <FileCheck className="w-4 h-4" />,
      text: "Auto-generated quizzes & scoring",
    },
    {
      icon: <MessageSquare className="w-4 h-4" />,
      text: "Intelligent course Q&A assistant",
    },
    {
      icon: <Sparkles className="w-4 h-4" />,
      text: "Personalized study recommendations",
    },
  ];

  return (
    <div className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background glow orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-purple-700/10 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-600/8 blur-[100px] pointer-events-none" />

      {/* Main card */}
      <div className="relative z-10 w-full max-w-xl animate-[slideUp_0.6s_ease-out]">
        <div className="glass-card rounded-2xl p-8 md:p-12 text-center shadow-2xl shadow-purple-900/20">
          {/* Icon */}
          <div className="flex items-center justify-center mb-6">
            <div className="relative">
              <div className="absolute inset-0 rounded-2xl bg-purple-500/30 blur-xl" />
              <div className="relative bg-gradient-to-br from-purple-600 to-blue-500 p-4 rounded-2xl shadow-lg shadow-purple-500/30">
                <Brain className="w-10 h-10 text-white" />
              </div>
            </div>
          </div>

          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-purple-500/10 border border-purple-500/25 rounded-full px-4 py-1.5 mb-5 text-purple-300 text-xs font-medium tracking-wide uppercase">
            <Sparkles className="w-3 h-3" />
            AI-Powered Study System
          </div>

          {/* Title */}
          <h1 className="text-4xl md:text-5xl font-bold mb-3 leading-tight">
            <span className="gradient-text">Smart Study</span>
            <br />
            <span className="text-white">Assistant</span>
          </h1>

          {/* Subtitle */}
          <p className="text-gray-400 text-lg mb-2">
            Your intelligent study companion
          </p>
          <p className="text-gray-500 text-sm mb-8 leading-relaxed max-w-sm mx-auto">
            Upload your course lectures and let AI summarize content, generate
            quizzes, and answer your questions — all in one place.
          </p>

          {/* Features list */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 mb-8 text-left">
            {features.map((f, i) => (
              <div
                key={i}
                className="flex items-center gap-2.5 bg-white/[0.03] border border-white/[0.06] rounded-lg px-3.5 py-2.5"
              >
                <span className="text-purple-400 flex-shrink-0">{f.icon}</span>
                <span className="text-gray-300 text-sm">{f.text}</span>
              </div>
            ))}
          </div>

          {/* CTA Button */}
          <button
            onClick={onGetStarted}
            className="btn-primary w-full py-3.5 text-base font-semibold flex items-center justify-center gap-2"
          >
            <span>Get Started</span>
            <span className="text-lg leading-none">→</span>
          </button>

          {/* Prototype disclaimer */}
          <p className="text-gray-600 text-xs mt-5">
            ✦ University prototype — no real AI or backend
          </p>
        </div>

        {/* Decorative elements */}
        <div className="absolute -top-12 -right-12 w-32 h-32 rounded-full border border-purple-500/10 pointer-events-none" />
        <div className="absolute -bottom-8 -left-8 w-24 h-24 rounded-full border border-blue-500/10 pointer-events-none" />
      </div>
    </div>
  );
}
