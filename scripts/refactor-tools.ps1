param(
    [string]$toolsDir = "D:\14_project_naufalrakha\webapps-refactored\src\pages\tools"
)

# Skip pages already refactored
$skip = @('color-picker', 'json-formatter', 'password-generator', 'qr-generator')

Get-ChildItem -Path $toolsDir -Filter "*.astro" | ForEach-Object {
    $file = $_.FullName
    $slug = $_.BaseName
    if ($slug -in $skip) { Write-Host "SKIP $slug (already done)"; return }

    $content = Get-Content -Path $file -Raw
    $original = $content

    # --- 1. Add ToolShell import after ToolLayout import ---
    if ($content -notmatch 'import ToolShell') {
        $content = $content -replace '(import ToolLayout[^;]+;)', "`$1`nimport ToolShell from ""../../components/ToolShell.astro"";"
    }

    # --- 2. Build relatedTools from tools.json ---
    # Use slug to find category siblings
    # We'll add a placeholder that can be filled later

    # --- 3. Extract title for aboutText ---
    $titleMatch = [regex]::Match($content, "const title = '([^']+)'")
    $toolTitle = if ($titleMatch.Success) { $titleMatch.Groups[1].Value } else { $slug }

    # --- 4. Remove extraHtml block ---
    # Remove `const extraHtml = ...` (backtick or single-quote string)
    $content = $content -replace "(?s)const extraHtml = `[`'`"].*?`[`'`"];`r?`n", ''
    $content = $content -replace "(?s)<Fragment set:html=\{extraHtml\} />\s*", ''

    # --- 5. Remove about section from bodyHtml ---
    # Pattern: <div class="mt-4 p-3 rounded" ><h6 class="font-bold">Tentang ...</h6>...<p>...</p></div>
    $content = $content -replace "(?s)<div class=\"mt-4 p-3 rounded\"[^>]*><h6 class=\"font-bold\">Tentang [^<]+</h6>.*?</div>", ''

    # --- 6. Remove saweria float + dark float buttons ---
    $content = $content -replace "(?s)<a href=\"https://saweria\.co/naufalrakha\"[^>]*>.*?</a>\s*", ''
    $content = $content -replace "(?s)<button class=\"dark-float[^>]*>.*?</button>\s*", ''
    $content = $content -replace "(?s)<style is:inline>[\s\S]*?\.saweria-float[\s\S]*?</style>\s*", ''

    # --- 7. Add ToolShell before </ToolLayout> ---
    # Generate aboutText from tool description
    $descMatch = [regex]::Match($content, "const description = '([^']+)'")
    $desc = if ($descMatch.Success) { $descMatch.Groups[1].Value } else { "$toolTitle online tool" }
    $aboutText = "$toolTitle $desc. Alat ini berjalan 100% di browser, data tidak dikirim ke server."

    if ($content -notmatch '<ToolShell') {
        $toolShellBlock = @"

`  <ToolShell about={aboutText} />

"@
        $content = $content -replace '(</ToolLayout>)', "$toolShellBlock`$1"
    }

    # --- 8. Add aboutText const if not present ---
    if ($content -notmatch 'const aboutText') {
        # Insert after description
        $content = $content -replace "(const description = '[^']+';)", "`$1`nconst aboutText = '$aboutText';"
    }

    # --- 9. Remove empty <script is:inline></script> ---
    $content = $content -replace "(?s)<script is:inline>\s*</script>\s*", ''

    # --- 10. Clean up $year references ---
    $content = $content -replace "document\.getElementById\('year'\)\.textContent = new Date\(\)\.getFullYear\(\);", ''

    # Write if changed
    if ($content -ne $original) {
        Set-Content -Path $file -Value $content -NoNewline
        Write-Host "OK $slug"
    } else {
        Write-Host "NOCHANGE $slug"
    }
}

Write-Host "`nDone! All files processed."
