export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    patronymic?: string;
    login: string;
    groupId?: number;
    groupName?: string;
}