/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState } from "react";
import { 
  ArrowRight, 
  ArrowLeft, 
  CheckCircle2, 
  LayoutDashboard, 
  Database, 
  Users, 
  ShieldCheck, 
  Trophy, 
  GraduationCap,
  Quote,
  TrendingUp,
  Target
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { ROADMAP_DATA, QUIZ_QUESTIONS, DriverContent } from "./data";

type AppStage = "intro" | "driver" | "quiz" | "summary";

export default function App() {
  const [stage, setStage] = useState<AppStage>("intro");
  const [currentDriverIndex, setCurrentDriverIndex] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [quizScore, setQuizScore] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswerCorrect, setIsAnswerCorrect] = useState<boolean | null>(null);

  // Progress helpers
  const totalDrivers = ROADMAP_DATA.length;
  const totalQuestions = QUIZ_QUESTIONS.length;

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setQuizScore(0);
    setQuizFinished(false);
    setSelectedOption(null);
    setIsAnswerCorrect(null);
  };

  const handleNext = () => {
    if (stage === "intro") {
      setStage("driver");
      setCurrentDriverIndex(0);
    } else if (stage === "driver") {
      if (currentDriverIndex < totalDrivers - 1) {
        setCurrentDriverIndex(prev => prev + 1);
      } else {
        setStage("quiz");
        resetQuiz();
      }
    } else if (stage === "quiz") {
      if (currentQuestionIndex < totalQuestions - 1) {
        setCurrentQuestionIndex(prev => prev + 1);
        setSelectedOption(null);
        setIsAnswerCorrect(null);
      } else {
        setQuizFinished(true);
      }
    } else if (stage === "summary") {
      setStage("intro");
    }
  };

  const handleBack = () => {
    if (stage === "driver") {
      if (currentDriverIndex > 0) {
        setCurrentDriverIndex(prev => prev - 1);
      } else {
        setStage("intro");
      }
    } else if (stage === "quiz") {
      setStage("driver");
      setCurrentDriverIndex(totalDrivers - 1);
    } else if (stage === "summary") {
      setStage("quiz");
      setQuizFinished(true);
    }
  };

  const handleQuizAnswer = (optionIndex: number) => {
    if (selectedOption !== null) return;

    setSelectedOption(optionIndex);
    const correct = optionIndex === QUIZ_QUESTIONS[currentQuestionIndex].correctAnswer;
    setIsAnswerCorrect(correct);
    if (correct) setQuizScore(prev => prev + 1);
  };

  const DriverIcon = ({ id, className }: { id: string; className?: string }) => {
    switch (id) {
      case "business-strategy": return <Target className={className} />;
      case "technology-data": return <Database className={className} />;
      case "ai-strategy-experience": return <TrendingUp className={className} />;
      case "organisation-culture": return <Users className={className} />;
      case "ai-governance": return <ShieldCheck className={className} />;
      default: return <LayoutDashboard className={className} />;
    }
  };

  return (
    <div id="app-root" className="min-h-screen bg-[#F5F7FA] text-[#1A1A1A] font-sans selection:bg-indigo-100 selection:text-indigo-900">
      {/* Top Banner / Progress */}
      <header className="sticky top-0 z-50 bg-white/80 backdrop-blur-md border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="bg-indigo-600 p-2 rounded-lg">
              <Trophy className="w-5 h-5 text-white" />
            </div>
            <h1 className="font-semibold text-lg tracking-tight">AI Strategy Roadmap</h1>
          </div>
          
          <div className="hidden md:flex items-center gap-8">
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${stage === 'intro' ? 'bg-indigo-600' : 'bg-gray-200'}`} />
              <span className={`text-xs font-medium uppercase tracking-wider ${stage === 'intro' ? 'text-indigo-600' : 'text-gray-400'}`}>Start</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${stage === 'driver' ? 'bg-indigo-600' : 'bg-gray-200'}`} />
              <span className={`text-xs font-medium uppercase tracking-wider ${stage === 'driver' ? 'text-indigo-600' : 'text-gray-400'}`}>Drivers</span>
            </div>
            <div className="flex items-center gap-2">
              <div className={`w-2.5 h-2.5 rounded-full ${stage === 'quiz' ? 'bg-indigo-600' : 'bg-gray-200'}`} />
              <span className={`text-xs font-medium uppercase tracking-wider ${stage === 'quiz' ? 'text-indigo-600' : 'text-gray-400'}`}>Quiz</span>
            </div>
          </div>
        </div>
        
        {/* Progress bar */}
        <div className="w-full h-1 bg-gray-100">
          <motion.div 
            className="h-full bg-indigo-600"
            initial={{ width: 0 }}
            animate={{ 
              width: stage === 'intro' ? '10%' : 
                     stage === 'driver' ? `${20 + (currentDriverIndex + 1) * 12}%` :
                     stage === 'quiz' ? `${80 + (currentQuestionIndex + 1) * 4}%` : '100%'
            }}
          />
        </div>
      </header>

      <main className="max-w-4xl mx-auto px-6 py-12">
        <AnimatePresence mode="wait">
          {stage === "intro" && (
            <motion.div
              key="intro"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="space-y-12"
            >
              <div className="space-y-6">
                <span className="inline-block px-4 py-1.5 bg-indigo-50 text-indigo-700 text-sm font-semibold rounded-full uppercase tracking-wider">
                  The Path to Transformation
                </span>
                <h2 className="text-5xl md:text-6xl font-bold text-gray-900 leading-[1.1]">
                  Building a Foundation for AI Success
                </h2>
                <p className="text-xl text-gray-600 leading-relaxed max-w-2xl">
                  AI is reshaping work, enabling organisations to optimise operations and deliver more value. 
                  But success requires more than just technology—it needs a scalable, secure, and reliable foundation.
                </p>
              </div>

              <div className="grid md:grid-cols-2 gap-8 py-8 border-y border-gray-200">
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">The Challenge</h3>
                  <p className="text-lg text-gray-700 italic">
                    "To realise this value, organisations need more than just access to technology. 
                    It requires a foundation that supports responsible, scalable, secure and reliable AI adoption."
                  </p>
                </div>
                <div className="space-y-4">
                  <h3 className="text-sm font-bold uppercase tracking-widest text-gray-400">The Insights</h3>
                  <p className="text-lg text-gray-700">
                    Based on conversations with 100+ worldwide business and IT leaders who have successfully brought AI to scale.
                  </p>
                </div>
              </div>

              <div className="space-y-6">
                <h3 className="text-2xl font-bold text-gray-900">Five Key Success Drivers</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {ROADMAP_DATA.map((driver, idx) => (
                    <motion.div 
                      key={driver.id}
                      whileHover={{ scale: 1.02 }}
                      className="p-5 bg-white border border-gray-200 rounded-2xl shadow-sm hover:shadow-md transition-shadow"
                    >
                      <div className="w-10 h-10 bg-indigo-50 text-indigo-600 rounded-xl flex items-center justify-center mb-4">
                        <DriverIcon id={driver.id} className="w-5 h-5" />
                      </div>
                      <span className="text-[10px] font-bold text-indigo-500 uppercase tracking-widest mb-1 block">Driver {idx + 1}</span>
                      <h4 className="font-bold text-gray-900">{driver.title.split(': ')[1]}</h4>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div className="pt-10">
                <button
                  onClick={handleNext}
                  className="group flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Explore the Roadmap
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {stage === "driver" && (
            <motion.div
              key={`driver-${currentDriverIndex}`}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              className="space-y-10"
            >
              <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-8 border-b border-gray-200">
                <div className="space-y-4">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
                      <DriverIcon id={ROADMAP_DATA[currentDriverIndex].id} className="w-6 h-6" />
                    </div>
                    <span className="text-indigo-600 font-bold uppercase tracking-[0.2em] text-sm">
                      Maturity Driver {currentDriverIndex + 1}
                    </span>
                  </div>
                  <h2 className="text-4xl md:text-5xl font-bold text-gray-900 leading-tight">
                    {ROADMAP_DATA[currentDriverIndex].title.split(': ')[1]}
                  </h2>
                </div>
                <div className="text-right">
                  <span className="text-sm font-medium text-gray-400">Progress</span>
                  <div className="text-2xl font-bold text-indigo-600">{currentDriverIndex + 1} <span className="text-gray-300 font-normal">/</span> {totalDrivers}</div>
                </div>
              </div>

              <div className="grid md:grid-cols-5 gap-12">
                <div className="md:col-span-3 space-y-10">
                  <div className="space-y-4">
                    <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-gray-400">Objective</h3>
                    <p className="text-xl text-gray-700 leading-relaxed font-light">
                      {ROADMAP_DATA[currentDriverIndex].description}
                    </p>
                  </div>

                  <div className="space-y-4 bg-indigo-50/50 p-6 rounded-2xl border border-indigo-100/50">
                    <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-indigo-400">Deep Dive</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {ROADMAP_DATA[currentDriverIndex].deepDive}
                    </p>
                  </div>

                  <div className="space-y-6">
                    <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-gray-400">Key Takeaways</h3>
                    <ul className="grid gap-4">
                      {ROADMAP_DATA[currentDriverIndex].takeaways.map((item, i) => (
                        <li key={i} className="flex items-start gap-4 p-4 bg-white rounded-xl border border-gray-100 shadow-sm">
                          <div className="bg-green-50 p-1 rounded-full text-green-600 mt-0.5">
                            <CheckCircle2 className="w-4 h-4" />
                          </div>
                          <span className="text-gray-800 font-medium">{item}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {ROADMAP_DATA[currentDriverIndex].metrics && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-gray-400">Core Metrics</h3>
                      <div className="flex flex-wrap gap-2">
                        {ROADMAP_DATA[currentDriverIndex].metrics?.map((metric, i) => (
                          <span key={i} className="px-3 py-1.5 bg-gray-100 text-gray-700 text-sm font-medium rounded-lg border border-gray-200">
                            {metric}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {ROADMAP_DATA[currentDriverIndex].enablers && (
                    <div className="space-y-4">
                      <h3 className="text-sm font-bold uppercase tracking-[0.1em] text-gray-400">Key Enablers</h3>
                      <div className="grid grid-cols-1 gap-3">
                        {ROADMAP_DATA[currentDriverIndex].enablers?.map((enabler, i) => (
                          <div key={i} className="flex items-center gap-3 px-4 py-3 bg-indigo-50 border border-indigo-100 rounded-xl text-indigo-700 font-semibold">
                            <div className="w-1.5 h-1.5 rounded-full bg-indigo-600" />
                            {enabler}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <aside className="md:col-span-2 space-y-8">
                  <div className="p-8 bg-indigo-900 rounded-3xl text-white relative overflow-hidden shadow-xl">
                    <Quote className="absolute -top-4 -right-4 w-24 h-24 text-white/10" />
                    <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-indigo-300 mb-6 relative z-10">Voice of Experience</h3>
                    <div className="space-y-8 relative z-10">
                      {ROADMAP_DATA[currentDriverIndex].quotes.map((quote, i) => (
                        <div key={i} className="space-y-3">
                          <p className="text-lg font-medium leading-relaxed italic">
                            "{quote}"
                          </p>
                          <div className="w-8 h-1 bg-indigo-500 rounded-full" />
                        </div>
                      ))}
                    </div>
                  </div>
                </aside>
              </div>

              <div className="flex items-center justify-between pt-12 border-t border-gray-200">
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 text-gray-500 hover:text-indigo-600 font-bold transition-colors group"
                >
                  <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
                  Back
                </button>
                <button
                  onClick={handleNext}
                  className="flex items-center gap-3 bg-indigo-600 hover:bg-indigo-700 text-white px-8 py-4 rounded-full font-bold shadow-lg hover:shadow-xl transition-all group"
                >
                  {currentDriverIndex === totalDrivers - 1 ? "Take the Quiz" : "Next Driver"}
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </button>
              </div>
            </motion.div>
          )}

          {stage === "quiz" && (
            <motion.div
              key={quizFinished ? "quiz-results" : `quiz-${currentQuestionIndex}`}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.02 }}
              className="space-y-12"
            >
              {!quizFinished ? (
                <>
                  <div className="text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-amber-50 text-amber-700 rounded-full text-xs font-bold uppercase tracking-widest border border-amber-100">
                      <GraduationCap className="w-4 h-4" />
                      Knowledge Check
                    </div>
                    <h2 className="text-4xl font-bold text-gray-900">Test Your Understanding</h2>
                    <div className="flex items-center justify-center gap-2">
                       {QUIZ_QUESTIONS.map((_, i) => (
                         <div 
                          key={i} 
                          className={`w-12 h-1.5 rounded-full transition-all duration-500 ${
                            i === currentQuestionIndex ? 'bg-indigo-600 w-16' : 
                            i < currentQuestionIndex ? 'bg-green-500' : 'bg-gray-200'
                          }`} 
                         />
                       ))}
                    </div>
                  </div>

                  <div className="bg-white p-8 md:p-12 rounded-[2.5rem] shadow-2xl border border-gray-100">
                    <div className="space-y-8">
                      <div className="space-y-4">
                        <span className="text-sm font-bold text-indigo-500 uppercase tracking-widest">Question {currentQuestionIndex + 1} of {totalQuestions}</span>
                        <h3 className="text-2xl md:text-3xl font-bold text-gray-800 leading-tight">
                          {QUIZ_QUESTIONS[currentQuestionIndex].question}
                        </h3>
                      </div>

                      <div className="grid gap-3">
                        {QUIZ_QUESTIONS[currentQuestionIndex].options.map((option, i) => {
                          const isSelected = selectedOption === i;
                          const isCorrect = i === QUIZ_QUESTIONS[currentQuestionIndex].correctAnswer;
                          const showAnswer = isAnswerCorrect !== null;

                          let bgColor = "bg-gray-50 border-gray-200 hover:border-indigo-300";
                          if (showAnswer) {
                            if (isCorrect) bgColor = "bg-green-50 border-green-500 text-green-700";
                            else if (isSelected) bgColor = "bg-red-50 border-red-500 text-red-700";
                            else bgColor = "bg-gray-50 border-gray-200 opacity-50";
                          } else if (isSelected) {
                            bgColor = "bg-indigo-50 border-indigo-500 text-indigo-700";
                          }

                          return (
                            <button
                              key={i}
                              disabled={showAnswer}
                              onClick={() => handleQuizAnswer(i)}
                              className={`w-full p-5 text-left rounded-2xl border-2 font-semibold transition-all duration-200 flex items-center justify-between ${bgColor}`}
                            >
                              {option}
                              {showAnswer && isCorrect && <CheckCircle2 className="w-5 h-5 text-green-600" />}
                            </button>
                          );
                        })}
                      </div>

                      <AnimatePresence>
                        {isAnswerCorrect !== null && (
                          <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className={`p-6 rounded-2xl border ${isAnswerCorrect ? 'bg-green-50 border-green-100 text-green-800' : 'bg-red-50 border-red-100 text-red-800'}`}
                          >
                            <p className="font-bold mb-1">{isAnswerCorrect ? 'Correct!' : 'Not quite right.'}</p>
                            <p className="text-sm leading-relaxed">{QUIZ_QUESTIONS[currentQuestionIndex].explanation}</p>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>

                  <div className="flex justify-center">
                    {isAnswerCorrect !== null && (
                      <button
                        onClick={handleNext}
                        className="group flex items-center gap-3 bg-gray-900 hover:bg-gray-800 text-white px-10 py-4 rounded-full font-bold text-lg shadow-xl transition-all"
                      >
                        {currentQuestionIndex === totalQuestions - 1 ? "See Results" : "Continue"}
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                      </button>
                    )}
                  </div>
                </>
              ) : (
                <div className="text-center space-y-12">
                  <div className="space-y-6">
                    <div className="inline-block p-6 bg-indigo-600 rounded-[2.5rem] text-white shadow-2xl mb-4">
                      <Trophy className="w-20 h-20" />
                    </div>
                    <h2 className="text-5xl font-bold text-gray-900">Quiz Completed!</h2>
                    <p className="text-2xl text-gray-600">
                      You scored <span className="text-indigo-600 font-extrabold">{quizScore}</span> out of <span className="font-bold">{totalQuestions}</span>
                    </p>
                  </div>

                  <div className="bg-white p-8 rounded-3xl border border-gray-200 shadow-sm max-w-lg mx-auto">
                    <p className="text-gray-600 leading-relaxed mb-8">
                      {quizScore === totalQuestions 
                        ? "Master Strategist! You have a perfect grasp of the 5 Drivers for AI Success."
                        : quizScore >= 3 
                        ? "Great job! You have a solid understanding of the AI transformation roadmap."
                        : "Good effort! Consider reviewing the drivers to strengthen your AI strategy knowledge."}
                    </p>
                    <div className="grid grid-cols-2 gap-4">
                      <button
                        onClick={resetQuiz}
                        className="p-4 bg-gray-100 hover:bg-gray-200 text-gray-700 font-bold rounded-2xl transition-all"
                      >
                        Retake Quiz
                      </button>
                      <button
                        onClick={() => setStage("summary")}
                        className="p-4 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-2xl shadow-lg transition-all"
                      >
                        Final Summary
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>
          )}

          {stage === "summary" && (
            <motion.div
              key="summary"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="space-y-16"
            >
              <div className="text-center space-y-6">
                <h2 className="text-5xl font-bold text-gray-900">Your Roadmap to Scaling AI</h2>
                <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                  Transformation is an ongoing process. Use these five drivers as a compass to guide your organisation's AI maturity journey.
                </p>
              </div>

              <div className="grid gap-6">
                {ROADMAP_DATA.map((driver, i) => (
                  <div key={driver.id} className="group flex bg-white border border-gray-200 rounded-3xl overflow-hidden hover:border-indigo-500 transition-colors">
                    <div className="w-2 bg-indigo-600" />
                    <div className="p-8 flex-1 flex flex-col md:flex-row gap-6 md:items-center">
                      <div className="w-16 h-16 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center shrink-0">
                        <DriverIcon id={driver.id} className="w-8 h-8" />
                      </div>
                      <div className="space-y-1">
                        <span className="text-[10px] font-bold text-indigo-400 uppercase tracking-widest">Driver {i + 1}</span>
                        <h4 className="text-xl font-bold text-gray-900">{driver.title.split(': ')[1]}</h4>
                        <p className="text-gray-500 text-sm line-clamp-2 md:line-clamp-1">{driver.description}</p>
                      </div>
                      <div className="md:ml-auto">
                        <button 
                          onClick={() => {
                            setStage("driver");
                            setCurrentDriverIndex(i);
                          }}
                          className="text-xs font-bold uppercase tracking-widest text-indigo-600 hover:text-indigo-800 transition-colors"
                        >
                          Review Content
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="p-12 bg-indigo-50 rounded-[3rem] text-center space-y-8 border border-indigo-100">
                <h3 className="text-3xl font-bold text-indigo-900">Ready to take the next step?</h3>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <a href="#" className="px-8 py-4 bg-indigo-900 text-white rounded-full font-bold shadow-lg hover:bg-indigo-950 transition-colors">
                    Explore Solutions
                  </a>
                  <button 
                    onClick={() => setStage("intro")}
                    className="px-8 py-4 bg-white text-indigo-900 border border-indigo-200 rounded-full font-bold shadow-sm hover:bg-indigo-100 transition-colors"
                  >
                    Start Over
                  </button>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <footer className="max-w-7xl mx-auto px-6 py-12 border-t border-gray-200 flex flex-col md:flex-row items-center justify-between gap-6 text-gray-400 text-sm">
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
          <span>Interactive Learning Experience</span>
        </div>
        <div>Based on Microsoft AI Solutions Research</div>
        <div className="flex gap-6">
          <a href="#" className="hover:text-indigo-600 transition-colors">Methodology</a>
          <a href="#" className="hover:text-indigo-600 transition-colors">Privacy</a>
        </div>
      </footer>
    </div>
  );
}
