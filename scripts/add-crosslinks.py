import os, re

DIR = r"D:\14_project_naufalrakha\webapps-refactored"
EXCLUDE = {"index.html", "404.html"}

# --- FOOTER ---
NEW_FOOTER = """<footer class="bg-dark text-light py-4">
<div class="container">
<div class="row g-3 small">
<div class="col-md-8">
<p class="mb-1 fw-semibold">Koleksi WebApps Naufal Rakha</p>
<p class="mb-0 text-secondary">Jelajahi juga:
<a href="https://naufalrakha.my.id" class="text-info">Website Utama</a> |
<a href="https://webapps.naufalrakha.my.id" class="text-info">WebApps</a> |
<a href="https://digital.naufalrakha.my.id" class="text-info">Digital Gallery</a> |
<a href="https://demo.naufalrakha.my.id" class="text-info">Demo Artstyle</a> |
<a href="https://koleksi.naufalrakha.my.id" class="text-info">Koleksi Desain</a>
</p>
</div>
<div class="col-md-4 text-md-end">
<p class="mb-0">&copy; <span id="year">2025</span> Naufal Rakha Putra</p>
</div>
</div>
</div>
</footer>"""

# Old footer regex
OLD_FOOTER_PATTERN = re.compile(
    r'<footer class="bg-dark text-light py-3">.*?</footer>',
    re.DOTALL
)

# --- SOCIAL SHARE ---
SOCIAL_SHARE = """<div class="mt-3 pt-2 d-flex gap-2 justify-content-center align-items-center">
<span class="small text-muted me-2">Bagikan:</span>
<a href="https://twitter.com/intent/tweet?url=" onclick="this.href+=encodeURIComponent(location.href)" target="_blank" rel="noopener" class="btn btn-outline-secondary btn-sm rounded-pill" title="Twitter/X">&nearr;</a>
<a href="https://www.linkedin.com/sharing/share-offsite/?url=" onclick="this.href+=encodeURIComponent(location.href)" target="_blank" rel="noopener" class="btn btn-outline-secondary btn-sm rounded-pill" title="LinkedIn">in</a>
<a href="https://www.facebook.com/sharer/sharer.php?u=" onclick="this.href+=encodeURIComponent(location.href)" target="_blank" rel="noopener" class="btn btn-outline-secondary btn-sm rounded-pill" title="Facebook">f</a>
</div>"""

# --- RELATED TOOLS (grouped by category) ---
RELATED = {
    # Text Tools
    "palindrome-checker": ["reverse-text", "anagram-finder", "text-repeater", "char-counter", "textcase"],
    "reverse-text": ["palindrome-checker", "anagram-finder", "text-repeater", "char-counter"],
    "anagram-finder": ["palindrome-checker", "reverse-text", "text-repeater", "list-sorter"],
    "text-repeater": ["palindrome-checker", "reverse-text", "char-counter", "lorem-ipsum"],
    "char-counter": ["textcase", "reverse-text", "lorem-ipsum", "palindrome-checker"],
    "textcase": ["char-counter", "reverse-text", "html-entity", "url-encode"],
    "lorem-ipsum": ["text-repeater", "char-counter", "md-preview", "html-preview"],
    "html-entity": ["url-encode", "base64-coded", "json-formatter", "textcase"],
    "regex-tester": ["json-formatter", "diff-checker", "csv-viewer", "sql-formatter"],
    "list-sorter": ["anagram-finder", "reverse-text", "json-csv", "csv-viewer"],

    # Developer Tools
    "json-formatter": ["json-csv", "yaml-json", "xml-formatter", "sql-formatter"],
    "json-csv": ["json-formatter", "yaml-json", "csv-viewer", "diff-checker"],
    "yaml-json": ["json-formatter", "json-csv", "csv-viewer", "html-preview"],
    "base64-coded": ["url-encode", "hash-generator", "image-to-base64", "html-entity"],
    "html-preview": ["md-preview", "css-unit", "url-encode", "lorem-ipsum"],
    "md-preview": ["html-preview", "html-entity", "url-encode", "lorem-ipsum"],
    "sql-formatter": ["json-formatter", "csv-viewer", "cron-builder", "regex-tester"],
    "css-unit": ["color-picker", "gradient-generator", "html-preview", "contrast-checker"],
    "url-encode": ["base64-coded", "html-entity", "json-formatter", "hash-generator"],
    "jwt-decoder": ["base64-coded", "hash-generator", "json-formatter", "uuid-generator"],
    "hash-generator": ["uuid-generator", "base64-coded", "password-generator", "jwt-decoder"],
    "diff-checker": ["json-formatter", "json-csv", "csv-viewer", "regex-tester"],
    "csv-viewer": ["json-csv", "json-formatter", "diff-checker", "sql-formatter"],
    "cron-builder": ["sql-formatter", "date-calculator", "countdown", "timer"],
    "image-to-base64": ["base64-coded", "url-encode", "hash-generator", "qr-generator"],
    "screen-recorder": ["timer", "countdown", "pomodoro", "qr-generator"],

    # Calculators
    "bmi-calculator": ["calorie-calculator", "percentage-calculator", "tip-calculator", "age-calculator"],
    "calorie-calculator": ["bmi-calculator", "savings-calculator", "percentage-calculator", "sleep-cycle"],
    "percentage-calculator": ["tip-calculator", "bmi-calculator", "savings-calculator", "date-calculator"],
    "age-calculator": ["date-calculator", "time-converter", "sleep-cycle", "bmi-calculator"],
    "date-calculator": ["age-calculator", "time-converter", "countdown", "world-clock"],
    "time-converter": ["date-calculator", "world-clock", "unit-converter", "countdown"],
    "unit-converter": ["time-converter", "css-unit", "konverter-bilangan", "date-calculator"],
    "tip-calculator": ["percentage-calculator", "bmi-calculator", "savings-calculator", "calorie-calculator"],
    "savings-calculator": ["calorie-calculator", "percentage-calculator", "tip-calculator", "sleep-cycle"],
    "sleep-cycle": ["calorie-calculator", "age-calculator", "countdown", "world-clock"],
    "konverter-bilangan": ["roman-numeral", "unit-converter", "ip-calculator", "subnetting"],
    "roman-numeral": ["konverter-bilangan", "age-calculator", "date-calculator", "password-generator"],
    "ip-calculator": ["subnetting", "konverter-bilangan", "http-status", "cron-builder"],
    "subnetting": ["ip-calculator", "konverter-bilangan", "http-status", "cron-builder"],
    "world-clock": ["time-converter", "date-calculator", "countdown", "sleep-cycle"],
    "countdown": ["timer", "pomodoro", "world-clock", "date-calculator"],
    "timer": ["countdown", "pomodoro", "world-clock", "screen-recorder"],
    "pomodoro": ["timer", "countdown", "world-clock", "screen-recorder"],

    # Design
    "color-picker": ["gradient-generator", "contrast-checker", "css-unit", "image-to-base64"],
    "contrast-checker": ["color-picker", "gradient-generator", "css-unit", "html-preview"],
    "gradient-generator": ["color-picker", "contrast-checker", "css-unit", "html-preview"],

    # Utility
    "password-generator": ["password-strength", "uuid-generator", "hash-generator", "qr-generator"],
    "password-strength": ["password-generator", "hash-generator", "uuid-generator", "qr-generator"],
    "qr-generator": ["password-generator", "uuid-generator", "image-to-base64", "base64-coded"],
    "uuid-generator": ["hash-generator", "password-generator", "jwt-decoder", "qr-generator"],
    "decision-maker": ["list-sorter", "password-generator", "anagram-finder", "lorem-ipsum"],
    "http-status": ["ip-calculator", "subnetting", "cron-builder", "url-encode"],
    "rsa-generator": ["hash-generator", "jwt-decoder", "base64-coded", "uuid-generator"],
}

TOOL_LABELS = {
    "palindrome-checker": "Palindrome Checker", "reverse-text": "Reverse Text",
    "anagram-finder": "Anagram Finder", "text-repeater": "Text Repeater",
    "char-counter": "Character Counter", "textcase": "Text Case Converter",
    "lorem-ipsum": "Lorem Ipsum", "html-entity": "HTML Entity",
    "regex-tester": "Regex Tester", "list-sorter": "List Sorter",
    "json-formatter": "JSON Formatter", "json-csv": "JSON to CSV",
    "yaml-json": "YAML to JSON", "base64-coded": "Base64 Encoder",
    "html-preview": "HTML Preview", "md-preview": "Markdown Preview",
    "sql-formatter": "SQL Formatter", "css-unit": "CSS Unit Converter",
    "url-encode": "URL Encoder", "jwt-decoder": "JWT Decoder",
    "hash-generator": "Hash Generator", "diff-checker": "Diff Checker",
    "csv-viewer": "CSV Viewer", "cron-builder": "Cron Builder",
    "image-to-base64": "Image to Base64", "screen-recorder": "Screen Recorder",
    "bmi-calculator": "BMI Calculator", "calorie-calculator": "Calorie Calculator",
    "percentage-calculator": "Percentage Calculator", "age-calculator": "Age Calculator",
    "date-calculator": "Date Calculator", "time-converter": "Time Converter",
    "unit-converter": "Unit Converter", "tip-calculator": "Tip Calculator",
    "savings-calculator": "Savings Calculator", "sleep-cycle": "Sleep Cycle",
    "konverter-bilangan": "Konverter Bilangan", "roman-numeral": "Roman Numeral",
    "ip-calculator": "IP Calculator", "subnetting": "Subnetting",
    "world-clock": "World Clock", "countdown": "Countdown",
    "timer": "Timer", "pomodoro": "Pomodoro",
    "color-picker": "Color Picker", "contrast-checker": "Contrast Checker",
    "gradient-generator": "Gradient Generator",
    "password-generator": "Password Generator", "password-strength": "Password Strength",
    "qr-generator": "QR Generator", "uuid-generator": "UUID Generator",
    "decision-maker": "Decision Maker", "http-status": "HTTP Status",
    "rsa-generator": "RSA Generator",
}

def get_tool_name(filename):
    return filename.replace(".html", "")

def to_label(name):
    return TOOL_LABELS.get(name, name.replace("-", " ").title())

def build_related_html(current_name):
    rels = RELATED.get(current_name, [])
    if not rels:
        return ""
    items = "".join(
        f'<a href="{r}.html" class="btn btn-outline-secondary btn-sm rounded-pill">{to_label(r)}</a>'
        for r in rels
    )
    return f'<div class="mt-4 pt-2"><div class="small fw-semibold mb-2 text-muted">Alat Terkait</div><div class="d-flex gap-2 flex-wrap">{items}</div></div>'

count = 0
for fname in os.listdir(DIR):
    if not fname.endswith(".html") or fname in EXCLUDE:
        continue

    fpath = os.path.join(DIR, fname)
    with open(fpath, "r", encoding="utf-8") as f:
        html = f.read()

    changes = False

    # 1. Replace footer
    new_html = OLD_FOOTER_PATTERN.sub(NEW_FOOTER, html)
    if new_html != html:
        changes = True

    # 2. Add social share before footer
    if "Bagikan:" not in new_html:
        new_html = new_html.replace(NEW_FOOTER, SOCIAL_SHARE + "\n" + NEW_FOOTER)
        changes = True

    # 3. Add related tools before social share
    tool_name = get_tool_name(fname)
    related_html = build_related_html(tool_name)
    if related_html and "Alat Terkait" not in new_html:
        new_html = new_html.replace(SOCIAL_SHARE + "\n" + NEW_FOOTER, SOCIAL_SHARE + "\n" + related_html + "\n" + NEW_FOOTER)
        changes = True

    if changes:
        with open(fpath, "w", encoding="utf-8") as f:
            f.write(new_html)
        count += 1
        print(f"  Updated: {fname}")

print(f"\nDone! {count} files updated.")
