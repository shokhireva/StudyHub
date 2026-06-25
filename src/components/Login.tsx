import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { authStorage } from '../auth/authStorage';

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
                throw new Error(user.message || 'Ошибка входа');
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
                    throw new Error('Неизвестная роль пользователя');
            }
        } catch (err) {
            setError(err instanceof Error ? err.message : 'Произошла ошибка');
        }
    };

    return (
        <div className="app-container">
            <div className="card" style={{ maxWidth: 400 }}>
                <h2>Вход в StudyHub</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>Логин</label>
                        <input
                            type="text"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>Пароль</label>
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
                    <button type="submit" className="btn-primary" style={{ width: '100%' }}>
                        Войти
                    </button>
                    {error && <p className="error-message">{error}</p>}
                </form>
                <p className="auth-link">
                    Нет аккаунта? <Link to="/register">Зарегистрироваться</Link>
                </p>
            </div>
        </div>
    );
};