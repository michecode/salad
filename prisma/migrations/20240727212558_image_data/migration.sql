/*
  Warnings:

  - Added the required column `altDescription` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `blurHash` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `fullImageUrl` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `museumBio` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `museumLocation` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `rawImageUrl` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `smallImageUrl` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `smallS3ImageUrl` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "altDescription" TEXT NOT NULL,
    "museum" TEXT NOT NULL,
    "museumBio" TEXT NOT NULL,
    "museumLocation" TEXT NOT NULL,
    "price" REAL NOT NULL,
    "rawImageUrl" TEXT NOT NULL,
    "fullImageUrl" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "smallImageUrl" TEXT NOT NULL,
    "smallS3ImageUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "artistName" TEXT NOT NULL,
    "blurHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Product" ("artistName", "createdAt", "description", "id", "imageUrl", "museum", "price", "thumbnailUrl", "title", "updatedAt") SELECT "artistName", "createdAt", "description", "id", "imageUrl", "museum", "price", "thumbnailUrl", "title", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
