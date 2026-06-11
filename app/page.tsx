"use client";

import { useState } from "react";
import WelcomeScreen from "@/components/WelcomeScreen";
import UploadScreen from "@/components/UploadScreen";
import Dashboard from "@/components/Dashboard";

type AppScreen = "welcome" | "upload" | "dashboard";

export default function Home() {
  const [screen, setScreen] = useState<AppScreen>("welcome");
  const [lectureFiles, setLectureFiles] = useState<string[]>([]);

  return (
    <main className="relative z-10">
      {screen === "welcome" && (
        <WelcomeScreen onGetStarted={() => setScreen("upload")} />
      )}

      {screen === "upload" && (
        <UploadScreen
          onContinue={(files) => {
            setLectureFiles(files);
            setScreen("dashboard");
          }}
        />
      )}

      {screen === "dashboard" && (
        <Dashboard
          lectureFiles={lectureFiles}
          onBack={() => setScreen("upload")}
        />
      )}
    </main>
  );
}
