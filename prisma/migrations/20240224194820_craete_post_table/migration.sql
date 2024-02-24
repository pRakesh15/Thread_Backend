-- CreateTable
CREATE TABLE "posts" (
    "id" TEXT NOT NULL,
    "titel" TEXT NOT NULL,
    "thumbnell" TEXT,
    "content" TEXT NOT NULL,

    CONSTRAINT "posts_pkey" PRIMARY KEY ("id")
);
