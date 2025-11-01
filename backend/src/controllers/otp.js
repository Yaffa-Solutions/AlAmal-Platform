import { requestOTP, verifyOTP } from "../services/otp.js";
import { findOrCreateUser } from "../services/signUp.js";
import {
  requestOTPSchema,
  verifyOTPSchema,
} from "../validation/otpValidetion.js";
import { generateToken } from "../utils/auth/generateToken.js";
import crypto from "crypto";
import prisma from "../config/db.js";

export const requestOTPController = async (req, res, next) => {
  try {
    const validation = requestOTPSchema.safeParse(req.body);
    if (!validation.success) {
      const error = new Error("Validation error");
      error.status = 400;
      error.details = validation.error.errors;
      throw error;
    }
    const { username } = validation.data;
    const user = await findOrCreateUser(username);
    const result = await requestOTP(user);
    return res.status(200).json({
      message: "otp and magic link sent successfully",
      username: result.username,
    });
  } catch (err) {
    console.error("error is requestOtpCon:", err);
    next(err);
  }
};

export const verifyOTPController = async (req, res, next) => {
  try {
    const validation = verifyOTPSchema.safeParse(req.body);
    if (!validation.success) {
      const error = new Error("Validation error");
      error.status = 400;
      error.details = validation.error.errors;
      throw error;
    }

    const { username, code } = validation.data;
    await verifyOTP(username, code);
    const user = await findOrCreateUser(username);
    const token = generateToken(user);
    res.cookie("token", token, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });
    res.status(200).json({
      message: "otp verified successfuly",
      username: user.username,
      status: user.status,
      role: user.role,
      id: user.id,
    });
  } catch (err) {
    console.error("error in verifyOTPCon:", err);
    next(err);
  }
};

export const verifyMagicLinkController = async (req, res, next) => {
  try {
    const { token } = req.body;
    if (!token) throw new Error("Magic token is required");

    const tokenHash = crypto.createHash("sha256").update(token).digest("hex");

    const magicLink = await prisma.emailVerifications.findFirst({
      where: {
        magic_token_hash: tokenHash,
        magic_token_expires_at: { gt: new Date() },
        is_used: false,
      },
    });

    if (!magicLink) {
      return res.status(400).json({ message: "Invalid or expired magic link" });
    }

    const user = await prisma.user.findUnique({
      where: { id: magicLink.user_id },
    });
    if (!user) throw new Error("user not found");

    await prisma.emailVerifications.update({
      where: { id: magicLink.id },
      data: {
        is_used: true,
      },
    });

    const authToken = generateToken(user);
    res.cookie("token", authToken, {
      maxAge: 7 * 24 * 60 * 60 * 1000,
      httpOnly: true,
    });

    res.status(200).json({
      message: "Magic link verified successfully",
      username: user.username,
      status: user.status,
      role: user.role,
      id: user.id,
    });
  } catch (err) {
    console.error("error in verifyMagicLinkCon:", err);
    next(err);
  }
};
