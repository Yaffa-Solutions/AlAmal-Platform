import prisma  from "../config/db.js";

async function main() {
    const newUser = await prisma.user.create({
        data: {
            username: "org2@gmail.com",
            role: "ORGANIZATION",
            status: "ACTIVE",
        },
    });
    const newOrg = await prisma.organization.create({
        data: {
            name: "test org",
            phone: "970591234567",
            type: "test",
            address: { state: "Gaza", street: "Gaza", city: "Gaza" },
            user_id: newUser.id,
        },
    });
    const newCampaign = await prisma.campaigns.create({
        data: {
            image: "image.jpg",
            title: "Test Campaign Title",
            description: "Test Campaign Description",
            target_amount: 10000,
            collected_amount: 0,
            status: "ACTIVE",
            org_id: newOrg.id,
        },
    });
}

main()
    .catch((e) => console.error(e))
    .finally(async () => {
        await prisma.$disconnect();
    });