-- CreateTable
CREATE TABLE "public"."products" (
    "id" SMALLSERIAL NOT NULL,
    "name" TEXT,
    "price" DECIMAL,
    "created_at" TIMESTAMPTZ(6) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);
