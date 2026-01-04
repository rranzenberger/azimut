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

export type AIProvider = 'deepseek' | 'openai' | 'llama' | 'gemini';

interface AIConfig {
  provider: AIProvider;
  apiKey?: string;
  endpoint?: string;
  model?: string;
}

class AIProviderService {
  private config: AIConfig;

  constructor(config?: Partial<AIConfig>) {
    // Prioridade: DeepSeek > Gemini > Llama > OpenAI
    const provider = (config?.provider || 
                     process.env.AI_PROVIDER || 
                     'deepseek') as AIProvider;

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
      case 'llama':
        return process.env.LLAMA_ENDPOINT || 'http://localhost:11434'; // Ollama
    }
  }

  private getDefaultModel(provider: AIProvider): string {
    switch (provider) {
      case 'deepseek':
        return 'deepseek-chat';
      case 'openai':
        return 'gpt-3.5-turbo';
      case 'gemini':
        return 'gemini-pro';
      case 'llama':
        return 'llama3';
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








































