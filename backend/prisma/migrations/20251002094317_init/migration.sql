/*
  Warnings:

  - A unique constraint covering the columns `[user_id]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[org_id]` on the table `Prosthetic_Inventory` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[inventory_id]` on the table `Request` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `org_id` to the `Campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donor_id` to the `Donations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `org_id` to the `Prosthetic_Inventory` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `name` on the `Prosthetic_Inventory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "public"."UserStatus" AS ENUM ('PENDING', 'ACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "public"."UserRole" AS ENUM ('PATIENT', 'ORGANIZATION', 'DONOR');

-- AlterTable
ALTER TABLE "public"."Campaigns" ADD COLUMN     "org_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Donations" ADD COLUMN     "donor_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Organization" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Patient" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "public"."Prosthetic_Inventory" ADD COLUMN     "org_id" INTEGER NOT NULL,
DROP COLUMN "name",
ADD COLUMN     "name" "public"."ProstheticType" NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "public"."Request" ADD COLUMN     "inventory_id" INTEGER;

-- DropEnum
DROP TYPE "public"."ProstheticName";

-- CreateTable
CREATE TABLE "public"."User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "role" "public"."UserRole" NOT NULL,
    "status" "public"."UserStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."EmailVerifications" (
    "id" SERIAL NOT NULL,
    "verification_code" TEXT NOT NULL,
    "is_used" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "EmailVerifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Donor" (
    "id" SERIAL NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "country" TEXT NOT NULL,

    CONSTRAINT "Donor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "public"."User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Donor_user_id_key" ON "public"."Donor"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_user_id_key" ON "public"."Organization"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_user_id_key" ON "public"."Patient"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Prosthetic_Inventory_org_id_key" ON "public"."Prosthetic_Inventory"("org_id");

-- CreateIndex
CREATE UNIQUE INDEX "Request_inventory_id_key" ON "public"."Request"("inventory_id");

-- AddForeignKey
ALTER TABLE "public"."EmailVerifications" ADD CONSTRAINT "EmailVerifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Donor" ADD CONSTRAINT "Donor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Patient" ADD CONSTRAINT "Patient_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Organization" ADD CONSTRAINT "Organization_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "public"."User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Request" ADD CONSTRAINT "Request_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "public"."Prosthetic_Inventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Prosthetic_Inventory" ADD CONSTRAINT "Prosthetic_Inventory_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Campaigns" ADD CONSTRAINT "Campaigns_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "public"."Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Donations" ADD CONSTRAINT "Donations_donor_id_fkey" FOREIGN KEY ("donor_id") REFERENCES "public"."Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
