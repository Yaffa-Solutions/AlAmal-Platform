import { requestOTP, verifyOTP } from '../services/OTP.js';
import { findOrCreateUser } from '../services/signUp.js';
import {
  requestOTPSchema,
  verifyOTPSchema,
} from '../validation/otpValidetion.js';
import { generateToken } from '../utils/auth/generateToken.js';

export const requestOTPController = async (req, res) => {
  const validation = requestOTPSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      message: 'Validation error',
      errors: validation.error.errors,
    });
  }
  const { username } = validation.data;

  try {
    const user = await findOrCreateUser(username);
    const result = await requestOTP(user);
    return res.status(200).json({
      message: 'otp send successfuly',
      username: result.username,
    });
  } catch (err) {
    console.error('error is requestOtpCon:', err);
    return res
      .status(500)
      .json({ message: 'failed to send otp ', error: err.message });
  }
};

export const verifyOTPController = async (req, res) => {
  const validation = verifyOTPSchema.safeParse(req.body);
  if (!validation.success) {
    return res.status(400).json({
      message: 'Validation error',
      errors: validation.error.errors,
    });
  }

  const { username, code } = validation.data;

  try {
    const result = await verifyOTP(username, code);
    const user = await findOrCreateUser(username);
    const token = generateToken(user);
    res.cookie('token', token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({
      message: 'otp verified successfuly',
      username: user.username,
      status: user.status,
    });
  } catch (err) {
    console.error('error in verifyOTPCon:', err);
    return res
      .status(400)
      .json({ message: 'otp  verification failed', error: err.message });
  }
};
