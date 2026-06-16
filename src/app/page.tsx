"use client";

import { useMemo, useState } from "react";

const stopWords = new Set([
  "with", "that", "this", "from", "your", "will", "have", "has", "are", "the",
  "and", "for", "you", "our", "job", "role", "work", "team", "using", "able",
  "must", "should", "candidate", "experience", "skills"
]);

export default function Home() {
  const [resumeText, setResumeText] = useState("");
  const [jobText, setJobText] = useState("");

  const result = useMemo(() => {
    const getWords = (text: string) =>
      text
        .toLowerCase()
        .replace(/[^a-z0-9\s.+#-]/g, " ")
        .split(/\s+/)
        .filter((word) => word.length > 2 && !stopWords.has(word));

    const resumeWords = getWords(resumeText);
    const jobWords = getWords(jobText);

    const uniqueJobWords = Array.from(new Set(jobWords));
    const uniqueResumeWords = new Set(resumeWords);

    const matched = uniqueJobWords.filter((word) => uniqueResumeWords.has(word));
    const missing = uniqueJobWords.filter((word) => !uniqueResumeWords.has(word));

    const score =
      uniqueJobWords.length === 0
        ? 0
        : Math.round((matched.length / uniqueJobWords.length) * 100);

    return {
      resumeWordCount: resumeText.trim() ? resumeText.trim().split(/\s+/).length : 0,
      jdWordCount: jobText.trim() ? jobText.trim().split(/\s+/).length : 0,
      matched,
      missing,
      score,
    };
  }, [resumeText, jobText]);

  const getScoreMessage = () => {
    if (result.score >= 80) return "Excellent match. Your resume is strongly aligned.";
    if (result.score >= 60) return "Good match. Add a few missing keywords.";
    if (result.score >= 40) return "Average match. Improve role-specific keywords.";
    return "Low match. Customize your resume for this job description.";
  };

  const clearAll = () => {
    setResumeText("");
    setJobText("");
  };

  return (
    <main className="min-h-screen bg-[#070A12] text-white overflow-hidden">
      <section className="relative min-h-screen px-5 py-8">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_left,#2563eb55,transparent_35%),radial-gradient(circle_at_bottom_right,#facc1550,transparent_35%)]" />
        <div className="relative z-10 mx-auto max-w-7xl">
          <nav className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div>
              <h1 className="text-2xl font-black tracking-tight md:text-3xl">
                Resume ATS Checker
              </h1>
              <p className="text-sm text-gray-300">
                Built by Prajwal Khedkar · prajwalkhedkar23@gmail.com
              </p>
            </div>

            <a
              href="https://digitalheroesco.com"
              target="_blank"
              rel="noreferrer"
              className="rounded-full bg-yellow-400 px-6 py-3 text-center font-bold text-black shadow-lg shadow-yellow-400/20 transition hover:scale-105 hover:bg-yellow-300"
            >
              Built for Digital Heroes
            </a>
          </nav>

          <div className="mt-12 grid items-center gap-8 lg:grid-cols-2">
            <div>
              <p className="mb-4 inline-block rounded-full border border-white/15 bg-white/10 px-4 py-2 text-sm text-yellow-200">
                Free online tool for job seekers
              </p>

              <h2 className="text-4xl font-black leading-tight md:text-6xl">
                Match your resume with any job description instantly.
              </h2>

              <p className="mt-5 max-w-xl text-lg text-gray-300">
                Paste your resume and job description. This tool calculates ATS score,
                shows matching keywords, missing keywords, word count, and practical
                improvement suggestions.
              </p>

              <div className="mt-6 flex flex-wrap gap-3">
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm">ATS Score</span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm">Keyword Match</span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm">Resume Tips</span>
                <span className="rounded-full bg-white/10 px-4 py-2 text-sm">Free Tool</span>
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 shadow-2xl backdrop-blur">
              <div className="text-center">
                <p className="text-sm text-gray-300">Current ATS Score</p>
                <h3 className="mt-2 text-7xl font-black text-yellow-400">
                  {result.score}%
                </h3>
                <p className="mt-3 text-gray-300">{getScoreMessage()}</p>
              </div>

              <div className="mt-6 h-4 overflow-hidden rounded-full bg-black/40">
                <div
                  className="h-full rounded-full bg-yellow-400 transition-all duration-500"
                  style={{ width: `${result.score}%` }}
                />
              </div>

              <div className="mt-6 grid grid-cols-3 gap-3 text-center">
                <div className="rounded-2xl bg-black/30 p-4">
                  <p className="text-2xl font-bold">{result.resumeWordCount}</p>
                  <p className="text-xs text-gray-400">Resume Words</p>
                </div>
                <div className="rounded-2xl bg-black/30 p-4">
                  <p className="text-2xl font-bold text-green-400">{result.matched.length}</p>
                  <p className="text-xs text-gray-400">Matched</p>
                </div>
                <div className="rounded-2xl bg-black/30 p-4">
                  <p className="text-2xl font-bold text-red-400">{result.missing.length}</p>
                  <p className="text-xs text-gray-400">Missing</p>
                </div>
              </div>
            </div>
          </div>

          <section className="mt-10 grid gap-6 lg:grid-cols-2">
            <textarea
              value={resumeText}
              onChange={(e) => setResumeText(e.target.value)}
              placeholder="Paste your resume text here..."
              className="h-80 resize-none rounded-3xl border border-white/10 bg-white/10 p-5 text-white outline-none backdrop-blur placeholder:text-gray-400 focus:border-yellow-400"
            />

            <textarea
              value={jobText}
              onChange={(e) => setJobText(e.target.value)}
              placeholder="Paste job description here..."
              className="h-80 resize-none rounded-3xl border border-white/10 bg-white/10 p-5 text-white outline-none backdrop-blur placeholder:text-gray-400 focus:border-yellow-400"
            />
          </section>

          <div className="mt-5 flex justify-center">
            <button
              onClick={clearAll}
              className="rounded-full border border-white/20 px-6 py-3 font-semibold text-white transition hover:bg-white hover:text-black"
            >
              Clear Text
            </button>
          </div>

          <section className="mt-10 grid gap-6 lg:grid-cols-3">
            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
              <h3 className="mb-4 text-2xl font-bold text-green-400">
                Matching Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.matched.slice(0, 40).map((word) => (
                  <span key={word} className="rounded-full bg-green-500/20 px-3 py-1 text-sm">
                    {word}
                  </span>
                ))}
                {result.matched.length === 0 && (
                  <p className="text-gray-400">No matching keywords yet.</p>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
              <h3 className="mb-4 text-2xl font-bold text-red-400">
                Missing Keywords
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.missing.slice(0, 40).map((word) => (
                  <span key={word} className="rounded-full bg-red-500/20 px-3 py-1 text-sm">
                    {word}
                  </span>
                ))}
                {result.missing.length === 0 && (
                  <p className="text-gray-400">Paste job description to see missing keywords.</p>
                )}
              </div>
            </div>

            <div className="rounded-3xl border border-white/10 bg-white/10 p-6 backdrop-blur">
              <h3 className="mb-4 text-2xl font-bold text-yellow-400">
                Resume Improvement Tips
              </h3>
              <ul className="space-y-3 text-gray-300">
                <li>Use missing keywords naturally in your project descriptions.</li>
                <li>Add measurable results like speed, accuracy, users, or features.</li>
                <li>Mention frontend, backend, database, API, GitHub, and deployment.</li>
                <li>Customize your resume separately for each job description.</li>
              </ul>
            </div>
          </section>

          <footer className="mt-12 border-t border-white/10 py-6 text-center text-gray-300">
            <p className="font-bold text-white">Prajwal Khedkar</p>
            <p>prajwalkhedkar23@gmail.com</p>
          </footer>
        </div>
      </section>
    </main>
  );
}