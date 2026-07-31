param(
    [string]$toolsDir = "D:\14_project_naufalrakha\webapps-refactored\src\pages\tools"
)

$boilerplate = [regex]::Escape(". Alat ini berjalan 100% di browser, data tidak dikirim ke server.")

Get-ChildItem -Path $toolsDir -Filter "*.astro" | ForEach-Object {
    $file = $_.FullName
    $slug = $_.BaseName
    $content = Get-Content -Path $file -Raw
    $original = $content
    
    # Extract title
    $titleMatch = [regex]::Match($content, "const title = '([^']+)'")
    if (-not $titleMatch.Success) { 
        # Some files might use different title pattern
        Write-Host "SKIP $slug (no title found)"
        return 
    }
    $title = $titleMatch.Groups[1].Value

    # Check if aboutText has boilerplate suffix
    if ($content -match $boilerplate) {
        # Remove boilerplate suffix
        $content = $content -replace "$boilerplate", ''
        
        # Now check if aboutText starts with title + space
        $titleEscaped = [regex]::Escape("$title ")
        if ($content -match "const aboutText = '$titleEscaped") {
            $content = $content -replace "(const aboutText = ')$titleEscaped", '$1'
        }
        
        # Clean up double periods at end (remove trailing "..")
        $content = $content -replace "\.\.'`;", ".'`;"
        # Remove trailing space before closing quote
        $content = $content -replace " '\`;", "'`;"
        
        if ($content -ne $original) {
            Set-Content -Path $file -Value $content -NoNewline
            Write-Host "FIXED $slug"
        } else {
            Write-Host "NOCHANGE $slug"
        }
    } else {
        Write-Host "SKIP $slug (no boilerplate)"
    }
}

Write-Host "`nDone!"
