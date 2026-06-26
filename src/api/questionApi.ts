import { MESSAGES } from '../constants/messages';
import type { Question }from '../models/Question';

export const questionApi = {
    getAll: async (): Promise<Question[]> => {
        const res = await fetch('/api/questions');
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || MESSAGES.errors.loadQuestions);
        }
        return res.json();
    },

    getById: async (id: number): Promise<Question> => {
        const res = await fetch(`/api/questions/${id}`);
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || MESSAGES.errors.loadQuestions);
        }
        return res.json();
    },

    create: async (data: Omit<Question, 'id'>): Promise<Question> => {
        const res = await fetch('/api/questions', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || MESSAGES.errors.createQuestion);
        }
        return res.json();
    },

    update: async (id: number, data: Partial<Omit<Question, 'id'>>): Promise<Question> => {
        const res = await fetch(`/api/questions/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || MESSAGES.errors.updateQuestion);
        }
        return res.json();
    },

    delete: async (id: number): Promise<void> => {
        const res = await fetch(`/api/questions/${id}`, { method: 'DELETE' });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || MESSAGES.errors.deleteQuestion);
        }
    }
};