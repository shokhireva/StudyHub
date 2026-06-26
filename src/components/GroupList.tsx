import React from 'react';
import type{ Group } from '../models/Group';
import { MESSAGES } from '../constants/messages';
import '../styles/GroupList.css';

interface GroupListProps {
    groups: Group[];
    loading: boolean;
    error: string;
    onEdit: (group: Group) => void;
    onDelete: (id: number) => void;
}

export const GroupList: React.FC<GroupListProps> = ({ groups, loading, error, onEdit, onDelete }) => {
    if (loading) return <div className="loading">{MESSAGES.labels.loading}</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="group-list-container">
            <div className="table-container">
                <table className="group-table">
                    <thead>
                        <tr>
                            <th>{MESSAGES.labels.id}</th>
                            <th>{MESSAGES.labels.name}</th>
                            <th>{MESSAGES.labels.description}</th>
                            <th>{MESSAGES.labels.actions}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {groups.length === 0 ? (
                            <tr><td colSpan={4} className="no-data">{MESSAGES.labels.noGroups}</td></tr>
                        ) : (
                            groups.map(group => (
                                <tr key={group.id}>
                                    <td>{group.id}</td>
                                    <td>{group.name}</td>
                                    <td>{group.description || '—'}</td>
                                    <td>
                                        <div className="actions">
                                            <button className="btn-edit" onClick={() => onEdit(group)}>{MESSAGES.labels.editGroup}</button>
                                            <button className="btn-delete" onClick={() => onDelete(group.id)}>{MESSAGES.labels.deleteGroup}</button>
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