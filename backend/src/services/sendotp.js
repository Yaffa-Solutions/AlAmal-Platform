import { transporter } from '../config/mailer.js';

export const sendOTP = (email, code) => {
  return new Promise((resolve, reject) => {
    transporter.sendMail(
      {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Your Verification code',
        text: `Your verification code is : ${code}`,
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
