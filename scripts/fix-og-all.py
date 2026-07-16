import os, glob, re

folder = r'D:\14_project_naufalrakha\webapps-refactored'
domain = 'https://webapps.naufalrakha.my.id'

def get_canon(fn):
    if fn == 'index.html':
        return domain + '/'
    return domain + '/' + fn

def build_og_block(title, desc, canonical):
    return f'''  <meta property="og:url" content="{canonical}">
  <meta property="og:type" content="website">
  <meta property="og:image" content="https://webapps.naufalrakha.my.id/og-image.png">
  <meta property="og:locale" content="id_ID">
  <meta property="og:site_name" content="WebApps NaufalRakha">
  <meta property="og:logo" content="https://webapps.naufalrakha.my.id/logo-512.png">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">

  <!-- Twitter Card -->
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="{title}">
  <meta name="twitter:description" content="{desc}">
  <meta name="twitter:image" content="https://webapps.naufalrakha.my.id/og-image.png">'''

# Tags to remove before inserting new block (to avoid dupes)
remove_patterns = [
    r'<meta property="og:url[^>]*>\n?',
    r'<meta property="og:type[^>]*>\n?',
    r'<meta property="og:image"[^>]*>\n?',
    r'<meta property="og:locale[^>]*>\n?',
    r'<meta property="og:site_name[^>]*>\n?',
    r'<meta property="og:logo[^>]*>\n?',
    r'<meta property="og:image:width[^>]*>\n?',
    r'<meta property="og:image:height[^>]*>\n?',
    r'<meta name="twitter:card[^>]*>\n?',
    r'<meta name="twitter:title[^>]*>\n?',
    r'<meta name="twitter:description[^>]*>\n?',
    r'<meta name="twitter:image[^>]*>\n?',
    r'<!-- Open Graph -->\n?',
    r'<!-- Twitter Card -->\n?',
]

files = glob.glob(os.path.join(folder, '*.html'))
for f in sorted(files):
    fn = os.path.basename(f)
    with open(f, 'r', encoding='utf-8-sig', errors='ignore') as fh:
        content = fh.read()

    if 'og:locale' in content:
        print(f'SKIP (already complete): {fn}')
        continue

    canonical = get_canon(fn)
    m_t = re.search(r'<title>(.*?)</title>', content)
    title = m_t.group(1) if m_t else fn.replace('.html', '').replace('-', ' ').title()
    m_d = re.search(r'<meta name="description" content="([^"]*)"', content)
    desc = m_d.group(1) if m_d else ''

    # Remove old conflicting tags
    for pat in remove_patterns:
        content = re.sub(pat, '', content)

    # Insert OG block after last <style> or <meta charset or <meta name=viewport
    # Find a good anchor point
    m = re.search(r'<meta name="robots[^>]*>', content)
    if not m:
        m = re.search(r'<link rel="canonical[^>]*>', content)
    if not m:
        m = re.search(r'<meta name="viewport[^>]*>', content)
    if not m:
        m = re.search(r'<meta charset[^>]*>', content)
    if m:
        insert_at = m.end()
        og_block = '\n\n  <!-- Open Graph -->\n' + build_og_block(title, desc, canonical) + '\n'
        content = content[:insert_at] + og_block + content[insert_at:]
    else:
        print(f'SKIP (no anchor): {fn}')
        continue

    with open(f, 'w', encoding='utf-8-sig') as fh:
        fh.write(content)
    print(f'UPDATED: {fn}')
