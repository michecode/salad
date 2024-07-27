/*
  Warnings:

  - You are about to drop the column `artistName` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `smallS3ImageUrl` on the `Product` table. All the data in the column will be lost.
  - You are about to drop the column `title` on the `Product` table. All the data in the column will be lost.
  - You are about to alter the column `price` on the `Product` table. The data in that column could be lost. The data in that column will be cast from `Float` to `Int`.
  - Added the required column `museumProfilePicture` to the `Product` table without a default value. This is not possible if the table is not empty.
  - Added the required column `museumProfilePictureThumbnail` to the `Product` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT NOT NULL,
    "altDescription" TEXT NOT NULL,
    "museum" TEXT NOT NULL,
    "museumBio" TEXT NOT NULL,
    "museumLocation" TEXT NOT NULL,
    "museumProfilePicture" TEXT NOT NULL,
    "museumProfilePictureThumbnail" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "rawImageUrl" TEXT NOT NULL,
    "fullImageUrl" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "smallImageUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "blurHash" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Product" ("altDescription", "blurHash", "createdAt", "description", "fullImageUrl", "id", "imageUrl", "museum", "museumBio", "museumLocation", "price", "rawImageUrl", "smallImageUrl", "thumbnailUrl", "updatedAt") SELECT "altDescription", "blurHash", "createdAt", "description", "fullImageUrl", "id", "imageUrl", "museum", "museumBio", "museumLocation", "price", "rawImageUrl", "smallImageUrl", "thumbnailUrl", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
