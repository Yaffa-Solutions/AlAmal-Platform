import prisma from "../config/db.js";

export async function getAllCampaigns() {
  const campaigns = await prisma.campaigns.findMany({
    where: {
      NOT: { status: "CANCELED" },
    },
    include: {
      organization: {
        select: {
          id: true,
          name: true,
          phone: true,
        },
      },
    },
    orderBy: { id: "desc" },
  });

  return campaigns;
}

