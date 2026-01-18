-- â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
-- CRIAR TABELA NewsletterSubscriber
-- Execute no Neon SQL Editor: https://console.neon.tech
-- â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•

-- 1ï¸âƒ£ CRIAR ENUM NewsletterStatus
DO $$ BEGIN
    CREATE TYPE "NewsletterStatus" AS ENUM ('ACTIVE', 'UNSUBSCRIBED', 'BOUNCED', 'SPAM');
EXCEPTION
    WHEN duplicate_object THEN null;
END $$;

-- 2ï¸âƒ£ CRIAR TABELA NewsletterSubscriber
CREATE TABLE IF NOT EXISTS "NewsletterSubscriber" (
    id TEXT PRIMARY KEY DEFAULT gen_random_uuid()::text,
    email TEXT NOT NULL UNIQUE,
    name TEXT,
    "preferredLanguage" TEXT NOT NULL DEFAULT 'pt',
    source TEXT NOT NULL,
    status "NewsletterStatus" NOT NULL DEFAULT 'ACTIVE',
    "subscribedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "unsubscribedAt" TIMESTAMP(3),
    "lastEmailSentAt" TIMESTAMP(3),
    "emailCount" INTEGER NOT NULL DEFAULT 0,
    "leadId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    
    CONSTRAINT "NewsletterSubscriber_leadId_fkey" 
        FOREIGN KEY ("leadId") 
        REFERENCES "Lead"(id) 
        ON DELETE SET NULL 
        ON UPDATE CASCADE
);

-- 3ï¸âƒ£ CRIAR ÃNDICES
CREATE INDEX IF NOT EXISTS "NewsletterSubscriber_email_idx" ON "NewsletterSubscriber"(email);
CREATE INDEX IF NOT EXISTS "NewsletterSubscriber_status_idx" ON "NewsletterSubscriber"(status);
CREATE INDEX IF NOT EXISTS "NewsletterSubscriber_source_idx" ON "NewsletterSubscriber"(source);
CREATE INDEX IF NOT EXISTS "NewsletterSubscriber_preferredLanguage_idx" ON "NewsletterSubscriber"("preferredLanguage");
CREATE INDEX IF NOT EXISTS "NewsletterSubscriber_leadId_idx" ON "NewsletterSubscriber"("leadId");

-- 4ï¸âƒ£ VERIFICAR SE TABELA FOI CRIADA
SELECT 
    'TABELA CRIADA' as status,
    COUNT(*) as total_subscribers
FROM "NewsletterSubscriber";
