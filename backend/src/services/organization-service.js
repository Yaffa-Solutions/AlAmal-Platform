import prisma from "../config/db.js";

export const createOrganization = async (data) => {
  const { userId, ...rest } = data;

  const [org] = await prisma.$transaction([
    prisma.organization.create({
      data: {
        ...rest,
        user: { connect: { id: userId } },
      },
    }),
    prisma.user.update({
      where: { id: userId },
      data: { status: "ACTIVE" },
    }),
  ]);

  return org;
};
