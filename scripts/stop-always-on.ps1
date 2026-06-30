$ErrorActionPreference = "Stop"
$taskName = "SoluxUrlRedirect"

Stop-ScheduledTask -TaskName $taskName -ErrorAction SilentlyContinue
Unregister-ScheduledTask -TaskName $taskName -Confirm:$false -ErrorAction SilentlyContinue
Write-Host "Stopped and removed: $taskName"
