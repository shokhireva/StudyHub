import React, { useState, useEffect } from 'react';
import { QuizList } from './QuizList';
import { AddQuizModal } from './AddQuizModal';
import { EditQuizModal } from './EditQuizModal';
import { quizApi } from '../api/quizApi';
import type { Quiz } from '../api/quizApi';
import { MESSAGES } from '../constants/messages';

export const QuizManagement: React.FC = () => {
    const [quizzes, setQuizzes] = useState<Quiz[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingQuiz, setEditingQuiz] = useState<Quiz | null>(null);

    const fetchQuizzes = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await quizApi.getAll();
            setQuizzes(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, [refreshTrigger]);

    const handleEdit = (quiz: Quiz) => {
        setEditingQuiz(quiz);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm(MESSAGES.confirm.deleteQuiz)) return;
        try {
            await quizApi.delete(id);
            setRefreshTrigger(prev => prev + 1);
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <>
            <div className="toolbar">
                <button className="btn-success" onClick={() => setIsAddModalOpen(true)}>
                    {MESSAGES.labels.addQuiz}
                </button>
            </div>
            <QuizList
                quizzes={quizzes}
                loading={loading}
                error={error}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <AddQuizModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onQuizAdded={() => setRefreshTrigger(prev => prev + 1)}
            />
            <EditQuizModal
                isOpen={isEditModalOpen}
                quiz={editingQuiz}
                onClose={() => setIsEditModalOpen(false)}
                onQuizUpdated={() => setRefreshTrigger(prev => prev + 1)}
            />
        </>
    );
};