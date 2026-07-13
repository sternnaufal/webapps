import os, glob, re

folder = r'D:\14_project_naufalrakha\webapps-refactored'
favicon_block = (
    '  <link rel="icon" type="image/x-icon" href="favicon.ico" sizes="48x48">\n'
    '  <link rel="icon" type="image/png" sizes="48x48" href="favicon-48x48.png">\n'
    '  <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">\n'
    '  <link rel="apple-touch-icon" href="apple-touch-icon.png">\n'
)

files = glob.glob(os.path.join(folder, '*.html'))
for f in files:
    with open(f, 'r', encoding='utf-8-sig') as fh:
        content = fh.read()
    if 'rel="icon"' in content or "rel='icon'" in content:
        print('SKIP (already has favicon):', os.path.basename(f))
        continue
    # Try <head ...> tags, insert after the closing >
    m = re.search(r'<head[^>]*>', content)
    if m:
        insert_at = m.end()
        new_content = content[:insert_at] + '\n' + favicon_block + content[insert_at:]
    else:
        m2 = re.search(r'<meta[^>]*charset[^>]*>', content)
        if m2:
            insert_at = m2.end()
            new_content = content[:insert_at] + '\n' + favicon_block + content[insert_at:]
        else:
            print('SKIP (no insert point):', os.path.basename(f))
            continue
    with open(f, 'w', encoding='utf-8-sig') as fh:
        fh.write(new_content)
    print('UPDATED:', os.path.basename(f))
