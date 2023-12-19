import sgMail from '@sendgrid/mail';

// Set your SendGrid API Key
const api_key='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';
sgMail.setApiKey(api_key);

async function sendResetEmail(email: any, resetLink: string) {
  const message = {
    to: email,
    from: 'chenkeli202@gmail.com', 
    subject: 'Password Reset Link',
    text: `Please use the following link to reset your password: ${resetLink}`,
    html: `<p>Please use the following link to reset your password: <a href="${resetLink}">${resetLink}</a></p>`,
  };

  try {
    await sgMail.send(message);
    //console.log('Email sent');
  } catch (error) {
    console.error('Error sending reset email:', error);
    throw new Error('Failed to send reset email');
  }
}

export default sendResetEmail;
