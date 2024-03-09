const nodemailer = require('nodemailer');

// Create a transporter
module.exports.transporter = nodemailer.createTransport({
  service: 'gmail', // Use your preferred email service
  auth: {
    user: process.env.NODEMAILER_EMAIL, // Your email
    pass: process.env.NODEMAILER_PASSWORD // Your email account password or app-specific password
  }
});

// Create email template
module.exports.createEmailTemplate = (user) => {
  return `
    <div style="margin: 24px;">
      <h1>Valida tu email</h1>
      <p>Hola ${user.username} 👋🏻, ¡Gracias por registrarte en <strong>planesmadrid</strong>!</p>
      <p>Haz clic aquí para verificar tu email</p>
      <a href="http://localhost:5173/activate/${user.activationToken}" style="background-color: green;color: whitesmoke;padding: 8px 12px;border-radius: 4px;text-decoration: none;">
        Activar cuenta
      </a>
    </div>
  `;
};