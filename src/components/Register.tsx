import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { MESSAGES } from '../constants/messages';

export const Register: React.FC = () => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [error, setError] = useState('');
    const [success, setSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setSuccess(false);

        if (password !== confirmPassword) {
            setError(MESSAGES.errors.passwordMismatch);
            return;
        }
        if (password.length < 6) {
            setError(MESSAGES.errors.passwordTooShort);
            return;
        }

        try {
            const response = await fetch('/api/auth/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ firstName, lastName, login, password })
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.message || MESSAGES.errors.registerFailed);
            }

            setSuccess(true);
            setTimeout(() => navigate('/login'), 2000);
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="app-container">
            <div className="card card-narrow">
                <h2>{MESSAGES.titles.register}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label>{MESSAGES.placeholders.firstName}</label>
                        <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            required
                        />
                    </div>
                    <div className="form-group">
                        <label>{MESSAGES.placeholders.lastName}</label>
                        <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            required
                        />
                    </div>
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
                    <div className="form-group">
                        <label>{MESSAGES.placeholders.confirmPassword}</label>
                        <div className="password-wrapper">
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                required
                            />
                            <button
                                type="button"
                                className="password-toggle"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? 'Скрыть' : 'Показать'}
                            </button>
                        </div>
                    </div>
                    <button type="submit" className="btn-primary btn-full-width">
                        {MESSAGES.labels.register}
                    </button>
                    {error && <p className="error-message">{error}</p>}
                    {success && <p className="success-message">{MESSAGES.success.registrationSuccess}</p>}
                </form>
                <p className="auth-link">
                    Уже есть аккаунт? <Link to="/login">{MESSAGES.labels.login}</Link>
                </p>
            </div>
        </div>
    );
};