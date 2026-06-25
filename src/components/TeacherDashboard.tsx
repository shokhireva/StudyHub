import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation, Routes, Route, Navigate } from 'react-router-dom';
import { authStorage } from '../auth/authStorage';
import { StudentList } from './StudentList';
import { AddStudentModal } from './AddStudentModal';
import { EditStudentModal } from './EditStudentModal';
import { useStudents } from '../hooks/useStudents';
import { groupApi } from '../api/groupApi';
import { studentApi } from '../api/studentApi';
import type { Student } from '../models/Student';
import type { Group } from '../models/Group';
import { MESSAGES } from '../constants/messages';

export const TeacherDashboard: React.FC = () => {
    const user = authStorage.getUser();
    const location = useLocation();
    const navigate = useNavigate();
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);
    const [groups, setGroups] = useState<Group[]>([]);
    const [selectedGroupId, setSelectedGroupId] = useState<number | ''>('');
    const { students, loading, error } = useStudents(refreshTrigger, selectedGroupId || undefined);

    useEffect(() => {
        groupApi.getAll().then(setGroups).catch(console.error);
    }, []);

    const handleLogout = () => {
        authStorage.clear();
        navigate('/login');
    };

    const handleStudentAdded = () => {
        setRefreshTrigger(prev => prev + 1);
        setIsAddModalOpen(false);
    };

    const handleStudentUpdated = () => {
        setRefreshTrigger(prev => prev + 1);
        setIsEditModalOpen(false);
    };

    const handleEdit = (student: Student) => {
        setEditingStudent(student);
        setIsEditModalOpen(true);
    };

    const handleDelete = async (id: number) => {
        if (!window.confirm(MESSAGES.confirm.deleteStudent)) return;
        try {
            await studentApi.delete(id);
            setRefreshTrigger(prev => prev + 1);
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div className="app-container">
            <div className="card dashboard-card">
                <div className="dashboard-header">
                    <h2>{MESSAGES.titles.teacherDashboard}</h2>
                    <div>
                        <span className="greeting">{MESSAGES.info.greeting(user?.fullName)}</span>
                        <button className="btn-danger" onClick={handleLogout}>{MESSAGES.labels.logout}</button>
                    </div>
                </div>

                <nav className="nav-tabs">
                    <button className={location.pathname.includes('groups') ? 'active' : ''} onClick={() => navigate('/admin/groups')}>Группы</button>
                    <button className={location.pathname.includes('courses') ? 'active' : ''} onClick={() => navigate('/admin/courses')}>Курсы</button>
                    <button className={location.pathname.includes('students') ? 'active' : ''} onClick={() => navigate('/admin/students')}>Студенты</button>
                </nav>

                <div className="dashboard-content">
                    <Routes>
                        <Route path="groups" element={<div>Группы (заглушка)</div>} />
                        <Route path="courses" element={<div>Курсы (заглушка)</div>} />
                        <Route path="students" element={
                            <>
                                <div className="toolbar">
                                    <button className="btn-success" onClick={() => setIsAddModalOpen(true)}>{MESSAGES.labels.addStudent}</button>
                                </div>
                                <StudentList
                                    students={students}
                                    groups={groups}
                                    selectedGroupId={selectedGroupId}
                                    onGroupChange={setSelectedGroupId}
                                    loading={loading}
                                    error={error}
                                    onEdit={handleEdit}
                                    onDelete={handleDelete}
                                />
                                <AddStudentModal
                                    isOpen={isAddModalOpen}
                                    onClose={() => setIsAddModalOpen(false)}
                                    onStudentAdded={handleStudentAdded}
                                />
                                <EditStudentModal
                                    isOpen={isEditModalOpen}
                                    student={editingStudent}
                                    onClose={() => setIsEditModalOpen(false)}
                                    onStudentUpdated={handleStudentUpdated}
                                />
                            </>
                        } />
                        <Route path="*" element={<Navigate to="students" replace />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};