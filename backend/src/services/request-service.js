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

export const updateRequestStatus = (id, organizationId, statu) => {
  return prisma.request.update({
    where: { id: Number(id) },
    data: { status: statu, organization_id: Number(organizationId) },
  });
};
