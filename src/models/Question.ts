export interface AnswerOption {
    id?: number;
    text: string;
    isCorrect: boolean;
}

export interface Question {
    id: number;
    text: string;
    type: number;
    quizId: number;
    options: AnswerOption[];
}