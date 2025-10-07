import prisma from "../config/db.js";

export const createOrganization = (data) => {
  const { userId, ...rest } = data;
  return prisma.organization.create({
    data: {
      ...rest,
      user: { connect: { id: userId } },
    },
  });
};

export const getOrganizationById = (id) => {
  return prisma.organization.findUnique({
    where: { id: Number(id) },
    include: {
      _count: {
        select: {
          inventory: true,
          requests: true,
          campaigns: true,
        },
      },
    },
  });
};
