"use client";

import React, { useState, useCallback, useRef, useEffect } from "react";
import { QuizQuestion } from "./quiz-question";
import { QuizTimer } from "./quiz-timer";
import { QuizResultComponent } from "./quiz-result";
import { Button } from "@/components/ui/button";
import { Answer, QuizResult, QuizSubmission } from "@/lib/types/quiz";
import { useQuiz } from "../_hooks/use-quiz";
import { useSubmitQuiz } from "../_hooks/use-submit-quiz";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Progress } from "@/components/ui/progress";

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
    [currentQuestionData, isSubmitting],
  );

  // Previous handler
  const handlePrevious = () => {
    if (currentQuestion > 0 && !isSubmitting) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  // Submit quiz
  const submitQuiz = async () => {
    if (!quizData || isSubmittingRef.current) {
      console.log(
        "Cannot submit:",
        !quizData ? "No quiz data" : "Already submitting",
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
        correct: userAnswers[question._id] || "_", // Use empty string if no answer selected
      }));

      console.log("Transformed answers:", answers);

      const submission: QuizSubmission = {
        answers,
        time: 0,
      };

      console.log("Final submission object:", submission);

      const result = await submitQuizMutation.mutateAsync(submission);
      console.log("Quiz submitted successfully:", result);

      setQuizResult(result);
    } catch (error) {
      console.error("Failed to submit quiz:", error);
    } finally {
      setIsSubmitting(false);
      isSubmittingRef.current = false;
      setShowResults(true);
    }
  };

  // Next handler
  const handleNext = async () => {
    if (isSubmitting) return;

    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Submit quiz on last question
      await submitQuiz();
    }
  };

  // Handle time up - auto submit quiz
  const handleTimeUp = async () => {
    if (isSubmittingRef.current) return; // Prevent multiple submissions

    console.log("Time is up! Auto-submitting quiz...");
    setTimeUp(true);
    await submitQuiz();
    setShowResults(true);
  };

  // Retake quiz handler
  const handleRetakeQuiz = () => {
    setShowResults(false);
    setQuizResult(null);
    setCurrentQuestion(0);
    setUserAnswers({});
    setTimeUp(false);
    setIsSubmitting(false);
    isSubmittingRef.current = false;
  };

  // Explore handler
  const handleExplore = () => {
    // Navigate to explore page
    console.log("Navigate to explore page");
    if (typeof window !== "undefined") {
      location.href = "/diplomas"; // or use your routing method
    }
  };

  const exam = quizData?.questions[0]?.exam;
  const currentAnswer = currentQuestionData
    ? userAnswers[currentQuestionData._id]
    : undefined;

  // loading state
  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="text-lg">Loading quiz...</div>
      </div>
    );
  }

  // Error state
  if (error) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="rounded-lg bg-white p-6 text-center shadow-sm">
          <p className="text-red-600">Failed to load quiz. Please try again.</p>
        </div>
      </div>
    );
  }

  // Handle no quiz data
  if (!quizData || !quizData.questions.length) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-gray-50">
        <div className="rounded-lg bg-white p-6 text-center shadow-sm">
          <p>No quiz questions found.</p>
        </div>
      </div>
    );
  }

  // Handle display results
  if (showResults && quizResult && exam) {
    return (
      <QuizResultComponent
        result={quizResult}
        onRetakeQuiz={handleRetakeQuiz}
        onExplore={handleExplore}
        exam={exam}
      />
    );
  }

  return (
    <div className="min-h-screen w-full bg-white p-4">
      {/* Progress Bar */}
      <div className="pb-2">
        <div>
          <div className="flex justify-between">
            <div className="mb-1 text-xs text-gray-500">
              {exam?.title ?? ""}
            </div>
            <div className="mb-1 text-xs text-gray-500">
              Question{" "}
              <span className="text-blue-600">{currentQuestion + 1}</span> of{" "}
              {totalQuestions}
            </div>
          </div>

          <Progress value={(currentQuestion / totalQuestions) * 100} />
        </div>
      </div>

      {/* Question Content */}
      <div className="py-6">
        {currentQuestionData && (
          <QuizQuestion
            question={currentQuestionData}
            selectedAnswer={currentAnswer}
            onAnswerSelect={handleAnswerSelect}
            questionIndex={currentQuestion}
          />
        )}

        {/* Navigation Buttons */}
        <div className="mt-8 flex items-center justify-between gap-4">
          <Button
            type="button"
            onClick={handlePrevious}
            disabled={currentQuestion === 0}
            className="bg-gray-200 text-gray-400 hover:text-white"
          >
            <ChevronLeft className="mt-1" />
            Previous
          </Button>

          {/* Timer */}
          <div className="flex items-center">
            <QuizTimer
              initialMinutes={exam!.duration}
              onTimeUp={handleTimeUp}
            />
          </div>

          {/* Next question and submission */}
          <Button
            type="button"
            onClick={handleNext}
            disabled={(!currentAnswer && !timeUp) || isSubmitting} // Allow submission if time is up even without answer
          >
            <span>
              {isSubmitting
                ? "Submitting..."
                : currentQuestion === totalQuestions - 1
                  ? "Finish"
                  : "Next"}
            </span>
            {!isSubmitting && <ChevronRight className="mt-1" />}
          </Button>
        </div>
      </div>

      {/* Error Display */}
      {showError && submitQuizMutation.error && (
        <div className="fixed bottom-4 right-4 max-w-sm rounded-lg border border-red-400 bg-red-100 px-4 py-3 text-red-700 shadow-lg">
          <div className="font-medium">Submission Error</div>
          <div className="mt-1 text-sm">
            {submitQuizMutation.error instanceof Error
              ? submitQuizMutation.error.message
              : "Failed to submit quiz. Please try again."}
          </div>
          <button
            onClick={() => submitQuiz()}
            className="mt-2 rounded bg-red-600 px-2 py-1 text-xs text-white hover:bg-red-700"
          >
            Retry
          </button>
        </div>
      )}

      {/* Loading overlay when submitting */}
      {isSubmitting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
          <div className="rounded-lg bg-white p-8 text-center shadow-xl">
            <div className="mx-auto mb-4 h-12 w-12 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <p className="text-lg font-medium">Submitting your quiz...</p>
            <p className="mt-2 text-sm text-gray-600">
              Please wait, do not close this window
            </p>
          </div>
        </div>
      )}

      {/* Time up notification */}
      {timeUp && (
        <div className="fixed right-4 top-4 rounded-lg border border-red-400 bg-red-100 px-4 py-3 text-red-700 shadow-lg">
          <div className="font-medium">Time&apos;s Up!</div>
          <div className="text-sm">
            Your quiz has been automatically submitted.
          </div>
        </div>
      )}
    </div>
  );
}
