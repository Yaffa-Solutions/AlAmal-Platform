import prisma from "../config/db.js";

export const createProsthetic = async (name, details, org_id) => {
  if (!name || !org_id) throw new Error("Missing required fields");

  return prisma.prosthetic_Inventory.create({
    data: {
      name,
      details,
      org_id: Number(org_id),
    },
  });
};
