import React from 'react';
import type { Course } from '../api/courseApi';
import { MESSAGES } from '../constants/messages';
import '../styles/CourseList.css';

interface CourseListProps {
    courses: Course[];
    loading: boolean;
    error: string;
    onEdit: (course: Course) => void;
    onDelete: (id: number) => void;
}

export const CourseList: React.FC<CourseListProps> = ({ courses, loading, error, onEdit, onDelete }) => {
    if (loading) return <div className="loading">{MESSAGES.labels.loading}</div>;
    if (error) return <div className="error-message">{error}</div>;

    return (
        <div className="course-list-container">
            <div className="table-container">
                <table className="course-table">
                    <thead>
                        <tr>
                            <th>{MESSAGES.labels.id}</th>
                            <th>{MESSAGES.placeholders.courseName}</th>
                            <th>{MESSAGES.placeholders.courseDescription}</th>
                            <th>{MESSAGES.labels.isActive}</th>
                            <th>{MESSAGES.labels.actions}</th>
                        </tr>
                    </thead>
                    <tbody>
                        {courses.length === 0 ? (
                            <tr><td colSpan={5} className="no-data">{MESSAGES.labels.noCourses}</td></tr>
                        ) : (
                            courses.map(course => (
                                <tr key={course.id}>
                                    <td>{course.id}</td>
                                    <td>{course.name}</td>
                                    <td>{course.description || '—'}</td>
                                    <td>{course.isActive ? MESSAGES.labels.yes : MESSAGES.labels.no}</td>
                                    <td>
                                        <div className="actions">
                                            <button className="btn-edit" onClick={() => onEdit(course)}>{MESSAGES.labels.editCourse}</button>
                                            <button className="btn-delete" onClick={() => onDelete(course.id)}>{MESSAGES.labels.deleteCourse}</button>
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