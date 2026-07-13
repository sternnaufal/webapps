import glob, os

folder = r'D:\14_project_naufalrakha\webapps-refactored'
files = glob.glob(os.path.join(folder, '*.html'))
ok = 0
fail = 0
missing = []
for f in sorted(files):
    with open(f, 'r', encoding='utf-8-sig') as fh:
        content = fh.read()
    if 'rel="icon"' in content:
        ok += 1
    else:
        fail += 1
        missing.append(os.path.basename(f))
print(f'Total: {ok+fail}, OK: {ok}, MISSING: {fail}')
if missing:
    print('Missing files:')
    for m in missing:
        print(f'  {m}')
