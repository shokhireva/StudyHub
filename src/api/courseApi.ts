import { MESSAGES } from '../constants/messages';

export interface Course {
    id: number;
    name: string;
    description?: string;
    isActive: boolean;
}

export const courseApi = {
    getAll: async (): Promise<Course[]> => {
        const res = await fetch('/api/courses');
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || MESSAGES.errors.loadCourses);
        }
        return res.json();
    },
    create: async (data: Omit<Course, 'id'>): Promise<Course> => {
        const res = await fetch('/api/courses', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || MESSAGES.errors.createCourse);
        }
        return res.json();
    },
    update: async (id: number, data: Partial<Omit<Course, 'id'>>): Promise<Course> => {
        const res = await fetch(`/api/courses/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || MESSAGES.errors.updateCourse);
        }
        return res.json();
    },
    delete: async (id: number): Promise<void> => {
        const res = await fetch(`/api/courses/${id}`, { method: 'DELETE' });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || MESSAGES.errors.deleteCourse);
        }
    }
};