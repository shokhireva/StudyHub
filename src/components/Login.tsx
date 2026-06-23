import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { authStorage } from '../auth/authStorage';

export const Login: React.FC = () => {
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');

        try {
            const response = await fetch('/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    login,
                    password
                })
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
            setError(
                err instanceof Error
                    ? err.message
                    : 'Произошла ошибка'
            );
        }
    };

    return (
        <div
            style={{
                minHeight: '100vh',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                fontFamily: 'sans-serif'
            }}
        >
            <div
                style={{
                    background: 'white',
                    padding: '40px',
                    borderRadius: '16px',
                    boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                    maxWidth: '400px',
                    width: '100%'
                }}
            >
                <h2
                    style={{
                        textAlign: 'center',
                        marginBottom: '24px',
                        color: '#333'
                    }}
                >
                    Вход в StudyHub
                </h2>

                <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: '16px' }}>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: '4px',
                                fontWeight: '500'
                            }}
                        >
                            Логин
                        </label>

                        <input
                            type="text"
                            value={login}
                            onChange={(e) => setLogin(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                fontSize: '16px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <div style={{ marginBottom: '20px' }}>
                        <label
                            style={{
                                display: 'block',
                                marginBottom: '4px',
                                fontWeight: '500'
                            }}
                        >
                            Пароль
                        </label>

                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            style={{
                                width: '100%',
                                padding: '10px',
                                border: '1px solid #ddd',
                                borderRadius: '8px',
                                fontSize: '16px',
                                boxSizing: 'border-box'
                            }}
                        />
                    </div>

                    <button
                        type="submit"
                        style={{
                            width: '100%',
                            padding: '12px',
                            background: '#667eea',
                            color: 'white',
                            border: 'none',
                            borderRadius: '8px',
                            fontSize: '16px',
                            fontWeight: 'bold',
                            cursor: 'pointer'
                        }}
                    >
                        Войти
                    </button>

                    {error && (
                        <p
                            style={{
                                color: '#e74c3c',
                                marginTop: '12px',
                                textAlign: 'center'
                            }}
                        >
                            {error}
                        </p>
                    )}
                </form>
            </div>
        </div>
    );
};

