import React, { useState, useEffect } from 'react';
import type { Group } from '../models/Group';
import { studentApi } from '../api/studentApi';
import { groupApi } from '../api/groupApi';
import { MESSAGES } from '../constants/messages';

interface AddStudentModalProps {
    isOpen: boolean;
    onClose: () => void;
    onStudentAdded: () => void;
}

export const AddStudentModal: React.FC<AddStudentModalProps> = ({ isOpen, onClose, onStudentAdded }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [patronymic, setPatronymic] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [groupId, setGroupId] = useState<number | ''>('');
    const [groups, setGroups] = useState<Group[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            groupApi.getAll()
                .then(setGroups)
                .catch(err => setError(err.message));
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await studentApi.create({
                firstName,
                lastName,
                patronymic: patronymic || undefined,
                login,
                password,
                groupId: groupId === '' ? undefined : Number(groupId) 
            });
            onStudentAdded();
            onClose();
            setFirstName('');
            setLastName('');
            setPatronymic('');
            setLogin('');
            setPassword('');
            setGroupId('');
        } catch (err: any) {
            setError(err.message || MESSAGES.errors.createStudent);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{MESSAGES.titles.addStudent}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>{MESSAGES.placeholders.firstName}</label>
                        <input type="text" value={firstName} onChange={e => setFirstName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>{MESSAGES.placeholders.lastName}</label>
                        <input type="text" value={lastName} onChange={e => setLastName(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>{MESSAGES.placeholders.patronymic}</label>
                        <input type="text" value={patronymic} onChange={e => setPatronymic(e.target.value)} />
                    </div>
                    <div className="form-group">
                        <label>{MESSAGES.placeholders.login}</label>
                        <input type="text" value={login} onChange={e => setLogin(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>{MESSAGES.placeholders.password}</label>
                        <input type="password" value={password} onChange={e => setPassword(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label>{MESSAGES.placeholders.group}</label>
                        <select value={groupId} onChange={e => setGroupId(e.target.value === '' ? '' : Number(e.target.value))}>
                            <option value="">{MESSAGES.labels.noGroup}</option>
                            {groups.map(g => <option key={g.id} value={g.id}>{g.name}</option>)}
                        </select>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <div className="modal-actions">
                        <button type="submit" className="btn-save" disabled={loading}>
                            {loading ? MESSAGES.labels.saving : MESSAGES.labels.addStudent}
                        </button>
                        <button type="button" className="btn-cancel" onClick={onClose}>{MESSAGES.labels.cancel}</button>
                    </div>
                </form>
            </div>
        </div>
    );
};