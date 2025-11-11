import prisma from "../config/db.js";

export const createProsthetic = async (name, details, org_id, quantity) => {
  if (!name || !org_id) throw new Error("Missing required fields");

  return prisma.prosthetic_Inventory.create({
    data: {
      name,
      details,
      org_id: Number(org_id),
      quantity,
    },
  });
};

export async function deleteProsthetic(name, details, count = 1) {
  const parsedDetails =
    typeof details === "string" ? JSON.parse(details) : details;

  const items = await prisma.prosthetic_Inventory.findMany({
    where: {
      name,
      details: { equals: parsedDetails },
    },
    take: count,
  });

  const ids = items.map((i) => i.id);

  if (ids.length === 0) return [];

  return prisma.prosthetic_Inventory.deleteMany({
    where: { id: { in: ids } },
  });
}

export const updateProsthetic = async (
  oldName,
  details,
  newName,
  newDetails,
  quantity
) => {
  if (!oldName || !newName) throw new Error("Missing required fields");

  const parsedDetails =
    typeof details === "string" ? JSON.parse(details) : details;
  const parsedNewDetails =
    typeof newDetails === "string" ? JSON.parse(newDetails) : newDetails;

  return prisma.prosthetic_Inventory.updateMany({
    where: {
      name: oldName,
      details: { equals: parsedDetails },
    },
    data: {
      name: newName,
      details: parsedNewDetails,
      quantity,
    },
  });
};

export const getGrantedProstheticsByOrg = async (orgId) => {
  return prisma.prosthetic_Inventory.findMany({
    where: {
      org_id: Number(orgId),
      requests: {
        some: {},
      },
    },
    include: {
      requests: {
        include: {
          patient: true,
        },
      },
    },
    orderBy: {
      updated_at: "desc",
    },
  });
};

export const getRecentInventoryByOrg = (orgId) => {
  return prisma.prosthetic_Inventory.findMany({
    where: { org_id: Number(orgId) },
    select: {
      id: true,
      name: true,
      details: true,
      is_granted: true,
      quantity: true,
      updated_at: true,
      requests: {
        select: {
          patient: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });
};
