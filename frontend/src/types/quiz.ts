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

export interface QuizState {
  currentSection: number;
  currentQuestion: number;
  answers: DetailedAnswer[];
  sections: Section[];  // Added the 'sections' property here
}

export interface SectionScore {
  sectionTitle: string;
  score: number;
  maxScore: number;
}

export interface DetailedAnswer {
  questionId: number;
  questionText: string;
  answerText: string;
  score: number;
  sectionTitle: string;
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

export interface UserResult extends QuizResult {
  id: number;
  firstName: string;
  lastName: string;
  createdAt: string;
}
