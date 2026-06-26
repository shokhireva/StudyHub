import React, { useState, useEffect } from 'react';
import { groupApi } from '../api/groupApi';
import type { Group } from '../models/Group';
import { MESSAGES } from '../constants/messages';

interface EditGroupModalProps {
    isOpen: boolean;
    group: Group | null;
    onClose: () => void;
    onGroupUpdated: () => void;
}

export const EditGroupModal: React.FC<EditGroupModalProps> = ({ isOpen, group, onClose, onGroupUpdated }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen && group) {
            setName(group.name);
            setDescription(group.description || '');
        }
    }, [isOpen, group]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        if (!group) return;

        try {
            await groupApi.update(group.id, { name, description });
            onGroupUpdated();
            onClose();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !group) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{MESSAGES.titles.editGroup}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>{MESSAGES.placeholders.groupName}</label>
                        <input
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>{MESSAGES.placeholders.groupDescription}</label>
                        <input
                            type="text"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <div className="modal-actions">
                        <button
                            type="submit"
                            className="btn-save"
                            disabled={loading}
                        >
                            {loading ? MESSAGES.labels.saving : MESSAGES.labels.update}
                        </button>
                        <button
                            type="button"
                            className="btn-cancel"
                            onClick={onClose}
                        >
                            {MESSAGES.labels.cancel}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};