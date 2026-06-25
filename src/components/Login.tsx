import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authStorage } from '../auth/authStorage';
import { MESSAGES } from '../constants/messages';

export const Login: React.FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ login, password })
            });

            const user = await response.json();

            if (!response.ok) {
                throw new Error(user.message || MESSAGES.errors.loginFailed);
            }

            authStorage.setUser(user);

            switch (user.role) {
                case 'Teacher':
                    navigate('/admin');
                    break;
                case 'Student':
                    navigate('/user');
                    break;
                default:
                    throw new Error(MESSAGES.errors.unknownRole);
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : MESSAGES.errors.unknown);
        }
    };

    return (
        <div className="app-container">
            <div className="card card-narrow">
                <h2>{MESSAGES.titles.login}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>{MESSAGES.placeholders.login}</label>
                        <input
                            type="text"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>{MESSAGES.placeholders.password}</label>
                        <div className="password-wrapper">
                            <input
                                type={showPassword ? 'text' : 'password'}
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? 'Скрыть' : 'Показать'}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn-primary btn-full-width">
                        {MESSAGES.labels.login}
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </form>
                <p className="auth-link">
                    Нет аккаунта? <Link to="/register">{MESSAGES.labels.register}</Link>
                </p>
            </div>
        </div>
    );
};