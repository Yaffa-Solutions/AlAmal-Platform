import prisma from "../config/db.js";

export const createOrganization = (data) => {
  const { user_id, ...rest } = data;
  return prisma.organization.create({
    data: {
      ...rest,
      user: { connect: { id: user_id } },
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

export const getRecentInventoryByOrg = (orgId, limit) => {
  return prisma.prosthetic_Inventory.findMany({
    where: { org_id: Number(orgId) },
    orderBy: { updated_at: "desc" },
    take: Number(limit),
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
