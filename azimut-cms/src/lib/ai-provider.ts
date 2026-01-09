/**
 * Camada de abstração para múltiplos providers de IA
 * Suporta: DeepSeek, OpenAI, Llama, Gemini
 */

interface AIMessage {
  role: 'system' | 'user' | 'assistant';
  content: string;
}

interface AIResponse {
  content: string;
  provider: string;
  tokensUsed?: number;
}

export type AIProvider = 'deepseek' | 'openai' | 'llama' | 'gemini' | 'claude';

interface AIConfig {
  provider: AIProvider;
  apiKey?: string;
  endpoint?: string;
  model?: string;
}

class AIProviderService {
  private config: AIConfig;

  constructor(config?: Partial<AIConfig>) {
    // Estratégia inteligente de seleção:
    // 1. Se ANTHROPIC_API_KEY existe → Claude (melhor para dados pesados/segurança)
    // 2. Se DEEPSEEK_API_KEY existe → DeepSeek (custo-benefício)
    // 3. Se OPENAI_API_KEY existe → OpenAI
    // 4. Se GEMINI_API_KEY existe → Gemini
    // 5. Fallback: DeepSeek
    let provider: AIProvider = 'deepseek';
    
    if (config?.provider) {
      provider = config.provider;
    } else if (process.env.AI_PROVIDER) {
      provider = process.env.AI_PROVIDER as AIProvider;
    } else if (process.env.ANTHROPIC_API_KEY) {
      provider = 'claude'; // Prioridade para segurança/dados pesados
    } else if (process.env.DEEPSEEK_API_KEY) {
      provider = 'deepseek';
    } else if (process.env.OPENAI_API_KEY) {
      provider = 'openai';
    } else if (process.env.GEMINI_API_KEY) {
      provider = 'gemini';
    }

    this.config = {
      provider,
      apiKey: config?.apiKey || this.getApiKey(provider),
      endpoint: config?.endpoint || this.getEndpoint(provider),
      model: config?.model || this.getDefaultModel(provider),
    };
  }

  private getApiKey(provider: AIProvider): string | undefined {
    switch (provider) {
      case 'deepseek':
        return process.env.DEEPSEEK_API_KEY;
      case 'openai':
        return process.env.OPENAI_API_KEY;
      case 'gemini':
        return process.env.GEMINI_API_KEY;
      case 'claude':
        return process.env.ANTHROPIC_API_KEY;
      case 'llama':
        return undefined; // Self-hosted, sem API key
    }
  }

  private getEndpoint(provider: AIProvider): string {
    switch (provider) {
      case 'deepseek':
        return process.env.DEEPSEEK_ENDPOINT || 'https://api.deepseek.com/v1';
      case 'openai':
        return 'https://api.openai.com/v1';
      case 'gemini':
        return 'https://generativelanguage.googleapis.com/v1';
      case 'claude':
        return 'https://api.anthropic.com/v1';
      case 'llama':
        return process.env.LLAMA_ENDPOINT || 'http://localhost:11434'; // Ollama
    }
  }

  private getDefaultModel(provider: AIProvider): string {
    switch (provider) {
      case 'deepseek':
        return process.env.DEEPSEEK_MODEL || 'deepseek-chat';
      case 'openai':
        return process.env.OPENAI_MODEL || 'gpt-4-turbo-preview';
      case 'gemini':
        return process.env.GEMINI_MODEL || 'gemini-pro';
      case 'claude':
        // Estratégia inteligente: Opus para dados pesados, Sonnet para normal
        return process.env.CLAUDE_MODEL || 
               (process.env.AI_MODE === 'max' || process.env.AI_MODE === 'opus' 
                 ? 'claude-3-opus-20240229' 
                 : 'claude-3-5-sonnet-20241022');
      case 'llama':
        return process.env.LLAMA_MODEL || 'llama3';
    }
  }

  /**
   * Gera uma resposta de IA
   */
  async chat(messages: AIMessage[], options?: {
    temperature?: number;
    maxTokens?: number;
  }): Promise<AIResponse> {
    switch (this.config.provider) {
      case 'deepseek':
        return this.chatDeepSeek(messages, options);
      case 'openai':
        return this.chatOpenAI(messages, options);
      case 'gemini':
        return this.chatGemini(messages, options);
      case 'claude':
        return this.chatClaude(messages, options);
      case 'llama':
        return this.chatLlama(messages, options);
      default:
        throw new Error(`Provider ${this.config.provider} não suportado`);
    }
  }

  /**
   * DeepSeek - API compatível com OpenAI
   */
  private async chatDeepSeek(
    messages: AIMessage[], 
    options?: { temperature?: number; maxTokens?: number }
  ): Promise<AIResponse> {
    const response = await fetch(`${this.config.endpoint}/chat/completions`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        model: this.config.model,
        messages,
        temperature: options?.temperature || 0.7,
        max_tokens: options?.maxTokens || 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`DeepSeek API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      content: data.choices[0].message.content,
      provider: 'deepseek',
      tokensUsed: data.usage?.total_tokens,
    };
  }

  /**
   * OpenAI
   */
  private async chatOpenAI(
    messages: AIMessage[], 
    options?: { temperature?: number; maxTokens?: number }
  ): Promise<AIResponse> {
    const response = await fetch('https://api.openai.com/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        model: this.config.model,
        messages,
        temperature: options?.temperature || 0.7,
        max_tokens: options?.maxTokens || 1000,
      }),
    });

    if (!response.ok) {
      throw new Error(`OpenAI API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      content: data.choices[0].message.content,
      provider: 'openai',
      tokensUsed: data.usage?.total_tokens,
    };
  }

  /**
   * Google Gemini
   */
  private async chatGemini(
    messages: AIMessage[], 
    options?: { temperature?: number; maxTokens?: number }
  ): Promise<AIResponse> {
    // Converter formato de mensagens para Gemini
    const contents = messages.map(msg => ({
      role: msg.role === 'assistant' ? 'model' : 'user',
      parts: [{ text: msg.content }],
    }));

    const response = await fetch(
      `${this.config.endpoint}/models/${this.config.model}:generateContent?key=${this.config.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents,
          generationConfig: {
            temperature: options?.temperature || 0.7,
            maxOutputTokens: options?.maxTokens || 1000,
          },
        }),
      }
    );

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      content: data.candidates[0].content.parts[0].text,
      provider: 'gemini',
    };
  }

  /**
   * Claude (Anthropic) - Melhor para dados pesados e segurança
   */
  private async chatClaude(
    messages: AIMessage[],
    options?: { temperature?: number; maxTokens?: number }
  ): Promise<AIResponse> {
    // Claude usa formato diferente: system message separado
    const systemMessage = messages.find(m => m.role === 'system')?.content || '';
    const userMessages = messages.filter(m => m.role !== 'system');

    // Converter para formato Claude
    const claudeMessages = userMessages.map(msg => ({
      role: msg.role === 'assistant' ? 'assistant' : 'user',
      content: msg.content,
    }));

    const response = await fetch(`${this.config.endpoint}/messages`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'x-api-key': this.config.apiKey!,
        'anthropic-version': '2023-06-01',
      },
      body: JSON.stringify({
        model: this.config.model,
        max_tokens: options?.maxTokens || 4096, // Claude suporta mais tokens
        temperature: options?.temperature || 0.3, // Mais determinístico para análise
        system: systemMessage || undefined,
        messages: claudeMessages,
      }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(`Claude API error: ${response.statusText} - ${JSON.stringify(errorData)}`);
    }

    const data = await response.json();

    return {
      content: data.content[0].text,
      provider: 'claude',
      tokensUsed: data.usage?.input_tokens && data.usage?.output_tokens
        ? data.usage.input_tokens + data.usage.output_tokens
        : undefined,
    };
  }

  /**
   * Llama via Ollama (self-hosted)
   */
  private async chatLlama(
    messages: AIMessage[], 
    options?: { temperature?: number; maxTokens?: number }
  ): Promise<AIResponse> {
    const response = await fetch(`${this.config.endpoint}/api/chat`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.config.model,
        messages,
        options: {
          temperature: options?.temperature || 0.7,
          num_predict: options?.maxTokens || 1000,
        },
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();
    
    return {
      content: data.message.content,
      provider: 'llama',
    };
  }

  /**
   * Gera embedding de texto (para busca semântica)
   */
  async embed(text: string): Promise<number[]> {
    switch (this.config.provider) {
      case 'deepseek':
      case 'openai':
        return this.embedOpenAI(text);
      case 'gemini':
        return this.embedGemini(text);
      case 'claude':
        // Claude não tem API de embeddings separada, usar OpenAI como fallback
        return this.embedOpenAI(text);
      case 'llama':
        return this.embedLlama(text);
    }
  }

  private async embedOpenAI(text: string): Promise<number[]> {
    const endpoint = this.config.provider === 'deepseek' 
      ? this.config.endpoint 
      : 'https://api.openai.com/v1';

    const response = await fetch(`${endpoint}/embeddings`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${this.config.apiKey}`,
      },
      body: JSON.stringify({
        model: 'text-embedding-ada-002',
        input: text,
      }),
    });

    const data = await response.json();
    return data.data[0].embedding;
  }

  private async embedGemini(text: string): Promise<number[]> {
    const response = await fetch(
      `${this.config.endpoint}/models/embedding-001:embedContent?key=${this.config.apiKey}`,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          content: { parts: [{ text }] },
        }),
      }
    );

    const data = await response.json();
    return data.embedding.values;
  }

  private async embedLlama(text: string): Promise<number[]> {
    const response = await fetch(`${this.config.endpoint}/api/embeddings`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        model: this.config.model,
        prompt: text,
      }),
    });

    const data = await response.json();
    return data.embedding;
  }
}

// Singleton instance
let aiProviderInstance: AIProviderService | null = null;

export function getAIProvider(config?: Partial<AIConfig>): AIProviderService {
  if (!aiProviderInstance || config) {
    aiProviderInstance = new AIProviderService(config);
  }
  return aiProviderInstance;
}

export { AIProviderService };













































