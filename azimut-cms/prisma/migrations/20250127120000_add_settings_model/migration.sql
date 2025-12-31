-- CreateTable
CREATE TABLE "Settings" (
    "id" TEXT NOT NULL DEFAULT 'singleton',
    "siteName" TEXT DEFAULT 'Azimut',
    "siteUrl" TEXT DEFAULT 'https://azmt.com.br',
    "contactEmail" TEXT,
    "contactPhone" TEXT,
    "defaultMetaDescription" TEXT,
    "defaultKeywords" TEXT,
    "ogImageUrl" TEXT,
    "facebookUrl" TEXT,
    "instagramUrl" TEXT,
    "linkedinUrl" TEXT,
    "twitterUrl" TEXT,
    "youtubeUrl" TEXT,
    "kabbamApiKey" TEXT,
    "kabbamApiUrl" TEXT,
    "smtpHost" TEXT,
    "smtpPort" INTEGER,
    "smtpUser" TEXT,
    "smtpPassword" TEXT,
    "smtpFromEmail" TEXT,
    "deepseekApiKey" TEXT,
    "notificationEmail" TEXT,
    "defaultLanguage" TEXT DEFAULT 'pt',
    "defaultCountry" TEXT DEFAULT 'BR',
    "timezone" TEXT DEFAULT 'America/Sao_Paulo',
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Settings_pkey" PRIMARY KEY ("id")
);

-- Insert default settings
INSERT INTO "Settings" ("id", "siteName", "siteUrl", "defaultLanguage", "defaultCountry", "timezone", "createdAt", "updatedAt")
VALUES ('singleton', 'Azimut', 'https://azmt.com.br', 'pt', 'BR', 'America/Sao_Paulo', NOW(), NOW());

