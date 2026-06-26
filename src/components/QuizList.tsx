import React from 'react';
import type { Quiz } from '../api/quizApi';
import { MESSAGES } from '../constants/messages';
import '../styles/QuizList.css';

interface QuizListProps {
    quizzes: Quiz[];
    loading: boolean;
    error: string;
    onEdit: (quiz: Quiz) => void;
    onDelete: (id: number) => void;
}

export const QuizList: React.FC<QuizListProps> = ({ quizzes, loading, error, onEdit, onDelete }) => {
    if (loading) return <div className="loading">{MESSAGES.labels.loading}</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="quiz-list-container">
            <div className="table-container">
                <table className="quiz-table">
                    <thead>
                        <tr>
                            <th>{MESSAGES.labels.id}</th>
                            <th>{MESSAGES.placeholders.quizTitle}</th>
                            <th>{MESSAGES.placeholders.quizDuration}</th>
                            <th>{MESSAGES.labels.isOneTime}</th>
                            <th>{MESSAGES.labels.actions}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {quizzes.length === 0 ? (
                            <tr><td colSpan={5} className="no-data">{MESSAGES.labels.noQuizzes}</td></tr>
                        ) : (
                            quizzes.map(quiz => (
                                <tr key={quiz.id}>
                                    <td>{quiz.id}</td>
                                    <td>{quiz.title}</td>
                                    <td>{quiz.durationMinutes}</td>
                                    <td>{quiz.isOneTime ? MESSAGES.labels.yes : MESSAGES.labels.no}</td>
                                    <td>
                                        <div className="actions">
                                            <button className="btn-edit" onClick={() => onEdit(quiz)}>{MESSAGES.labels.editQuiz}</button>
                                            <button className="btn-delete" onClick={() => onDelete(quiz.id)}>{MESSAGES.labels.deleteQuiz}</button>
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