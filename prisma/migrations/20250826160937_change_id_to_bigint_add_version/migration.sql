/*
  Warnings:

  - The primary key for the `Link` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Link` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Link" DROP CONSTRAINT "Link_pkey",
ADD COLUMN     "version" INTEGER NOT NULL DEFAULT 1,
DROP COLUMN "id",
ADD COLUMN     "id" BIGSERIAL NOT NULL,
ADD CONSTRAINT "Link_pkey" PRIMARY KEY ("id");
