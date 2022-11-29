-- CreateTable
CREATE TABLE "artist" (
    "id" SERIAL NOT NULL,
    "name" CHAR(30) NOT NULL,

    CONSTRAINT "artists_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "fascination" (
    "id" SERIAL NOT NULL,
    "name" CHAR(30) NOT NULL,
    "intensity" INTEGER NOT NULL,
    "color" INTEGER NOT NULL,
    "tstamp" INTEGER NOT NULL,

    CONSTRAINT "fascinations_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "project" (
    "id" SERIAL NOT NULL,
    "name" CHAR(30) NOT NULL,
    "imagename" CHAR(30) NOT NULL,
    "url" CHAR(200) NOT NULL,
    "urlname" CHAR(30) NOT NULL,
    "description" TEXT,

    CONSTRAINT "projects_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "story" (
    "id" SERIAL NOT NULL,
    "name" CHAR(40) NOT NULL,
    "keyword" CHAR(40) NOT NULL,
    "tstamp" INTEGER NOT NULL,
    "paragraphs" TEXT[],
    "theme" INTEGER,

    CONSTRAINT "stories_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "artists_name_key" ON "artist"("name");

-- CreateIndex
CREATE UNIQUE INDEX "fascinations_name_key" ON "fascination"("name");

-- CreateIndex
CREATE UNIQUE INDEX "projects_name_key" ON "project"("name");

-- CreateIndex
CREATE UNIQUE INDEX "projects_imagename_key" ON "project"("imagename");

-- CreateIndex
CREATE UNIQUE INDEX "stories_name_key" ON "story"("name");

-- CreateIndex
CREATE UNIQUE INDEX "stories_keyword_key" ON "story"("keyword");

