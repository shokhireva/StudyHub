import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { RequireAuth } from './components/RequireAuth';
import { TeacherDashboard } from './components/TeacherDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { StudentManagement } from './components/StudentManagement';
import './App.css';
import './styles/common.css';

export const App: React.FC = () => {
    return (
        <HashRouter>
            <Routes>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route element={<RequireAuth allowedRoles={['Teacher']} />}>
                    <Route path="/admin" element={<TeacherDashboard />}>
                        <Route path="groups" element={<div>Группы (заглушка)</div>} />
                        <Route path="courses" element={<div>Курсы (заглушка)</div>} />
                        <Route path="students" element={<StudentManagement />} />
                        <Route index element={<Navigate to="students" replace />} />
                    </Route>
                </Route>
                <Route element={<RequireAuth allowedRoles={['Student']} />}>
                    <Route path="/user/*" element={<StudentDashboard />} />
                </Route>
                <Route path="/" element={<Navigate to="/login" />} />
            </Routes>
        </HashRouter>
    );
};