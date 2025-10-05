/*
  Warnings:

  - Added the required column `type` to the `Organization` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "public"."Organization" ADD COLUMN     "type" TEXT NOT NULL;
