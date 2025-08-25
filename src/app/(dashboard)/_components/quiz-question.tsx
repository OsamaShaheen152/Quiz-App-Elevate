"use client";

import React from "react";
import type { Question } from "@/lib/types/quiz";

interface QuizQuestionProps {
  question: Question;
  selectedAnswer: string | undefined;
  onAnswerSelect: (answer: string) => void;
  questionIndex: number;
}

export function QuizQuestion({
  question,
  selectedAnswer,
  onAnswerSelect,
}: // questionIndex,
QuizQuestionProps) {
  return (
    <div className="bg-white rounded-lg shadow-sm border p-6 mb-6">
      <h3 className="text-xl font-medium text-gray-800 mb-6">
        {question.question}
      </h3>

      <div className="space-y-4">
        {question.answers.map((answerOption) => {
          const isSelected = selectedAnswer === answerOption.key;

          return (
            <label
              key={answerOption.key}
              className={`flex items-center space-x-3 cursor-pointer p-3 rounded-lg transition-colors ${
                isSelected
                  ? "bg-gray-50 border border-gray-300"
                  : "hover:bg-gray-50 border border-transparent"
              }`}
            >
              <input
                type="radio"
                name={`question-${question._id}`}
                value={answerOption.key}
                checked={isSelected}
                onChange={() => onAnswerSelect(answerOption.key)}
                className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <span className="text-gray-700 text-base">
                {answerOption.answer}
              </span>
            </label>
          );
        })}
      </div>
    </div>
  );
}
