"use client";

import React, { useState } from "react";
import Sidebar from "../_component/Sidebar";
import { Progress } from "@/components/ui/progress";

const Page = () => {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    jobPosition: "",
    description: "",
    duration: "",
    interviewType: "",
  });

  const nextStep = () => setStep((prev) => Math.min(prev + 1, 2));
  const prevStep = () => setStep((prev) => Math.max(prev - 1, 1));

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />

      <main className="md:ml-64 mt-15 w-full p-6 flex justify-center items-start">
        <div className="w-full max-w-2xl mt-10 bg-white p-8 rounded-xl shadow-md">
          <h2 className="text-3xl font-bold text-indigo-700 mb-6">
            Create New Interview
          </h2>

          <Progress value={step === 1 ? 50 : 100} className="mb-6" />

          {/* Step 1 */}
          {step === 1 && (
            <div className="space-y-5">
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Job Position
                </label>
                <input
                  name="jobPosition"
                  value={formData.jobPosition}
                  onChange={handleChange}
                  placeholder="e.g. Frontend Developer"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Job responsibilities, role requirements..."
                  rows={4}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Duration (in minutes)
                </label>
                <input
                  type="number"
                  name="duration"
                  value={formData.duration}
                  onChange={handleChange}
                  placeholder="e.g. 30"
                  className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                />
              </div>

              <div className="flex justify-end">
                <button
                  onClick={nextStep}
                  disabled={
                    !formData.jobPosition ||
                    !formData.description ||
                    !formData.duration
                  }
                  className={`px-6 py-2 rounded-md transition text-white ${
                    !formData.jobPosition ||
                    !formData.description ||
                    !formData.duration
                      ? "bg-indigo-300 cursor-not-allowed"
                      : "bg-indigo-600 hover:bg-indigo-700"
                  }`}
                >
                  Next →
                </button>
              </div>
            </div>
          )}

          {/* Step 2 */}
          {step === 2 && (
            <div className="space-y-5">
              <div>
                <label className="block font-medium text-gray-700 mb-1">
                  Interview Type
                </label>
                <select
                  name="interviewType"
                  value={formData.interviewType}
                  onChange={handleChange}
                  className="w-full border border-gray-300 px-4 py-2 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500"
                >
                  <option value="">Select a type</option>
                  <option value="Experience">📞 Phone Screening</option>
                  <option value="Technical Round">💻 Technical Round</option>
                  <option value="HR Round">🧑‍💼 HR Round</option>
                  <option value="Behavioral">🧠 Behavioral Round</option>
                  <option value="Problem Solving">🧩 Problem Solving</option>
                  <option value="System Design Round">📐 System Design</option>
                  <option value="Coding Challenge">⌨️ Coding Challenge</option>
                </select>
              </div>

              <div className="flex justify-between">
                <button
                  onClick={prevStep}
                  className="border border-indigo-500 text-indigo-600 px-6 py-2 rounded-md hover:bg-indigo-50 transition"
                >
                  ← Back
                </button>
                <button
                  onClick={() => alert("Interview Created!")}
                  disabled={!formData.interviewType}
                  className={` text-white px-6 py-2 rounded-md hover:bg-indigo-700 transition ${ !formData.interviewType ? "bg-blue-100":"bg-indigo-600"}`}
                >
                  Create Interview Link
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Page;
