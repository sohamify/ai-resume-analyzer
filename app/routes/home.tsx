import type { Route } from "./+types/home";
import Navbar from "~/components/Navbar";
import ResumeCard from "~/components/ResumeCard";
import { usePuterStore } from "~/lib/puter";
import { Link, useNavigate } from "react-router";
import { useEffect, useState } from "react";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "SkillScan AI" },
    { name: "description", content: "Smart feedback for your dream job!" },
  ];
}

export default function Home() {
  const { auth, kv } = usePuterStore();
  const navigate = useNavigate();
  const [resumes, setResumes] = useState<Resume[]>([]);
  const [loadingResumes, setLoadingResumes] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [typewriterText, setTypewriterText] = useState("");
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    if (!auth.isAuthenticated) navigate("/auth?next=/");
  }, [auth.isAuthenticated]);

  useEffect(() => {
    const loadResumes = async () => {
      setLoadingResumes(true);

      const resumes = (await kv.list("resume:*", true)) as KVItem[];

      const parsedResumes = resumes?.map((resume) => JSON.parse(resume.value) as Resume);

      setResumes(parsedResumes || []);
      setLoadingResumes(false);
    };

    loadResumes();
    
    // Trigger content animation after navbar loads
    const contentTimer = setTimeout(() => setShowContent(true), 200);
    return () => clearTimeout(contentTimer);
  }, []);

  // Typewriter effect
  useEffect(() => {
    if (loadingResumes) return;

    const text = resumes?.length === 0 
      ? "No resumes found. Upload your first resume to get feedback."
      : "Review your submissions and check AI-powered feedback.";

    setTypewriterText("");
    setIsTyping(false);

    // Start typing animation after a short delay
    const startTimer = setTimeout(() => {
      setIsTyping(true);
      let currentIndex = 0;
      
      const typeTimer = setInterval(() => {
        if (currentIndex <= text.length) {
          setTypewriterText(text.slice(0, currentIndex));
          currentIndex++;
        } else {
          clearInterval(typeTimer);
          // Keep the cursor blinking for a bit longer
          setTimeout(() => setIsTyping(false), 2000);
        }
      }, 50);

      return () => clearInterval(typeTimer);
    }, 800); // Delay typewriter until after heading animation

    return () => clearTimeout(startTimer);
  }, [loadingResumes, resumes.length]);

  return (
    <main className="bg-[url('/images/bg-main.svg')] bg-cover min-h-screen relative overflow-hidden">
      {/* Subtle animated background particles */}
      <div className="absolute inset-0 opacity-30">
        <div className="particle particle-1"></div>
        <div className="particle particle-2"></div>
        <div className="particle particle-3"></div>
      </div>

      {/* Navbar with slide down animation */}
      <div className="animate-slideDown">
        <Navbar />
      </div>

      <section className="main-section relative z-10">
        {/* Page heading with staggered animations */}
        <div className={`page-heading py-16 transition-all duration-1000 ease-out ${
          showContent 
            ? 'translate-y-0 opacity-100' 
            : 'translate-y-8 opacity-0'
        }`}>
          <h1 className={`text-4xl md:text-5xl font-bold text-white transition-all duration-1000 ease-out delay-300 ${
            showContent 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-4 opacity-0'
          }`}>
            Track Your Applications & Resume Ratings
          </h1>
          
          {!loadingResumes && (
            <h2
              className={`text-xl md:text-2xl text-gray-200 mt-4 transition-all duration-1000 ease-out delay-500 ${
                showContent 
                  ? 'translate-y-0 opacity-100' 
                  : 'translate-y-4 opacity-0'
              } ${isTyping ? "border-r-2 border-orange-500" : ""}`}
              style={{
                minHeight: "2.5rem",
              }}
            >
              {typewriterText}
            </h2>
          )}
        </div>
        
        {/* Loading animation */}
        {loadingResumes && (
          <div className={`flex flex-col items-center justify-center transition-all duration-800 ease-out ${
            showContent 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-8 opacity-0 scale-95'
          }`}>
            <div className="relative">
              <img 
                src="/images/resume-scan-2.gif" 
                className="w-[200px] hover:scale-105 transition-transform duration-300" 
                alt="Loading..." 
              />
              {/* Subtle glow around loading image */}
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl animate-pulse"></div>
            </div>
          </div>
        )}

        {/* Resumes section with staggered card animations */}
        {!loadingResumes && resumes.length > 0 && (
          <div className={`resumes-section transition-all duration-1000 ease-out delay-700 ${
            showContent 
              ? 'translate-y-0 opacity-100' 
              : 'translate-y-8 opacity-0'
          }`}>
            {resumes.map((resume, index) => (
              <div
                key={resume.id}
                className="animate-fadeInUp"
                style={{
                  animationDelay: `${800 + (index * 100)}ms`,
                  animationFillMode: 'both'
                }}
              >
                <ResumeCard resume={resume} />
              </div>
            ))}
          </div>
        )}

        {/* Upload button with bounce-in animation */}
        {!loadingResumes && resumes?.length === 0 && (
          <div className={`flex flex-col items-center justify-center mt-10 gap-4 transition-all duration-1000 ease-out delay-1000 ${
            showContent 
              ? 'translate-y-0 opacity-100 scale-100' 
              : 'translate-y-8 opacity-0 scale-95'
          }`}>
            <Link
              to="/upload"
              className="primary-button w-fit text-xl font-semibold hover:scale-105 hover:shadow-lg hover:shadow-blue-500/25 transition-all duration-300 group relative overflow-hidden"
            >
              {/* Subtle gradient background on hover */}
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600/20 via-purple-600/20 to-blue-800/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <span className="relative z-10">Upload Resume</span>
            </Link>
          </div>
        )}
      </section>
      
      {/* Enhanced animations and effects */}
      <style>
        {`
          @keyframes blink {
            0%, 50% { border-color: rgb(249 115 22); }
            51%, 100% { border-color: transparent; }
          }
          
          @keyframes slideDown {
            from {
              opacity: 0;
              transform: translateY(-20px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(30px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes float {
            0%, 100% { transform: translate(0, 0) rotate(0deg); }
            33% { transform: translate(30px, -30px) rotate(120deg); }
            66% { transform: translate(-20px, 20px) rotate(240deg); }
          }
          
          .border-r-2 {
            animation: blink 1s infinite;
          }
          
          .animate-slideDown {
            animation: slideDown 0.8s ease-out forwards;
          }
          
          .animate-fadeInUp {
            animation: fadeInUp 0.8s ease-out forwards;
            opacity: 0;
          }
          
          .particle {
            position: absolute;
            width: 4px;
            height: 4px;
            background: linear-gradient(45deg, #60a5fa, #a855f7);
            border-radius: 50%;
            animation: float 20s infinite linear;
          }
          
          .particle-1 {
            top: 20%;
            left: 10%;
            animation-delay: 0s;
            animation-duration: 25s;
          }
          
          .particle-2 {
            top: 60%;
            right: 20%;
            animation-delay: -10s;
            animation-duration: 30s;
          }
          
          .particle-3 {
            bottom: 30%;
            left: 70%;
            animation-delay: -15s;
            animation-duration: 20s;
          }
        `}
      </style>
    </main>
  );
}