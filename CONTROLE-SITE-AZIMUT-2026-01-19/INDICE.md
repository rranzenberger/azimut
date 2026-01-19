# 📁 ÍNDICE - CONTROLE SITE AZIMUT

**Data:** 19 de Janeiro de 2026  
**Versão:** checkpoint-2026-01-19

---

## 📚 DOCUMENTOS NESTA PASTA

### 1. **README.md** 📖
**Leia PRIMEIRO!**

- Status atual completo
- O que está funcionando
- Bugs resolvidos (resumo)
- Pontos de atenção
- Como restaurar checkpoint
- Arquitetura crítica
- Estatísticas do projeto

**Quando usar:**
- Antes de mexer em qualquer coisa
- Para entender estado atual
- Para restaurar backup

---

### 2. **CHECKLIST.md** ✅
**Seu guia de tarefas**

- Tarefas concluídas (✅)
- Tarefas pendentes (🔲)
- Prioridades (alta/média/baixa)
- Estimativas de tempo
- Progresso geral (%)
- Checklist pré-deploy

**Quando usar:**
- Diariamente (verificar progresso)
- Antes de deploy
- Para planejar dia de trabalho

---

### 3. **BUGS_RESOLVIDOS.md** 🐛
**Histórico detalhado de problemas**

- 20+ bugs documentados
- Sintomas e causas raiz
- Soluções aplicadas
- Commits relacionados
- Lições aprendidas

**Quando usar:**
- Quando encontrar bug similar
- Para entender por que algo foi feito de X forma
- Para aprender com erros passados

---

### 4. **PONTOS_CRITICOS.md** ⚠️
**LEIA ANTES DE MEXER EM:**

- Theme Toggle (Context API)
- Logo em formulários
- Gradient Home tema claro
- Vancouver layout
- CSS Variables
- Menu navegação
- Seletor de idiomas
- Rodapé

**Quando usar:**
- SEMPRE antes de modificar áreas listadas
- Quando algo quebrar
- Para entender nível de perigo de cada área

---

### 5. **PROXIMAS_ATIVIDADES.md** 🚀
**Planejamento e roadmap**

- Tarefas urgentes (hoje/amanhã)
- Tarefas semanais
- Tarefas mensais
- Backlog
- Matriz de priorização
- O que NÃO fazer

**Quando usar:**
- Para planejar próximos passos
- Para estimar tempo necessário
- Para priorizar tarefas

---

### 6. **INDICE.md** 📑
**Este arquivo**

- Sumário de todos os documentos
- Fluxo de leitura recomendado

---

## 🎯 FLUXO DE LEITURA RECOMENDADO

### **Cenário 1: Primeira Vez Aqui**
```
1. README.md (completo)
2. CHECKLIST.md (scan rápido)
3. PONTOS_CRITICOS.md (ler títulos)
4. PROXIMAS_ATIVIDADES.md (tarefas urgentes)
```

### **Cenário 2: Vou Mexer no Site**
```
1. PONTOS_CRITICOS.md (verificar se área está listada)
2. README.md (seção "Pontos de Atenção")
3. BUGS_RESOLVIDOS.md (se área teve bugs antes)
4. [Fazer mudança com cuidado]
5. Testar exaustivamente
6. Commit + atualizar CHECKLIST.md
```

### **Cenário 3: Algo Quebrou! 😱**
```
1. PARAR IMEDIATAMENTE
2. BUGS_RESOLVIDOS.md (bug conhecido?)
3. PONTOS_CRITICOS.md (área crítica?)
4. README.md (seção "Como Restaurar")
5. [Restaurar checkpoint se necessário]
6. [Ou debugar com calma]
```

### **Cenário 4: Planejando Trabalho**
```
1. CHECKLIST.md (ver tarefas pendentes)
2. PROXIMAS_ATIVIDADES.md (ver prioridades)
3. [Escolher 2-3 tarefas]
4. [Estimar tempo total]
5. [Executar]
6. [Atualizar CHECKLIST.md]
```

### **Cenário 5: Aprendendo com Erros**
```
1. BUGS_RESOLVIDOS.md (ler seção "Lições Aprendidas")
2. PONTOS_CRITICOS.md (entender áreas sensíveis)
3. README.md (entender arquitetura)
```

---

## 🗂️ ESTRUTURA DO PROJETO

```
CONTROLE-SITE-AZIMUT-2026-01-19/
├── README.md                    ← Começa aqui
├── CHECKLIST.md                 ← Tarefas e progresso
├── BUGS_RESOLVIDOS.md           ← Histórico de problemas
├── PONTOS_CRITICOS.md           ← Áreas perigosas
├── PROXIMAS_ATIVIDADES.md       ← Roadmap e planejamento
└── INDICE.md                    ← Este arquivo
```

---

## 📦 BACKUP E CONTROLE

### **Git Checkpoint**
```bash
# Tag
checkpoint-2026-01-19

# Commit
8c119c6

# Como restaurar
git checkout checkpoint-2026-01-19
```

### **Backup Local**
```
C:\Users\ranz\Documents\BACKUP-AZIMUT-2026-01-19
```

### **Quando Criar Novo Checkpoint**
- Após resolver bugs críticos
- Antes de mudanças grandes
- A cada 1-2 semanas (se estável)
- Antes de deploy de feature nova

**Como:**
```bash
cd C:\Users\ranz\Documents\azimut-site-vite-tailwind

# 1. Commit atual
git add -A
git commit -m "feat: descrição clara"

# 2. Tag
git tag -a checkpoint-YYYY-MM-DD -m "Descrição"
git push origin checkpoint-YYYY-MM-DD

# 3. Backup local
robocopy "." "C:\Users\ranz\Documents\BACKUP-AZIMUT-YYYY-MM-DD" /MIR /XD node_modules .git dist

# 4. Criar pasta controle
mkdir CONTROLE-SITE-AZIMUT-YYYY-MM-DD

# 5. Atualizar documentos
# (copiar desta pasta e atualizar datas/commits)
```

---

## 🆘 CONTATOS RÁPIDOS

### **Se algo der muito errado:**
1. Não entre em pânico
2. Não tente "consertar rápido"
3. Restaure o checkpoint
4. Leia documentação com calma
5. Planeje mudança melhor

### **Se tiver dúvida:**
1. Leia README.md desta pasta
2. Busque no histórico: `git log --oneline --grep="palavra-chave"`
3. Veja quem mexeu: `git blame caminho/arquivo.tsx`
4. Leia comentários no código

---

## ✅ CHECKLIST DE USO DESTA PASTA

Antes de começar o dia:
- [ ] Ler PROXIMAS_ATIVIDADES.md (o que fazer hoje?)
- [ ] Ler CHECKLIST.md (atualizar status)

Antes de mexer em código:
- [ ] Ler PONTOS_CRITICOS.md (área é sensível?)
- [ ] Ler BUGS_RESOLVIDOS.md (teve bug aqui antes?)

Depois de concluir tarefa:
- [ ] Atualizar CHECKLIST.md (marcar ✅)
- [ ] Commit com mensagem clara
- [ ] Testar em produção

Semanalmente:
- [ ] Revisar PROXIMAS_ATIVIDADES.md
- [ ] Atualizar prioridades
- [ ] Verificar progresso CHECKLIST.md

---

## 📊 RESUMO EXECUTIVO

### **O que esta pasta contém:**
Documentação completa do estado do site Azimut em 19/01/2026, incluindo tudo que funciona, tudo que foi resolvido, áreas críticas e próximos passos.

### **Por que foi criada:**
Para evitar dor de cabeça desnecessária, ter ponto de restauração seguro e planejar trabalho futuro.

### **Como usar:**
Leia antes de mexer, consulte quando tiver dúvida, atualize quando concluir tarefas.

### **Tempo investido nesta documentação:**
~2 horas (vale a pena para economizar 20+ horas de debug futuro)

---

**📅 Criado:** 19/01/2026  
**🏷️ Versão:** checkpoint-2026-01-19  
**💾 Backup:** C:\Users\ranz\Documents\BACKUP-AZIMUT-2026-01-19  
**✅ Status:** Estável e pronto para uso

**🎯 Próxima ação:** Ler README.md e começar tarefas urgentes!**
