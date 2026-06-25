import React from 'react';
import { useNavigate } from 'react-router-dom';
import { authStorage } from '../auth/authStorage';
import { MESSAGES } from '../constants/messages';

export const StudentDashboard: React.FC = () => {
    const user = authStorage.getUser();
    const navigate = useNavigate();
    const handleLogout = () => {
        authStorage.clear();
        navigate('/login');
    };
    return (
        <div className="app-container">
            <div className="card dashboard-card">
                <div className="dashboard-header">
                    <h2>{MESSAGES.titles.studentDashboard}</h2>
                    <div>
                        <span className="greeting">{MESSAGES.info.greeting(user?.fullName)}</span>
                        <button className="btn-danger" onClick={handleLogout}>{MESSAGES.labels.logout}</button>
                    </div>
                </div>
                <p className="info-text">{MESSAGES.info.studentDashboardPlaceholder}</p>
            </div>
        </div>
    );
};