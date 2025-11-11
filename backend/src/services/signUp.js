import prisma from '../config/db.js';

export const signUp = async (username) => {
  const user = await prisma.user.create({
    data: { username, status: 'PENDING' },
  });
  return user;
};

export const findOrCreateUser = async (username) => {
  let user = await prisma.user.findUnique({ where: { username } });
  if (!user) {
    user = await signUp(username);
  }
  return user;
};
