export interface Quiz {
    id: number;
    title: string;
    durationMinutes: number;
    isOneTime: boolean;
    courseId: number;
}