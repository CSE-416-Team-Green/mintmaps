import React, { useState } from 'react';
import styles from '@/styles/ResetPassword.module.css'; 
import AuthContext from '@/components/authContext';
import InvalidAuthError from '@/components/InvalidAuthError';

const ResetPasswordPage = () => {
    const authContext = React.useContext(AuthContext);
    if(!authContext.isLoggedIn) return <InvalidAuthError />;

    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');

    const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    };

    const handleSubmit = async (event: React.FormEvent) => {
        event.preventDefault();
        setMessage('Processing...');
        try {
            const response = await fetch('/api/sendResetLink', { 
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            if (response.ok) {
                setMessage('A reset link has been sent to your email.');
            } else {
                const errorData = await response.json();
                setMessage(errorData.message || 'Error sending reset link.');
            }
        } catch (error) {
            console.error('Error sending reset link:', error);
            setMessage('An error occurred while sending the reset link.');
        }
    };

    return (
        <div className={styles.container}>
            <form onSubmit={handleSubmit} className={styles.form}>
                <input
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    className={styles.input}
                    placeholder="Enter your email"
                    required
                />
                <button type="submit" className={styles.button}>Send Reset Link</button>
                <p className={styles.message}>{message}</p>
            </form>
        </div>
    );
};

export default ResetPasswordPage;
