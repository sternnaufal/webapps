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

site_url = sys.argv[1] if len(sys.argv) > 1 else ''
sitemap_url = sys.argv[2] if len(sys.argv) > 2 else ''
if not site_url or not sitemap_url:
    print('Usage: submit-sitemap.py <site_url> <sitemap_url>')
    sys.exit(1)

params = urllib.parse.urlencode({'siteUrl': site_url, 'feedpath': sitemap_url})
url = f'https://searchconsole.googleapis.com/v1/sitemaps?{params}'
print(f'Submitting: {url}', file=sys.stderr)

req2 = urllib.request.Request(url, data=b'', method='POST')
req2.add_header('Authorization', f'Bearer {access_token}')
req2.add_header('Content-Length', '0')

try:
    resp2 = urllib.request.urlopen(req2)
    print(f'GSC sitemap submit: {resp2.status}')
except urllib.error.HTTPError as e:
    print(f'GSC API error: {e.code} {e.reason}', file=sys.stderr)
    body = e.read().decode()
    print(f'Response: {body}', file=sys.stderr)

# Debug: list accessible sites
req3 = urllib.request.Request('https://searchconsole.googleapis.com/v1/sites?')
req3.add_header('Authorization', f'Bearer {access_token}')
try:
    resp3 = json.load(urllib.request.urlopen(req3))
    sites = [s['siteUrl'] for s in resp3.get('siteEntry', [])]
    print(f'GSC accessible sites: {sites}', file=sys.stderr)
except Exception as e:
    print(f'Failed to list sites: {e}', file=sys.stderr)

sys.exit(1 if 'resp2' not in dir() or 'status' not in dir(resp2) else 0)
