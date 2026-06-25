import React, { useEffect, useState } from 'react';

export interface Student {
    id: number;
    firstName: string;
    lastName: string;
    patronymic?: string;
    login: string;
    groupId?: number;
    groupName?: string;
}

interface Group {
    id: number;
    name: string;
}

interface StudentListProps {
    refreshTrigger?: number;
    onEdit?: (student: Student) => void;
    onDelete?: (id: number) => void;
}

export const StudentList: React.FC<StudentListProps> = ({ refreshTrigger = 0, onEdit, onDelete }) => {
    const [students, setStudents] = useState<Student[]>([]);
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<number | ''>('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');

    const fetchStudents = async (groupId?: number) => {
        setLoading(true);
        setError('');
        try {
            const url = groupId ? `/api/students?groupId=${groupId}` : '/api/students';
            const response = await fetch(url);
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Ошибка загрузки студентов');
            }
            const data = await response.json();
            setStudents(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    const fetchGroups = async () => {
        try {
            const response = await fetch('/api/groups');
            if (!response.ok) throw new Error('Ошибка загрузки групп');
            const data = await response.json();
            setGroups(data);
        } catch (err: any) {
            console.error(err.message);
        }
    };

    useEffect(() => {
        fetchGroups();
    }, []);

    useEffect(() => {
        fetchStudents(selectedGroupId || undefined);
    }, [selectedGroupId, refreshTrigger]);

    const handleGroupChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        setSelectedGroupId(value === '' ? '' : Number(value));
    };

    if (loading) return <div>Загрузка...</div>;
    if (error) return <div style={{ color: 'red' }}>{error}</div>;

    return (
        <div className='student-list-container'>
            <div style={{ marginBottom: 16 }}>
                <label style={{ fontWeight: 500, marginRight: 8 }}>Фильтр по группе: </label>
                <select value={selectedGroupId} onChange={handleGroupChange} style={{ padding: 6, borderRadius: 4, border: '1px solid #ccc' }}>
                    <option value="">Все группы</option>
                    {groups.map(group => (
                        <option key={group.id} value={group.id}>{group.name}</option>
                    ))}
                </select>
            </div>
            <div className="table-container">
                <table className="student-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ФИО</th>
                            <th>Логин</th>
                            <th>Группа</th>
                            <th>Действия</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length === 0 ? (
                            <tr><td colSpan={5} className="no-data">Студентов не найдено</td></tr>
                        ) : (
                            students.map(student => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{[student.lastName, student.firstName, student.patronymic].filter(Boolean).join(' ')}</td>
                                    <td>{student.login}</td>
                                    <td>{student.groupName || 'Без группы'}</td>
                                    <td>
                                        <div className="actions">
                                            {onEdit && <button className="btn-primary" onClick={() => onEdit(student)}>Редактировать</button>}
                                            {onDelete && <button className="btn-danger" onClick={() => onDelete(student.id)}>Удалить</button>}
                                        </div>
                                    </td>
                                </tr>
                            ))
                        )}
                    </tbody>
                </table>
            </div>
        </div>
    );
};