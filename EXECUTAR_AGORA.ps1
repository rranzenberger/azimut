# Execute este arquivo no PowerShell
# Ou copie apenas o comando abaixo

Remove-Item -Force ".git\index.lock" -ErrorAction SilentlyContinue
Start-Sleep -Seconds 2

git add src/components/SearchModal.tsx
git add src/components/Breadcrumbs.tsx
git add src/components/LoadingSkeleton.tsx
git add src/components/SmartContactForm.tsx
git add src/hooks/useLoadingSkeleton.ts
git add src/hooks/useSearch.ts
git add src/utils/formValidation.ts
git add azimut-cms/app/admin/team/
git add azimut-cms/app/admin/credentials/
git add azimut-cms/app/api/admin/team/
git add azimut-cms/app/api/admin/credentials/
git add azimut-cms/prisma/schema.prisma
git add azimut-cms/prisma/migrations/

git status --short

git commit -m "feat: UX Premium (validacao, skeletons, busca) + Backoffice Team/Credentials completo"

git push
