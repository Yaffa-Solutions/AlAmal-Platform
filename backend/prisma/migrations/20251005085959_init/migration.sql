/*
  Warnings:

  - You are about to drop the column `Phone` on the `Donor` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[inventory_id]` on the table `Request` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `country` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `phone` to the `Donor` table without a default value. This is not possible if the table is not empty.
  - Added the required column `type` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Donor" DROP COLUMN "Phone",
ADD COLUMN     "country" TEXT NOT NULL,
ADD COLUMN     "phone" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "public"."Organization" ADD COLUMN     "professionalLicense" TEXT,
ADD COLUMN     "registrationCertificate" TEXT,
ADD COLUMN     "type" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Request_inventory_id_key" ON "public"."Request"("inventory_id");
