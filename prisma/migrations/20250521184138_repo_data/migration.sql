/*
  Warnings:

  - Added the required column `forks` to the `Repository` table without a default value. This is not possible if the table is not empty.
  - Added the required column `issues` to the `Repository` table without a default value. This is not possible if the table is not empty.
  - Added the required column `owner` to the `Repository` table without a default value. This is not possible if the table is not empty.
  - Added the required column `repositoryCreatedAt` to the `Repository` table without a default value. This is not possible if the table is not empty.
  - Added the required column `stars` to the `Repository` table without a default value. This is not possible if the table is not empty.
  - Added the required column `url` to the `Repository` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Repository" ADD COLUMN     "forks" INTEGER NOT NULL,
ADD COLUMN     "issues" INTEGER NOT NULL,
ADD COLUMN     "owner" TEXT NOT NULL,
ADD COLUMN     "repositoryCreatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "stars" INTEGER NOT NULL,
ADD COLUMN     "url" TEXT NOT NULL;
