param(
    [string]$toolsDir = "D:\14_project_naufalrakha\webapps-refactored\src\pages\tools"
)

Get-ChildItem -Path $toolsDir -Filter "*.astro" | ForEach-Object {
    $file = $_.FullName
    $slug = $_.BaseName
    $content = Get-Content -Path $file -Raw
    $original = $content

    # 1. Remove saweria-float style blocks (entire <style is:inline> block containing .saweria-float)
    $content = $content -replace '(?s)<style is:inline>\s*\.saweria-float\s*\{[^}]*\}[\s\S]*?</style>', ''

    # 2. Remove standalone year script blocks
    $content = $content -replace "(?s)<script is:inline>\s*document\.getElementById\('year'\)\.textContent\s*=\s*new Date\(\)\.getFullYear\(\);\s*</script>\s*", ''

    # 3. Remove empty <script is:inline></script> lines
    $content = $content -replace "(?s)<script is:inline>\s*</script>\s*", ''

    if ($content -ne $original) {
        Set-Content -Path $file -Value $content -NoNewline
        Write-Host "CLEANED $slug"
    } else {
        Write-Host "NOCHANGE $slug"
    }
}

Write-Host "`nDone!"
