#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
Mila v9 patch — blindagem anti-IA (no humanizador) + trava dura de qualificacao (roteador).
Faz GET live -> backup -> patch 2 nos por nome -> PUT -> verifica active -> reativa se preciso.

USO:
    N8N_KEY="sua_chave_claude-fix"  python patch_mila_v9.py
ou no PowerShell:
    $env:N8N_KEY="sua_chave"; python patch_mila_v9.py

NAO precisa editar nada. Idempotente: aplica os textos abaixo de forma absoluta.
Backup do estado live vai para mila_v9_backup_live.json (reversivel).
"""
import os, sys, json, datetime, urllib.request, urllib.error

BASE = "https://n8n-production-dce3.up.railway.app"
WF_ID = "H4cV8R4ky7RsIzSO"
KEY = os.environ.get("N8N_KEY", "").strip()

# ---------------------------------------------------------------------------
# NOVOS TEXTOS
# ---------------------------------------------------------------------------
HUMANIZER_SYSTEM = (
    "Voce e Mila relendo o proprio email antes de enviar, como uma vendedora de "
    "elite que confere cada palavra, porque cada email e a reputacao da Azimut. "
    "Devolva a versao FINAL: 100% humana, calorosa e assertiva, como uma pessoa "
    "real que fez o dever de casa sobre aquela empresa. NUNCA pode parecer IA, "
    "template ou disparo em massa (se parecer, a pessoa descarta e o servidor "
    "marca spam, e a conta toda perde entrega).\n\n"
    "CHECAGEM (corrija ate passar em TODAS):\n"
    "1. ABERTURA: comeca com um gatilho REAL e especifico daquela empresa/pessoa? "
    "Se for elogio generico ('admiro o trabalho de voces'), reescreva com algo "
    "concreto ou corte.\n"
    "2. TAMANHO: 50 a 110 palavras. Se passar, corte sem do.\n"
    "3. RITMO HUMANO: frases de tamanhos diferentes, com pelo menos uma bem curta "
    "(3 a 5 palavras). Nada de paragrafos simetricos.\n"
    "4. CARISMA: confiante e leve, calor humano genuino. Sem bajulacao, sem "
    "robotismo, sem seducao/flerte ou diferenciacao por genero.\n"
    "5. RECIPROCIDADE: entrega uma ideia ou valor concreto, nao so pede.\n"
    "6. PEDIDO: UM unico pedido, de interesse e baixa friccao (nunca "
    "'15 min'/reuniao/horario no primeiro contato).\n"
    "7. PROVA: no maximo 1 case (Rio Museu Olimpico), em 1 linha.\n"
    "8. SINAIS DE IA (remova SEMPRE, sao o que mais denuncia robo):\n"
    "   - travessao (—): troque por virgula, ponto ou frase curta.\n"
    "   - estrutura espelhada 'nao apenas X, mas tambem Y'.\n"
    "   - abertura por gerundio ('Sendo assim', 'Visando', 'Buscando').\n"
    "   - listas/tricolons so para soar completo.\n"
    "   - clausuras roboticas ('Fico a disposicao', 'Atenciosamente', 'Espero que "
    "esteja bem', 'Venho por meio desta', 'Gostaria de apresentar').\n"
    "   - palavras proibidas: oportunidade, parceria, solucao, proposta, inovacao, "
    "impacto, ROI, sinergia, apresentar, transformacao, alavancar.\n"
    "   - sem bullets, sem exclamacoes, no maximo 1 link e so azimutimmersive.com.\n"
    "9. UMA IMPERFEICAO HUMANA: deixe exatamente um detalhe que so um humano poria "
    "(uma frase curta solta, um aposto, uma palavra coloquial). Perfeicao "
    "simetrica e o que entrega IA.\n"
    "10. FECHO: termina como convite humano para conversa/olhar, nunca como "
    "cobranca de venda.\n\n"
    "Teste final: 'eu, pessoa ocupada, pararia e responderia este email?'. Se nao, "
    "reescreva o trecho fraco.\n"
    "Mantenha a assinatura 'Mila / Azimut / azimutimmersive.com'. Devolva APENAS o "
    "corpo final, nada mais."
)

ROUTER_TEXT = (
    "=Voce qualifica leads para a Azimut (estudio imersivo/audiovisual, 30 anos, "
    "VR/AR/IA/motion/eventos/museus). Devolva APENAS JSON: "
    "{ \"score\": 0-100, \"motivo\": \"<1 frase>\", \"rota\": \"pitch\" ou \"cadastro\" }. "
    "rota=pitch SOMENTE quando os TRES existem ao mesmo tempo: (1) pessoa decisora "
    "nomeada, (2) email dela ou caminho claro ate ela, (3) gatilho concreto e "
    "verificavel (exposicao nova, lancamento, evento, edital aberto). Faltando "
    "qualquer um dos tres, rota=cadastro. rota=cadastro tambem quando for orgao "
    "publico/estatal/grande empresa onde o caminho real e credenciamento de "
    "fornecedores (o briefing CAMINHO indica isso). Penalize score (max 30) se o "
    "email for generico institucional (gabinete@, protocolo@, contato@, "
    "atendimento@) E nao houver pessoa nomeada. score = fit do lead para servicos "
    "imersivos/experienciais. Bloqueio score=0: ydreams, ydx.\n\n"
    "Lead: empresa {{ $(\"Contexto Lead (Fila)\").item.json.companyName }}, "
    "segmento {{ $(\"Contexto Lead (Fila)\").item.json.segmento }}, "
    "objetivo {{ $(\"Contexto Lead (Fila)\").item.json.objetivo }}.\n"
    "Pesquisa:\n{{ $json.research }}"
)

# settings: remover chaves fora do schema que causam 400 (licao do incidente v8)
SETTINGS_BAD_KEYS = {"availableInMCP", "binaryMode"}


def api(method, path, body=None):
    url = BASE + path
    data = json.dumps(body).encode("utf-8") if body is not None else None
    req = urllib.request.Request(url, data=data, method=method)
    req.add_header("X-N8N-API-KEY", KEY)
    req.add_header("Content-Type", "application/json")
    req.add_header("Accept", "application/json")
    try:
        with urllib.request.urlopen(req, timeout=60) as r:
            raw = r.read().decode("utf-8")
            return r.status, (json.loads(raw) if raw else {})
    except urllib.error.HTTPError as e:
        return e.code, e.read().decode("utf-8", "replace")


def main():
    if not KEY:
        print("ERRO: defina a variavel de ambiente N8N_KEY com a chave 'claude-fix'.")
        sys.exit(1)

    print("1) GET workflow live...")
    st, wf = api("GET", f"/api/v1/workflows/{WF_ID}")
    if st != 200:
        print("   FALHOU GET:", st, wf); sys.exit(1)
    print("   OK. active =", wf.get("active"))

    stamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
    bkp = os.path.join(os.path.dirname(os.path.abspath(__file__)), f"mila_v9_backup_live_{stamp}.json")
    with open(bkp, "w", encoding="utf-8") as f:
        json.dump(wf, f, ensure_ascii=False, indent=1)
    print("2) Backup salvo em", bkp)

    nodes = {n["name"]: n for n in wf["nodes"]}
    changed = []

    h = nodes.get("Claude humaniza email (Mila)")
    if h is not None:
        h.setdefault("parameters", {}).setdefault("options", {})
        h["parameters"]["options"]["systemMessage"] = HUMANIZER_SYSTEM
        changed.append("Claude humaniza email (Mila): systemMessage anti-IA")

    r = nodes.get("Roteador qualifica (DeepSeek)")
    if r is not None:
        r.setdefault("parameters", {})["text"] = ROUTER_TEXT
        changed.append("Roteador qualifica (DeepSeek): trava 3-requisitos + cap 30")

    if not changed:
        print("ERRO: nos esperados nao encontrados. Abortando."); sys.exit(1)
    print("3) Patches a aplicar:")
    for c in changed:
        print("   -", c)

    settings = {k: v for k, v in (wf.get("settings") or {}).items() if k not in SETTINGS_BAD_KEYS}
    put_body = {
        "name": wf["name"],
        "nodes": wf["nodes"],
        "connections": wf["connections"],
        "settings": settings,
    }

    print("4) PUT...")
    st, resp = api("PUT", f"/api/v1/workflows/{WF_ID}", put_body)
    if st not in (200, 201):
        print("   FALHOU PUT:", st, resp); sys.exit(1)
    print("   PUT OK", st)

    print("5) Verifica active...")
    st, wf2 = api("GET", f"/api/v1/workflows/{WF_ID}")
    active = wf2.get("active") if st == 200 else None
    print("   active =", active)
    if active is False:
        print("   Reativando...")
        st, _ = api("POST", f"/api/v1/workflows/{WF_ID}/activate")
        print("   activate ->", st)

    print("\nPRONTO. Mila v9 aplicada. Backup reversivel:", os.path.basename(bkp))
    print("Proximo: rodar um Execute manual no n8n p/ ver a copy sair humana (BCC em mila@).")


if __name__ == "__main__":
    main()
