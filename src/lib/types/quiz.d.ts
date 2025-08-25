export interface AnswerOption {
  answer: string;
  key: string;
}

export interface Exam {
  _id: string;
  title: string;
  duration: number;
  subject: string;
  numberOfQuestions: number;
  active: boolean;
  createdAt: string;
}

export interface Question {
  _id: string;
  question: string;
  answers: AnswerOption[];
  // type: "single_choice" | "multiple_choice";
  correct: string;
  subject: string | null;
  exam: Exam;
  createdAt: string;
}

export interface QuizApiResponse {
  message: string;
  questions: Question[];
}

export interface Answer {
  questionId: string;
  selectedAnswer: string; // For single choice, store the key (A1, A2, etc.)
  selectedAnswers?: string[]; // For multiple choice, store array of keys
}

export interface QuizSubmission {
  examId: string;
  answers: Answer[];
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  feedback?: string;
  correctAnswers?: { [questionId: string]: string };
}
