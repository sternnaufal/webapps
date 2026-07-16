import os, glob, re

folder = r'D:\14_project_naufalrakha\webapps-refactored'

whatsapp_btn = '''
<a href="https://api.whatsapp.com/send?text=" onclick="this.href+=encodeURIComponent(location.href)" target="_blank" rel="noopener" class="btn btn-outline-secondary btn-sm rounded-pill" title="WhatsApp">wa</a>'''

files = glob.glob(os.path.join(folder, '*.html'))
for f in sorted(files):
    fn = os.path.basename(f)
    with open(f, 'r', encoding='utf-8-sig', errors='ignore') as fh:
        content = fh.read()

    if 'api.whatsapp.com' in content:
        print(f'SKIP (already has WA): {fn}')
        continue

    # Insert after Facebook share link
    old = '<a href="https://www.facebook.com/sharer/sharer.php?u=" onclick="this.href+=encodeURIComponent(location.href)" target="_blank" rel="noopener" class="btn btn-outline-secondary btn-sm rounded-pill" title="Facebook">f</a>'
    if old in content:
        content = content.replace(old, old + whatsapp_btn)
    else:
        # Try different pattern
        m = re.search(r'<a href="https://www\.facebook\.com/sharer[^>]*>f</a>', content)
        if m:
            insert_at = m.end()
            content = content[:insert_at] + whatsapp_btn + content[insert_at:]
        else:
            print(f'SKIP (no facebook share): {fn}')
            continue

    with open(f, 'w', encoding='utf-8-sig') as fh:
        fh.write(content)
    print(f'UPDATED: {fn}')
