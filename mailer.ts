// utils/mailer.ts
import nodemailer, { Transporter } from 'nodemailer';

interface MailerConfig {
  host: string;
  port: number;
  secure: boolean;
  auth: {
    user: string;
    pass: string;
  };
}

const sendResetEmail = async (email: string, resetLink: string): Promise<void> => {
    const mailerConfig: MailerConfig = {
        host: 'smtp.example.com', // Replace with your mail server host
        port: 587,
        secure: false, // true for 465, false for other ports
        auth: {
            user: 'your-email@example.com', // Replace with your email
            pass: 'your-password', // Replace with your email password or SMTP token
        },
    };

    const transporter: Transporter = nodemailer.createTransport(mailerConfig);

    try {
        const info = await transporter.sendMail({
            from: '"Your App Name" <your-email@example.com>', // Sender address
            to: email, // List of receivers (user's email)
            subject: 'Password Reset Request', // Subject line
            text: 'Please use the following link to reset your password:', // Plain text body
            html: `<b>Please use the following link to reset your password:</b><br><a href="${resetLink}">${resetLink}</a>`, // HTML body
        });

        console.log('Message sent: %s', info.messageId);
    } catch (error) {
        console.error('Error sending email:', error);
        throw error; // or handle error as needed
    }
};

export default sendResetEmail;

