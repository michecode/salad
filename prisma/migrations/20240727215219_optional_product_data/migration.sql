-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "description" TEXT,
    "altDescription" TEXT,
    "museum" TEXT NOT NULL,
    "museumBio" TEXT,
    "museumLocation" TEXT,
    "museumProfilePicture" TEXT NOT NULL,
    "museumProfilePictureThumbnail" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "rawImageUrl" TEXT NOT NULL,
    "fullImageUrl" TEXT NOT NULL,
    "imageUrl" TEXT NOT NULL,
    "smallImageUrl" TEXT NOT NULL,
    "thumbnailUrl" TEXT NOT NULL,
    "blurHash" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Product" ("altDescription", "blurHash", "createdAt", "description", "fullImageUrl", "id", "imageUrl", "museum", "museumBio", "museumLocation", "museumProfilePicture", "museumProfilePictureThumbnail", "price", "rawImageUrl", "smallImageUrl", "thumbnailUrl", "updatedAt") SELECT "altDescription", "blurHash", "createdAt", "description", "fullImageUrl", "id", "imageUrl", "museum", "museumBio", "museumLocation", "museumProfilePicture", "museumProfilePictureThumbnail", "price", "rawImageUrl", "smallImageUrl", "thumbnailUrl", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
