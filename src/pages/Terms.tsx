import React, { useEffect, useRef } from 'react'
import { t, type Lang } from '../i18n'
import SEO from '../components/SEO'

interface TermsProps {
  lang: Lang
}

/**
 * 📄 TERMOS DE USO
 * 
 * Página legal com termos de uso do site
 */

const Terms: React.FC<TermsProps> = ({ lang }) => {
  const starRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (starRef.current) {
      starRef.current.style.opacity = '0.15'
    }
  }, [])

  // Textos por idioma
  const content = {
    pt: {
      title: 'Termos de Uso',
      lastUpdate: 'Última atualização: Janeiro 2026',
      sections: [
        {
          title: '1. Aceitação dos Termos',
          content: `Ao acessar e usar o site azimut.com ("Site"), você concorda em cumprir estes Termos de Uso. Se você não concorda com estes termos, por favor não use nosso Site.`
        },
        {
          title: '2. Uso do Site',
          content: `**2.1. Licença de Uso:**
Concedemos a você uma licença limitada, não exclusiva e não transferível para acessar e usar o Site para fins pessoais e comerciais legítimos.

**2.2. Restrições:**
Você não pode:
- Copiar, modificar ou distribuir conteúdo sem autorização
- Usar o Site para fins ilegais ou não autorizados
- Tentar hackear ou comprometer a segurança do Site
- Fazer engenharia reversa de qualquer parte do Site
- Usar robots, scrapers ou ferramentas automatizadas sem permissão`
        },
        {
          title: '3. Propriedade Intelectual',
          content: `Todo o conteúdo do Site (textos, imagens, vídeos, logos, código) é propriedade da Azimut ou de seus licenciadores e está protegido por leis de direitos autorais, marcas registradas e outras leis de propriedade intelectual.

**Projetos e Portfolio:**
As imagens e descrições de projetos são de propriedade da Azimut e de nossos clientes. Uso não autorizado é proibido.`
        },
        {
          title: '4. Formulários e Comunicações',
          content: `**4.1. Budget Wizard e Formulários de Contato:**
Ao enviar informações através de nossos formulários, você:
- Garante que as informações são verdadeiras e precisas
- Nos autoriza a entrar em contato sobre sua solicitação
- Concorda com nossa Política de Privacidade

**4.2. Newsletter:**
Ao se inscrever em nossa newsletter, você concorda em receber comunicações da Azimut. Você pode cancelar a inscrição a qualquer momento.`
        },
        {
          title: '5. Isenção de Responsabilidade',
          content: `**5.1. "Como Está":**
O Site é fornecido "como está" sem garantias de qualquer tipo, expressas ou implícitas.

**5.2. Disponibilidade:**
Não garantimos que o Site estará sempre disponível ou livre de erros. Podemos suspender ou descontinuar o Site a qualquer momento.

**5.3. Links Externos:**
O Site pode conter links para sites de terceiros. Não somos responsáveis pelo conteúdo ou práticas de privacidade desses sites.`
        },
        {
          title: '6. Limitação de Responsabilidade',
          content: `Na máxima extensão permitida por lei, a Azimut não será responsável por:
- Danos diretos, indiretos, incidentais ou consequenciais
- Perda de lucros, dados ou goodwill
- Interrupção de negócios
- Qualquer dano resultante do uso ou incapacidade de usar o Site

Nossa responsabilidade total não excederá R$ 1.000,00 (mil reais).`
        },
        {
          title: '7. Indenização',
          content: `Você concorda em indenizar e isentar a Azimut, seus diretores, funcionários e parceiros de qualquer reclamação, dano ou despesa (incluindo honorários advocatícios) resultante de:
- Seu uso do Site
- Violação destes Termos
- Violação de direitos de terceiros`
        },
        {
          title: '8. Modificações',
          content: `Reservamos o direito de modificar estes Termos a qualquer momento. Alterações significativas serão comunicadas através de aviso no Site. Seu uso contínuo após mudanças constitui aceitação dos novos termos.`
        },
        {
          title: '9. Lei Aplicável',
          content: `Estes Termos são regidos pelas leis do Brasil. Qualquer disputa será resolvida nos tribunais de São Paulo, Brasil.

Para questões relacionadas a projetos canadenses, aplicam-se as leis do Québec, Canadá.`
        },
        {
          title: '10. Contato',
          content: `Dúvidas sobre estes Termos? Entre em contato:

**Email:** contact@azimut.com  
**Endereços:**  
🇧🇷 [Endereço Brasil]  
🇨🇦 [Endereço Canadá]`
        }
      ],
      footer: '© 2026 Azimut. Todos os direitos reservados.'
    },
    en: {
      title: 'Terms of Use',
      lastUpdate: 'Last updated: January 2026',
      sections: [
        {
          title: '1. Acceptance of Terms',
          content: `By accessing and using the azimut.com website ("Site"), you agree to comply with these Terms of Use. If you do not agree with these terms, please do not use our Site.`
        },
        {
          title: '2. Use of the Site',
          content: `**2.1. License:**
We grant you a limited, non-exclusive, non-transferable license to access and use the Site for personal and legitimate commercial purposes.

**2.2. Restrictions:**
You may not:
- Copy, modify or distribute content without authorization
- Use the Site for illegal or unauthorized purposes
- Attempt to hack or compromise Site security
- Reverse engineer any part of the Site
- Use robots, scrapers or automated tools without permission`
        },
        {
          title: '3. Intellectual Property',
          content: `All Site content (text, images, videos, logos, code) is owned by Azimut or its licensors and is protected by copyright, trademark and other intellectual property laws.

**Projects and Portfolio:**
Project images and descriptions are owned by Azimut and our clients. Unauthorized use is prohibited.`
        },
        {
          title: '4. Forms and Communications',
          content: `**4.1. Budget Wizard and Contact Forms:**
By submitting information through our forms, you:
- Guarantee that the information is true and accurate
- Authorize us to contact you about your request
- Agree to our Privacy Policy

**4.2. Newsletter:**
By subscribing to our newsletter, you agree to receive communications from Azimut. You can unsubscribe at any time.`
        },
        {
          title: '5. Disclaimer',
          content: `**5.1. "As Is":**
The Site is provided "as is" without warranties of any kind, express or implied.

**5.2. Availability:**
We do not guarantee that the Site will always be available or error-free. We may suspend or discontinue the Site at any time.

**5.3. External Links:**
The Site may contain links to third-party sites. We are not responsible for the content or privacy practices of these sites.`
        },
        {
          title: '6. Limitation of Liability',
          content: `To the maximum extent permitted by law, Azimut will not be liable for:
- Direct, indirect, incidental or consequential damages
- Loss of profits, data or goodwill
- Business interruption
- Any damage resulting from use or inability to use the Site

Our total liability will not exceed $1,000 CAD (one thousand Canadian dollars).`
        },
        {
          title: '7. Indemnification',
          content: `You agree to indemnify and hold harmless Azimut, its directors, employees and partners from any claim, damage or expense (including legal fees) resulting from:
- Your use of the Site
- Violation of these Terms
- Violation of third-party rights`
        },
        {
          title: '8. Modifications',
          content: `We reserve the right to modify these Terms at any time. Significant changes will be communicated through Site notice. Your continued use after changes constitutes acceptance of the new terms.`
        },
        {
          title: '9. Governing Law',
          content: `These Terms are governed by the laws of Canada (Québec). Any dispute will be resolved in the courts of Montreal, Canada.

For matters related to Brazilian projects, the laws of Brazil apply.`
        },
        {
          title: '10. Contact',
          content: `Questions about these Terms? Contact us:

**Email:** contact@azimut.com  
**Addresses:**  
🇧🇷 [Brazil Address]  
🇨🇦 [Canada Address]`
        }
      ],
      footer: '© 2026 Azimut. All rights reserved.'
    },
    fr: {
      title: 'Conditions d\'Utilisation',
      lastUpdate: 'Dernière mise à jour : Janvier 2026',
      sections: [
        {
          title: '1. Acceptation des Conditions',
          content: `En accédant et en utilisant le site azimut.com, vous acceptez de respecter ces Conditions d'Utilisation.`
        }
      ],
      footer: '© 2026 Azimut. Tous droits réservés.'
    },
    es: {
      title: 'Términos de Uso',
      lastUpdate: 'Última actualización: Enero 2026',
      sections: [
        {
          title: '1. Aceptación de los Términos',
          content: `Al acceder y usar el sitio azimut.com, usted acepta cumplir con estos Términos de Uso.`
        }
      ],
      footer: '© 2026 Azimut. Todos los derechos reservados.'
    }
  }

  const text = content[lang]

  return (
    <>
      <SEO 
        title={text.title}
        description="Termos de Uso do site Azimut. Condições legais de uso."
      />
      
      <main className="relative min-h-screen pt-8 md:pt-12 pb-24">
        {/* Estrela de fundo */}
        <div 
          ref={starRef}
          className="fixed -right-28 -bottom-40 min-[768px]:-right-40 min-[768px]:-bottom-60 z-[-5] pointer-events-none"
          style={{ opacity: 0 }}
          aria-hidden="true"
        >
          <img 
            src="/logo-azimut-star.svg" 
            alt="" 
            className="h-[520px] w-[520px] min-[768px]:h-[680px] min-[768px]:w-[680px]"
          />
        </div>

        {/* Conteúdo */}
        <div className="max-w-4xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8">
          
          {/* Header */}
          <div className="mb-12">
            <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
              {text.title}
            </h1>
            <p className="text-sm text-gray-400">
              {text.lastUpdate}
            </p>
          </div>

          {/* Seções */}
          <div className="space-y-8">
            {text.sections.map((section, index) => (
              <section key={index} className="prose prose-invert max-w-none">
                <h2 className="text-xl md:text-2xl font-semibold text-white mb-4">
                  {section.title}
                </h2>
                <div 
                  className="text-gray-300 leading-relaxed whitespace-pre-line"
                  dangerouslySetInnerHTML={{ 
                    __html: section.content.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>') 
                  }}
                />
              </section>
            ))}
          </div>

          {/* Footer */}
          <footer className="mt-16 pt-8 border-t border-white/10 text-center text-sm text-gray-500">
            {text.footer}
          </footer>

        </div>
      </main>
    </>
  )
}

export default Terms

