import React, { useState, useEffect } from 'react';

interface Group {
    id: number;
    name: string;
}

interface Student {
    id: number;
    firstName: string;
    lastName: string;
    patronymic?: string;
    login: string;
    groupId?: number;
}

interface EditStudentModalProps {
    isOpen: boolean;
    student: Student | null;
    onClose: () => void;
    onStudentUpdated: () => void;
}

export const EditStudentModal: React.FC<EditStudentModalProps> = ({ isOpen, student, onClose, onStudentUpdated }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [groupId, setGroupId] = useState<number | ''>('');
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen && student) {
            setFirstName(student.firstName);
            setLastName(student.lastName);
            setPatronymic(student.patronymic || '');
            setGroupId(student.groupId ?? '');
            fetch('/api/groups')
                .then(res => res.ok ? res.json() : Promise.reject('Ошибка загрузки групп'))
                .then(data => setGroups(data))
                .catch(err => setError(err));
        }
    }, [isOpen, student]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (!student) return;

        const payload = {
            firstName,
            lastName,
            patronymic: patronymic || undefined,
            groupId: groupId === '' ? null : Number(groupId)
        };

        try {
            const response = await fetch(`/api/students/${student.id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload)
            });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Ошибка обновления студента');
            }
            onStudentUpdated();
            onClose();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !student) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>Редактировать студента</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Имя</label>
                        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Фамилия</label>
                        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>Отчество (опционально)</label>
                        <input type="text" value={patronymic} onChange={e => setPatronymic(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>Группа</label>
                        <select value={groupId} onChange={e => setGroupId(e.target.value === '' ? '' : Number(e.target.value))}>
                            <option value="">Без группы</option>
                            {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                        </select>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <div className="modal-actions">
                        <button type="button" className="btn-cancel" onClick={onClose}>Отмена</button>
                        <button type="submit" className="btn-save" disabled={loading}>
                            {loading ? 'Сохранение...' : 'Обновить'}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};