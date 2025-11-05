import prisma from "../config/db.js";

export const createOrganization = async (data) => {
  console.log("data", data);
  const { user_id, ...rest } = data;

  return await prisma.$transaction(async (tx) => {
    const organization = await tx.organization.create({
      data: {
        ...rest,
        user: { connect: { id: Number(user_id) } },
      },
    });

    await tx.user.update({
      where: { id: Number(user_id) },
      data: { status: "ACTIVE" },
    });

    return organization;
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

export const getOrganizationByUserId = (userId) => {
  return prisma.organization.findFirst({
    where: { user_id: Number(userId) },
    select: { id: true, name: true, type: true },
  });
};



export const getRecentCampaignsByOrg = (orgId, limit) => {
  return prisma.campaigns.findMany({
    where: { org_id: Number(orgId) },
    orderBy: { start_date: "desc" },
    take: Number(limit),
  });
};

export const getActiveCampaignsByOrg = (orgId, limit = 3) => {
  return prisma.campaigns.findMany({
    where: { org_id: Number(orgId), status: "ACTIVE" },
    orderBy: { start_date: "desc" },
    take: Number(limit),
  });
};
