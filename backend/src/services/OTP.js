import prisma from '../config/db.js';
import { sendOTP } from './sendotp.js';
import crypto from 'crypto';


const generateOTP = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

export const requestOTP = async (user) => {
  try {
    const code = generateOTP();
    const expiresAt = new Date(Date.now() + 3 * 60 * 1000);

    const magicToken = crypto.randomBytes(32).toString('hex');
    const magicTokenHash = crypto.createHash('sha256').update(magicToken).digest('hex');
    const magicExpiresAt = new Date(Date.now() + 15 * 60 * 1000);

    await prisma.emailVerifications.create({
      data: {
        user_id: user.id,
        verification_code: code,
        expires_at: expiresAt,
        is_used: false,
        magic_token_hash: magicTokenHash,
        magic_token_expires_at: magicExpiresAt,
      },
    });
    const magicLink = `${process.env.FRONTEND_BASE_URL}/pages/auth/magic-link?token=${magicToken}`;


    await sendOTP(user.username, code, magicLink);
    return { message: 'OTP sent', username: user.username, magicTokenSent: true };
  } catch (err) {
    console.error('error in requestOTP:', err);
    throw err;
  }
};

export const verifyOTP = async (username, code) => {
  try {
    const user = await prisma.user.findUnique({ where: { username } });

    if (!user) throw new Error('user not found');

    const otp = await prisma.emailVerifications.findFirst({
      where: {
        user_id: user.id,
        verification_code: code,
        is_used: false,
        expires_at: { gt: new Date() },
      },
    });
    if (!otp) throw new Error('otp invalid or expired');

    await prisma.emailVerifications.update({
      where: {
        id: otp.id,
      },
      data: {
        is_used: true,
      },
    });
    return {
      message: 'OTP verified',
      username,
      status: user.status,
      user_id: user.id,
    };
  } catch (err) {
    console.error('error in verify OTP:', err);
    throw err;
  }
};
