import prisma from "../config/db.js";

export const getMyDonationsService = async (donor_id) => {
  const donations = await prisma.donations.findMany({
    where: { donor_id },
    include: {
      campaigns: {
        select: {
          title: true,
          organization: {
            select: {
              name: true,
            },
          },
        },
      },
    },
    orderBy: { donated_at: "desc" },
  });

  const formattedDonations = donations.map((d) => ({
    amount: d.amount,
    date: d.donated_at,
    campaign: d.campaigns.title,
    organization: d.campaigns.organization.name,
    paymentMethod: "Credit Card",
  }));

  return formattedDonations;
};
