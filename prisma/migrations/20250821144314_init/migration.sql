-- CreateTable
CREATE TABLE "public"."Message" (
    "content" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "subject" TEXT NOT NULL,
    "token" TEXT NOT NULL,
    "timestamp" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "Message_token_key" ON "public"."Message"("token");
