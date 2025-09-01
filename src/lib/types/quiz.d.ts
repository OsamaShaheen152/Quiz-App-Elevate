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
  correct: string;
}

export interface QuizSubmission {
  answers: Answer[];
  time?: number;
}

export interface QuizResult {
  score: number;
  totalQuestions: number;
  percentage: number;
  passed: boolean;
  feedback?: string;
  correctAnswers?: { [questionId: string]: string };
}
