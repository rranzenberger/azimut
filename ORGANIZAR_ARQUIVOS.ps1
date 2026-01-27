#  ORGANIZAR ARQUIVOS .MD E SCRIPTS
# Este script organiza todos os arquivos de documentaÃ§Ã£o e scripts

Write-Host "========================================" -ForegroundColor Cyan
Write-Host "ORGANIZANDO ARQUIVOS DO PROJETO" -ForegroundColor Cyan
Write-Host "========================================" -ForegroundColor Cyan
Write-Host ""

Set-Location "C:\Users\ranz\Documents\azimut-site-vite-tailwind"

# Criar estrutura de pastas
Write-Host "[1/5] Criando estrutura de pastas..." -ForegroundColor Yellow

$folders = @(
    "docs",
    "docs\deploy",
    "docs\guias",
    "docs\checkpoints",
    "docs\resumos",
    "docs\auditorias",
    "docs\workflows",
    "docs\sql",
    "scripts\deploy",
    "scripts\utils",
    "archive"
)

foreach ($folder in $folders) {
    if (-not (Test-Path $folder)) {
        New-Item -ItemType Directory -Path $folder -Force | Out-Null
        Write-Host "  [OK] Criado: $folder" -ForegroundColor Green
    }
}

Write-Host ""
Write-Host "[2/5] Movendo arquivos de deploy..." -ForegroundColor Yellow

# Arquivos de deploy
$deployFiles = @(
    "*DEPLOY*.md",
    "*DEPLOY*.bat",
    "*DEPLOY*.ps1",
    "SOLUCAO_AGORA.md",
    "SOLUCAO_FINAL_DEPLOY.md",
    "INSTRUCOES_DEPLOY*.md",
    "MELHOR_OPCAO_DEPLOY.md",
    "COMO_RESOLVER_LOCK*.md",
    "SOLUCAO_LOCK*.md",
    "PASSO_A_PASSO_FECHAR*.md",
    "ESTADO_ATUAL_DEPLOY.md",
    "RESUMO_ESTADO_ATUAL.md",
    "FECHAR_CURSOR*.ps1",
    "DEPLOY_FORCE.ps1",
    "DEPLOY_AGORA.ps1"
)

foreach ($pattern in $deployFiles) {
    Get-ChildItem -Filter $pattern -File -ErrorAction SilentlyContinue | ForEach-Object {
        $dest = "docs\deploy\$($_.Name)"
        if (-not (Test-Path $dest)) {
            Move-Item $_.FullName -Destination $dest -Force
            Write-Host "  [OK] Movido: $($_.Name)" -ForegroundColor Green
        }
    }
}

Write-Host ""
Write-Host "[3/5] Movendo scripts de deploy..." -ForegroundColor Yellow

# Scripts de deploy
@("*DEPLOY*.bat", "*DEPLOY*.ps1") | ForEach-Object {
    $pattern = $_
    Get-ChildItem -Filter $pattern -File -ErrorAction SilentlyContinue | ForEach-Object {
        $dest = "scripts\deploy\$($_.Name)"
        if (-not (Test-Path $dest)) {
            Move-Item $_.FullName -Destination $dest -Force
            Write-Host "  [OK] Movido: $($_.Name)" -ForegroundColor Green
        }
    }
}

Write-Host ""
Write-Host "[4/5] Movendo guias e tutoriais..." -ForegroundColor Yellow

# Guias
$guideFiles = @(
    "*COMO*.md",
    "*GUIA*.md",
    "*INSTRUCOES*.md",
    "*TUTORIAL*.md",
    "COMO_ABRIR_POWERSHELL.md",
    "COMO_ACESSAR*.md",
    "COMO_ADICIONAR*.md",
    "COMO_EDITAR*.md",
    "COMO_ELIMINAR*.md",
    "COMO_IMPORTAR*.md",
    "COMO_POPULAR*.md",
    "COMO_SINCRONIZAR*.md",
    "COMO_USAR*.md",
    "COMO_VERIFICAR*.md",
    "N8N_*.md",
    "WORKFLOW_*.md"
)

foreach ($pattern in $guideFiles) {
    Get-ChildItem -Filter $pattern -File -ErrorAction SilentlyContinue | ForEach-Object {
        $dest = "docs\guias\$($_.Name)"
        if (-not (Test-Path $dest)) {
            Move-Item $_.FullName -Destination $dest -Force
            Write-Host "  [OK] Movido: $($_.Name)" -ForegroundColor Green
        }
    }
}

Write-Host ""
Write-Host "[5/7] Movendo checkpoints e resumos..." -ForegroundColor Yellow

# Checkpoints
Get-ChildItem -Filter "*CHECKPOINT*.md" -File -ErrorAction SilentlyContinue | ForEach-Object {
    $dest = "docs\checkpoints\$($_.Name)"
    if (-not (Test-Path $dest)) {
        Move-Item $_.FullName -Destination $dest -Force
        Write-Host "  [OK] Movido: $($_.Name)" -ForegroundColor Green
    }
}

# Resumos
@("*RESUMO*.md", "*RELATORIO*.md") | ForEach-Object {
    $pattern = $_
    Get-ChildItem -Filter $pattern -File -ErrorAction SilentlyContinue | ForEach-Object {
        $dest = "docs\resumos\$($_.Name)"
        if (-not (Test-Path $dest)) {
            Move-Item $_.FullName -Destination $dest -Force
            Write-Host "  [OK] Movido: $($_.Name)" -ForegroundColor Green
        }
    }
}

# Auditorias
Get-ChildItem -Filter "*AUDITORIA*.md" -File -ErrorAction SilentlyContinue | ForEach-Object {
    $dest = "docs\auditorias\$($_.Name)"
    if (-not (Test-Path $dest)) {
        Move-Item $_.FullName -Destination $dest -Force
        Write-Host "  [OK] Movido: $($_.Name)" -ForegroundColor Green
    }
}

# Workflows
@("*WORKFLOW*.md", "*N8N*.md", "*CAPTACAO*.md") | ForEach-Object {
    $pattern = $_
    Get-ChildItem -Filter $pattern -File -ErrorAction SilentlyContinue | ForEach-Object {
        $dest = "docs\workflows\$($_.Name)"
        if (-not (Test-Path $dest)) {
            Move-Item $_.FullName -Destination $dest -Force
            Write-Host "  [OK] Movido: $($_.Name)" -ForegroundColor Green
        }
    }
}

# SQL docs
@("*SQL*.md", "*EXECUTAR*.md", "*VERIFICAR*.md") | ForEach-Object {
    $pattern = $_
    Get-ChildItem -Filter $pattern -File -ErrorAction SilentlyContinue | ForEach-Object {
        $dest = "docs\sql\$($_.Name)"
        if (-not (Test-Path $dest)) {
            Move-Item $_.FullName -Destination $dest -Force
            Write-Host "  [OK] Movido: $($_.Name)" -ForegroundColor Green
        }
    }
}

# Scripts utilitÃ¡rios
@("*.ps1", "*.bat") | ForEach-Object {
    $pattern = $_
    Get-ChildItem -Filter $pattern -File -Exclude "*DEPLOY*" -ErrorAction SilentlyContinue | Where-Object {
        $_.DirectoryName -eq (Get-Location).Path -and $_.Name -notlike "*DEPLOY*"
    } | ForEach-Object {
        $dest = "scripts\utils\$($_.Name)"
        if (-not (Test-Path $dest)) {
            Move-Item $_.FullName -Destination $dest -Force
            Write-Host "  [OK] Movido: $($_.Name)" -ForegroundColor Green
        }
    }
}

Write-Host ""
Write-Host "========================================" -ForegroundColor Green
Write-Host "[OK] ORGANIZAÃ‡ÃƒO CONCLUÃDA!" -ForegroundColor Green
Write-Host "========================================" -ForegroundColor Green
Write-Host ""
Write-Host "Estrutura criada:" -ForegroundColor Cyan
Write-Host "  docs/deploy/     - DocumentaÃ§Ã£o de deploy" -ForegroundColor White
Write-Host "  docs/guias/      - Guias e tutoriais" -ForegroundColor White
Write-Host "  docs/checkpoints/ - Checkpoints e status" -ForegroundColor White
Write-Host "  docs/resumos/    - Resumos e relatÃ³rios" -ForegroundColor White
Write-Host "  docs/auditorias/ - Auditorias" -ForegroundColor White
Write-Host "  docs/workflows/  - Workflows e automaÃ§Ãµes" -ForegroundColor White
Write-Host "  docs/sql/        - DocumentaÃ§Ã£o SQL" -ForegroundColor White
Write-Host "  scripts/deploy/  - Scripts de deploy" -ForegroundColor White
Write-Host "  scripts/utils/   - Scripts utilitÃ¡rios" -ForegroundColor White
Write-Host "  archive/         - Arquivos obsoletos" -ForegroundColor White
Write-Host ""

# Contar arquivos restantes na raiz
$remaining = (Get-ChildItem -Filter "*.md" -File -ErrorAction SilentlyContinue | Where-Object {
    $_.DirectoryName -eq (Get-Location).Path
}).Count

Write-Host ""
Write-Host "[6/7] Movendo outros arquivos comuns..." -ForegroundColor Yellow

# AnÃ¡lises
Get-ChildItem -Filter "*ANALISE*.md" -File -ErrorAction SilentlyContinue | ForEach-Object {
    $dest = "docs\resumos\$($_.Name)"
    if (-not (Test-Path $dest)) {
        Move-Item $_.FullName -Destination $dest -Force
        Write-Host "  [OK] Movido: $($_.Name)" -ForegroundColor Green
    }
}

# EstratÃ©gias
Get-ChildItem -Filter "*ESTRATEGIA*.md" -File -ErrorAction SilentlyContinue | ForEach-Object {
    $dest = "docs\resumos\$($_.Name)"
    if (-not (Test-Path $dest)) {
        Move-Item $_.FullName -Destination $dest -Force
        Write-Host "  [OK] Movido: $($_.Name)" -ForegroundColor Green
    }
}

# CorreÃ§Ãµes
@("*CORRECAO*.md", "*CORRIGIR*.md", "*FIX*.md") | ForEach-Object {
    $pattern = $_
    Get-ChildItem -Filter $pattern -File -ErrorAction SilentlyContinue | ForEach-Object {
        $dest = "docs\resumos\$($_.Name)"
        if (-not (Test-Path $dest)) {
            Move-Item $_.FullName -Destination $dest -Force
            Write-Host "  [OK] Movido: $($_.Name)" -ForegroundColor Green
        }
    }
}

# DiagnÃ³sticos
@("*DIAGNOSTICO*.md", "*PROBLEMA*.md", "*ERRO*.md") | ForEach-Object {
    $pattern = $_
    Get-ChildItem -Filter $pattern -File -ErrorAction SilentlyContinue | ForEach-Object {
        $dest = "docs\resumos\$($_.Name)"
        if (-not (Test-Path $dest)) {
            Move-Item $_.FullName -Destination $dest -Force
            Write-Host "  [OK] Movido: $($_.Name)" -ForegroundColor Green
        }
    }
}

# Checklists
Get-ChildItem -Filter "*CHECKLIST*.md" -File -ErrorAction SilentlyContinue | ForEach-Object {
    $dest = "docs\checkpoints\$($_.Name)"
    if (-not (Test-Path $dest)) {
        Move-Item $_.FullName -Destination $dest -Force
        Write-Host "  [OK] Movido: $($_.Name)" -ForegroundColor Green
    }
}

# Status e Timeline
@("*STATUS*.md", "*TIMELINE*.md") | ForEach-Object {
    $pattern = $_
    Get-ChildItem -Filter $pattern -File -ErrorAction SilentlyContinue | ForEach-Object {
        $dest = "docs\checkpoints\$($_.Name)"
        if (-not (Test-Path $dest)) {
            Move-Item $_.FullName -Destination $dest -Force
            Write-Host "  [OK] Movido: $($_.Name)" -ForegroundColor Green
        }
    }
}

Write-Host ""
Write-Host "[7/7] Movendo arquivos restantes para archive..." -ForegroundColor Yellow

# Mover todos os .md restantes para archive (exceto README.md)
Get-ChildItem -Filter "*.md" -File -ErrorAction SilentlyContinue | Where-Object {
    $_.DirectoryName -eq (Get-Location).Path -and $_.Name -ne "README.md"
} | ForEach-Object {
    $dest = "archive\$($_.Name)"
    if (-not (Test-Path $dest)) {
        Move-Item $_.FullName -Destination $dest -Force
        Write-Host "  Movido para archive: $($_.Name)" -ForegroundColor Gray
    }
}

# Contar arquivos restantes na raiz
$remaining = (Get-ChildItem -Filter "*.md" -File -ErrorAction SilentlyContinue | Where-Object {
    $_.DirectoryName -eq (Get-Location).Path
}).Count

Write-Host ""
Write-Host "Arquivos .md restantes na raiz: $remaining" -ForegroundColor Yellow
Write-Host ""
Write-Host "Organizacao completa! Arquivos restantes movidos para archive/" -ForegroundColor Green

Read-Host 'Pressione Enter para sair'

