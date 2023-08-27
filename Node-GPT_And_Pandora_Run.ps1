$envVars = Get-Content -Path ".\\.env" | ConvertFrom-StringData

$pandoraPath = $envVars.PANDORA_PATH
$pandoraCommand = $envVars.PANDORA_COMMAND
$nodePath = $envVars.NODE_GPT_PATH
$nodeCommand = $envVars.NODE_GPT_COMMAND

Start-Process -FilePath 'powershell.exe' -ArgumentList "-command `"$pandoraCommand`"" -WorkingDirectory $pandoraPath -WindowStyle 'Hidden'
Start-Process -FilePath 'powershell.exe' -ArgumentList "-command `"$nodeCommand`"" -WorkingDirectory $nodePath -WindowStyle 'Hidden'