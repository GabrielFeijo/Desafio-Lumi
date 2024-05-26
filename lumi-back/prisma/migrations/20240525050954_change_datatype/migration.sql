/*
  Warnings:

  - Added the required column `pdfUrl` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Added the required column `totalAmount` to the `Invoice` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `customerId` on the `Invoice` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- DropForeignKey
ALTER TABLE "Invoice" DROP CONSTRAINT "Invoice_customerId_fkey";

-- AlterTable
ALTER TABLE "Invoice" ADD COLUMN     "pdfUrl" TEXT NOT NULL,
ADD COLUMN     "totalAmount" DECIMAL(10,2) NOT NULL,
ALTER COLUMN "compensatedEnergyQuantity" SET DATA TYPE DECIMAL(65,30),
DROP COLUMN "customerId",
ADD COLUMN     "customerId" BIGINT NOT NULL,
ALTER COLUMN "energyQuantity" SET DATA TYPE DECIMAL(65,30),
ALTER COLUMN "exemptEnergyQuantity" SET DATA TYPE DECIMAL(65,30);

-- CreateIndex
CREATE INDEX "Invoice_customerId_idx" ON "Invoice"("customerId");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_customerId_fkey" FOREIGN KEY ("customerId") REFERENCES "Customer"("customerNumber") ON DELETE CASCADE ON UPDATE CASCADE;
