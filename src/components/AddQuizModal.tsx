import React, { useState, useEffect } from 'react';
import { quizApi } from '../api/quizApi';
import { courseApi} from '../api/courseApi';
import type { Course } from '../api/courseApi';
import { MESSAGES } from '../constants/messages';

interface AddQuizModalProps {
    isOpen: boolean;
    onClose: () => void;
    onQuizAdded: () => void;
}

export const AddQuizModal: React.FC<AddQuizModalProps> = ({ isOpen, onClose, onQuizAdded }) => {
    const [title, setTitle] = useState('');
    const [durationMinutes, setDurationMinutes] = useState(10);
    const [isOneTime, setIsOneTime] = useState(true);
    const [courseId, setCourseId] = useState<number | ''>('');
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        if (isOpen) {
            courseApi.getAll()
                .then(setCourses)
                .catch(err => setError(err.message));
        }
    }, [isOpen]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        if (courseId === '') {
            setError(MESSAGES.errors.selectCourseRequired);
            setLoading(false);
            return;
        }

        try {
            await quizApi.create({
                title,
                durationMinutes,
                isOneTime,
                courseId: Number(courseId)
            });
            onQuizAdded();
            onClose();

            setTitle('');
            setDurationMinutes(10);
            setIsOneTime(true);
            setCourseId('');
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
                <h3>{MESSAGES.titles.addQuiz}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>{MESSAGES.placeholders.quizTitle}</label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>{MESSAGES.placeholders.quizDuration}</label>
                        <input
                            type="number"
                            value={durationMinutes}
                            onChange={(e) => setDurationMinutes(Number(e.target.value))}
                            min={1}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>{MESSAGES.labels.course}</label>
                        <select
                            value={courseId}
                            onChange={(e) => setCourseId(e.target.value === '' ? '' : Number(e.target.value))}
                            required
                        >
                            <option value="">{MESSAGES.placeholders.selectCourse}</option>
                            {courses.map(c => (
                                <option key={c.id} value={c.id}>{c.name}</option>
                            ))}
                        </select>
                    </div>
                    <div className="form-group checkbox-group">
                        <label className="checkbox-label">
                            <input
                                type="checkbox"
                                checked={isOneTime}
                                onChange={(e) => setIsOneTime(e.target.checked)}
                            />
                            {MESSAGES.labels.isOneTime}
                        </label>
                    </div>
                    {error && <p className="error-message">{error}</p>}
                    <div className="modal-actions">
                        <button
                            type="submit"
                            className="btn-save"
                            disabled={loading}
                        >
                            {loading ? MESSAGES.labels.saving : MESSAGES.labels.addQuiz}
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