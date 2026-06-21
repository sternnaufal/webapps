import os

DIR = r"D:\14_project_naufalrakha\webapps-refactored"

OLD = ('<p class="mb-0 text-secondary">Jelajahi juga:\n'
'<a href="https://naufalrakha.my.id" class="text-info">Website Utama</a> |\n'
'<a href="https://webapps.naufalrakha.my.id" class="text-info">WebApps</a> |\n'
'<a href="https://digital.naufalrakha.my.id" class="text-info">Digital Gallery</a> |\n'
'<a href="https://demo.naufalrakha.my.id" class="text-info">Demo Artstyle</a> |\n'
'<a href="https://koleksi.naufalrakha.my.id" class="text-info">Koleksi Desain</a>')

# Also handle single-line version (from manually created pages)
OLD_SINGLE = '<p class="mb-0 text-secondary">Jelajahi juga: <a href="https://naufalrakha.my.id" class="text-info">Website Utama</a> | <a href="https://webapps.naufalrakha.my.id" class="text-info">WebApps</a> | <a href="https://digital.naufalrakha.my.id" class="text-info">Digital Gallery</a> | <a href="https://demo.naufalrakha.my.id" class="text-info">Demo Artstyle</a> | <a href="https://koleksi.naufalrakha.my.id" class="text-info">Koleksi Desain</a></p>'

NEW_FOOTER_LINE = '<p class="mb-0 text-secondary"><a href="about.html" class="text-info">Tentang</a> | <a href="privacy.html" class="text-info">Privasi</a> | <a href="contact.html" class="text-info">Kontak</a> | <a href="https://naufalrakha.my.id" class="text-info">Website Utama</a> | <a href="https://webapps.naufalrakha.my.id" class="text-info">WebApps</a> | <a href="https://digital.naufalrakha.my.id" class="text-info">Digital Gallery</a> | <a href="https://demo.naufalrakha.my.id" class="text-info">Demo Artstyle</a> | <a href="https://koleksi.naufalrakha.my.id" class="text-info">Koleksi Desain</a></p>'

count = 0
HTML_NEW_FOOTER_LINE = NEW_FOOTER_LINE  # It's already html-safe

for fname in os.listdir(DIR):
    if not fname.endswith(".html"):
        continue
    fpath = os.path.join(DIR, fname)
    with open(fpath, "r", encoding="utf-8") as f:
        html = f.read()
    
    changed = False
    
    # Replace multi-line version
    if OLD in html:
        html = html.replace(OLD, NEW_FOOTER_LINE)
        changed = True
    
    # Replace single-line version
    if OLD_SINGLE in html:
        html = html.replace(OLD_SINGLE, HTML_NEW_FOOTER_LINE)
        changed = True
    
    if changed:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(html)
        count += 1
        print(f"  Updated: {fname}")

print(f"\nDone! {count} files updated.")
