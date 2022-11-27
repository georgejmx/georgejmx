-- CreateTable
CREATE TABLE "descriptor" (
    "id" SERIAL NOT NULL,
    "word" CHAR(20) NOT NULL,
    "timestamp" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "storyId" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "descriptor_id_key" ON "descriptor"("id");

-- AddForeignKey
ALTER TABLE "descriptor" ADD CONSTRAINT "descriptor_storyId_fkey" FOREIGN KEY ("storyId") REFERENCES "story"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
