
export const sendOTP = (email, code, magicLink) => {
  return new Promise(async (resolve, reject) => {
    try {
      const response = await fetch("https://api.brevo.com/v3/smtp/email", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "api-key": process.env.BREVO_API_KEY,
        },
        body: JSON.stringify({
          sender: { email: process.env.EMAIL_USER },
          to: [{ email }],
          subject: 'Your Verification code',
          htmlContent: `
          <p>Your verification code is: <strong>${code}</strong></p>
          <p>Or click the link below to verify:</p>
          <a href="${magicLink}">Verify via this Link</a>
        `,
          textContent: `Your verification code is : ${code} \n Or click the link below to verify:\n${magicLink}`,
        }),
      });
      if (!response.ok) {
        const errorData = await response.json();
        console.error('error sending OTP:', errorData);
        return reject(new Error('failed to send OTP'));
      }
      const data = await response.json();
      console.log(`OTP sent to ${email}`);
      resolve(data);
    } catch (error) {
      console.error('error sending OTP:', error);
      reject(new Error('failed to send OTP'));
    }
  });
};

