-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "zodiacSign" TEXT NOT NULL,
    "dob" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Horoscope" (
    "id" TEXT NOT NULL,
    "zodiacSign" TEXT NOT NULL,
    "date" TIMESTAMP(3) NOT NULL,
    "shortText" TEXT NOT NULL,
    "fullText" TEXT NOT NULL,
    "luckyNumber" INTEGER NOT NULL,
    "luckyColor" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Horoscope_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Horoscope_date_zodiacSign_idx" ON "Horoscope"("date", "zodiacSign");

-- CreateIndex
CREATE UNIQUE INDEX "Horoscope_zodiacSign_date_key" ON "Horoscope"("zodiacSign", "date");
