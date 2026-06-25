import { useState, useEffect } from 'react';
import type{ Student } from '../models/Student';
import { studentApi } from '../api/studentApi';

export const useStudents = (refreshTrigger: number, groupId?: number) => {
    const [students, setStudents] = useState<Student[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchStudents = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await studentApi.getAll(groupId);
            setStudents(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStudents();
    }, [refreshTrigger, groupId]);

    return { students, loading, error, refetch: fetchStudents };
};