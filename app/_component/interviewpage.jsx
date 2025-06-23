"use client";

import { useEffect, useState } from "react";
import { useSearchParams } from "next/navigation";
import CallOutlinedIcon from "@mui/icons-material/CallOutlined";

export default function InterviewRoom() {
  const [started, setStarted] = useState(false);
  const [seconds, setSeconds] = useState(0);
  const params = useSearchParams();
  const interviewId = params.get("id");
  const email = params.get("mail");
  const startInterview = async() => {
    setStarted(true);
  };

  useEffect(() => {
    if (!started) return;
    const interval = setInterval(() => setSeconds((s) => s + 1), 1000);
    return () => clearInterval(interval);
  }, [started]);
  const [interviewDetails, setInterviewDetails] = useState(null);

  const interviewData = async () => {
    try {
      const response = await fetch(`
        /api/interviewdata?mail=${email}&interviewid=${interviewId}`
      );
      const result = await response.json();
      if (result?.interviewdetails) {
        setInterviewDetails(result.interviewdetails);
      } else {
        console.warn("No interview data found");
      }
    } catch (error) {
      console.error("Error fetching interview data:", error);
    }
  };

  useEffect(() => {
    if (interviewId && email) {
      interviewData();
    }
  }, [interviewId, email]);

  const formatTime = (s) => {
    const mins = String(Math.floor(s / 60)).padStart(2, "0");
    const secs = String(s % 60).padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="min-h-screen bg-blue-50 text-blue-900 font-sans flex flex-col items-center justify-center px-4 py-10">
      {!started ? (
        <div className="bg-cyan-950 animate-pulse shadow-xl flex flex-col items-center rounded-xl w-full max-w-3xl p-10 text-center space-y-6 animate-fade-in text-white border border-blue-500">
          <div className="text-3xl font-bold flex flex-col items-center gap-3">
            <img src="/IntervueLogo.png" alt="logo" className="h-60" />
            SynvueAI is Ready. Are You??
          </div>
          <p className="text-lg text-gray-300 flex flex-col items-center justify-center">
            <span>
              Domain:{" "}
              <strong className="text-white">
                {interviewDetails?.domain || "Full Stack Web Development"}
              </strong>
            </span>
            <span>
              Duration:{" "}
              <strong className="text-white">
                {interviewDetails?.duration || "10 minutes"}
              </strong>
            </span>
          </p>
          <button
            onClick={startInterview}
            className="bg-blue-600 hover:bg-blue-700 text-white font-semibold px-6 py-3 rounded-md transition"
          >
            Start Interview
          </button>
        </div>
      ) : (
        <div className="w-full flex flex-col gap-6">
          {/* Header */}
          <div className="flex items-center justify-evenly mt-[50px] text-gray-700 mb-2">
            <h1 className="text-3xl text-blue-500  font-semibold">SynvueAI</h1>
            <span className="text-sm font-medium">⏱ {formatTime(seconds)}</span>
          </div>

          {/* Main Video Grid */}
          <div className="flex flex-col md:flex-row items-center justify-center gap-6">
            {/* AI Recruiter Box */}
            <div className="bg-cyan-950 rounded-xl shadow-md w-full max-w-sm aspect-square flex flex-col items-center justify-center">
              <div className="w-24 h-24 rounded-full border-4 border-blue-200 flex items-center justify-center overflow-hidden">
                <img
                  src="/intervueLogo.png"
                  alt="AI"
                  className="object-cover w-full h-full"
                />
              </div>
              <div className="mt-2 text-sm font-medium text-gray-700">
                SynvueAI
              </div>
            </div>

            {/* User Box */}
            <div className="bg-cyan-950 rounded-xl shadow-md w-full max-w-sm aspect-square flex flex-col items-center justify-center">
              <div className="w-24 h-24 rounded-full bg-blue-600 text-white text-2xl font-bold flex items-center justify-center">
                T
              </div>
              <div className="mt-2 text-sm font-medium text-gray-700">
                Tubeguruji
              </div>
            </div>
          </div>

          {/* Footer Buttons */}
          <div className="flex items-center justify-center space-x-4 mt-6">
            <button className="w-12 h-12 rounded-full bg-red-600 text-white flex items-center justify-center hover:bg-red-500">
              <CallOutlinedIcon />
            </button>
          </div>

          {/* Footer Note */}
          <div className="text-center text-sm text-gray-500 mt-4">
            Interview in Progress...
          </div>
        </div>
      )}
    </div>
  );
}