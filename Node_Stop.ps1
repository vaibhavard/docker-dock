$nodeProcesses = Get-Process -Name node
foreach ($process in $nodeProcesses) {
    Stop-Process -Id $process.Id
}