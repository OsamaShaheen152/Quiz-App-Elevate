"use client";

import React from "react";
import type { Question } from "@/lib/types/quiz";

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: string | undefined;
  onAnswerSelect: (answer: string) => void;
  questionIndex?: number;
}

export function QuizQuestion({
  question,
  selectedAnswer,
  onAnswerSelect,
  // questionIndex,
}: QuizQuestionProps) {
  return (
    <div className="mb-6 p-6">
      {/* Question text */}
      <h3 className="mb-6 text-sm font-semibold text-blue-600 lg:text-xl xl:text-2xl">
        {question.question}
      </h3>

      <div className="space-y-4">
        {question.answers.map((answerOption) => {
          const isSelected = selectedAnswer === answerOption.key;

          return (
            <label
              key={answerOption.key}
              className={`flex cursor-pointer items-center space-x-3 p-3 text-sm transition-colors xl:text-xl ${
                isSelected ? "bg-gray-50" : "hover:bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name={`question-${question._id}`}
                value={answerOption.key}
                checked={isSelected}
                onChange={() => onAnswerSelect(answerOption.key)}
                className="h-3 w-3 border-gray-300 text-blue-600 focus:ring-blue-500 xl:h-4 xl:w-4"
              />
              <span className="text-base text-gray-700">
                {answerOption.answer}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
