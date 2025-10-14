-- DropIndex
DROP INDEX "public"."Prosthetic_Inventory_org_id_key";

-- AlterTable
ALTER TABLE "Prosthetic_Inventory" ADD COLUMN     "is_granted" BOOLEAN NOT NULL DEFAULT false,
ALTER COLUMN "updated_at" DROP NOT NULL;
