/*
  Warnings:

  - The values [COMPLEATED] on the enum `RequestStatus` will be removed. If these variants are still used in the database, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Organization` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[user_id]` on the table `Patient` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[org_id]` on the table `Prosthetic_Inventory` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `org_id` to the `Campaigns` table without a default value. This is not possible if the table is not empty.
  - Added the required column `donor_id` to the `Donations` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Organization` table without a default value. This is not possible if the table is not empty.
  - Added the required column `user_id` to the `Patient` table without a default value. This is not possible if the table is not empty.
  - Added the required column `org_id` to the `Prosthetic_Inventory` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `name` on the `Prosthetic_Inventory` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('PENDING', 'ACTIVE', 'SUSPENDED');

-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('PATIENT', 'ORGANIZATION', 'DONOR');

-- AlterEnum
BEGIN;
CREATE TYPE "RequestStatus_new" AS ENUM ('PENDING', 'INPROGRESS', 'ASSIGNED', 'COMPLETED', 'REJECTED');
ALTER TABLE "public"."Request" ALTER COLUMN "status" DROP DEFAULT;
ALTER TABLE "Request" ALTER COLUMN "status" TYPE "RequestStatus_new" USING ("status"::text::"RequestStatus_new");
ALTER TYPE "RequestStatus" RENAME TO "RequestStatus_old";
ALTER TYPE "RequestStatus_new" RENAME TO "RequestStatus";
DROP TYPE "public"."RequestStatus_old";
ALTER TABLE "Request" ALTER COLUMN "status" SET DEFAULT 'PENDING';
COMMIT;

-- AlterTable
ALTER TABLE "Campaigns" ADD COLUMN     "org_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Donations" ADD COLUMN     "donor_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Organization" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Patient" ADD COLUMN     "user_id" INTEGER NOT NULL;

-- AlterTable
ALTER TABLE "Prosthetic_Inventory" ADD COLUMN     "org_id" INTEGER NOT NULL,
DROP COLUMN "name",
ADD COLUMN     "name" "ProstheticType" NOT NULL,
ALTER COLUMN "updated_at" DROP DEFAULT;

-- AlterTable
ALTER TABLE "Request" ADD COLUMN     "inventory_id" INTEGER;

-- DropEnum
DROP TYPE "public"."ProstheticName";

-- CreateTable
CREATE TABLE "User" (
    "id" SERIAL NOT NULL,
    "username" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "status" "UserStatus" NOT NULL DEFAULT 'PENDING',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "EmailVerifications" (
    "id" SERIAL NOT NULL,
    "verification_code" TEXT NOT NULL,
    "is_used" BOOLEAN NOT NULL DEFAULT false,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "expires_at" TIMESTAMP(3) NOT NULL,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "EmailVerifications_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Donor" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "Phone" TEXT NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "user_id" INTEGER NOT NULL,

    CONSTRAINT "Donor_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_username_key" ON "User"("username");

-- CreateIndex
CREATE UNIQUE INDEX "Donor_user_id_key" ON "Donor"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Organization_user_id_key" ON "Organization"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Patient_user_id_key" ON "Patient"("user_id");

-- CreateIndex
CREATE UNIQUE INDEX "Prosthetic_Inventory_org_id_key" ON "Prosthetic_Inventory"("org_id");

-- AddForeignKey
ALTER TABLE "EmailVerifications" ADD CONSTRAINT "EmailVerifications_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Patient" ADD CONSTRAINT "Patient_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Organization" ADD CONSTRAINT "Organization_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Request" ADD CONSTRAINT "Request_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "Prosthetic_Inventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Prosthetic_Inventory" ADD CONSTRAINT "Prosthetic_Inventory_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donor" ADD CONSTRAINT "Donor_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Campaigns" ADD CONSTRAINT "Campaigns_org_id_fkey" FOREIGN KEY ("org_id") REFERENCES "Organization"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Donations" ADD CONSTRAINT "Donations_donor_id_fkey" FOREIGN KEY ("donor_id") REFERENCES "Donor"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
