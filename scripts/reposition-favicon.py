import os, glob, re

folder = r'D:\14_project_naufalrakha\webapps-refactored'
# The favicon block as it was inserted
old_favicon_block = (
    '  <link rel="icon" type="image/x-icon" href="favicon.ico" sizes="48x48">\n'
    '  <link rel="icon" type="image/png" sizes="48x48" href="favicon-48x48.png">\n'
    '  <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16.png">\n'
    '  <link rel="apple-touch-icon" href="apple-touch-icon.png">\n'
)

files = glob.glob(os.path.join(folder, '*.html'))
for f in files:
    with open(f, 'r', encoding='utf-8-sig') as fh:
        content = fh.read()
    if 'rel="icon"' not in content:
        print('SKIP (no favicon):', os.path.basename(f))
        continue
    # Remove the old favicon block
    if old_favicon_block in content:
        content = content.replace(old_favicon_block, '')
    else:
        # Try removing with possible different indentation
        content = re.sub(
            r'  <link rel="icon" type="image/x-icon" href="favicon\.ico" sizes="48x48">\n'
            r'  <link rel="icon" type="image/png" sizes="48x48" href="favicon-48x48\.png">\n'
            r'  <link rel="icon" type="image/png" sizes="16x16" href="favicon-16x16\.png">\n'
            r'  <link rel="apple-touch-icon" href="apple-touch-icon\.png">\n',
            '', content
        )
    # Insert after <meta charset...> tag
    m = re.search(r'(<meta[^>]*charset[^>]*/?>)', content)
    if m:
        insert_at = m.end()
        new_content = content[:insert_at] + '\n' + old_favicon_block.rstrip('\n') + content[insert_at:]
    else:
        # Fallback: after <head>
        m2 = re.search(r'<head[^>]*>', content)
        if m2:
            insert_at = m2.end()
            new_content = content[:insert_at] + '\n' + old_favicon_block.rstrip('\n') + content[insert_at:]
        else:
            print('SKIP (no insert point):', os.path.basename(f))
            continue
    with open(f, 'w', encoding='utf-8-sig') as fh:
        fh.write(new_content)
    print('FIXED:', os.path.basename(f))
