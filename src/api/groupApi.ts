import type { Group } from '../models/Group';
import { MESSAGES } from '../constants/messages';

export const groupApi = {
    getAll: async (): Promise<Group[]> => {
        const res = await fetch('/api/groups');
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || MESSAGES.errors.loadGroups);
        }
        return res.json();
    },

    create: async (data: Omit<Group, 'id'>): Promise<Group> => {
        const res = await fetch('/api/groups', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || MESSAGES.errors.createGroup);
        }
        return res.json();
    },

    update: async (id: number, data: Partial<Omit<Group, 'id'>>): Promise<Group> => {
        const res = await fetch(`/api/groups/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(data)
        });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || MESSAGES.errors.updateGroup);
        }
        return res.json();
    },

    delete: async (id: number): Promise<void> => {
        const res = await fetch(`/api/groups/${id}`, { method: 'DELETE' });
        if (!res.ok) {
            const err = await res.json();
            throw new Error(err.message || MESSAGES.errors.deleteGroup);
        }
    }
};