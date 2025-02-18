export interface Answer {
  text: string;
  score: number;
}

export interface Question {
  id: number;
  text: string;
  answers: Answer[];
  scores: number[];
}

export interface Section {
  id: number;
  title: string;
  questions: Question[];
}

export interface DetailedAnswer {
  questionId: number;
  selectedAnswer: number;
  score: number;
  sectionId: number;
}

export interface QuizState {
  currentSection: number;
  currentQuestion: number;
  answers: DetailedAnswer[];
  sections: Section[];
}

export interface SectionScore {
  sectionTitle: string;
  score: number;
  maxScore: number;
}

export interface QuizResult {
  totalScore: number;
  sectionScores: SectionScore[];
  detailedAnswers: DetailedAnswer[];
}

// Admin interfaces
export interface AdminCredentials {
  username: string;
  password: string;
}

export interface AdminUser {
  username: string;
  role: string;
}

export interface AdminAuthResponse {
  token: string;
  user: AdminUser;
}

export interface UserResult {
  id: number;
  firstName: string;
  lastName: string;
  createdAt: string;
  result: QuizResult;
}
