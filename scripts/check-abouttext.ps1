$toolsDir = "D:\14_project_naufalrakha\webapps-refactored\src\pages\tools"
Get-ChildItem -Path $toolsDir -Filter "*.astro" | ForEach-Object {
    $c = Get-Content $_.FullName -Raw
    if ($c -match "const aboutText = '([^']+)'") {
        $val = $Matches[1]
        if ($val -match "\.$") {
            # ends with period - OK
        } else {
            Write-Host "MISSING PERIOD: $($_.BaseName) -> '$val'"
        }
    }
}
