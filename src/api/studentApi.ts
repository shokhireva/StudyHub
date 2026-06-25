import type{ Student } from '../models/Student';
import { MESSAGES } from '../constants/messages';

export const studentApi = {
    getAll: async (groupId?: number): Promise<Student[]> => {
        const url = groupId ? `/api/students?groupId=${groupId}` : '/api/students';
        const res = await fetch(url);
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || MESSAGES.errors.loadStudents);
        }
        return res.json();
    },

    create: async (data: Omit<Student, 'id' | 'groupName'> & { password: string }): Promise<Student> => {
        const res = await fetch('/api/students', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || MESSAGES.errors.createStudent);
        }
        return res.json();
    },

    update: async (id: number, data: Partial<Omit<Student, 'id' | 'login'>>): Promise<Student> => {
        const res = await fetch(`/api/students/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || MESSAGES.errors.updateStudent);
        }
        return res.json();
    },

    delete: async (id: number): Promise<void> => {
        const res = await fetch(`/api/students/${id}`, { method: 'DELETE' });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || MESSAGES.errors.deleteStudent);
        }
    }
};