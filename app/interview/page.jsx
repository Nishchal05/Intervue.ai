"use client"
import { useSearchParams } from 'next/navigation';
import React, { useEffect,useState } from 'react'

const page = () => {
  const searchParams = useSearchParams();
  const useremail = searchParams.get("useremail");
  const interviewId = searchParams.get("id");
  const [loading, setLoading] = useState(true);
  const [interview, setInterview] = useState(null);
  const [error, setError] = useState("");
  useEffect(() => {
    const fetchInterview = async () => {
      if (!useremail || !interviewId) {
        setError("Missing parameters.");
        setLoading(false);
        return;
      }
      try {
        const res = await fetch(`/api/interview?useremail=${useremail}&interviewId=${interviewId}`);
        const data = await res.json();
        if (!res.ok) {
          setError(data.error || "Something went wrong");
        } else {
          console.log(data)
          setInterview(data.interview);
        }
      } catch (err) {
        setError("Server error");
      } finally {
        setLoading(false);
      }
    };

    fetchInterview();
  }, [useremail, interviewId])
  if (loading) return <div className="p-10 text-center">Loading...</div>;
  if (error) return <div className="text-red-600 p-10 text-center">{error}</div>;
  return (
    <div className="max-w-2xl mx-auto p-6 mt-10 bg-white rounded shadow">
    <h1 className="text-2xl font-bold text-indigo-700 mb-4">
      Interview for {interview?.domain}
    </h1>
    {interview?.questions?.map((q, i) => (
      <div key={i} className="mb-3 p-4 bg-gray-100 rounded">
        Q{i + 1}: {q.question}
      </div>
    ))}
  </div>
  )
}

export default page