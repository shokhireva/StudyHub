import React from 'react';
import { useNavigate, useLocation, Outlet } from 'react-router-dom';
import { authStorage } from '../auth/authStorage';
import { MESSAGES } from '../constants/messages';

export const TeacherDashboard: React.FC = () => {
    const user = authStorage.getUser();
    const location = useLocation();
    const navigate = useNavigate();

    const handleLogout = () => {
        authStorage.clear();
        navigate('/login');
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
                    <button className={location.pathname.includes('/admin/groups') ? 'active' : ''} onClick={() => navigate('/admin/groups')}>Группы</button>
                    <button className={location.pathname.includes('/admin/courses') ? 'active' : ''} onClick={() => navigate('/admin/courses')}>Курсы</button>
                    <button className={location.pathname.includes('/admin/students') ? 'active' : ''} onClick={() => navigate('/admin/students')}>Студенты</button>
                    <button className={location.pathname.includes('/admin/quizzes') ? 'active' : ''} onClick={() => navigate('/admin/quizzes')}>Квизы</button>
                    <button className={location.pathname.includes('/admin/questions') ? 'active' : ''} onClick={() => navigate('/admin/questions')}>Вопросы</button>
                </nav>

                <div className="dashboard-content">
                    <Outlet />
                </div>
            </div>
        </div>
    );
};