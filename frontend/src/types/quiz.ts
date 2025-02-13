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
  answers: Record<number, number>;
  sections: Section[];
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