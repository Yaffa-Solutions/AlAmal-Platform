import prisma from "../config/db.js";

export const getMyDonationsService = async (userId) => {

  const donor = await prisma.donor.findUnique({
    where: { user_id: userId },
  });

  if (!donor) {
    return { status: false, error: "Donor not found", donations: [] };
  }

  const donations = await prisma.donations.findMany({
    where: { donor_id: donor.id },
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
