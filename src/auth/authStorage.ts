const AUTH_KEY = 'user';

export interface User {
    id: number;
    fullName: string;
    role: 'teacher' | 'student';
}

export const authStorage = {
    getUser: (): User | null => {
        const data = localStorage.getItem(AUTH_KEY);
        return data ? JSON.parse(data) : null;
    },
    setUser: (user: User): void => {
        localStorage.setItem(AUTH_KEY, JSON.stringify(user));
    },
    clear: (): void => {
        localStorage.removeItem(AUTH_KEY);
    }
};