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
    }
};