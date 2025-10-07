import { requestOTP, verifyOTP } from '../services/OTP.js';
import { findOrCreateUser } from '../services/signUp.js';
import {
  requestOTPSchema,
  verifyOTPSchema,
} from '../validation/otpValidetion.js';
import { generateToken } from '../utils/auth/generateToken.js';

export const requestOTPController = async (req, res) => {
  try {
    const validation = requestOTPSchema.safeParse(req.body);
    if (!validation.success) {
      const error = new Error('Validation error');
      error.status = 400;
      error.details = validation.error.errors;
      throw error;
    }
    const { username } = validation.data;
    const user = await findOrCreateUser(username);
    const result = await requestOTP(user);
    return res.status(200).json({
      message: 'otp send successfuly',
      username: result.username,
    });
  } catch (err) {
    console.error('error is requestOtpCon:', err);
    next(err);
  }
};

export const verifyOTPController = async (req, res) => {
  try {
    const validation = verifyOTPSchema.safeParse(req.body);
    if (!validation.success) {
      const error = new Error('Validation error');
      error.status = 400;
      error.details = validation.error.errors;
      throw error;
    }

    const { username, code } = validation.data;
    await verifyOTP(username, code);
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
    next(err);
  }
};
