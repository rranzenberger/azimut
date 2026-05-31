-- AlterTable: foto dedicada do card no Overview (/studio), proporção 4:3
ALTER TABLE "TeamMembers" ADD COLUMN IF NOT EXISTS "cardPhotoUrl" TEXT;
ALTER TABLE "TeamMembers" ADD COLUMN IF NOT EXISTS "cardPhotoMediaId" TEXT;
