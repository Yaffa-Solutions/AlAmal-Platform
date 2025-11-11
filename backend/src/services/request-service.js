import prisma from "../config/db.js";

export const getRecentRequestsByOrg = (orgId, limit) => {
  return prisma.request.findMany({
    where: { organization_id: Number(orgId) },
    orderBy: { created_at: "desc" },
    take: Number(limit),
    include: {
      patient: true,
    },
  });
};

export const getRecentRequestsAll = (limit, search) => {
  return prisma.request.findMany({
    where: {
      status: "PENDING",
      ...(search
        ? {
            OR: [
              { patient: { name: { contains: search, mode: "insensitive" } } },
              { patient: { city: { contains: search, mode: "insensitive" } } },
            ],
          }
        : {}),
    },
    orderBy: { created_at: "desc" },
    take: limit ? Number(limit) : undefined,
    include: {
      patient: true,
    },
  });
};

export const updateRequestStatus = (
  id,
  status,
  inventory_id,
  organization_id
) => {
  const data = {};

  if (status !== undefined) data.status = status;
  if (organization_id !== undefined)
    data.organization_id = Number(organization_id);

  if (inventory_id !== undefined && inventory_id !== null) {
    data.inventory_id = Number(inventory_id);

    return prisma.$transaction([
      prisma.request.update({
        where: { id: Number(id) },
        data,
      }),
      prisma.prosthetic_Inventory.update({
        where: { id: Number(inventory_id) },
        data: { is_granted: true },
      }),
    ]);
  }

  return prisma.request.update({
    where: { id: Number(id) },
    data,
  });
};
