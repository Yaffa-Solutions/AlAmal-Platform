import prisma from "../config/db.js";

export const createOrganization = (data) => {
  console.log("data is:", data);

  const { userId, ...rest } = data;
  return prisma.organization.create({
    data: {
      ...rest,
      user: { connect: { id: userId } },
    },
  });
};
