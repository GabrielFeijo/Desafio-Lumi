/*
  Warnings:

  - You are about to drop the column `CompensatedEnergyAmount` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `CompensatedEnergyQuantity` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `DueDate` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `EnergyAmount` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `EnergyQuantity` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `ExemptEnergyAmount` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `ExemptEnergyQuantity` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `InstallationNumber` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `MunicipalPublicLightingContribution` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `ReferenceMonth` on the `Invoice` table. All the data in the column will be lost.
  - You are about to drop the column `ownerId` on the `Invoice` table. All the data in the column will be lost.
  - Added the required column `customerId` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `dueDate` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energyAmount` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `energyQuantity` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `installationNumber` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `municipalPublicLightingContribution` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `referenceMonth` to the `Invoice` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_ownerId_fkey";

-- DropIndex
DROP INDEX "Invoice_ownerId_idx";

-- AlterTable
ALTER TABLE "Customer" ALTER COLUMN "customerNumber" SET DATA TYPE BIGINT;

-- AlterTable
ALTER TABLE "Invoice" DROP COLUMN "CompensatedEnergyAmount",
DROP COLUMN "CompensatedEnergyQuantity",
DROP COLUMN "DueDate",
DROP COLUMN "EnergyAmount",
DROP COLUMN "EnergyQuantity",
DROP COLUMN "ExemptEnergyAmount",
DROP COLUMN "ExemptEnergyQuantity",
DROP COLUMN "InstallationNumber",
DROP COLUMN "MunicipalPublicLightingContribution",
DROP COLUMN "ReferenceMonth",
DROP COLUMN "ownerId",
ADD COLUMN     "compensatedEnergyAmount" DECIMAL(10,2),
ADD COLUMN     "compensatedEnergyQuantity" INTEGER,
ADD COLUMN     "customerId" TEXT NOT NULL,
ADD COLUMN     "dueDate" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "energyAmount" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "energyQuantity" INTEGER NOT NULL,
ADD COLUMN     "exemptEnergyAmount" DECIMAL(10,2),
ADD COLUMN     "exemptEnergyQuantity" INTEGER,
ADD COLUMN     "installationNumber" BIGINT NOT NULL,
ADD COLUMN     "municipalPublicLightingContribution" DECIMAL(10,2) NOT NULL,
ADD COLUMN     "referenceMonth" TEXT NOT NULL;

-- CreateIndex
CREATE INDEX "Invoice_customerId_idx" ON "Invoice"("customerId");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
