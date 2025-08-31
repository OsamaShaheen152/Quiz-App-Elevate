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
    <div className="mb-6 rounded-lg border bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-medium text-gray-800">
        {question.question}
      </h3>

      <div className="space-y-4">
        {question.answers.map((answerOption) => {
          const isSelected = selectedAnswer === answerOption.key;

          return (
            <label
              key={answerOption.key}
              className={`flex cursor-pointer items-center space-x-3 rounded-lg p-3 transition-colors ${
                isSelected
                  ? "border border-gray-300 bg-gray-50"
                  : "border border-transparent hover:bg-gray-50"
              }`}
            >
              <input
                type="radio"
                name={`question-${question._id}`}
                value={answerOption.key}
                checked={isSelected}
                onChange={() => onAnswerSelect(answerOption.key)}
                className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
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
