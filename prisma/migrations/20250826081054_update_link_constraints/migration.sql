/*
  Warnings:

  - A unique constraint covering the columns `[originalUrl]` on the table `Link` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."Link" ALTER COLUMN "shortCode" DROP NOT NULL,
ALTER COLUMN "expireAt" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Link_originalUrl_key" ON "public"."Link"("originalUrl");
