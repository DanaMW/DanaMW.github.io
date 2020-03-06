function prompt {
    if ((Test-Administrator)) {
        Write-Host -NoNewline -ForegroundColor darkcyan "["
        Write-Host -NoNewline -ForegroundColor yellow "Admin"
        Write-Host -NoNewline -ForegroundColor darkcyan "]"
    }
    Write-Host -NoNewline -ForegroundColor darkcyan "["
    Write-Host -NoNewline -ForegroundColor red "$ENV:USERNAME"
    Write-Host -NoNewline -ForegroundColor darkcyan "]"
    Write-Host -NoNewline -ForegroundColor darkcyan "["
    Write-Host -NoNewline -ForegroundColor white $(Get-Location)
    Write-Host -NoNewline -ForegroundColor darkcyan "]"
    if ($nestedpromptlevel -ge 1) { Write-Host -NoNewline -ForegroundColor white ">>" }
    Write-Host -NoNewline -ForegroundColor white ":"
    return " "
}
WC "~darkcyan~[~~darkyellow~PowerShell Core~~darkcyan~][~~red~Microsoft.PowerShell_Profile.ps1~~darkcyan~]~~white~: Loaded Prompt~";
Get-SmallVer;
WC "~darkcyan~[~~white~Welcome to ~~red~$env:USERDOMAIN~~darkcyan~]~~white~ ~";
