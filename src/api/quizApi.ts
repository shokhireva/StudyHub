import { MESSAGES } from '../constants/messages';
import type { Quiz } from '../models/Quiz';

export const quizApi = {
    getAll: async (): Promise<Quiz[]> => {
        const res = await fetch('/api/quizzes');
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || MESSAGES.errors.loadQuizzes);
        }
        return res.json();
    },

    create: async (data: Omit<Quiz, 'id'>): Promise<Quiz> => {
        const res = await fetch('/api/quizzes', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || MESSAGES.errors.createQuiz);
        }
        return res.json();
    },

    update: async (id: number, data: Partial<Omit<Quiz, 'id'>>): Promise<Quiz> => {
        const res = await fetch(`/api/quizzes/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || MESSAGES.errors.updateQuiz);
        }
        return res.json();
    },

    delete: async (id: number): Promise<void> => {
        const res = await fetch(`/api/quizzes/${id}`, { method: 'DELETE' });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || MESSAGES.errors.deleteQuiz);
        }
    }
};