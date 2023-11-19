
import React, { useState } from 'react';
import styles from '@/styles/ResetPassword.module.css'; 


const ResetPasswordPage = () => {
   const [email, setEmail] = useState('');
   const [message, setMessage] = useState('');


   const handleEmailChange = (event: React.ChangeEvent<HTMLInputElement>) => {
       setEmail(event.target.value);
   };


   const handleSubmit = async (event: React.FormEvent) => {
       event.preventDefault();
       try {
           const response = await fetch('/api/changePassword', {
               method: 'POST',
               headers: {
                   'Content-Type': 'application/json',
               },
               body: JSON.stringify({ email }),
           });


           if (response.ok) {
               setMessage('Reset link sent to your email.');
           } else {
               setMessage('Error sending reset link.');
           }
       } catch (error) {
           console.error('Forgot password error:', error);
           setMessage('An error occurred.');
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
               {message && <p className={styles.message}>{message}</p>}
           </form>
       </div>
   );
};


export default ResetPasswordPage;
