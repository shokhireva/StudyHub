import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { RequireAuth } from './components/RequireAuth';
import { authStorage } from './auth/authStorage';

const TeacherDashboard = () => {
    const user = authStorage.getUser();
    const handleLogout = () => {
        authStorage.clear();
        window.location.href = '/login';
    };
    return (
        <div style={{ padding: 20 }}>
            <h2>Панель преподавателя</h2>
            <p>Здравствуйте, {user?.fullName || 'Преподаватель'}!</p>
            <button onClick={handleLogout}>Выйти</button>
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
        <div style={{ padding: 20 }}>
            <h2>Панель студента</h2>
            <p>Здравствуйте, {user?.fullName || 'Студент'}!</p>
            <button onClick={handleLogout}>Выйти</button>
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