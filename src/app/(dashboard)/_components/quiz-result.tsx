"use client";
import React from "react";
import type { QuizResult, Question } from "@/lib/types/quiz";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

interface QuizResultProps {
  result: QuizResult;
  questions: Question[];
  userAnswers: { [questionId: string]: string };
  onRetakeQuiz: () => void;
  onExplore: () => void;
  currentQuestion: number;
  totalQuestions: number;
  exam: { [key: string]: string };
}

export function QuizResultComponent({
  result,
  questions,
  userAnswers,
  onRetakeQuiz,
  onExplore,
  currentQuestion,
  totalQuestions,
  exam,
}: QuizResultProps) {
  // Calculate correct and incorrect counts
  const correctCount =
    result.score ||
    questions.reduce((count, question) => {
      const userAnswer = userAnswers[question._id];
      return count + (userAnswer === question.correct ? 1 : 0);
    }, 0);
  const incorrectCount = result.totalQuestions - result.score;

  return (
    <div className="min-h-screen bg-white p-4">
      {/* Progress Bar */}
      <div className="pb-2">
        <div>
          <div className="flex justify-between">
            <div className="mb-1 text-xs text-gray-500">{exam.title}</div>
            <div className="mb-1 text-xs text-gray-500">
              Question{" "}
              <span className="text-blue-600">{currentQuestion + 1}</span> of{" "}
              {totalQuestions}
            </div>
          </div>

          <Progress value={(totalQuestions / totalQuestions) * 100} />
        </div>
      </div>

      <div className="mx-auto flex max-w-4xl gap-6 p-4">
        {/* Left Side - Score Circle */}
        <div className="w-64">
          <div className="rounded-lg bg-white p-6 shadow-sm">
            <h2 className="text-blue- 600 mb-6 text-xl font-semibold">
              Results:
            </h2>

            {/* Score Circle */}
            <div className="relative mx-auto mb-6 h-40 w-40">
              <svg
                className="h-40 w-40 -rotate-90 transform"
                viewBox="0 0 100 100"
              >
                {/* Background circle */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#f3f4f6"
                  strokeWidth="8"
                  fill="none"
                />
                {/* Correct answers arc */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#10b981"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${
                    (correctCount / result.totalQuestions) * 251.2
                  } 251.2`}
                  className="transition-all duration-1000 ease-out"
                />
                {/* Incorrect answers arc */}
                <circle
                  cx="50"
                  cy="50"
                  r="40"
                  stroke="#ef4444"
                  strokeWidth="8"
                  fill="none"
                  strokeDasharray={`${
                    (incorrectCount / result.totalQuestions) * 251.2
                  } 251.2`}
                  strokeDashoffset={`-${
                    (correctCount / result.totalQuestions) * 251.2
                  }`}
                  className="transition-all duration-1000 ease-out"
                />
              </svg>
            </div>

            {/* Legend */}
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 rounded bg-green-500"></div>
                <span className="text-sm text-gray-700">
                  Correct: {correctCount}
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="h-4 w-4 rounded bg-red-500"></div>
                <span className="text-sm text-gray-700">
                  Incorrect: {incorrectCount}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side - Questions Review */}
        <div className="flex-1">
          <div className="max-h-[500px] space-y-4 overflow-y-auto pr-2">
            {questions.map((question) => {
              const userAnswer = userAnswers[question._id];
              const isCorrect = userAnswer === question.correct;
              const correctAnswerText = question.answers.find(
                (a) => a.key === question.correct,
              )?.answer;
              const userAnswerText = question.answers.find(
                (a) => a.key === userAnswer,
              )?.answer;

              return (
                <div
                  key={question._id}
                  className="rounded-lg bg-white p-4 shadow-sm"
                >
                  <h3 className="mb-3 font-medium text-blue-600">
                    {question.question}
                  </h3>

                  <div className="space-y-2">
                    {/* User's answer */}
                    <div
                      className={`flex items-center space-x-2 rounded p-2 ${
                        isCorrect ? "bg-green-50" : "bg-red-50"
                      }`}
                    >
                      <div
                        className={`h-4 w-4 rounded-full ${
                          isCorrect ? "bg-green-500" : "bg-red-500"
                        }`}
                      >
                        {isCorrect ? (
                          <svg
                            className="h-4 w-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="h-4 w-4 text-white"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                        )}
                      </div>
                      <span className="text-sm text-gray-700">
                        {userAnswerText}
                      </span>
                    </div>

                    {/* Correct answer if user was wrong */}
                    {!isCorrect && (
                      <div className="flex items-center space-x-2 rounded bg-green-50 p-2">
                        <div className="h-4 w-4 rounded-full border-2 border-green-500"></div>
                        <span className="text-sm text-gray-700">
                          {correctAnswerText}
                        </span>
                      </div>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Bottom Buttons */}
      <div className="mx-auto max-w-4xl p-4">
        <div className="flex justify-between gap-4">
          <Button
            onClick={onRetakeQuiz}
            className="flex items-center space-x-2 bg-gray-200 px-6 py-3 text-gray-700 transition-colors hover:bg-gray-300"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z"
                clipRule="evenodd"
              />
            </svg>
            <span>Restart</span>
          </Button>

          <Button
            onClick={onExplore}
            className="flex items-center space-x-2 bg-blue-600 px-8 py-3 text-white transition-colors hover:bg-blue-700"
          >
            <svg className="h-4 w-4" fill="currentColor" viewBox="0 0 20 20">
              <path
                fillRule="evenodd"
                d="M3 4a1 1 0 011-1h4a1 1 0 010 2H6.414l2.293 2.293a1 1 0 11-1.414 1.414L5 6.414V8a1 1 0 01-2 0V4zm9 1a1 1 0 010-2h4a1 1 0 011 1v4a1 1 0 01-2 0V6.414l-2.293 2.293a1 1 0 11-1.414-1.414L13.586 5H12zm-9 7a1 1 0 012 0v1.586l2.293-2.293a1 1 0 111.414 1.414L6.414 15H8a1 1 0 010 2H4a1 1 0 01-1-1v-4zm13-1a1 1 0 011 1v4a1 1 0 01-1 1h-4a1 1 0 010-2h1.586l-2.293-2.293a1 1 0 111.414-1.414L15.586 13H14a1 1 0 01-1-1z"
                clipRule="evenodd"
              />
            </svg>
            <span>Explore</span>
          </Button>
        </div>
      </div>
    </div>
  );
}
