import React, { useState, useEffect } from 'react';
import { questionApi } from '../api/questionApi';
import { quizApi } from '../api/quizApi';
import type { Quiz } from '../api/quizApi';
import type { Question } from '../api/questionApi';
import { MESSAGES } from '../constants/messages';
import '../styles/QuestionModal.css';

interface EditQuestionModalProps {
    isOpen: boolean;
    question: Question | null;
    onClose: () => void;
    onQuestionUpdated: () => void;
}

export const EditQuestionModal: React.FC<EditQuestionModalProps> = ({ isOpen, question, onClose, onQuestionUpdated }) => {
    const [text, setText] = useState('');
    const [type, setType] = useState<number>(1);
    const [quizId, setQuizId] = useState<number | ''>('');
    const [options, setOptions] = useState<{ text: string; isCorrect: boolean }[]>([]);
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

   
    useEffect(() => {
        if (isOpen && question) {
            setText(question.text);
            let typeValue: number;
            if (typeof question.type === 'string') {
                const typeMap: Record<string, number> = {
                    'SingleChoice': 1,
                    'MultipleChoice': 2,
                    'TextAnswer': 3
                };
                typeValue = typeMap[question.type] ?? 1;
            } else {
                typeValue = question.type;
            }
            setType(typeValue);
            setQuizId(question.quizId);
            setOptions(question.options.map(o => ({ text: o.text, isCorrect: o.isCorrect })));
        }
    }, [isOpen, question]);

   
    useEffect(() => {
        if (isOpen) {
            quizApi.getAll()
                .then(setQuizzes)
                .catch(err => setError(err.message));
        }
    }, [isOpen]);

   
    useEffect(() => {
        if (type === 1 || type === 2) {
            setOptions(prev => prev.map(o => ({ ...o, isCorrect: false })));
        }
    }, [type]);

    const handleAddOption = () => {
        setOptions([...options, { text: '', isCorrect: false }]);
    };

    const handleRemoveOption = (index: number) => {
        if (options.length <= 2) {
            setError(MESSAGES.errors.atLeastTwoOptions);
            return;
        }
        setOptions(options.filter((_, i) => i !== index));
        setError('');
    };

    const handleOptionChange = (index: number, field: 'text' | 'isCorrect', value: string | boolean) => {
        setOptions(prevOptions => {
            const newOptions = [...prevOptions];
            if (field === 'text') {
                newOptions[index].text = value as string;
                return newOptions;
            } else {
                if (type === 1) {
                    return newOptions.map((opt, i) => ({
                        ...opt,
                        isCorrect: i === index ? (value as boolean) : false
                    }));
                } else {
                    newOptions[index].isCorrect = value as boolean;
                    return newOptions;
                }
            }
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');
        if (!question) return;

        if (quizId === '') {
            setError(MESSAGES.errors.selectQuizRequired);
            setLoading(false);
            return;
        }

       
        let optionsToSend = options.filter(o => o.text.trim() !== '');
        if (type === 3) {
            optionsToSend = [];
        }
       

        if (type === 1 || type === 2) {
            if (optionsToSend.length < 2) {
                setError(MESSAGES.errors.atLeastTwoOptions);
                setLoading(false);
                return;
            }
            const hasCorrect = optionsToSend.some(o => o.isCorrect);
            if (!hasCorrect) {
                setError(MESSAGES.errors.atLeastOneCorrectOption);
                setLoading(false);
                return;
            }
            if (type === 1) {
                const correctCount = optionsToSend.filter(o => o.isCorrect).length;
                if (correctCount !== 1) {
                    setError(MESSAGES.errors.exactlyOneCorrectOption);
                    setLoading(false);
                    return;
                }
            }
        }

        try {
            await questionApi.update(question.id, {
                text,
                type,
                quizId: Number(quizId),
                options: optionsToSend
            });
            onQuestionUpdated();
            onClose();
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen || !question) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <h3>{MESSAGES.titles.editQuestion}</h3>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>{MESSAGES.placeholders.questionText}</label>
                        <textarea
                            value={text}
                            onChange={(e) => setText(e.target.value)}
                            required
                            rows={3}
                        />
                    </div>
                    <div className="form-group">
                        <label>{MESSAGES.labels.type}</label>
                        <select value={type} onChange={(e) => setType(Number(e.target.value))}>
                            <option value={1}>{MESSAGES.labels.singleChoice}</option>
                            <option value={2}>{MESSAGES.labels.multipleChoice}</option>
                            <option value={3}>{MESSAGES.labels.textAnswer}</option>
                        </select>
                    </div>
                    <div className="form-group">
                        <label>{MESSAGES.labels.quiz}</label>
                        <select
                            value={quizId}
                            onChange={(e) => setQuizId(e.target.value === '' ? '' : Number(e.target.value))}
                            required
                        >
                            <option value="">{MESSAGES.placeholders.selectQuiz}</option>
                            {quizzes.map(q => (
                                <option key={q.id} value={q.id}>{q.title}</option>
                            ))}
                        </select>
                    </div>

                    {(type === 1 || type === 2) && (
                        <div className="form-group">
                            <label>{MESSAGES.labels.options}</label>
                            {options.map((opt, index) => (
                                <div key={index} className="option-row">
                                    <input
                                        type="text"
                                        value={opt.text}
                                        onChange={(e) => handleOptionChange(index, 'text', e.target.value)}
                                        placeholder={MESSAGES.placeholders.optionText}
                                        className="option-input"
                                    />
                                    <label className="option-correct-label">
                                        <input
                                            type={type === 1 ? 'radio' : 'checkbox'}
                                            name="correctOption"
                                            checked={opt.isCorrect}
                                            onChange={(e) => handleOptionChange(index, 'isCorrect', e.target.checked)}
                                        />
                                        {MESSAGES.labels.correct}
                                    </label>
                                    <button
                                        type="button"
                                        className="btn-danger option-remove-btn"
                                        onClick={() => handleRemoveOption(index)}
                                    >
                                        {MESSAGES.labels.removeOption}
                                    </button>
                                </div>
                            ))}
                            <button
                                type="button"
                                className="btn-success"
                                onClick={handleAddOption}
                            >
                                {MESSAGES.labels.addOption}
                            </button>
                        </div>
                    )}

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