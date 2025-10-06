import jwt from 'jsonwebtoken';

export const generateToken = (user) => {
  const payload = {
    id: user.id,
    username: user.username,
    role: user.role || null,
    status: user.status || null,
  };

  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '7d' });
};
