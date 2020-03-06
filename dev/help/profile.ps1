Import-Module posh-git;
Import-Module oh-my-posh;
Import-Module Get-ChildItemColor;
Import-Module -Name PSReadline;
Import-Module PsGet;
Add-WindowsPSModulePath;
function Test-Administrator {
    $user = [Security.Principal.WindowsIdentity]::GetCurrent()
    (New-Object Security.Principal.WindowsPrincipal $user).IsInRole([Security.Principal.WindowsBuiltinRole]::Administrator)
}
function Resolve-Error ($ErrorRecord = $Error[0]) {
    $ErrorRecord | Format-List * -Force
    $ErrorRecord.InvocationInfo | Format-List *
    $Exception = $ErrorRecord.Exception
    for ($i = 0; $Exception; $i++, ($Exception = $Exception.InnerException)) {
        $Exception | Format-List * -Force
        "$i" * 80
    }
}
function Write-Color($message = "") {
    [string]$pipedMessage = @($Input)
    if (!$message) {
        if ( $pipedMessage ) {
            $message = $pipedMessage
        }
    }
    if ( $message ) {
        $colors = @("black", "blue", "cyan", "darkblue", "darkcyan", "darkgray", "darkgreen", "darkmagenta", "darkred", "darkyellow", "gray", "green", "magenta", "red", "white", "yellow");
        $defaultFGColor = $host.UI.RawUI.ForegroundColor
        $CurrentColor = $defaultFGColor
        $message = $message.split("~")
        foreach ( $string in $message ) {
            if ( $colors -contains $string.Tolower() -and $CurrentColor -eq $defaultFGColor ) { $CurrentColor = $string }
            else {
                write-host -NoNewLine -f $CurrentColor $string
                $CurrentColor = $defaultFGColor
            }
        }
        write-host
    }
}
function Write-ColorPrompt($message = "") {
    [string]$pipedMessage = @($Input)
    if (!$message) {
        if ( $pipedMessage ) {
            $message = $pipedMessage
        }
    }
    if ( $message ) {
        $colors = @("black", "blue", "cyan", "darkblue", "darkcyan", "darkgray", "darkgreen", "darkmagenta", "darkred", "darkyellow", "gray", "green", "magenta", "red", "white", "yellow");
        $defaultFGColor = $host.UI.RawUI.ForegroundColor
        $CurrentColor = $defaultFGColor
        $message = $message.split("~")
        foreach ( $string in $message ) {
            if ( $colors -contains $string.Tolower() -and $CurrentColor -eq $defaultFGColor ) { $CurrentColor = $string }
            else {
                write-host -NoNewLine -f $CurrentColor $string
                $CurrentColor = $defaultFGColor
            }
        }
        write-host -NoNewline
    }
}
Function Get-SmallVer {
    $MyVer = $PSVersiontable | Select-Object -property PSVERSION | Format-Table -HideTableheader | Out-String -NoNewLine
    return WC "~darkcyan~[~~darkyellow~PowerShell $PSEdition $MyVer~~darkcyan~]~~white~ ~"
}
Set-Alias ghost Run-Ghost.ps1;
Set-Alias say Write-Host;
Set-Alias sayout Write-Output;
Set-Alias re Resolve-Error;
Set-Alias ge Get-Error;
Set-Alias l Get-ChildItemColor -option AllScope;
Set-Alias ls Get-ChildItemColorFormatWide -option AllScope;
Set-Alias la Get-Files.ps1;
Set-Alias cc D:\bin\ccleaner\ccleaner64.exe;
Set-Alias whois "D:\bin\wscc\SysInternals Suite\WhoIs64.exe"
Set-Alias wc Write-Color;
Set-Alias wcp Write-ColorPrompt;
Set-Alias ClearRecycle Clear-RecycleBin
Set-Alias ssh-agent "D:\bin\git\usr\bin\ssh-agent.exe";
Set-Alias ssh-add "D:\bin\git\usr\bin\ssh-add.exe";
Set-Alias wget Invoke-WebRequest;
Set-Alias mods Get-InstalledModule
$agent_is_running = Get-Process | Where-Object { $_.ProcessName -like "ssh-agent*" };
if (!($agent_is_running)) { Start-SshAgent -Quiet; };
Set-PSReadlineKeyHandler -Key Tab -Function MenuComplete;
$host.privatedata.ProgressForegroundColor = "white";
$host.privatedata.ProgressBackgroundColor = "red";
$host.UI.RawUI.BackgroundColor = “Black”;
$Host.UI.RawUI.ForegroundColor = “Gray”;
$Global:GetChildItemColorVerticalSpace = 0
$Env:POWERSHELL_UPDATECHECK = 'GA'
#$ErrorView = 'CategoryView'
$Errorview = 'ConciseView'
WC "~darkcyan~[~~darkyellow~PowerShell Core~~darkcyan~][~~red~Profile.ps1~~darkcyan~]~~white~: Loaded all Functions and Aliases~";
