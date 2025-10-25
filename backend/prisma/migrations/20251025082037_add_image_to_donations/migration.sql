/*
  Warnings:

  - Added the required column `image` to the `Campaigns` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Campaigns" ADD COLUMN     "image" TEXT NOT NULL;
