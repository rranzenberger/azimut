# 🎬 **GUIA PASSO A PASSO: Converter MP4 → WebM**

## ✅ **PASSO A PASSO VISUAL:**

### **📍 PASSO 1: Acessar o CloudConvert**

✅ **JÁ ESTÁ ABERTO!** Veja a captura de tela no navegador.

URL: https://cloudconvert.com/mp4-to-webm

---

### **📍 PASSO 2: Rolar a página para baixo**

Role até ver um **BOTÃO VERMELHO** escrito **"Select File"** ou **"Select Files"**

---

### **📍 PASSO 3: Clicar em "Select File"**

1. **Clique** no botão vermelho
2. Uma janela de arquivos vai abrir

---

### **📍 PASSO 4: Navegar até o arquivo**

Na janela que abrir, navegue até:

```
C:\Users\ranz\Documents\azimut-site-vite-tailwind\public\
```

Procure o arquivo:
```
azimut-3d-para-2d.mp4
```

Se não encontrar, procure:
```
azimut 3d para 2d.mp4  (com espaços)
```

---

### **📍 PASSO 5: Selecionar o arquivo**

1. **Clique uma vez** no arquivo MP4
2. **Clique em "Abrir"** ou **"Open"**

---

### **📍 PASSO 6: Configurar conversão (OPCIONAL)**

Depois que o arquivo carregar, você verá opções.

**CONFIGURAÇÃO RECOMENDADA:**
- **Format:** WEBM (já deve estar selecionado)
- **Video Codec:** VP9 (melhor compressão)
- **Quality:** 85% (bom equilíbrio)
- **Audio:** Remove/Disable (logo não precisa de som)

**OU:** Deixe no padrão mesmo! Já está bom!

---

### **📍 PASSO 7: Converter**

1. Procure um botão **VERDE** escrito **"Convert"** ou **"Start Conversion"**
2. **Clique nele**
3. **Aguarde** (pode levar 2-5 minutos dependendo do tamanho)

Você vai ver uma barra de progresso tipo:
```
Converting... [=====>    ] 45%
```

---

### **📍 PASSO 8: Download**

Quando terminar, aparece um botão **"Download"**

1. **Clique em "Download"**
2. O arquivo será baixado para sua pasta de **Downloads**
3. Nome do arquivo: `azimut-3d-para-2d.webm` (ou similar)

---

### **📍 PASSO 9: Mover para a pasta do projeto**

1. Abra sua pasta de **Downloads**
2. Procure o arquivo **`.webm`** que acabou de baixar
3. **Renomeie para:** `azimut-3d-para-2d.webm` (se necessário)
4. **Mova** ou **Copie** para:
   ```
   C:\Users\ranz\Documents\azimut-site-vite-tailwind\public\
   ```

---

## ✅ **RESULTADO FINAL:**

Depois, você terá na pasta `public/`:

```
public/
├── azimut-3d-para-2d.webm  ← ✅ NOVO! (otimizado)
├── azimut-3d-para-2d.mp4   ← ✅ JÁ TINHA (universal)
└── logo_animada_glow.mov   ← Fallback
```

---

## 🚀 **DEPOIS DE CONVERTER:**

### **Teste no navegador:**

```bash
npm run dev
```

Abra: http://localhost:5173

**Você vai ver:**
- ✅ Logo animada funcionando
- ✅ Chrome/Firefox vão usar WebM (rápido!)
- ✅ Safari vai usar MP4 (compatível)

---

## 📊 **COMPARAÇÃO ESPERADA:**

| Arquivo | Tamanho Aprox. | Performance |
|---------|----------------|-------------|
| MP4 original | ~5-10 MB | ⭐⭐⭐⭐ Bom |
| WebM otimizado | ~2-4 MB | ⭐⭐⭐⭐⭐ Excelente |

**Economia:** 50-70% de banda! 🚀

---

## ❓ **PROBLEMAS COMUNS:**

### **1. "Não vejo o botão Select File"**
→ Role a página para baixo! Está abaixo do texto.

### **2. "O arquivo está muito grande para upload"**
→ CloudConvert gratuito aceita até 1GB. Se for maior, me avisa!

### **3. "Conversão falhou"**
→ Tente novamente ou use qualidade 80% em vez de 85%

### **4. "Download não começa"**
→ Desative bloqueadores de popup temporariamente

---

## 🎯 **COMANDOS ÚTEIS:**

### **Ver tamanho dos arquivos:**
```powershell
Get-ChildItem public\*.mp4, public\*.webm | Select-Object Name, @{N="Size(MB)";E={[math]::Round($_.Length/1MB,2)}}
```

### **Testar o site:**
```bash
npm run dev
```

### **Build para deploy:**
```bash
npm run build
```

---

**🎬 Comece agora! Role a página do CloudConvert e clique em "Select File"!**

Quando terminar, me avisa que eu verifico se está tudo certo! ✅


