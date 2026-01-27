'use client'

import { useState } from 'react'
import Link from 'next/link'

export default function SetupWalletPage() {
  const [step, setStep] = useState(1)
  const [walletAddress, setWalletAddress] = useState('')
  const [privateKey, setPrivateKey] = useState('')
  const [copied, setCopied] = useState(false)

  const steps = [
    {
      number: 1,
      title: 'Instalar MetaMask',
      description: 'Baixe e instale a extensão MetaMask no seu navegador',
      content: (
        <div className="space-y-4">
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h3 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">📥 Download MetaMask</h3>
            <p className="text-sm text-blue-800 dark:text-blue-200 mb-3">
              MetaMask é uma carteira digital que permite gerenciar criptomoedas e interagir com aplicações Web3.
            </p>
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
            >
              🌐 Baixar MetaMask
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
              </svg>
            </a>
          </div>
          <div className="bg-amber-50 dark:bg-amber-900/20 p-4 rounded-lg border border-amber-200 dark:border-amber-800">
            <h4 className="font-semibold text-amber-900 dark:text-amber-100 mb-2">⚠️ Importante</h4>
            <ul className="text-sm text-amber-800 dark:text-amber-200 space-y-1 list-disc list-inside">
              <li>Escolha o navegador: Chrome, Firefox, Edge ou Brave</li>
              <li>Instale apenas do site oficial: metamask.io</li>
              <li>Não instale extensões de fontes desconhecidas</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      number: 2,
      title: 'Criar Nova Conta',
      description: 'Crie uma conta separada para a empresa Azimut',
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3">🔐 Passo a Passo</h3>
            <ol className="space-y-3 text-sm text-green-800 dark:text-green-200">
              <li className="flex gap-3">
                <span className="font-bold text-green-600 dark:text-green-400">1.</span>
                <span>Abra MetaMask (clique no ícone da extensão)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-green-600 dark:text-green-400">2.</span>
                <span>Clique nos 3 pontinhos (menu) no canto superior direito</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-green-600 dark:text-green-400">3.</span>
                <span>Selecione &quot;Create Account&quot; ou &quot;Criar Conta&quot;</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-green-600 dark:text-green-400">4.</span>
                <span>Nome da conta: <strong>&quot;Azimut Empresa&quot;</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-green-600 dark:text-green-400">5.</span>
                <span>MetaMask vai gerar uma frase de recuperação (seed phrase) - <strong>ANOTE E GUARDE EM LUGAR SEGURO!</strong></span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-green-600 dark:text-green-400">6.</span>
                <span>Confirme a frase de recuperação</span>
              </li>
            </ol>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">🚨 SEGURANÇA CRÍTICA</h4>
            <ul className="text-sm text-red-800 dark:text-red-200 space-y-1 list-disc list-inside">
              <li><strong>NUNCA</strong> compartilhe sua frase de recuperação</li>
              <li><strong>NUNCA</strong> tire screenshot ou foto da frase</li>
              <li><strong>NUNCA</strong> digite em sites ou emails</li>
              <li>Anote em papel e guarde em cofre físico</li>
              <li>Esta frase pode restaurar sua carteira em qualquer dispositivo</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      number: 3,
      title: 'Adicionar Rede Polygon',
      description: 'Configure MetaMask para usar a rede Polygon (mais barata)',
      content: (
        <div className="space-y-4">
          <div className="bg-purple-50 dark:bg-purple-900/20 p-4 rounded-lg border border-purple-200 dark:border-purple-800">
            <h3 className="font-semibold text-purple-900 dark:text-purple-100 mb-3">🔗 Configurar Polygon</h3>
            <ol className="space-y-3 text-sm text-purple-800 dark:text-purple-200">
              <li className="flex gap-3">
                <span className="font-bold text-purple-600 dark:text-purple-400">1.</span>
                <span>No MetaMask, clique em &quot;Networks&quot; (no topo, ao lado do nome da rede)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-purple-600 dark:text-purple-400">2.</span>
                <span>Clique em &quot;Add Network&quot; ou &quot;Adicionar Rede&quot;</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-purple-600 dark:text-purple-400">3.</span>
                <span>Clique em &quot;Add a network manually&quot; (Adicionar rede manualmente)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-purple-600 dark:text-purple-400">4.</span>
                <span>Preencha os campos abaixo:</span>
              </li>
            </ol>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold mb-3">📋 Dados da Rede Polygon</h4>
            <div className="space-y-2 text-sm font-mono">
              <div className="flex justify-between items-center p-2 bg-white dark:bg-slate-900 rounded border">
                <span className="text-slate-600 dark:text-slate-400">Network Name:</span>
                <span className="font-bold">Polygon Mainnet</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white dark:bg-slate-900 rounded border">
                <span className="text-slate-600 dark:text-slate-400">RPC URL:</span>
                <span className="font-bold">https://polygon-rpc.com</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white dark:bg-slate-900 rounded border">
                <span className="text-slate-600 dark:text-slate-400">Chain ID:</span>
                <span className="font-bold">137</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white dark:bg-slate-900 rounded border">
                <span className="text-slate-600 dark:text-slate-400">Currency Symbol:</span>
                <span className="font-bold">MATIC</span>
              </div>
              <div className="flex justify-between items-center p-2 bg-white dark:bg-slate-900 rounded border">
                <span className="text-slate-600 dark:text-slate-400">Block Explorer:</span>
                <span className="font-bold">https://polygonscan.com</span>
              </div>
            </div>
            <button
              onClick={() => {
                const text = `Network Name: Polygon Mainnet\nRPC URL: https://polygon-rpc.com\nChain ID: 137\nCurrency Symbol: MATIC\nBlock Explorer: https://polygonscan.com`
                navigator.clipboard.writeText(text)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
              className="mt-3 w-full px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
            >
              {copied ? '✅ Copiado!' : '📋 Copiar Dados'}
            </button>
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Por que Polygon?</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1 list-disc list-inside">
              <li>Taxas ~1000x mais baratas que Ethereum</li>
              <li>Transações rápidas (~2 segundos)</li>
              <li>Compatível com todas as carteiras Ethereum (MetaMask, Ledger, etc.)</li>
              <li>Usado por grandes projetos (OpenSea, Aave, etc.)</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      number: 4,
      title: 'Exportar Chave Privada',
      description: 'Exporte a chave privada para configurar no sistema',
      content: (
        <div className="space-y-4">
          <div className="bg-orange-50 dark:bg-orange-900/20 p-4 rounded-lg border border-orange-200 dark:border-orange-800">
            <h3 className="font-semibold text-orange-900 dark:text-orange-100 mb-3">🔑 Exportar Chave</h3>
            <ol className="space-y-3 text-sm text-orange-800 dark:text-orange-200">
              <li className="flex gap-3">
                <span className="font-bold text-orange-600 dark:text-orange-400">1.</span>
                <span>No MetaMask, clique nos 3 pontinhos (menu)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-orange-600 dark:text-orange-400">2.</span>
                <span>Vá em &quot;Settings&quot; (Configurações)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-orange-600 dark:text-orange-400">3.</span>
                <span>Clique em &quot;Security & Privacy&quot; (Segurança e Privacidade)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-orange-600 dark:text-orange-400">4.</span>
                <span>Role até encontrar &quot;Export Private Key&quot; (Exportar Chave Privada)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-orange-600 dark:text-orange-400">5.</span>
                <span>Digite sua senha do MetaMask</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-orange-600 dark:text-orange-400">6.</span>
                <span>Copie a chave privada (começa com <code className="bg-orange-100 dark:bg-orange-900 px-1 rounded">0x...</code>)</span>
              </li>
            </ol>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">⚠️ ATENÇÃO</h4>
            <ul className="text-sm text-red-800 dark:text-red-200 space-y-1 list-disc list-inside">
              <li>A chave privada dá acesso TOTAL à sua carteira</li>
              <li>Nunca compartilhe com ninguém</li>
              <li>Nunca commite no Git</li>
              <li>Cole apenas no arquivo <code className="bg-red-100 dark:bg-red-900 px-1 rounded">.env</code> local</li>
            </ul>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold mb-2">📝 Cole aqui para verificar formato:</h4>
            <input
              type="text"
              value={privateKey}
              onChange={(e) => setPrivateKey(e.target.value)}
              placeholder="0x..."
              className="w-full px-3 py-2 border rounded-lg font-mono text-sm"
            />
            {privateKey && (
              <div className="mt-2 text-xs">
                {privateKey.startsWith('0x') && privateKey.length === 66 ? (
                  <span className="text-green-600">✅ Formato correto!</span>
                ) : (
                  <span className="text-red-600">❌ Formato inválido. Deve começar com 0x e ter 66 caracteres.</span>
                )}
              </div>
            )}
          </div>
        </div>
      ),
    },
    {
      number: 5,
      title: 'Obter Endereço da Carteira',
      description: 'Copie o endereço público da sua carteira',
      content: (
        <div className="space-y-4">
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h3 className="font-semibold text-green-900 dark:text-green-100 mb-3">📍 Endereço da Carteira</h3>
            <ol className="space-y-3 text-sm text-green-800 dark:text-green-200">
              <li className="flex gap-3">
                <span className="font-bold text-green-600 dark:text-green-400">1.</span>
                <span>No MetaMask, clique no nome da conta (&quot;Azimut Empresa&quot;)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-green-600 dark:text-green-400">2.</span>
                <span>O endereço aparece abaixo do nome (começa com <code className="bg-green-100 dark:bg-green-900 px-1 rounded">0x...</code>)</span>
              </li>
              <li className="flex gap-3">
                <span className="font-bold text-green-600 dark:text-green-400">3.</span>
                <span>Clique no endereço para copiar automaticamente</span>
              </li>
            </ol>
          </div>
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <h4 className="font-semibold mb-2">📝 Cole aqui para verificar formato:</h4>
            <input
              type="text"
              value={walletAddress}
              onChange={(e) => setWalletAddress(e.target.value)}
              placeholder="0x..."
              className="w-full px-3 py-2 border rounded-lg font-mono text-sm"
            />
            {walletAddress && (
              <div className="mt-2 text-xs">
                {walletAddress.startsWith('0x') && walletAddress.length === 42 ? (
                  <span className="text-green-600">✅ Formato correto!</span>
                ) : (
                  <span className="text-red-600">❌ Formato inválido. Deve começar com 0x e ter 42 caracteres.</span>
                )}
              </div>
            )}
          </div>
          <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-lg border border-blue-200 dark:border-blue-800">
            <h4 className="font-semibold text-blue-900 dark:text-blue-100 mb-2">💡 Diferença</h4>
            <ul className="text-sm text-blue-800 dark:text-blue-200 space-y-1">
              <li><strong>Endereço público:</strong> Pode ser compartilhado (para receber pagamentos)</li>
              <li><strong>Chave privada:</strong> NUNCA compartilhe (controla a carteira)</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      number: 6,
      title: 'Adicionar Fundos (MATIC)',
      description: 'Compre MATIC e envie para sua carteira',
      content: (
        <div className="space-y-4">
          <div className="bg-yellow-50 dark:bg-yellow-900/20 p-4 rounded-lg border border-yellow-200 dark:border-yellow-800">
            <h3 className="font-semibold text-yellow-900 dark:text-yellow-100 mb-3">💰 Como Comprar MATIC</h3>
            <div className="space-y-3 text-sm text-yellow-800 dark:text-yellow-200">
              <div>
                <h4 className="font-semibold mb-2">Opção 1: Exchange (Recomendado)</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Binance, Coinbase, Kraken, ou outras exchanges</li>
                  <li>Compre MATIC com cartão de crédito ou transferência</li>
                  <li>Envie MATIC para seu endereço da carteira MetaMask</li>
                </ul>
              </div>
              <div>
                <h4 className="font-semibold mb-2">Opção 2: Direto no MetaMask</h4>
                <ul className="list-disc list-inside space-y-1 ml-4">
                  <li>Clique em &quot;Buy&quot; no MetaMask</li>
                  <li>Use serviços como Wyre ou Transak</li>
                  <li>Mais caro, mas mais rápido</li>
                </ul>
              </div>
            </div>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">💵 Quanto Comprar?</h4>
            <ul className="text-sm text-green-800 dark:text-green-200 space-y-1 list-disc list-inside">
              <li><strong>Mínimo recomendado:</strong> $10-20 USD em MATIC</li>
              <li><strong>Para começar:</strong> $50-100 USD é suficiente</li>
              <li><strong>Taxa por transação:</strong> ~$0.01 (muito barato!)</li>
              <li>Com $50 você pode fazer ~5000 transações</li>
            </ul>
          </div>
          <div className="bg-red-50 dark:bg-red-900/20 p-4 rounded-lg border border-red-200 dark:border-red-800">
            <h4 className="font-semibold text-red-900 dark:text-red-100 mb-2">⚠️ IMPORTANTE</h4>
            <ul className="text-sm text-red-800 dark:text-red-200 space-y-1 list-disc list-inside">
              <li>Certifique-se de estar na rede <strong>Polygon</strong> (não Ethereum)</li>
              <li>Verifique o endereço antes de enviar (copie e cole)</li>
              <li>Comece com valores pequenos para testar</li>
              <li>Nunca envie para endereços de fontes desconhecidas</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      number: 7,
      title: 'Configurar no Sistema',
      description: 'Adicione as informações no arquivo .env',
      content: (
        <div className="space-y-4">
          <div className="bg-slate-50 dark:bg-slate-800 p-4 rounded-lg border border-slate-200 dark:border-slate-700">
            <h3 className="font-semibold mb-3">⚙️ Configuração do .env</h3>
            <p className="text-sm mb-4">
              Abra o arquivo <code className="bg-slate-200 dark:bg-slate-700 px-2 py-1 rounded">azimut-cms/.env</code> e adicione:
            </p>
            <div className="bg-slate-900 text-green-400 p-4 rounded-lg font-mono text-xs overflow-x-auto">
              <div className="space-y-2">
                <div>
                  <span className="text-slate-500"># Carteira da Empresa</span>
                </div>
                <div>
                  <span className="text-blue-400">COMPANY_WALLET_ADDRESS</span>
                  <span className="text-slate-500">=</span>
                  <span className="text-yellow-400">0x{walletAddress || 'SEU_ENDERECO_AQUI'}</span>
                </div>
                <div className="mt-2">
                  <span className="text-blue-400">COMPANY_WALLET_PRIVATE_KEY</span>
                  <span className="text-slate-500">=</span>
                  <span className="text-yellow-400">0x{privateKey || 'SUA_CHAVE_PRIVADA_AQUI'}</span>
                </div>
                <div className="mt-2">
                  <span className="text-blue-400">RPC_URL</span>
                  <span className="text-slate-500">=</span>
                  <span className="text-yellow-400">https://polygon-rpc.com</span>
                </div>
              </div>
            </div>
            <button
              onClick={() => {
                const envConfig = `# Carteira da Empresa
COMPANY_WALLET_ADDRESS=${walletAddress || 'SEU_ENDERECO_AQUI'}
COMPANY_WALLET_PRIVATE_KEY=${privateKey || 'SUA_CHAVE_PRIVADA_AQUI'}
RPC_URL=https://polygon-rpc.com`
                navigator.clipboard.writeText(envConfig)
                setCopied(true)
                setTimeout(() => setCopied(false), 2000)
              }}
              className="mt-3 w-full px-4 py-2 bg-slate-600 hover:bg-slate-700 text-white rounded-lg transition-colors"
            >
              {copied ? '✅ Copiado para .env!' : '📋 Copiar Configuração'}
            </button>
          </div>
          <div className="bg-green-50 dark:bg-green-900/20 p-4 rounded-lg border border-green-200 dark:border-green-800">
            <h4 className="font-semibold text-green-900 dark:text-green-100 mb-2">✅ Próximos Passos</h4>
            <ol className="text-sm text-green-800 dark:text-green-200 space-y-1 list-decimal list-inside">
              <li>Salve o arquivo .env</li>
              <li>Reinicie o servidor do backoffice</li>
              <li>Acesse a página <Link href="/admin/web3/wallet-status" className="text-blue-400 hover:underline">Status da Carteira</Link> para verificar</li>
              <li>Teste conectando uma carteira no site público</li>
            </ol>
          </div>
        </div>
      ),
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800 p-6">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6">
          <h1 className="text-3xl font-bold mb-2">🔐 Configurar Carteira MetaMask Polygon</h1>
          <p className="text-slate-600 dark:text-slate-400">
            Guia passo a passo para criar e configurar sua carteira Web3
          </p>
        </div>

        {/* Progress Bar */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            {steps.map((s) => (
              <div key={s.number} className="flex items-center flex-1">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${
                    step >= s.number
                      ? 'bg-blue-600 text-white'
                      : 'bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-400'
                  }`}
                >
                  {step > s.number ? '✓' : s.number}
                </div>
                {s.number < steps.length && (
                  <div
                    className={`flex-1 h-1 mx-2 ${
                      step > s.number ? 'bg-blue-600' : 'bg-slate-200 dark:bg-slate-700'
                    }`}
                  />
                )}
              </div>
            ))}
          </div>
          <div className="text-center">
            <span className="text-sm text-slate-600 dark:text-slate-400">
              Passo {step} de {steps.length}
            </span>
          </div>
        </div>

        {/* Current Step Content */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-6">
          <h2 className="text-2xl font-bold mb-2">
            {steps[step - 1].number}. {steps[step - 1].title}
          </h2>
          <p className="text-slate-600 dark:text-slate-400 mb-6">
            {steps[step - 1].description}
          </p>
          {steps[step - 1].content}
        </div>

        {/* Navigation */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
          <div className="flex justify-between">
            <button
              onClick={() => setStep(Math.max(1, step - 1))}
              disabled={step === 1}
              className="px-6 py-2 bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-600 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              ← Anterior
            </button>
            <button
              onClick={() => setStep(Math.min(steps.length, step + 1))}
              disabled={step === steps.length}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
            >
              Próximo →
            </button>
          </div>
        </div>

        {/* Quick Links */}
        <div className="mt-6 bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
          <h3 className="font-semibold mb-3">🔗 Links Úteis</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            <a
              href="https://metamask.io/download/"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors"
            >
              📥 Baixar MetaMask
            </a>
            <a
              href="https://polygonscan.com"
              target="_blank"
              rel="noopener noreferrer"
              className="p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors block"
            >
              🔍 Polygon Explorer
            </a>
            <Link
              href="/admin/web3/wallet-status"
              className="p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors block"
            >
              💰 Status da Carteira
            </Link>
            <Link
              href="/admin/web3/student-rewards"
              className="p-3 border rounded-lg hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors block"
            >
              🎓 Recompensas Estudantes
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
