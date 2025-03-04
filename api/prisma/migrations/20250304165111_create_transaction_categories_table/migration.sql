-- CreateEnum
CREATE TYPE "transaction_type" AS ENUM ('INCOME', 'EXPENSE');

-- CreateTable
CREATE TABLE "transaction_categories" (
    "id" SERIAL NOT NULL,
    "uuid" UUID NOT NULL,
    "user_id" INTEGER NOT NULL,
    "name" TEXT NOT NULL,
    "icon" TEXT NOT NULL,
    "type" "transaction_type" NOT NULL,
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updated_at" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "transaction_categories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "transaction_categories_uuid_key" ON "transaction_categories"("uuid");

-- AddForeignKey
ALTER TABLE "transaction_categories" ADD CONSTRAINT "transaction_categories_user_id_fkey" FOREIGN KEY ("user_id") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
