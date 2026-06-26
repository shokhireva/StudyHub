import React, { useState, useEffect } from 'react';
import { QuestionList } from './QuestionList';
import { AddQuestionModal } from './AddQuestionModal';
import { EditQuestionModal } from './EditQuestionModal';
import { questionApi } from '../api/questionApi';
import type { Question } from '../models/Question'
import { MESSAGES } from '../constants/messages';

export const QuestionManagement: React.FC = () => {
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

    const fetchQuestions = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await questionApi.getAll();
            setQuestions(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchQuestions();
    }, [refreshTrigger]);

    const handleEdit = (question: Question) => {
        setEditingQuestion(question);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm(MESSAGES.confirm.deleteQuestion)) return;
        try {
            await questionApi.delete(id);
            setRefreshTrigger(prev => prev + 1);
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <>
            <div className="toolbar">
                <button className="btn-success" onClick={() => setIsAddModalOpen(true)}>
                    {MESSAGES.labels.addQuestion}
                </button>
            </div>
            <QuestionList
                questions={questions}
                loading={loading}
                error={error}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <AddQuestionModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onQuestionAdded={() => setRefreshTrigger(prev => prev + 1)}
            />
            <EditQuestionModal
                isOpen={isEditModalOpen}
                question={editingQuestion}
                onClose={() => setIsEditModalOpen(false)}
                onQuestionUpdated={() => setRefreshTrigger(prev => prev + 1)}
            />
        </>
    );
};