# 📱 Como Testar no iPhone - Método Mais Simples

## ✅ Método 1: DevTools do Navegador (RECOMENDADO - Mais Rápido)

### No Chrome ou Edge:
1. Abra o site: `http://localhost:1753`
2. Pressione **F12** (ou `Ctrl+Shift+I`)
3. Clique no ícone de **dispositivo móvel** (ou pressione `Ctrl+Shift+M`)
4. No topo, escolha:
   - **iPhone 12 Pro** (390x844)
   - **iPhone 13 Pro** (390x844)
   - **iPhone 14 Pro Max** (430x932)
   - **iPad Air** (820x1180)

### No Safari (Mac):
1. Abra o site no Safari
2. Menu: **Desenvolver** > **Mostrar Simulador iOS**
3. Escolha um iPhone ou iPad

---

## 🌐 Método 2: Dispositivo Real (Se o Método 1 não for suficiente)

### Opção A: Usar ngrok (Funciona de qualquer lugar)

1. **Instalar ngrok:**
   - Baixe: https://ngrok.com/download
   - Ou instale via npm: `npm install -g ngrok`

2. **Com o servidor rodando (`npm run dev`), em outro terminal:**
   ```bash
   ngrok http 1753
   ```

3. **Você receberá uma URL como:**
   ```
   Forwarding: https://abc123.ngrok.io -> http://localhost:1753
   ```

4. **No iPhone:**
   - Abra o Safari
   - Digite: `https://abc123.ngrok.io`
   - Funciona de qualquer lugar, não precisa estar na mesma rede!

---

### Opção B: IP Local (Mais complicado)

1. **Descobrir seu IP:**
   ```powershell
   ipconfig
   ```
   Procure "IPv4 Address" (ex: `192.168.0.4`)

2. **Iniciar servidor com acesso de rede:**
   ```bash
   npm run dev
   ```
   (Já está configurado no `vite.config.ts`)

3. **No iPhone:**
   - Conecte na mesma rede Wi-Fi
   - Abra Safari
   - Digite: `http://192.168.0.4:1753`

**⚠️ Problemas comuns:**
- Firewall do Windows bloqueando
- Roteador com "Isolamento de AP" ativo
- IP incorreto

---

## 🎯 Recomendação

**Use o Método 1 (DevTools)** para desenvolvimento rápido. É instantâneo e mostra exatamente como ficará no iPhone.

**Use ngrok** apenas se precisar testar funcionalidades específicas de toque ou sensores do iPhone real.


















