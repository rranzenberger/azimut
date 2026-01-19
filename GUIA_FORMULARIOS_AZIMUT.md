# 📋 GUIA COMPLETO: FORMULÁRIOS AZIMUT

## 🎨 IDENTIDADE VISUAL

### Conceito
Os formulários Azimut mantêm sua **identidade premium independente do tema do site**:
- Campos **sempre escuros** (azul escuro profundo)
- Texto **sempre branco**
- Bordas **sempre vermelhas Azimut**

---

## 🛠️ CLASSES CSS UNIVERSAIS

### 1. `.input-adaptive` - Inputs e Textareas

```tsx
<input type="text" className="input-adaptive" placeholder="Digite aqui..." />
<textarea className="input-adaptive" rows={4} />
```

**Estilo:**
- Background: `rgba(10, 15, 30, 0.95)`
- Border: `1px solid rgba(201, 35, 55, 0.4)`
- Color: `#ffffff`
- Placeholder: `rgba(255, 255, 255, 0.4)`
- Min-height: `48px`

---

### 2. `.dropdown-azimut` - Dropdowns/Selects

```tsx
<select className="dropdown-azimut">
  <option value="">Selecione...</option>
  <option value="opcao1">Opção 1</option>
  <option value="opcao2">Opção 2</option>
</select>
```

**Estilo:**
- Background: `rgba(10, 15, 30, 0.95)`
- Border: `1px solid rgba(201, 35, 55, 0.4)`
- Color: `#ffffff`
- Seta: Vermelha Azimut customizada (SVG)
- Options: Fundo escuro com seleção vermelha

**Hover:**
- Border mais forte: `rgba(201, 35, 55, 0.6)`
- Glow vermelho sutil

**Focus:**
- Shadow vermelho premium
- Border: `#c92337`

---

### 3. `.label-adaptive` - Labels

```tsx
<label className="label-adaptive">Nome do Campo *</label>
```

**Estilo:**
- Tema Dark: `rgba(255, 255, 255, 0.8)`
- Tema Light: `rgba(0, 0, 0, 0.85)` + `font-weight: 600`
- Font-size: `0.875rem`
- Margin-bottom: `0.5rem`

---

## 📞 PADRÃO: TELEFONE COM CÓDIGO DE PAÍS

### Estrutura HTML

```tsx
<div>
  <label className="label-adaptive">Telefone / WhatsApp</label>
  <div className="flex gap-2">
    {/* Dropdown de país - PEQUENO */}
    <select
      value={formData.countryCode}
      onChange={(e) => setFormData(prev => ({ ...prev, countryCode: e.target.value, phone: '' }))}
      className="dropdown-azimut"
      style={{ width: '100px', minWidth: '100px', maxWidth: '100px', flexShrink: 0 }}
    >
      <option value="+55">BR +55</option>
      <option value="+1">CA +1</option>
      <option value="+34">ES +34</option>
      <option value="+33">FR +33</option>
      <option value="+351">PT +351</option>
      <option value="+52">MX +52</option>
      <option value="+54">AR +54</option>
      <option value="+44">UK +44</option>
    </select>
    
    {/* Campo telefone - GRANDE */}
    <input
      type="tel"
      value={formData.phone}
      onChange={(e) => {
        const formatted = formatPhoneWithAreaCode(e.target.value, formData.countryCode)
        setFormData(prev => ({ ...prev, phone: formatted }))
      }}
      className="input-adaptive flex-1"
      style={{ minWidth: '0' }}
      placeholder="(11) 98765-4321"
    />
  </div>
  <p className="mt-2 text-xs text-white/50">
    💡 Código detectado automaticamente. Opcional.
  </p>
</div>
```

---

## 🌍 GEOLOCALIZAÇÃO AUTOMÁTICA

### Código de Detecção

```tsx
useEffect(() => {
  const detectCountry = async () => {
    try {
      const timezone = Intl.DateTimeFormat().resolvedOptions().timeZone
      let detectedCode = '+55' // Default: Brasil
      
      // Detecção por timezone
      if (timezone.includes('America/Sao_Paulo') || 
          timezone.includes('America/Fortaleza') ||
          timezone.includes('America/Recife') ||
          timezone.includes('America/Manaus') ||
          timezone.includes('Brazil')) {
        detectedCode = '+55' // Brasil
      } else if (timezone.includes('America/Toronto') || 
                 timezone.includes('America/Vancouver') ||
                 timezone.includes('America/Montreal')) {
        detectedCode = '+1' // Canadá
      } else if (timezone.includes('America/New_York') || 
                 timezone.includes('America/Los_Angeles') ||
                 timezone.includes('America/Chicago')) {
        detectedCode = '+1' // EUA
      } else if (timezone.includes('Europe/Madrid') || 
                 timezone.includes('Europe/Barcelona')) {
        detectedCode = '+34' // Espanha
      } else if (timezone.includes('Europe/Paris')) {
        detectedCode = '+33' // França
      } else if (timezone.includes('Europe/Lisbon')) {
        detectedCode = '+351' // Portugal
      } else if (timezone.includes('America/Mexico')) {
        detectedCode = '+52' // México
      } else if (timezone.includes('America/Argentina')) {
        detectedCode = '+54' // Argentina
      }
      
      setFormData(prev => ({ ...prev, countryCode: detectedCode }))
    } catch (error) {
      console.warn('Could not detect country:', error)
    }
  }

  detectCountry()
}, [])
```

---

## 📱 FORMATAÇÃO AUTOMÁTICA DE TELEFONE

### Função Universal

```tsx
const formatPhoneWithAreaCode = (value: string, countryCode: string): string => {
  const numbers = value.replace(/\D/g, '')
  
  // Brasil +55: (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
  if (countryCode === '+55') {
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 6) return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`
    if (numbers.length <= 10) return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`
    return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`
  }
  
  // EUA/Canadá +1: (XXX) XXX-XXXX
  if (countryCode === '+1') {
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)}-${numbers.slice(6, 10)}`
  }
  
  // Espanha +34: XXX XX XX XX
  if (countryCode === '+34') {
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 5) return `${numbers.slice(0, 3)} ${numbers.slice(3)}`
    if (numbers.length <= 7) return `${numbers.slice(0, 3)} ${numbers.slice(3, 5)} ${numbers.slice(5)}`
    return `${numbers.slice(0, 3)} ${numbers.slice(3, 5)} ${numbers.slice(5, 7)} ${numbers.slice(7, 9)}`
  }
  
  // França +33: XX XX XX XX XX
  if (countryCode === '+33') {
    if (numbers.length <= 2) return numbers
    if (numbers.length <= 4) return `${numbers.slice(0, 2)} ${numbers.slice(2)}`
    if (numbers.length <= 6) return `${numbers.slice(0, 2)} ${numbers.slice(2, 4)} ${numbers.slice(4)}`
    if (numbers.length <= 8) return `${numbers.slice(0, 2)} ${numbers.slice(2, 4)} ${numbers.slice(4, 6)} ${numbers.slice(6)}`
    return `${numbers.slice(0, 2)} ${numbers.slice(2, 4)} ${numbers.slice(4, 6)} ${numbers.slice(6, 8)} ${numbers.slice(8, 10)}`
  }
  
  // Portugal +351: XXX XXX XXX
  if (countryCode === '+351') {
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `${numbers.slice(0, 3)} ${numbers.slice(3)}`
    return `${numbers.slice(0, 3)} ${numbers.slice(3, 6)} ${numbers.slice(6, 9)}`
  }
  
  // México +52: (XXX) XXX XXXX
  if (countryCode === '+52') {
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 6) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 6)} ${numbers.slice(6, 10)}`
  }
  
  // Argentina +54: (XXX) XXXX-XXXX
  if (countryCode === '+54') {
    if (numbers.length <= 3) return numbers
    if (numbers.length <= 7) return `(${numbers.slice(0, 3)}) ${numbers.slice(3)}`
    return `(${numbers.slice(0, 3)}) ${numbers.slice(3, 7)}-${numbers.slice(7, 11)}`
  }
  
  // UK +44: XXXXX XXXXXX
  if (countryCode === '+44') {
    if (numbers.length <= 5) return numbers
    return `${numbers.slice(0, 5)} ${numbers.slice(5, 11)}`
  }
  
  return numbers
}
```

---

## 📤 ENVIO DO FORMULÁRIO

### Limpeza antes de enviar

```tsx
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault()
  
  // Remover formatação do telefone (só números)
  const phoneNumbers = formData.phone.replace(/\D/g, '')
  const fullPhone = phoneNumbers ? `${formData.countryCode}${phoneNumbers}` : ''
  
  const submitData = {
    ...formData,
    phone: fullPhone  // Ex: +5511987654321
  }
  
  // Enviar para API
  await ApiService.submitLead(submitData)
  
  // Redirecionar
  navigate('/thank-you')
}
```

---

## 🎯 EXEMPLOS COMPLETOS

### Formulário Simples

```tsx
<form onSubmit={handleSubmit} className="space-y-6">
  {/* Nome */}
  <div>
    <label className="label-adaptive">Nome Completo *</label>
    <input
      type="text"
      name="name"
      value={formData.name}
      onChange={handleChange}
      className="input-adaptive"
      required
    />
  </div>

  {/* Email */}
  <div>
    <label className="label-adaptive">Email *</label>
    <input
      type="email"
      name="email"
      value={formData.email}
      onChange={handleChange}
      className="input-adaptive"
      required
    />
  </div>

  {/* Telefone com país */}
  <div>
    <label className="label-adaptive">Telefone / WhatsApp</label>
    <div className="flex gap-2">
      <select className="dropdown-azimut" style={{ width: '100px' }}>
        <option value="+55">BR +55</option>
        <option value="+1">CA +1</option>
      </select>
      <input type="tel" className="input-adaptive flex-1" />
    </div>
  </div>

  {/* Dropdown de curso */}
  <div>
    <label className="label-adaptive">Curso de Interesse *</label>
    <select
      name="course"
      value={formData.course}
      onChange={handleChange}
      className="dropdown-azimut"
      required
    >
      <option value="">Selecione...</option>
      <option value="vfs-animation">VFS - Animação 3D</option>
      <option value="vfs-vfx">VFS - VFX</option>
      <option value="vanarts-game">VanArts - Game Art</option>
    </select>
  </div>

  {/* Mensagem */}
  <div>
    <label className="label-adaptive">Mensagem</label>
    <textarea
      name="message"
      value={formData.message}
      onChange={handleChange}
      className="input-adaptive"
      rows={4}
    />
  </div>

  {/* Botão */}
  <button
    type="submit"
    className="w-full px-6 py-3 bg-azimut-red text-white font-bold rounded-lg hover:bg-azimut-red/90 transition-all"
  >
    Enviar
  </button>
</form>
```

---

## ✅ CHECKLIST: NOVO FORMULÁRIO

Ao criar um novo formulário, sempre:

- [ ] Usar `.input-adaptive` para inputs e textareas
- [ ] Usar `.dropdown-azimut` para selects
- [ ] Usar `.label-adaptive` para labels
- [ ] Implementar geolocalização para código de país
- [ ] Adicionar formatação automática de telefone
- [ ] Limpar formatação antes de enviar (só números)
- [ ] Combinar `countryCode + phone` no submit
- [ ] Testar em tema dark e light
- [ ] Verificar altura dos campos (48px padrão)
- [ ] Garantir que dropdowns têm options com fundo escuro

---

## 🎨 CORES AZIMUT (Referência)

```css
/* Vermelho Azimut */
--azimut-red: #c92337;
--azimut-red-hover: rgba(201, 35, 55, 0.9);
--azimut-red-light: rgba(201, 35, 55, 0.4);

/* Fundo formulários */
--form-bg: rgba(10, 15, 30, 0.95);
--form-bg-focus: rgba(10, 15, 30, 0.98);

/* Texto */
--form-text: #ffffff;
--form-placeholder: rgba(255, 255, 255, 0.4);
```

---

## 📚 ARQUIVOS DE REFERÊNCIA

- CSS: `src/index.css` (linhas ~1687-1850)
- Exemplo completo: `src/components/SmartContactForm.tsx`
- Exemplo Vancouver: `src/components/VancouverInterestForm.tsx`
- Exemplo Academy: `src/components/AcademyQuickForm.tsx`

---

**Criado em:** 2026-01-11  
**Versão:** 1.0  
**Autor:** Azimut Team  
**Status:** ✅ Implementado e testado
