import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useLocation } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { RequireAuth } from './components/RequireAuth';
import { authStorage } from './auth/authStorage';
import { StudentList } from './components/StudentList';
import type { Student } from './components/StudentList';
import { AddStudentModal } from './components/AddStudentModal';
import { EditStudentModal } from './components/EditStudentModal';

const TeacherDashboard: React.FC = () => {
    const user = authStorage.getUser();
    const location = useLocation();
    const [refreshTrigger, setRefreshTrigger] = useState(0);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [editingStudent, setEditingStudent] = useState<Student | null>(null);

    const handleLogout = () => {
        authStorage.clear();
        window.location.href = '/login';
    };

    const handleStudentAdded = () => {
        setRefreshTrigger(prev => prev + 1);
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
        if (!window.confirm('Вы уверены, что хотите удалить этого студента?')) return;
        try {
            const response = await fetch(`/api/students/${id}`, { method: 'DELETE' });
            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || 'Ошибка удаления');
            }
            setRefreshTrigger(prev => prev + 1);
        } catch (err: any) {
            alert(err.message);
        }
    };

    return (
        <div className="app-container">
            <div className="card dashboard-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h2 style={{ margin: 0 }}>Панель преподавателя</h2>
                    <div>
                        <span className="greeting" style={{ marginRight: 16, fontWeight: 500 }}>
                            Здравствуйте, {user?.fullName || 'Преподаватель'}!
                        </span>
                        <button className="btn-danger" onClick={handleLogout}>Выйти</button>
                    </div>
                </div>

                <nav className="nav-tabs">
                    <Link to="/admin/groups" className={location.pathname.includes('groups') ? 'active' : ''}>Группы</Link>
                    <Link to="/admin/courses" className={location.pathname.includes('courses') ? 'active' : ''}>Курсы</Link>
                    <Link to="/admin/students" className={location.pathname.includes('students') ? 'active' : ''}>Студенты</Link>
                </nav>

                <div className='dashboard-content'>
                    <div className='routes-wrapper'>
                        <Routes>
                            <Route path="groups" element={<div>Группы (заглушка)</div>} />
                            <Route path="courses" element={<div>Курсы (заглушка)</div>} />
                            <Route path="students" element={

                                <>
                                    <div style={{ marginBottom: 16 }}>
                                        <button className="btn-success" onClick={() => setIsAddModalOpen(true)}>Добавить студента</button>
                                    </div>
                                    <StudentList
                                        refreshTrigger={refreshTrigger}
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
        </div>
    );
};

const StudentDashboard = () => {
    const user = authStorage.getUser();
    const handleLogout = () => {
        authStorage.clear();
        window.location.href = '/login';
    };

    return (
        <div className="app-container">
            <div className="card dashboard-card">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 16 }}>
                    <h2 style={{ margin: 0 }}>Панель студента</h2>
                    <div>
                        <span className="greeting" style={{ marginRight: 16, fontWeight: 500 }}>
                            Здравствуйте, {user?.fullName || 'Студент'}!
                        </span>
                        <button className="btn-danger" onClick={handleLogout}>Выйти</button>
                    </div>
                </div>
                <p style={{ marginTop: 20, fontSize: 16, color: '#555' }}>
                    Здесь будут отображаться ваши курсы и задания.
                </p>
            </div>
        </div>
    );
};

export const App: React.FC = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<RequireAuth allowedRoles={['Teacher']} />}>
                    <Route path="/admin/*" element={<TeacherDashboard />} />
                </Route>
                <Route element={<RequireAuth allowedRoles={['Student']} />}>
                    <Route path="/user/*" element={<StudentDashboard />} />
                </Route>
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </BrowserRouter>
    );
};