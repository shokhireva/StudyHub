import React from 'react';
import type { Question } from '../models/Question'
import { MESSAGES } from '../constants/messages';
import '../styles/QuestionList.css';

interface QuestionListProps {
    questions: Question[];
    loading: boolean;
    error: string;
    onEdit: (question: Question) => void;
    onDelete: (id: number) => void;
}

export const QuestionList: React.FC<QuestionListProps> = ({ questions, loading, error, onEdit, onDelete }) => {
    const getTypeLabel = (type: string | number): string => {
        if (typeof type === 'string') {
            switch (type) {
                case 'SingleChoice': return MESSAGES.labels.singleChoice;
                case 'MultipleChoice': return MESSAGES.labels.multipleChoice;
                case 'TextAnswer': return MESSAGES.labels.textAnswer;
                default: return MESSAGES.labels.unknownType;
            }
        } else {
            switch (type) {
                case 1: return MESSAGES.labels.singleChoice;
                case 2: return MESSAGES.labels.multipleChoice;
                case 3: return MESSAGES.labels.textAnswer;
                default: return MESSAGES.labels.unknownType;
            }
        }
    };

    if (loading) return <div className="loading">{MESSAGES.labels.loading}</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="question-list-container">
            <div className="table-container">
                <table className="question-table">
                    <thead>
                        <tr>
                            <th>{MESSAGES.labels.id}</th>
                            <th>{MESSAGES.placeholders.questionText}</th>
                            <th>{MESSAGES.labels.type}</th>
                            <th>{MESSAGES.labels.options}</th>
                            <th>{MESSAGES.labels.actions}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {questions.length === 0 ? (
                            <tr><td colSpan={5} className="no-data">{MESSAGES.labels.noQuestions}</td></tr>
                        ) : (
                            questions.map(question => (
                                <tr key={question.id}>
                                    <td>{question.id}</td>
                                    <td>{question.text}</td>
                                    <td>{getTypeLabel(question.type)}</td>
                                    <td>{question.options?.length || 0}</td>
                                    <td>
                                        <div className="actions">
                                            <button className="btn-edit" onClick={() => onEdit(question)}>{MESSAGES.labels.editQuestion}</button>
                                            <button className="btn-delete" onClick={() => onDelete(question.id)}>{MESSAGES.labels.deleteQuestion}</button>
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