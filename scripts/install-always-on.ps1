$ErrorActionPreference = "Stop"

$projectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$node = "C:\Program Files\nodejs\node.exe"
$taskName = "SoluxUrlRedirect"

if (-not (Test-Path $node)) {
  Write-Error "Node.js not found at $node"
}

$action = New-ScheduledTaskAction `
  -Execute $node `
  -Argument "src\server.js" `
  -WorkingDirectory $projectRoot

$logonTrigger = New-ScheduledTaskTrigger -AtLogOn -User $env:USERNAME
$bootTrigger = New-ScheduledTaskTrigger -AtStartup

$settings = New-ScheduledTaskSettingsSet `
  -AllowStartIfOnBatteries `
  -DontStopIfGoingOnBatteries `
  -StartWhenAvailable `
  -RestartInterval (New-TimeSpan -Minutes 1) `
  -RestartCount 999

Register-ScheduledTask `
  -TaskName $taskName `
  -Action $action `
  -Trigger @($logonTrigger, $bootTrigger) `
  -Settings $settings `
  -RunLevel Limited `
  -Force | Out-Null

Start-ScheduledTask -TaskName $taskName
Start-Sleep -Seconds 2

$task = Get-ScheduledTask -TaskName $taskName
Write-Host "Task registered: $taskName"
Write-Host "State: $($task.State)"
Write-Host "Health check: http://localhost:$((Get-Content (Join-Path $projectRoot '.env') | Where-Object { $_ -match '^PORT=' }) -replace 'PORT=','')/health"
