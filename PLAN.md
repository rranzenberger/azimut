## Plan to fix backoffice deploy errors
1) Inspect failing files and types
- Review `app/api/track/route.ts` and `src/lib/auth.ts` to see exact type expectations and runtime configs.
- Confirm how `calculateInterestScores` is typed and what request body fields can be null/undefined.

2) Fix track route type errors
- Allow nullable fields (`projectId`, `tags`, `projectsViewed`, `timeSpent`, `language`, `country`) and adjust types so `null`/`undefined` are permitted or normalized before use.
- Ensure the payload sent to `calculateInterestScores` matches its interface (strings vs string|null) or add guards/defaults.

3) Resolve crypto/edge runtime issue
- For endpoints needing Node `crypto`, set `export const runtime = 'nodejs'` (or use Web Crypto if appropriate) to avoid “crypto not supported in Edge”.

4) Redeploy and verify
- Push fixes, redeploy backoffice on Vercel, and check that the build passes and pages load without Basic Auth prompt (already disabled via env).

