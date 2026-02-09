SELECT "priorityHome" AS slot,
       COUNT(*) AS quantidade,
       STRING_AGG("title", ' | ' ORDER BY "priorityHome", "year" DESC NULLS LAST) AS titulos
FROM "Project"
WHERE "priorityHome" > 0
GROUP BY "priorityHome"
ORDER BY "priorityHome";

UPDATE "Project" SET "priorityHome" = 0, featured = false WHERE "priorityHome" > 7;
 pr