"use client";

import { useState } from "react";
import {
  CheckCircle,
  XCircle,
  Trophy,
  RefreshCw,
  Zap,
  BookMarked,
  Target,
  AlertTriangle,
  ChevronDown,
  ChevronUp,
  BarChart3,
  BookOpen,
  Star,
} from "lucide-react";
import { quizQuestions, QuizQuestion } from "@/lib/mockData";

type QuizState = "idle" | "active" | "finished";
type Answers = Record<number, string>;

// Group questions by lecture
const groupByLecture = (questions: QuizQuestion[]) => {
  const groups: Record<string, QuizQuestion[]> = {};
  questions.forEach((q) => {
    if (!groups[q.lectureRef]) groups[q.lectureRef] = [];
    groups[q.lectureRef].push(q);
  });
  return groups;
};

// ── Single Question Card ────────────────────────────────────────────────────

function QuestionCard({
  question,
  index,
  selected,
  onSelect,
  showResult,
}: {
  question: QuizQuestion;
  index: number;
  selected: string | undefined;
  onSelect: (key: string) => void;
  showResult: boolean;
}) {
  const isCorrect = selected === question.correctKey;

  return (
    <div
      className={`glass-card rounded-xl overflow-hidden transition-all duration-200 ${
        showResult && !isCorrect && selected
          ? "border-red-500/30"
          : showResult && isCorrect
            ? "border-emerald-500/30"
            : ""
      }`}
    >
      {/* Question */}
      <div className="flex items-start gap-3 p-4 pb-3">
        <span className="bg-gradient-to-br from-purple-600 to-blue-500 text-white text-[11px] font-bold w-6 h-6 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5">
          {index + 1}
        </span>
        <p className="text-white font-medium text-sm leading-snug flex-1">
          {question.question}
        </p>
        {showResult && (
          <span className="flex-shrink-0 ml-1">
            {isCorrect ? (
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            ) : (
              <XCircle className="w-4 h-4 text-red-400" />
            )}
          </span>
        )}
      </div>

      {/* Options */}
      <div className="px-4 pb-3 space-y-1.5">
        {question.options.map((opt) => {
          const isThisCorrect = opt.key === question.correctKey;
          const isThisSelected = selected === opt.key;

          let cls =
            "border-white/8 bg-white/[0.025] text-gray-400 hover:border-purple-500/30 hover:bg-purple-500/5 hover:text-gray-200";

          if (!showResult && isThisSelected) {
            cls = "border-purple-500/60 bg-purple-500/15 text-purple-200";
          } else if (showResult) {
            if (isThisCorrect) {
              cls = "border-emerald-500/50 bg-emerald-500/10 text-emerald-300";
            } else if (isThisSelected && !isThisCorrect) {
              cls = "border-red-500/50 bg-red-500/10 text-red-300";
            } else {
              cls = "border-white/5 bg-transparent text-gray-600";
            }
          }

          return (
            <button
              key={opt.key}
              onClick={() => !showResult && onSelect(opt.key)}
              disabled={showResult}
              className={`w-full flex items-center gap-2.5 rounded-lg px-3 py-2 text-xs border text-left transition-all duration-150 ${cls} ${
                !showResult ? "cursor-pointer" : "cursor-default"
              }`}
            >
              <span className="font-bold w-4 flex-shrink-0">{opt.key}.</span>
              <span className="flex-1">{opt.text}</span>
              {showResult && isThisCorrect && (
                <CheckCircle className="w-3.5 h-3.5 text-emerald-400 flex-shrink-0" />
              )}
              {showResult && isThisSelected && !isThisCorrect && (
                <XCircle className="w-3.5 h-3.5 text-red-400 flex-shrink-0" />
              )}
            </button>
          );
        })}
      </div>

      {/* Wrong answer hint */}
      {showResult && selected && !isCorrect && (
        <div className="mx-4 mb-3 flex items-start gap-2 bg-amber-500/8 border border-amber-500/20 rounded-lg px-3 py-2">
          <BookMarked className="w-3 h-3 text-amber-400 flex-shrink-0 mt-0.5" />
          <p className="text-amber-300 text-[11px]">
            <span className="font-semibold">Review: </span>
            {question.relatedTopic} · {question.lectureRef}
          </p>
        </div>
      )}
    </div>
  );
}

// ── Lecture Group Accordion ──────────────────────────────────────────────────

function LectureGroup({
  lectureRef,
  questions,
  answers,
  onSelect,
  showResult,
  defaultOpen = true,
}: {
  lectureRef: string;
  questions: QuizQuestion[];
  answers: Answers;
  onSelect: (id: number, key: string) => void;
  showResult: boolean;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);
  const answered = questions.filter((q) => answers[q.id] !== undefined).length;
  const correct = showResult
    ? questions.filter((q) => answers[q.id] === q.correctKey).length
    : 0;

  const lectureColors: Record<string, string> = {
    "Lecture 01": "from-violet-600 to-purple-500",
    "Lecture 02": "from-blue-600 to-cyan-500",
    "Lecture 03": "from-emerald-600 to-teal-500",
    "Lecture 04": "from-pink-600 to-rose-500",
  };
  const gradient = lectureColors[lectureRef] ?? "from-purple-600 to-blue-500";

  return (
    <div className="glass-card rounded-xl overflow-hidden mb-4">
      {/* Group header */}
      <button
        onClick={() => setOpen((v) => !v)}
        className="w-full flex items-center gap-3 px-5 py-3.5 hover:bg-white/[0.02] transition-colors"
      >
        <div className={`bg-gradient-to-br ${gradient} p-1.5 rounded-lg flex-shrink-0`}>
          <BookOpen className="w-3.5 h-3.5 text-white" />
        </div>
        <div className="flex-1 text-left">
          <p className="text-white font-semibold text-sm">{lectureRef}</p>
          <p className="text-gray-500 text-xs">
            {questions.length} questions
            {showResult
              ? ` · ${correct}/${questions.length} correct`
              : ` · ${answered}/${questions.length} answered`}
          </p>
        </div>

        {/* Progress pill */}
        {!showResult && (
          <div className="flex items-center gap-2 mr-2">
            <div className="w-20 h-1.5 bg-white/[0.06] rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${gradient} rounded-full transition-all`}
                style={{ width: `${(answered / questions.length) * 100}%` }}
              />
            </div>
            <span className="text-gray-500 text-[11px] w-6 text-right">
              {answered}/{questions.length}
            </span>
          </div>
        )}

        {showResult && (
          <div
            className={`flex items-center gap-1 px-2.5 py-1 rounded-lg text-xs font-semibold mr-2 ${
              correct === questions.length
                ? "bg-emerald-500/15 text-emerald-300 border border-emerald-500/25"
                : correct >= questions.length / 2
                  ? "bg-blue-500/15 text-blue-300 border border-blue-500/25"
                  : "bg-red-500/12 text-red-300 border border-red-500/20"
            }`}
          >
            {correct}/{questions.length}
          </div>
        )}

        {open ? (
          <ChevronUp className="w-4 h-4 text-gray-500 flex-shrink-0" />
        ) : (
          <ChevronDown className="w-4 h-4 text-gray-500 flex-shrink-0" />
        )}
      </button>

      {/* Questions */}
      {open && (
        <div className="px-4 pb-4 space-y-3 border-t border-white/[0.05] pt-3">
          {questions.map((q, i) => {
            const globalIndex = quizQuestions.findIndex((x) => x.id === q.id);
            return (
              <QuestionCard
                key={q.id}
                question={q}
                index={globalIndex}
                selected={answers[q.id]}
                onSelect={(key) => onSelect(q.id, key)}
                showResult={showResult}
              />
            );
          })}
        </div>
      )}
    </div>
  );
}

// ── Result Summary ───────────────────────────────────────────────────────────

function ResultSummary({
  answers,
  onRetry,
}: {
  answers: Answers;
  onRetry: () => void;
}) {
  const total = quizQuestions.length;
  const score = quizQuestions.filter((q) => answers[q.id] === q.correctKey).length;
  const pct = Math.round((score / total) * 100);

  const wrongQuestions = quizQuestions.filter(
    (q) => answers[q.id] !== q.correctKey,
  );

  // Aggregate weak topics grouped by lecture
  const weakByLecture: Record<string, string[]> = {};
  wrongQuestions.forEach((q) => {
    if (!weakByLecture[q.lectureRef]) weakByLecture[q.lectureRef] = [];
    if (!weakByLecture[q.lectureRef].includes(q.relatedTopic)) {
      weakByLecture[q.lectureRef].push(q.relatedTopic);
    }
  });

  const grade =
    pct >= 85
      ? { label: "Excellent!", color: "text-emerald-400", bg: "from-emerald-500/20 to-green-500/10", border: "border-emerald-500/25" }
      : pct >= 70
        ? { label: "Good Job!", color: "text-blue-400", bg: "from-blue-500/20 to-cyan-500/10", border: "border-blue-500/25" }
        : pct >= 50
          ? { label: "Keep Going!", color: "text-amber-400", bg: "from-amber-500/15 to-yellow-500/10", border: "border-amber-500/20" }
          : { label: "Needs Work!", color: "text-red-400", bg: "from-red-500/15 to-rose-500/10", border: "border-red-500/20" };

  // Per-lecture stats
  const lectureGroups = groupByLecture(quizQuestions);
  const lectureStats = Object.entries(lectureGroups).map(([ref, qs]) => {
    const c = qs.filter((q) => answers[q.id] === q.correctKey).length;
    return { ref, correct: c, total: qs.length, pct: Math.round((c / qs.length) * 100) };
  });

  return (
    <div className="space-y-4 animate-[slideUp_0.4s_ease-out]">
      {/* Main score card */}
      <div className={`glass-card rounded-2xl p-6 bg-gradient-to-br ${grade.bg} border ${grade.border}`}>
        <div className="flex items-center gap-5">
          {/* Trophy */}
          <div className="flex-shrink-0">
            <div className="bg-yellow-500/15 border border-yellow-500/25 p-4 rounded-2xl">
              <Trophy className="w-8 h-8 text-yellow-400" />
            </div>
          </div>

          {/* Score */}
          <div className="flex-1">
            <p className={`text-2xl font-black mb-0.5 ${grade.color}`}>
              {grade.label}
            </p>
            <div className="flex items-baseline gap-1.5 mb-2">
              <span className="text-4xl font-black text-white">{score}</span>
              <span className="text-gray-400 text-xl">/ {total}</span>
              <span className="text-gray-400 text-sm ml-1">correct</span>
            </div>
            {/* Bar */}
            <div className="h-2 bg-black/30 rounded-full overflow-hidden w-full max-w-xs">
              <div
                className="h-full rounded-full transition-all duration-1000"
                style={{
                  width: `${pct}%`,
                  background:
                    pct >= 85
                      ? "linear-gradient(90deg,#10b981,#34d399)"
                      : pct >= 70
                        ? "linear-gradient(90deg,#3b82f6,#60a5fa)"
                        : pct >= 50
                          ? "linear-gradient(90deg,#f59e0b,#fbbf24)"
                          : "linear-gradient(90deg,#ef4444,#f87171)",
                }}
              />
            </div>
            <p className="text-gray-400 text-xs mt-1">{pct}% score</p>
          </div>

          {/* Big % */}
          <div className="flex-shrink-0 text-right hidden sm:block">
            <p className={`text-5xl font-black ${grade.color}`}>{pct}%</p>
          </div>
        </div>
      </div>

      {/* Per-lecture breakdown */}
      <div className="glass-card rounded-xl p-4">
        <div className="flex items-center gap-2 mb-3">
          <BarChart3 className="w-4 h-4 text-purple-400" />
          <h4 className="text-white font-semibold text-sm">Performance by Lecture</h4>
        </div>
        <div className="space-y-2.5">
          {lectureStats.map(({ ref, correct: c, total: t, pct: p }) => (
            <div key={ref} className="flex items-center gap-3">
              <span className="text-gray-400 text-xs w-24 flex-shrink-0">{ref}</span>
              <div className="flex-1 h-2 bg-white/[0.05] rounded-full overflow-hidden">
                <div
                  className="h-full rounded-full transition-all duration-700"
                  style={{
                    width: `${p}%`,
                    background:
                      p >= 80
                        ? "linear-gradient(90deg,#10b981,#34d399)"
                        : p >= 60
                          ? "linear-gradient(90deg,#3b82f6,#60a5fa)"
                          : "linear-gradient(90deg,#f59e0b,#fbbf24)",
                  }}
                />
              </div>
              <span
                className={`text-xs font-semibold w-12 text-right flex-shrink-0 ${
                  p >= 80 ? "text-emerald-400" : p >= 60 ? "text-blue-400" : "text-amber-400"
                }`}
              >
                {c}/{t}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Topics to review */}
      {Object.keys(weakByLecture).length > 0 && (
        <div className="glass-card rounded-xl p-4">
          <div className="flex items-center gap-2 mb-1">
            <AlertTriangle className="w-4 h-4 text-amber-400" />
            <h4 className="text-white font-semibold text-sm">Topics to Study Better</h4>
          </div>
          <p className="text-gray-500 text-xs mb-3">
            You answered {wrongQuestions.length} question{wrongQuestions.length !== 1 ? "s" : ""} incorrectly. Focus on these topics:
          </p>
          <div className="space-y-3">
            {Object.entries(weakByLecture).map(([ref, topics]) => (
              <div key={ref}>
                <p className="text-purple-400 text-[11px] font-semibold uppercase tracking-wider mb-1.5">
                  {ref}
                </p>
                <div className="space-y-1.5">
                  {topics.map((topic) => (
                    <div
                      key={topic}
                      className="flex items-center gap-2.5 bg-amber-500/6 border border-amber-500/15 rounded-lg px-3 py-2"
                    >
                      <Target className="w-3 h-3 text-amber-400 flex-shrink-0" />
                      <span className="text-amber-200 text-xs">{topic}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* All correct message */}
      {wrongQuestions.length === 0 && (
        <div className="glass-card rounded-xl p-4 border-emerald-500/25 bg-emerald-500/5">
          <div className="flex items-center gap-2">
            <Star className="w-4 h-4 text-yellow-400" />
            <p className="text-emerald-300 text-sm font-semibold">
              Perfect score! You have mastered all topics in this course.
            </p>
          </div>
        </div>
      )}

      {/* Retry */}
      <button
        onClick={onRetry}
        className="btn-ghost w-full flex items-center justify-center gap-2 py-3 text-sm font-medium"
      >
        <RefreshCw className="w-4 h-4" />
        Retake Quiz
      </button>
    </div>
  );
}

// ── Main QuizTab ─────────────────────────────────────────────────────────────

export default function QuizTab() {
  const [quizState, setQuizState] = useState<QuizState>("idle");
  const [answers, setAnswers] = useState<Answers>({});

  const lectureGroups = groupByLecture(quizQuestions);
  const totalQuestions = quizQuestions.length;
  const answeredCount = Object.keys(answers).length;
  const allAnswered = answeredCount === totalQuestions;

  const handleSelect = (id: number, key: string) => {
    setAnswers((prev) => ({ ...prev, [id]: key }));
  };

  const handleStart = () => {
    setAnswers({});
    setQuizState("active");
  };

  const handleFinish = () => {
    setQuizState("finished");
  };

  const handleRetry = () => {
    setAnswers({});
    setQuizState("active");
    // Scroll to top
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="h-full overflow-y-auto">
      {/* Header */}
      <div className="flex items-start justify-between gap-4 mb-5">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Zap className="w-[18px] h-[18px] text-purple-400" />
            <h2 className="text-white font-bold text-lg">Course Quiz</h2>
          </div>
          <p className="text-gray-500 text-xs">
            {quizState === "idle" &&
              `${totalQuestions} questions across all 4 lectures`}
            {quizState === "active" &&
              `${answeredCount} / ${totalQuestions} answered`}
            {quizState === "finished" && "Quiz completed — review your results"}
          </p>
        </div>

        {quizState === "active" && (
          <div className="flex items-center gap-3 flex-shrink-0">
            {/* Overall progress ring */}
            <div className="relative w-11 h-11">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="14" fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="3.5" />
                <circle
                  cx="18" cy="18" r="14"
                  fill="none"
                  stroke="url(#qpg)"
                  strokeWidth="3.5"
                  strokeLinecap="round"
                  strokeDasharray={`${(answeredCount / totalQuestions) * 88} 88`}
                />
                <defs>
                  <linearGradient id="qpg" x1="0%" y1="0%" x2="100%" y2="0%">
                    <stop offset="0%" stopColor="#7c3aed" />
                    <stop offset="100%" stopColor="#3b82f6" />
                  </linearGradient>
                </defs>
              </svg>
              <span className="absolute inset-0 flex items-center justify-center text-white text-[10px] font-bold">
                {Math.round((answeredCount / totalQuestions) * 100)}%
              </span>
            </div>

            <button
              onClick={handleFinish}
              disabled={!allAnswered}
              className="btn-primary px-4 py-2.5 text-xs font-semibold flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <CheckCircle className="w-3.5 h-3.5" />
              Submit Quiz
            </button>
          </div>
        )}
      </div>

      {/* ── IDLE ── */}
      {quizState === "idle" && (
        <div className="flex flex-col items-center justify-center py-14 text-center animate-[fadeIn_0.4s_ease-out]">
          <div className="relative mb-6">
            <div className="absolute inset-0 bg-purple-500/20 rounded-full blur-3xl" />
            <div className="relative bg-gradient-to-br from-purple-600/25 to-blue-600/15 border border-purple-500/25 p-8 rounded-2xl">
              <Zap className="w-12 h-12 text-purple-400 mx-auto" />
            </div>
          </div>
          <h3 className="text-white font-bold text-xl mb-2">Ready to Test Your Knowledge?</h3>
          <p className="text-gray-400 text-sm mb-6 max-w-sm">
            Answer {totalQuestions} multiple-choice questions covering all 4 lectures. Get instant scoring and personalized study recommendations.
          </p>

          {/* Stats row */}
          <div className="flex items-center gap-4 mb-8">
            {[
              { label: "Questions", value: totalQuestions },
              { label: "Lectures", value: 4 },
              { label: "Topics", value: "20+" },
            ].map(({ label, value }) => (
              <div
                key={label}
                className="glass-card rounded-xl px-4 py-3 text-center"
              >
                <p className="text-white font-bold text-xl">{value}</p>
                <p className="text-gray-500 text-xs">{label}</p>
              </div>
            ))}
          </div>

          <button
            onClick={handleStart}
            className="btn-primary px-10 py-3.5 text-sm font-semibold flex items-center gap-2 mx-auto"
          >
            <Zap className="w-4 h-4" />
            Start Quiz
          </button>
        </div>
      )}

      {/* ── ACTIVE ── */}
      {quizState === "active" && (
        <div className="animate-[fadeIn_0.3s_ease-out]">
          {/* Unanswered reminder */}
          {answeredCount > 0 && !allAnswered && (
            <div className="flex items-center gap-2 bg-blue-500/8 border border-blue-500/20 rounded-xl px-4 py-2.5 mb-4 text-blue-300 text-xs">
              <Zap className="w-3.5 h-3.5 flex-shrink-0" />
              {totalQuestions - answeredCount} question{totalQuestions - answeredCount !== 1 ? "s" : ""} remaining — answer all to submit.
            </div>
          )}

          {/* Lecture groups */}
          {Object.entries(lectureGroups).map(([ref, qs], i) => (
            <LectureGroup
              key={ref}
              lectureRef={ref}
              questions={qs}
              answers={answers}
              onSelect={handleSelect}
              showResult={false}
              defaultOpen={i === 0}
            />
          ))}

          {/* Bottom submit */}
          <div className="mt-2 flex items-center gap-3">
            <button
              onClick={handleFinish}
              disabled={!allAnswered}
              className="btn-primary flex-1 py-3.5 text-sm font-semibold flex items-center justify-center gap-2 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              <CheckCircle className="w-4 h-4" />
              Submit & See Results
            </button>
            {!allAnswered && (
              <span className="text-gray-500 text-xs whitespace-nowrap">
                {totalQuestions - answeredCount} left
              </span>
            )}
          </div>
        </div>
      )}

      {/* ── FINISHED ── */}
      {quizState === "finished" && (
        <div className="animate-[fadeIn_0.3s_ease-out]">
          {/* Result summary at top */}
          <ResultSummary answers={answers} onRetry={handleRetry} />

          {/* Divider */}
          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-white/[0.06]" />
            <span className="text-gray-500 text-xs">Detailed Review</span>
            <div className="flex-1 h-px bg-white/[0.06]" />
          </div>

          {/* All questions with answers revealed */}
          {Object.entries(lectureGroups).map(([ref, qs]) => (
            <LectureGroup
              key={ref}
              lectureRef={ref}
              questions={qs}
              answers={answers}
              onSelect={() => {}}
              showResult={true}
              defaultOpen={false}
            />
          ))}
        </div>
      )}
    </div>
  );
}
