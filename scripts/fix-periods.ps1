$toolsDir = "D:\14_project_naufalrakha\webapps-refactored\src\pages\tools"

$fix = @{
    'email-validator' = 'Validasi format email sesuai standar RFC 5322. Cek format, local part, domain, dan TLD.'
    'image-resizer' = 'Resize dan kompres gambar online. Ubah ukuran dan kualitas gambar langsung di browser.'
    'password-memorable' = 'Buat password dari kata-kata acak yang mudah diingat namun sulit ditebak. Generator passphrase untuk keamanan akun.'
}

Get-ChildItem -Path $toolsDir -Filter "*.astro" | ForEach-Object {
    $file = $_.FullName
    $slug = $_.BaseName
    $content = Get-Content -Path $file -Raw
    $original = $content
    $changed = $false

    # Fix known weak aboutText
    if ($fix.ContainsKey($slug)) {
        $replacement = $fix[$slug]
        $content = $content -replace "const aboutText = '[^']+'", "const aboutText = '$replacement'"
        $changed = $true
    }

    # Add trailing period if missing
    if ($content -match "const aboutText = '([^']+)'") {
        $val = $Matches[1]
        if ($val -ne '' -and $val -notmatch '\.$') {
            $escapedVal = [regex]::Escape($val)
            $content = $content -replace "const aboutText = '$escapedVal'", "const aboutText = '$val.'"
            $changed = $true
        }
    }

    if ($changed) {
        Set-Content -Path $file -Value $content -NoNewline
        Write-Host "FIXED $slug"
    } else {
        Write-Host "OK $slug"
    }
}
