$envVars = Get-Content -Path ".\\.env" | ConvertFrom-StringData

$pandoraPath = $envVars.PANDORA_PATH
$nodePath = $envVars.NODE_GPT_PATH

Start-Process -FilePath 'powershell.exe' -ArgumentList "-command `"yarn install`"" -WorkingDirectory $pandoraPath -WindowStyle 'Hidden'
Start-Process -FilePath 'powershell.exe' -ArgumentList "-command `"npm install`"" -WorkingDirectory $pandoraPath -WindowStyle 'Hidden'
Start-Process -FilePath 'powershell.exe' -ArgumentList "-command `"pnpm install`"" -WorkingDirectory $pandoraPath -WindowStyle 'Hidden'
Start-Process -FilePath 'powershell.exe' -ArgumentList "-command `"npm install`"" -WorkingDirectory $nodePath -WindowStyle 'Hidden'