-- CreateEnum
CREATE TYPE "public"."ProstheticName" AS ENUM ('RIGHT_ARM', 'LEFT_ARM', 'RIGHT_LEG', 'LEFT_LEG', 'RIGHT_HAND', 'LEFT_HAND', 'RIGHT_FOOT', 'LEFT_FOOT');

-- CreateEnum
CREATE TYPE "public"."CampaignsStatus" AS ENUM ('ACTIVE', 'COMPLETED', 'CANCELED');

-- CreateTable
CREATE TABLE "public"."Prosthetic_Inventory" (
    "id" SERIAL NOT NULL,
    "name" "public"."ProstheticName" NOT NULL,
    "details" JSONB,
    "updated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Prosthetic_Inventory_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Campaigns" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "target_amount" INTEGER NOT NULL,
    "collected_amount" INTEGER NOT NULL,
    "start_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "end_date" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "status" "public"."CampaignsStatus" NOT NULL,

    CONSTRAINT "Campaigns_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Donations" (
    "id" SERIAL NOT NULL,
    "amount" INTEGER NOT NULL,
    "donated_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "campaigns_id" INTEGER NOT NULL,

    CONSTRAINT "Donations_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."Donations" ADD CONSTRAINT "Donations_campaigns_id_fkey" FOREIGN KEY ("campaigns_id") REFERENCES "public"."Campaigns"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
