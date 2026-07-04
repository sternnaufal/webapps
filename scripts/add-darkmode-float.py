# -*- coding: utf-8 -*-
"""
Add a floating dark mode toggle button to all webapps pages.
"""
import os, re, sys
sys.stdout.reconfigure(encoding='utf-8')
DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

FLOAT_BTN = '''<button class="dark-float btn btn-sm" title="Toggle dark mode" style="position:fixed;bottom:80px;right:24px;z-index:9998;width:44px;height:44px;border-radius:50%;background:var(--accent);color:#fff;border:none;font-size:1.3rem;box-shadow:0 4px 15px rgba(99,102,241,0.4);transition:all 0.3s ease;display:flex;align-items:center;justify-content:center;line-height:1;" onmouseover="this.style.transform='translateY(-3px)'" onmouseout="this.style.transform=''"></button>'''

def add_button(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    if 'dark-float' in content:
        return False
    if '</body>' not in content:
        return False
    content = content.replace('</body>', FLOAT_BTN + '\n</body>')
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    return True

files = [f for f in os.listdir(DIR) if f.endswith('.html') and f not in ('404.html','about.html','privacy.html','contact.html')]
ok = 0
for f in sorted(files):
    if add_button(os.path.join(DIR, f)):
        print(f'  [OK] {f}')
        ok += 1
print(f'\n{ok} files updated.')
