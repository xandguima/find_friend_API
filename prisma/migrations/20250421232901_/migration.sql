/*
  Warnings:

  - Added the required column `city` to the `users` table without a default value. This is not possible if the table is not empty.
  - Added the required column `uf` to the `users` table without a default value. This is not possible if the table is not empty.
  - Made the column `role` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `cep` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `address` on table `users` required. This step will fail if there are existing NULL values in that column.
  - Made the column `tel` on table `users` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "users" ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "uf" TEXT NOT NULL,
ALTER COLUMN "role" SET NOT NULL,
ALTER COLUMN "cep" SET NOT NULL,
ALTER COLUMN "address" SET NOT NULL,
ALTER COLUMN "tel" SET NOT NULL;
