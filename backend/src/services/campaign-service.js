import prisma from "../config/db.js";

export const getRecentCampaigns = async (orgId) => {
  return prisma.campaigns.findMany({
    where: { org_id: Number(orgId) },
    orderBy: { start_date: "desc" },
  });
};

export const createCampaign = async (data) => {
  return prisma.campaigns.create({ data });
};

export const updateCampaign = async (id, data) => {
  return prisma.campaigns.update({
    where: { id: Number(id) },
    data,
  });
};

export const deleteCampaign = async (id) => {
  return prisma.campaigns.delete({
    where: { id: Number(id) },
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
