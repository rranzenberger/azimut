# Recompensas: NFT diferenciado e fluxo sem carteira

## Visão geral

O jogo pode dar **NFT diferenciados** para quem descobre easter eggs e cumpre bem a área secreta. Muitos jogadores **não têm carteira** (MetaMask, Phantom, etc.). Este doc descreve o que o jogo faz hoje e como funciona o bônus com e sem carteira.

---

## O que o jogo faz hoje (in-game, sem carteira)

### 1. Conquistas especiais = “direito” a NFT diferenciado

Quem desbloqueia as conquistas abaixo **ganha um “direito”** a um NFT diferenciado (quando houver backend de minting). Hoje isso é registrado só nas **conquistas** (Configurações → Conquistas):

| Conquista       | Como desbloquear                          | NFT diferenciado (futuro)   |
|-----------------|-------------------------------------------|-----------------------------|
| **Explorador**  | 7 toques no título "EMPATHY ENGINE"       | NFT Explorador              |
| **Curioso**     | 5 toques no score na tela de resultado    | NFT Curioso                 |
| **Área Secreta**| 5 toques em "Área secreta — você descobre?"| NFT Área Secreta           |
| **Quest Premium** | Completar pelo menos 1 fase com quest premium (Rio Museu Olímpico, Gramado, Exposição) | NFT Quest Premium / Rio Museu Olímpico |

Ou seja: **no jogo, hoje, o bônus é a conquista**. A conquista fica salva (localStorage) e pode ser usada depois para dar um NFT diferente conforme o que a pessoa desbloqueou.

### 2. Fluxo “Receber NFT” (tela de resultado)

- Botão **“Receber NFT”** abre um modal para **nome + e-mail** (lead).
- **Não exige carteira**: o jogador só deixa contato.
- Backend (quando existir) pode:
  - Guardar o e-mail + conquistas desbloqueadas (Explorador, Curioso, Área Secreta, Quest Premium).
  - Depois: “Conecte uma carteira para receber seu NFT” ou “Criamos sua carteira custódia” ou envio de link para mint quando tiver carteira.

---

## Sem carteira: que bônus oferecer?

Enquanto não há minting real, o bônus é **só em jogo**:

1. **Conquistas**  
   - Aparecem em Configurações → Conquistas.  
   - Explorador, Curioso, Área Secreta, Quest Premium = “colecionáveis” e prova de que a pessoa descobriu coisas especiais.

2. **Texto no tutorial**  
   - Já diz: *“Não precisa de carteira para jogar. Para resgatar NFT e colecionáveis depois, você pode conectar uma carteira quando quiser (ex.: MetaMask, Phantom). Ou crie uma quando for resgatar suas recompensas.”*

3. **Quando tiver backend**  
   - **Com e-mail só**: guardar e-mail + lista de conquistas; depois enviar e-mail tipo: “Você desbloqueou NFT Explorador e Área Secreta. Conecte uma carteira aqui [link] para receber.”  
   - **Com carteira**: conectar wallet na hora do “Receber NFT” e mintar o NFT correspondente às conquistas (ex.: 1 NFT base + 1 “badge” por conquista especial = NFT diferenciado).

---

## Como funcionaria o NFT diferenciado (futuro)

- **Um NFT “base”** para quem completa o jogo ou clica em “Receber NFT”.
- **NFT diferenciado** para quem tem conquistas especiais:
  - Explorador → variação visual ou badge “Explorador”.
  - Curioso → variação “Curioso”.
  - Área Secreta → variação “Área Secreta” ou mais rara.
  - Quest Premium → variação “Rio Museu Olímpico” / “Quest Premium”.
- Quem tem **várias** dessas conquistas pode receber **um único NFT** com todos os badges ou um NFT de **raridade maior** (ex.: “Explorador + Área Secreta + Quest Premium” = NFT Ouro).

---

## Resumo

| Situação              | O que a pessoa ganha hoje                         | O que pode ganhar no futuro (com backend)      |
|-----------------------|---------------------------------------------------|-----------------------------------------------|
| **Sem carteira**      | Conquistas (Explorador, Curioso, Área Secreta, Quest Premium) | E-mail guardado; depois: link para conectar carteira e receber NFT diferenciado |
| **Com carteira**      | Mesmas conquistas                                 | Conectar wallet em “Receber NFT” e receber NFT base + diferenciado conforme conquistas |
| **Só joga, não clica “Receber NFT”** | Conquistas salvas no jogo                  | Se no futuro tiver conta/email em outro lugar, pode associar conquistas e depois resgatar NFT |

Assim, **quem não tem carteira** já tem um bônus claro (conquistas especiais) e um caminho futuro para receber NFT diferenciado quando tiver carteira ou quando a Azimut oferecer resgate por e-mail/link.
