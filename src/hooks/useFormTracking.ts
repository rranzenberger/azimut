// ════════════════════════════════════════════════════════════
// HOOK: useFormTracking - Tracking completo de formulários
// ════════════════════════════════════════════════════════════
// Track: start, field_focus, field_blur, field_change, submit, abandon

import { useEffect, useRef, useState } from 'react'
import { trackFormEvent } from '../utils/analytics'

interface UseFormTrackingProps {
  formId: string
  formName: string
  enabled?: boolean
}

export function useFormTracking({
  formId,
  formName,
  enabled = true
}: UseFormTrackingProps) {
  const formRef = useRef<HTMLFormElement | null>(null)
  const startTimeRef = useRef<number>(Date.now())
  const [fieldsCompleted, setFieldsCompleted] = useState(0)
  const [totalFields, setTotalFields] = useState(0)
  const hasStarted = useRef(false)
  const hasSubmitted = useRef(false)
  const focusedFields = useRef<Set<string>>(new Set())

  // Track form start
  useEffect(() => {
    if (!enabled || !formRef.current || hasStarted.current) return

    const form = formRef.current
    const fields = form.querySelectorAll('input, textarea, select')
    setTotalFields(fields.length)
    hasStarted.current = true

    trackFormEvent(formId, formName, 'start', {
      totalFields: fields.length,
    })
  }, [formId, formName, enabled])

  // Track field interactions
  useEffect(() => {
    if (!enabled || !formRef.current) return

    const form = formRef.current

    // Field focus
    const handleFocus = (e: FocusEvent) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      if (target.name) {
        focusedFields.current.add(target.name)
        trackFormEvent(formId, formName, 'field_focus', {
          fieldName: target.name,
          fieldType: target.type || target.tagName.toLowerCase(),
        })
      }
    }

    // Field blur
    const handleBlur = (e: FocusEvent) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      if (target.name && target.value) {
        trackFormEvent(formId, formName, 'field_blur', {
          fieldName: target.name,
          fieldType: target.type || target.tagName.toLowerCase(),
          fieldValue: target.value.substring(0, 50), // Primeiros 50 chars apenas
        })
        
        // Atualizar campos completos
        const completed = Array.from(form.querySelectorAll('input, textarea, select'))
          .filter((field: any) => field.value && field.value.trim())
          .length
        setFieldsCompleted(completed)
      }
    }

    // Field change
    const handleChange = (e: Event) => {
      const target = e.target as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
      if (target.name) {
        trackFormEvent(formId, formName, 'field_change', {
          fieldName: target.name,
          fieldType: target.type || target.tagName.toLowerCase(),
        })
      }
    }

    // Form submit
    const handleSubmit = (e: SubmitEvent) => {
      if (!hasSubmitted.current) {
        hasSubmitted.current = true
        const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000)
        const completed = Array.from(form.querySelectorAll('input, textarea, select'))
          .filter((field: any) => field.value && field.value.trim())
          .length

        trackFormEvent(formId, formName, 'submit', {
          timeSpent,
          fieldsCompleted: completed,
          totalFields,
        })
      }
    }

    form.addEventListener('focusin', handleFocus as EventListener)
    form.addEventListener('focusout', handleBlur as EventListener)
    form.addEventListener('change', handleChange)
    form.addEventListener('submit', handleSubmit)

    return () => {
      form.removeEventListener('focusin', handleFocus as EventListener)
      form.removeEventListener('focusout', handleBlur as EventListener)
      form.removeEventListener('change', handleChange)
      form.removeEventListener('submit', handleSubmit)
    }
  }, [formId, formName, enabled, totalFields])

  // Track form abandon (quando usuário sai da página sem submeter)
  useEffect(() => {
    if (!enabled || !formRef.current || hasSubmitted.current) return

    const handleBeforeUnload = () => {
      const timeSpent = Math.floor((Date.now() - startTimeRef.current) / 1000)
      trackFormEvent(formId, formName, 'abandon', {
        timeSpent,
        fieldsCompleted,
        totalFields,
      })
    }

    window.addEventListener('beforeunload', handleBeforeUnload)
    return () => window.removeEventListener('beforeunload', handleBeforeUnload)
  }, [formId, formName, enabled, fieldsCompleted, totalFields])

  return { formRef, fieldsCompleted, totalFields }
}
