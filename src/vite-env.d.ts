/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_BACKOFFICE_URL?: string
  readonly VITE_CMS_API_URL?: string
  readonly VITE_API_URL?: string
  readonly VITE_API_KEY?: string
  readonly VITE_DEEPSEEK_API_KEY?: string
  readonly VITE_CLAUDE_API_KEY?: string
  readonly VITE_ENABLE_AI_SUGGESTIONS?: string
  readonly VITE_ENABLE_TRACKING?: string
  readonly VITE_GA_MEASUREMENT_ID?: string
  readonly VITE_GOOGLE_SEARCH_CONSOLE_VERIFICATION?: string
  readonly DEV: boolean
  readonly PROD: boolean
  readonly MODE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
