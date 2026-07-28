# 🚗 GigRadar Landing — Setup Rápido

## 2 minutos de config: SQL Enum + WhatsApp + Design System Skill

### ✅ Feito
1. **SQL Enum** — Migração criada em `prisma/migrations/20260719_add_native_postgres_enums/migration.sql`
2. **Landing** — Página pronta em `src/pages/GigRadar.tsx`
3. **Form → LeadType::GIGRADAR_BETA** — Automaticamente no formulário
4. **WhatsApp** — Link direto configurado: `https://wa.me/5548999701301`

### 🚀 Deploy (30 segundos)
```bash
cd azimut-cms
npx prisma migrate deploy  # Aplica ENUMs nativos no Neon
npm run build              # Constrói Landing
npm start                  # Publica
```

### 🎨 Design System Skill (quando editar)
Ao trabalhar com GigRadar, você pode invocar:
```
/gigradar-design-system
```

Isso carrega:
- Tokens Material Design 3 (seed #5B21B6)
- 20 regras UX de GigRadar
- Componentes Compose + Flutter
- Cores dark mode validadas

### 📍 URLs Pronta
- **Landing**: `https://azimut.com.br/gigradar`
- **WhatsApp grupo**: Criado assim que atingir 5+ testadores
- **Backoffice**: Aba "🚗 GigRadar Beta" mostra leads + códigos

### 📋 Checklist Final
- [ ] Executar migração SQL no Neon
- [ ] Testar form na landing
- [ ] Validar lead no backoffice (CMS)
- [ ] Verificar geração de código (self-service)
- [ ] Criar grupo WhatsApp (manual, quando > 5 inscritos)

---

**Pronto em 19/jul/2026 — Ranz**
