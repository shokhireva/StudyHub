import React, { useState, useEffect } from 'react';
import { CourseList } from './CourseList';
import { AddCourseModal } from './AddCourseModal';
import { EditCourseModal } from './EditCourseModal';
import { courseApi } from '../api/courseApi';
import type { Course } from '../api/courseApi';
import { MESSAGES } from '../constants/messages';

export const CourseManagement: React.FC = () => {
    const [courses, setCourses] = useState<Course[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingCourse, setEditingCourse] = useState<Course | null>(null);

    const fetchCourses = async () => {
        setLoading(true);
        setError('');
        try {
            const data = await courseApi.getAll();
            setCourses(data);
        } catch (err: any) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, [refreshTrigger]);

    const handleEdit = (course: Course) => {
        setEditingCourse(course);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm(MESSAGES.confirm.deleteCourse)) return;
        try {
            await courseApi.delete(id);
            setRefreshTrigger(prev => prev + 1);
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <>
            <div className="toolbar">
                <button className="btn-success" onClick={() => setIsAddModalOpen(true)}>
                    {MESSAGES.labels.addCourse}
                </button>
            </div>
            <CourseList
                courses={courses}
                loading={loading}
                error={error}
                onEdit={handleEdit}
                onDelete={handleDelete}
            />
            <AddCourseModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onCourseAdded={() => setRefreshTrigger(prev => prev + 1)}
            />
            <EditCourseModal
                isOpen={isEditModalOpen}
                course={editingCourse}
                onClose={() => setIsEditModalOpen(false)}
                onCourseUpdated={() => setRefreshTrigger(prev => prev + 1)}
            />
        </>
    );
};