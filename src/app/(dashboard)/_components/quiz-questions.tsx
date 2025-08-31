"use client";

import React from "react";
import type { UseFormRegister, FieldErrors } from "react-hook-form";
import type { AnswerOption, Question } from "@/lib/types/quiz";

// Form value type for quiz answers
export type QuizFormValues = {
  answers: {
    selectedAnswer: string;
  }[];
};

// Props for QuizQuestion component
interface QuizQuestionProps {
  question: Question;
  register: UseFormRegister<QuizFormValues>;
  errors: FieldErrors<QuizFormValues>;
  questionIndex: number;
}

export function QuizQuestion({
  question,
  register,
  errors,
  questionIndex,
}: QuizQuestionProps) {
  const fieldName = `answers.${questionIndex}.selectedAnswer`;

  return (
    <div className="mb-6 rounded-lg border bg-white p-6 shadow-sm">
      <h3 className="mb-6 text-xl font-medium text-gray-800">
        {question.question}
      </h3>

      <div className="space-y-4">
        {question.answers.map((answerOption: AnswerOption) => (
          <label
            key={answerOption.key}
            className="flex cursor-pointer items-center space-x-3 rounded-lg p-3 transition-colors hover:bg-gray-50"
          >
            <input
              type="radio"
              value={answerOption.key}
              {...register(fieldName as `answers.${number}.selectedAnswer`, {
                required: "Please select an answer",
              })}
              className="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500"
            />
            <span className="text-base text-gray-700">
              {answerOption.answer}
            </span>
          </label>
        ))}
      </div>

      {errors.answers?.[questionIndex]?.selectedAnswer && (
        <p className="mt-3 text-sm text-red-500">
          {errors.answers[questionIndex].selectedAnswer?.message}
        </p>
      )}
    </div>
  );
}
