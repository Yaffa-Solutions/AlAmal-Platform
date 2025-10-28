import prisma from '../config/db.js';

export const createPatient = (data) => {
  return prisma.patient.create({
    data: data,
  });
};
