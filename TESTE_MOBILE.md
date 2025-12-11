# 📱 Como Testar o Site em Smartphones e Tablets

## 🎯 Método 1: DevTools do Navegador (Mais Rápido)

### Chrome/Edge:
1. Abra o site no navegador
2. Pressione `F12` ou `Ctrl+Shift+I` (Windows) / `Cmd+Option+I` (Mac)
3. Clique no ícone de **dispositivo móvel** (ou `Ctrl+Shift+M`)
4. Escolha um dispositivo:
   - **iPhone 12/13/14** (390x844)
   - **iPad Air** (820x1180)
   - **Samsung Galaxy S20** (360x800)
   - Ou crie um tamanho customizado

### Firefox:
1. Abra o site no navegador
2. Pressione `F12` ou `Ctrl+Shift+I`
3. Clique no ícone de **responsivo** (ou `Ctrl+Shift+M`)
4. Escolha um dispositivo ou defina tamanho customizado

### Safari (Mac):
1. Abra o site no Safari
2. Menu: **Desenvolver** > **Mostrar Simulador iOS**
3. Escolha um dispositivo

---

## 🌐 Método 2: Testar em Dispositivos Reais (Recomendado)

### Passo 1: Descobrir seu IP local

**Windows:**
```powershell
ipconfig
```
Procure por "IPv4 Address" (ex: `192.168.1.100`)

**Mac/Linux:**
```bash
ifconfig
# ou
ip addr show
```
Procure por `inet` (ex: `192.168.1.100`)

### Passo 2: Iniciar o servidor de desenvolvimento

```bash
npm run dev
```

Você verá algo como:
```
  VITE v5.4.8  ready in 500 ms

  ➜  Local:   http://localhost:1753/
  ➜  Network: http://192.168.1.100:1753/
```

### Passo 3: Acessar no dispositivo

1. **Conecte o smartphone/tablet na mesma rede Wi-Fi** do computador
2. Abra o navegador no dispositivo
3. Digite o endereço **Network** mostrado (ex: `http://192.168.1.100:1753/`)

**⚠️ Importante:**
- Ambos (computador e dispositivo) devem estar na **mesma rede Wi-Fi**
- Alguns roteadores bloqueiam comunicação entre dispositivos - pode precisar desativar "Isolamento de AP" nas configurações do roteador

---

## 🔧 Método 3: Usar ngrok (Para testar de qualquer lugar)

### Instalação:
```bash
npm install -g ngrok
# ou baixe de: https://ngrok.com/download
```

### Uso:
1. Inicie o servidor:
```bash
npm run dev
```

2. Em outro terminal, execute:
```bash
ngrok http 1753
```

3. Você receberá uma URL pública (ex: `https://abc123.ngrok.io`)
4. Acesse essa URL em qualquer dispositivo, de qualquer lugar!

---

## 📊 Método 4: Ferramentas Online

### BrowserStack (Pago/Gratuito):
- https://www.browserstack.com/
- Testa em dispositivos reais na nuvem

### Responsively App (Gratuito):
- https://responsively.app/
- Aplicativo desktop que simula múltiplos dispositivos simultaneamente

---

## 🎨 Dicas de Teste

### O que verificar:

✅ **Mobile (< 768px):**
- Menu hambúrguer funciona
- Textos legíveis
- Botões fáceis de tocar (mínimo 44x44px)
- Imagens carregam corretamente
- Navegação fluida

✅ **Tablet (768px - 1024px):**
- Menu desktop aparece (não hambúrguer)
- Layout em 2 colunas funciona
- Touch targets adequados
- Espaçamentos corretos

✅ **Funcionalidades:**
- Troca de idioma
- Toggle de tema (claro/escuro)
- Links funcionam
- Formulários (quando houver)
- Animações suaves

---

## 🐛 Troubleshooting

### "Não consigo acessar pelo IP"
- Verifique se o firewall do Windows/Mac não está bloqueando
- Confirme que ambos estão na mesma rede Wi-Fi
- Tente desativar temporariamente o firewall

### "Site carrega mas não funciona"
- Verifique o console do navegador (F12)
- Pode ser problema de CORS - o Vite já está configurado para isso

### "Muito lento no mobile"
- Normal em desenvolvimento (hot reload)
- Para testar performance real, faça build:
```bash
npm run build
npm run preview
```

---

## 📝 Checklist de Teste

- [ ] iPhone (Safari)
- [ ] Android (Chrome)
- [ ] iPad (Safari)
- [ ] Android Tablet (Chrome)
- [ ] Tema claro funciona
- [ ] Tema escuro funciona
- [ ] Todos os idiomas (PT, EN, FR, ES)
- [ ] Menu hambúrguer (mobile)
- [ ] Menu desktop (tablet)
- [ ] Navegação entre páginas
- [ ] Links externos (redes sociais)
- [ ] Formulário de contato (quando implementado)

---

## 🚀 Próximos Passos

Depois de testar, você pode:
1. Fazer deploy para produção
2. Testar em produção com ferramentas como BrowserStack
3. Coletar feedback de usuários reais


















