"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { QuizQuestion } from "./quiz-question";
import { QuizTimer } from "./quiz-timer";
import { QuizResultComponent } from "./quiz-result";
import { Button } from "@/components/ui/button";
import { Answer, QuizResult, QuizSubmission } from "@/lib/types/quiz";
import { useQuiz } from "../_hooks/use-quiz";
import { useSubmitQuiz } from "../_hooks/use-submit-quiz";

// types
interface QuizProps {
  examId: string;
}

export function Quiz({ examId }: QuizProps) {
  // State
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResults, setShowResults] = useState(false);
  const [quizResult, setQuizResult] = useState<QuizResult | null>(null);
  const [userAnswers, setUserAnswers] = useState<{
    [questionId: string]: string;
  }>({});
  const [timeUp, setTimeUp] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const isSubmittingRef = useRef(false);
  const [showError, setShowError] = useState(false);

  // Fetch quiz data
  const { data: quizData, isLoading, error } = useQuiz(examId);
  const submitQuizMutation = useSubmitQuiz();

  const totalQuestions = quizData?.questions?.length || 0;
  const currentQuestionData = quizData?.questions?.[currentQuestion];

  // handle error timer
  useEffect(() => {
    if (submitQuizMutation.error) {
      setShowError(true);
    }

    const timer = setTimeout(() => {
      setShowError(false);
    }, 1000 * 2);

    return () => clearTimeout(timer);
  }, [submitQuizMutation.error]);

  // Handle answer selection - store answers in state
  const handleAnswerSelect = useCallback(
    (answer: string) => {
      if (!currentQuestionData || isSubmitting) return;

      setUserAnswers((prev) => ({
        ...prev,
        [currentQuestionData._id]: answer,
      }));
    },
    [currentQuestionData, isSubmitting]
  );

  // Handle time up - auto submit quiz
  const handleTimeUp = useCallback(async () => {
    if (isSubmittingRef.current) return; // Prevent multiple submissions

    console.log("Time is up! Auto-submitting quiz...");
    setTimeUp(true);
    await submitQuiz();
    setShowResults(true);
  }, []);

  const handleNext = async () => {
    if (isSubmitting) return;

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Submit quiz on last question
      await submitQuiz();
    }
  };

  const handlePrevious = () => {
    if (currentQuestion > 0 && !isSubmitting) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const submitQuiz = async () => {
    if (!quizData || isSubmittingRef.current) {
      console.log(
        "Cannot submit:",
        !quizData ? "No quiz data" : "Already submitting"
      );
      return;
    }

    isSubmittingRef.current = true;
    setIsSubmitting(true);

    try {
      console.log("Starting quiz submission...");
      console.log("User answers:", userAnswers);

      // Transform user answers to API format
      const answers: Answer[] = quizData.questions.map((question) => ({
        questionId: question._id,
        selectedAnswer: userAnswers[question._id] || "", // Use empty string if no answer selected
      }));

      const submission: QuizSubmission = {
        examId: quizData.questions[0].exam._id,
        answers,
      };

      console.log("Final submission object:", submission);

      const result = await submitQuizMutation.mutateAsync(submission);
      console.log("Quiz submitted successfully:", result);

      setQuizResult(result);
    } catch (error) {
      console.error("Failed to submit quiz:", error);

      // Fix: If submission fails, create a mock result to show user their answers
      const mockResult = {
        score: 0,
        totalQuestions: totalQuestions,
        percentage: 0,
        passed: false,
        feedback: "Quiz submission failed, but you can review your answers.",
        correctAnswers: {},
      };

      setQuizResult(mockResult);
    } finally {
      setIsSubmitting(false);
      isSubmittingRef.current = false;
      setShowResults(true);
    }
  };

  const handleRetakeQuiz = () => {
    setShowResults(false);
    setQuizResult(null);
    setCurrentQuestion(0);
    setUserAnswers({});
    setTimeUp(false);
    setIsSubmitting(false);
    isSubmittingRef.current = false;
  };

  const handleExplore = () => {
    // Navigate to explore page
    console.log("Navigate to explore page");
    if (typeof window !== "undefined") {
      location.href = "/diplomas"; // or use your routing method
    }
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-gray-50">
        <div className="text-lg">Loading quiz...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 shadow-sm text-center">
          <p className="text-red-600">Failed to load quiz. Please try again.</p>
        </div>
      </div>
    );
  }

  if (!quizData || !quizData.questions.length) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="bg-white rounded-lg p-6 shadow-sm text-center">
          <p>No quiz questions found.</p>
        </div>
      </div>
    );
  }

  if (showResults && quizResult) {
    return (
      <QuizResultComponent
        result={quizResult}
        questions={quizData.questions}
        userAnswers={userAnswers}
        onRetakeQuiz={handleRetakeQuiz}
        onExplore={handleExplore}
      />
    );
  }

  const exam = quizData.questions[0].exam;
  const currentAnswer = currentQuestionData
    ? userAnswers[currentQuestionData._id]
    : undefined;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-blue-600 text-white p-4">
        <div className="flex items-center justify-between max-w-4xl mx-auto">
          <div className="flex items-center space-x-3">
            <Button
              onClick={handlePrevious}
              disabled={currentQuestion === 0}
              className="w-8 h-8 rounded-full border border-white flex items-center justify-center disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-500 transition-colors"
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </Button>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center">
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="font-medium">[{exam.title}] Questions</span>
            </div>
          </div>
          <div className="text-sm">
            Question {currentQuestion + 1} of {totalQuestions}
          </div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="bg-blue-600 pb-2">
        <div className="max-w-4xl mx-auto px-4">
          <div className="text-xs text-blue-200 mb-1">{exam.title}</div>
          <div className="w-full bg-blue-500 rounded-full h-2">
            <div
              className={`w-[${
                ((currentQuestion + 1) / totalQuestions) * 100
              }%] bg-blue-300 h-2 rounded-full transition-all duration-300 ease-out`}
            ></div>
          </div>
        </div>
      </div>

      {/* Question Content */}
      <div className="max-w-4xl mx-auto p-6">
        {currentQuestionData && (
          <QuizQuestion
            question={currentQuestionData}
            selectedAnswer={currentAnswer}
            onAnswerSelect={handleAnswerSelect}
            questionIndex={currentQuestion}
          />
        )}

        {/* Navigation Buttons */}
        <div className="flex justify-between items-center mt-8">
          <button
            type="button"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="px-6 py-3 bg-gray-200 text-gray-700 rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-gray-300 transition-colors"
          >
            Previous
          </button>

          {/* Timer */}
          <div className="flex items-center">
            <QuizTimer initialMinutes={exam.duration} onTimeUp={handleTimeUp} />
          </div>

          <button
            type="button"
            onClick={handleNext}
            disabled={(!currentAnswer && !timeUp) || isSubmitting} // Allow submission if time is up even without answer
            className="px-8 py-3 bg-blue-600 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <span>
              {isSubmitting
                ? "Submitting..."
                : currentQuestion === totalQuestions - 1
                ? "Finish"
                : "Next"}
            </span>
            {!isSubmitting && (
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Error Display */}
      {showError && submitQuizMutation.error && (
        <div className="fixed bottom-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg max-w-sm">
          <div className="font-medium">Submission Error</div>
          <div className="text-sm mt-1">
            {submitQuizMutation.error instanceof Error
              ? submitQuizMutation.error.message
              : "Failed to submit quiz. Please try again."}
          </div>
          <button
            onClick={() => submitQuiz()}
            className="mt-2 text-xs bg-red-600 text-white px-2 py-1 rounded hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading overlay when submitting */}
      {isSubmitting && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-8 text-center shadow-xl">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
            <p className="text-lg font-medium">Submitting your quiz...</p>
            <p className="text-sm text-gray-600 mt-2">
              Please wait, do not close this window
            </p>
          </div>
        </div>
      )}

      {/* Time up notification */}
      {timeUp && (
        <div className="fixed top-4 right-4 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg shadow-lg">
          <div className="font-medium">Time&apos;s Up!</div>
          <div className="text-sm">
            Your quiz has been automatically submitted.
          </div>
        </div>
      )}
    </div>
  );
}
