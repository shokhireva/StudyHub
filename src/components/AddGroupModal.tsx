import React, { useState } from 'react';
import { groupApi } from '../api/groupApi';
import { MESSAGES } from '../constants/messages';

interface AddGroupModalProps {
    isOpen: boolean;
    onClose: () => void;
    onGroupAdded: () => void;
}

export const AddGroupModal: React.FC<AddGroupModalProps> = ({ isOpen, onClose, onGroupAdded }) => {
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        try {
            await groupApi.create({ name, description });
            onGroupAdded();
            onClose();
            setName('');
            setDescription('');
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{MESSAGES.titles.addGroup}</h3>
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
                            {loading ? MESSAGES.labels.saving : MESSAGES.labels.addGroup}
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