# -*- coding: utf-8 -*-
"""
Add a floating Saweria donation button to all webapps pages.
"""

import os, re, sys

sys.stdout.reconfigure(encoding='utf-8')

DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))

FLOATING_BUTTON = '''
<a href="https://saweria.co/naufalrakha" target="_blank" rel="noopener" class="saweria-float" title="Donasi via Saweria">
  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor"><path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"/></svg>
  <span>Donasi</span>
</a>
<style>
.saweria-float {
  position: fixed;
  bottom: 24px;
  right: 24px;
  z-index: 9999;
  background: #ff6b6b;
  color: #fff;
  border-radius: 50px;
  padding: 10px 20px 10px 16px;
  text-decoration: none;
  font-size: 14px;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 8px;
  box-shadow: 0 4px 15px rgba(255,107,107,0.4);
  transition: all 0.3s ease;
  font-family: "Inter",sans-serif;
}
.saweria-float:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(255,107,107,0.6);
  color: #fff;
}
.saweria-float svg {
  animation: pulse 1.5s ease infinite;
}
@keyframes pulse {
  0%, 100% { transform: scale(1); }
  50% { transform: scale(1.15); }
}
@media (max-width: 576px) {
  .saweria-float {
    bottom: 16px;
    right: 16px;
    padding: 8px 14px 8px 10px;
    font-size: 12px;
  }
}
</style>
'''

def add_floating_button(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # Skip if already have saweria-float
    if 'saweria-float' in content:
        basename = os.path.basename(filepath)
        print(f"  [SKIP] {basename} — already has floating button")
        return False
    
    # Insert before </body>
    if '</body>' not in content:
        print(f"  [!] No </body> in {filepath}")
        return False
    
    content = content.replace('</body>', FLOATING_BUTTON + '\n</body>')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
    
    basename = os.path.basename(filepath)
    print(f"  [OK] {basename}")
    return True


def main():
    html_files = [f for f in os.listdir(DIR) if f.endswith('.html')]
    html_files.sort()
    
    print(f"Processing {len(html_files)} HTML files...\n")
    
    success = 0
    skipped = 0
    for fname in html_files:
        fpath = os.path.join(DIR, fname)
        if add_floating_button(fpath):
            success += 1
        else:
            skipped += 1
    
    print(f"\nDone! {success} files updated, {skipped} skipped.")


if __name__ == '__main__':
    main()
