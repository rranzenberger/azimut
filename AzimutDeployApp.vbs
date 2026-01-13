Set WshShell = CreateObject("WScript.Shell")
Set fso = CreateObject("Scripting.FileSystemObject")

' Pega o diretorio do script
scriptDir = fso.GetParentFolderName(WScript.ScriptFullName)

' Executa o PowerShell com o script
WshShell.Run "powershell.exe -ExecutionPolicy Bypass -WindowStyle Hidden -File """ & scriptDir & "\AzimutDeployApp.ps1""", 0, False

Set WshShell = Nothing
Set fso = Nothing
