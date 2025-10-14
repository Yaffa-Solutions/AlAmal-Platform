/*
  Warnings:

  - A unique constraint covering the columns `[magic_token_hash]` on the table `EmailVerifications` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "EmailVerifications" ADD COLUMN     "magic_token_expires_at" TIMESTAMP(3),
ADD COLUMN     "magic_token_hash" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerifications_magic_token_hash_key" ON "EmailVerifications"("magic_token_hash");
