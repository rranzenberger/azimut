// ════════════════════════════════════════════════════════════
// FORM VALIDATION - Utilitários Seguros de Validação
// ════════════════════════════════════════════════════════════
// Funções isoladas - podem ser usadas opcionalmente
// Não mexe em validação existente
// ════════════════════════════════════════════════════════════

import { type Lang } from '../i18n'

export interface ValidationResult {
  isValid: boolean
  errors: Record<string, string>
}

export interface FormField {
  name: string
  value: string
  required?: boolean
  type?: 'email' | 'phone' | 'text' | 'textarea'
  minLength?: number
  maxLength?: number
}

// Validação de email
export function validateEmail(email: string): boolean {
  if (!email) return false
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email.trim())
}

// Validação de telefone (formato internacional)
export function validatePhone(phone: string, countryCode?: string): boolean {
  if (!phone) return false
  const digitsOnly = phone.replace(/\D/g, '')
  // Mínimo 8 dígitos (sem código do país)
  return digitsOnly.length >= 8
}

// Validação em tempo real (não bloqueia submit)
export function validateField(
  field: FormField,
  lang: Lang = 'pt'
): string | null {
  const { name, value, required, type, minLength, maxLength } = field

  // Campo obrigatório vazio
  if (required && !value.trim()) {
    const messages: Record<Lang, Record<string, string>> = {
      pt: {
        name: 'Nome é obrigatório',
        email: 'Email é obrigatório',
        phone: 'Telefone é obrigatório',
        message: 'Mensagem é obrigatória',
        default: 'Este campo é obrigatório'
      },
      en: {
        name: 'Name is required',
        email: 'Email is required',
        phone: 'Phone is required',
        message: 'Message is required',
        default: 'This field is required'
      },
      es: {
        name: 'El nombre es obligatorio',
        email: 'El email es obligatorio',
        phone: 'El teléfono es obligatorio',
        message: 'El mensaje es obligatorio',
        default: 'Este campo es obligatorio'
      },
      fr: {
        name: 'Le nom est obligatoire',
        email: 'L\'email est obligatoire',
        phone: 'Le téléphone est obligatoire',
        message: 'Le message est obligatoire',
        default: 'Ce champ est obligatoire'
      }
    }
    return messages[lang][name] || messages[lang].default
  }

  // Validação de email
  if (type === 'email' && value.trim() && !validateEmail(value)) {
    const messages: Record<Lang, string> = {
      pt: 'Email inválido',
      en: 'Invalid email',
      es: 'Email inválido',
      fr: 'Email invalide'
    }
    return messages[lang]
  }

  // Validação de telefone
  if (type === 'phone' && value.trim() && !validatePhone(value)) {
    const messages: Record<Lang, string> = {
      pt: 'Telefone inválido (mínimo 8 dígitos)',
      en: 'Invalid phone (minimum 8 digits)',
      es: 'Teléfono inválido (mínimo 8 dígitos)',
      fr: 'Téléphone invalide (minimum 8 chiffres)'
    }
    return messages[lang]
  }

  // Validação de comprimento mínimo
  if (minLength && value.trim().length < minLength) {
    const messages: Record<Lang, string> = {
      pt: `Mínimo ${minLength} caracteres`,
      en: `Minimum ${minLength} characters`,
      es: `Mínimo ${minLength} caracteres`,
      fr: `Minimum ${minLength} caractères`
    }
    return messages[lang]
  }

  // Validação de comprimento máximo
  if (maxLength && value.trim().length > maxLength) {
    const messages: Record<Lang, string> = {
      pt: `Máximo ${maxLength} caracteres`,
      en: `Maximum ${maxLength} characters`,
      es: `Máximo ${maxLength} caracteres`,
      fr: `Maximum ${maxLength} caractères`
    }
    return messages[lang]
  }

  return null // Campo válido
}

// Validação completa do formulário
export function validateForm(
  fields: FormField[],
  lang: Lang = 'pt'
): ValidationResult {
  const errors: Record<string, string> = {}

  fields.forEach(field => {
    const error = validateField(field, lang)
    if (error) {
      errors[field.name] = error
    }
  })

  return {
    isValid: Object.keys(errors).length === 0,
    errors
  }
}

// Honeypot anti-spam (campo oculto)
export function checkHoneypot(honeypotValue: string): boolean {
  // Se o campo honeypot foi preenchido, é spam
  return !honeypotValue || honeypotValue.trim() === ''
}

// Validação de rate limiting (prevenir spam)
let lastSubmitTime = 0
const MIN_SUBMIT_INTERVAL = 2000 // 2 segundos entre submits

export function canSubmit(): boolean {
  const now = Date.now()
  if (now - lastSubmitTime < MIN_SUBMIT_INTERVAL) {
    return false
  }
  lastSubmitTime = now
  return true
}
