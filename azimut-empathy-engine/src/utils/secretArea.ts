const SECRET_STORAGE_KEY = 'empathy_secret_unlocked'

export function isSecretUnlocked(): boolean {
  if (typeof window === 'undefined') return false
  return window.localStorage?.getItem(SECRET_STORAGE_KEY) === '1'
}

export function setSecretUnlocked(): void {
  if (typeof window === 'undefined') return
  window.localStorage?.setItem(SECRET_STORAGE_KEY, '1')
}
