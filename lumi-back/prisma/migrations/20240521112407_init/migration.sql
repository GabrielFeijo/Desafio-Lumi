-- CreateTable
CREATE TABLE "Customer" (
    "id" TEXT NOT NULL,
    "customerNumber" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Customer_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Invoice" (
    "id" TEXT NOT NULL,
    "InstallationNumber" INTEGER NOT NULL,
    "ReferenceMonth" TEXT NOT NULL,
    "DueDate" TIMESTAMP(3) NOT NULL,
    "EnergyQuantity" INTEGER NOT NULL,
    "EnergyAmount" DECIMAL(10,2) NOT NULL,
    "ExemptEnergyQuantity" INTEGER NOT NULL,
    "ExemptEnergyAmount" DECIMAL(10,2) NOT NULL,
    "CompensatedEnergyQuantity" INTEGER NOT NULL,
    "CompensatedEnergyAmount" DECIMAL(10,2) NOT NULL,
    "MunicipalPublicLightingContribution" DECIMAL(10,2) NOT NULL,
    "ownerId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Invoice_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Customer_customerNumber_key" ON "Customer"("customerNumber");

-- CreateIndex
CREATE INDEX "Invoice_ownerId_idx" ON "Invoice"("ownerId");

-- AddForeignKey
ALTER TABLE "Invoice" ADD CONSTRAINT "Invoice_ownerId_fkey" FOREIGN KEY ("ownerId") REFERENCES "Customer"("id") ON DELETE CASCADE ON UPDATE CASCADE;
