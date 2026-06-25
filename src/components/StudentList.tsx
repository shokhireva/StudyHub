import React from 'react';
import type { Student } from '../models/Student';
import type { Group } from '../models/Group';
import { MESSAGES } from '../constants/messages';
import './StudentList.css';

interface StudentListProps {
    students: Student[];
    groups: Group[];
    selectedGroupId: number | '';
    onGroupChange: (groupId: number | '') => void;
    loading: boolean;
    error: string;
    onEdit: (student: Student) => void;
    onDelete: (id: number) => void;
}

export const StudentList: React.FC<StudentListProps> = ({
    students,
    groups,
    selectedGroupId,
    onGroupChange,
    loading,
    error,
    onEdit,
    onDelete
}) => {
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const value = e.target.value;
        onGroupChange(value === '' ? '' : Number(value));
    };

    if (loading) return <div className="loading">{MESSAGES.labels.loading}</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="student-list-container">
            <div className="filter-bar">
                <label>{MESSAGES.placeholders.filterByGroup}: </label>
                <select value={selectedGroupId} onChange={handleChange}>
                    <option value="">{MESSAGES.labels.allGroups}</option>
                    {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                </select>
            </div>
            <div className="table-container">
                <table className="student-table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>ФИО</th>
                            <th>{MESSAGES.placeholders.login}</th>
                            <th>{MESSAGES.placeholders.group}</th>
                            <th>{MESSAGES.labels.actions}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {students.length === 0 ? (
                            <tr><td colSpan={5} className="no-data">{MESSAGES.labels.noData}</td></tr>
                        ) : (
                            students.map(student => (
                                <tr key={student.id}>
                                    <td>{student.id}</td>
                                    <td>{[student.lastName, student.firstName, student.patronymic].filter(Boolean).join(' ')}</td>
                                    <td>{student.login}</td>
                                    <td>{student.groupName || MESSAGES.labels.noGroup}</td>
                                    <td>
                                        <div className="actions">
                                            <button className="btn-edit" onClick={() => onEdit(student)}>{MESSAGES.labels.editStudent}</button>
                                            <button className="btn-delete" onClick={() => onDelete(student.id)}>{MESSAGES.labels.deleteStudent}</button>
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