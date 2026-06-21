import json, time, base64, subprocess, urllib.request, urllib.parse, sys, os

key_raw = os.environ.get('GCP_SA_KEY', '')
if not key_raw:
    print('GCP_SA_KEY not set, skipping')
    sys.exit(0)

sa = json.loads(key_raw)
now = int(time.time())

def b64(d):
    return base64.urlsafe_b64encode(json.dumps(d).encode()).rstrip(b'=').decode()

header = b64({'alg': 'RS256', 'typ': 'JWT'})
claim = b64({
    'iss': sa['client_email'],
    'scope': 'https://www.googleapis.com/auth/webmasters',
    'aud': 'https://oauth2.googleapis.com/token',
    'iat': now,
    'exp': now + 3600
})

with open('/tmp/gcp-key.pem', 'w') as f:
    f.write(sa['private_key'])

msg = (header + '.' + claim).encode()
sig = subprocess.run(
    ['openssl', 'dgst', '-sha256', '-sign', '/tmp/gcp-key.pem'],
    input=msg, capture_output=True
).stdout
sig_b64 = base64.urlsafe_b64encode(sig).rstrip(b'=').decode()
assertion = header + '.' + claim + '.' + sig_b64

data = 'grant_type=urn:ietf:params:oauth:grant-type:jwt-bearer&assertion=' + urllib.parse.quote(assertion)
req = urllib.request.Request(
    'https://oauth2.googleapis.com/token',
    data.encode(),
    {'Content-Type': 'application/x-www-form-urlencoded'}
)
resp = json.load(urllib.request.urlopen(req))
access_token = resp['access_token']

site_url_arg = sys.argv[1] if len(sys.argv) > 1 else ''
sitemap_url = sys.argv[2] if len(sys.argv) > 2 else ''
if not site_url_arg or not sitemap_url:
    print('Usage: submit-sitemap.py <site_url> <sitemap_url>')
    sys.exit(1)

from urllib.parse import urlparse
parsed = urlparse(site_url_arg)
domain = parsed.netloc or parsed.path
gsc_site = f'sc-domain:{domain}'

endpoints = [
    f'https://searchconsole.googleapis.com/v1/sitemaps?{urllib.parse.urlencode({"siteUrl": gsc_site, "feedpath": sitemap_url})}',
    f'https://www.googleapis.com/webmasters/v3/sites/{urllib.parse.quote(gsc_site, safe="")}/sitemaps/{urllib.parse.quote(sitemap_url, safe="")}',
]

for url in endpoints:
    try:
        print(f'Trying: {url[:120]}...', file=sys.stderr)
        req2 = urllib.request.Request(url, data=b'', method='POST')
        req2.add_header('Authorization', f'Bearer {access_token}')
        req2.add_header('Content-Length', '0')
        resp2 = urllib.request.urlopen(req2)
        print(f'GSC sitemap submit: {resp2.status} {resp2.reason}')
        sys.exit(0)
    except urllib.error.HTTPError as e:
        print(f'  Failed: {e.code} {e.reason}', file=sys.stderr)
        continue

print('All endpoints failed. Trying GET to inspect...', file=sys.stderr)
# Try GET to see available sitemaps
try:
    list_url = f'https://www.googleapis.com/webmasters/v3/sites/{urllib.parse.quote(gsc_site, safe="")}/sitemaps'
    req3 = urllib.request.Request(list_url)
    req3.add_header('Authorization', f'Bearer {access_token}')
    resp3 = json.load(urllib.request.urlopen(req3))
    print(f'Existing sitemaps: {json.dumps(resp3, indent=2)}', file=sys.stderr)
except urllib.error.HTTPError as e:
    print(f'List sitemaps error: {e.code}', file=sys.stderr)
    print(f'Body: {e.read().decode()[:300]}', file=sys.stderr)

sys.exit(1)
