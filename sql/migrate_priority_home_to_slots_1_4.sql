-- Migração: slots da Home de 100,90,80,70 para 1,2,3,4
-- Execute UMA VEZ se você já tinha projetos em destaque com os valores antigos.
-- 0 = não exibir na Home | 1 = Principal 1 | 2 = Principal 2 | 3 = Principal 3 | 4 = Principal 4
--
-- No Neon/PostgreSQL a tabela do Prisma costuma ser "Project" (P maiúsculo).
-- Se der erro de relation, tente trocar "Project" por project (minúsculo, sem aspas).

UPDATE "Project" SET "priorityHome" = 1 WHERE "priorityHome" = 100;
UPDATE "Project" SET "priorityHome" = 2 WHERE "priorityHome" = 90;
UPDATE "Project" SET "priorityHome" = 3 WHERE "priorityHome" = 80;
UPDATE "Project" SET "priorityHome" = 4 WHERE "priorityHome" = 70;

-- Opcional: garantir que quem não está na Home está com 0 (limpeza)
-- UPDATE "Project" SET "priorityHome" = 0, featured = false WHERE "priorityHome" NOT IN (0, 1, 2, 3, 4);
