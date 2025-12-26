# Script para criar ZIP para upload no GitHub
# Exclui node_modules, dist, .next e outros arquivos desnecessários

$excludeDirs = @('node_modules', 'dist', '.next', '.git', 'azimut-cms\node_modules', 'azimut-cms\.next')
$excludeFiles = @('*.zip', '*.log', '.env.local')

# Criar lista de arquivos para incluir
$files = Get-ChildItem -Path . -Recurse | Where-Object {
    $include = $true
    foreach ($dir in $excludeDirs) {
        if ($_.FullName -like "*\$dir\*") {
            $include = $false
            break
        }
    }
    if ($include) {
        foreach ($pattern in $excludeFiles) {
            if ($_.Name -like $pattern) {
                $include = $false
                break
            }
        }
    }
    $include
}

# Criar ZIP
Compress-Archive -Path $files.FullName -DestinationPath "azimut-para-github.zip" -Force

Write-Host "✅ ZIP criado: azimut-para-github.zip"
Write-Host "📤 Agora você pode fazer upload deste arquivo no GitHub!"














