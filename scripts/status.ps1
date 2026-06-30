$ErrorActionPreference = "SilentlyContinue"
$taskName = "SoluxUrlRedirect"
$projectRoot = Split-Path -Parent $PSScriptRoot

$task = Get-ScheduledTask -TaskName $taskName
if ($task) {
  Write-Host "Task: $taskName"
  Write-Host "State: $($task.State)"
} else {
  Write-Host "Task not installed. Run install-always-on.cmd first."
}

$port = 3000
Get-Content (Join-Path $projectRoot ".env") | ForEach-Object {
  if ($_ -match '^PORT=(\d+)') { $port = $matches[1] }
}

try {
  $health = Invoke-RestMethod -Uri "http://localhost:$port/health" -TimeoutSec 3
  Write-Host "Server: running"
  Write-Host "Target: $($health.target)"
} catch {
  Write-Host "Server: not responding on port $port"
}
