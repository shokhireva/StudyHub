import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { RequireAuth } from './components/RequireAuth';
import { TeacherDashboard } from './components/TeacherDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import './App.css';
import './styles/common.css';

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