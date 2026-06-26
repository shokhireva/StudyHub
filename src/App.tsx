import React from 'react';
import { HashRouter, Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import { Register } from './components/Register';
import { RequireAuth } from './components/RequireAuth';
import { TeacherDashboard } from './components/TeacherDashboard';
import { StudentDashboard } from './components/StudentDashboard';
import { StudentManagement } from './components/StudentManagement';
import { GroupManagement } from './components/GroupManagement';
import { CourseManagement } from './components/CourseManagement';
import { QuizManagement } from './components/QuizManagement';
import { QuestionManagement } from './components/QuestionManagement';
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
                        <Route index element={<Navigate to="students" replace />} />
                        <Route path="groups" element={<GroupManagement />} />
                        <Route path="courses" element={<CourseManagement />} />
                        <Route path="students" element={<StudentManagement />} />
                        <Route path="quizzes" element={<QuizManagement />} />
                        <Route path="questions" element={<QuestionManagement />} />
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