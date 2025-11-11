import { transporter } from '../config/mailer.js';

export const sendOTP = (email, code, magicLink) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Verification code',
        html: `
          <p>Your verification code is: <strong>${code}</strong></p>
          <p>Or click the link below to verify:</p>
          <a href="${magicLink}">Verify via this Link</a>
        `,
        text: `Your verification code is : ${code} \n Or click the link below to verify:\n${magicLink}`,
      },
      (err, info) => {
        if (err) {
          console.error('error sending OTP:', err);
          return reject(new Error('failed to send OTP'));
        }
        console.log(`OTP sent to ${email}`);
        resolve(info);
      }
    );
  });
};
