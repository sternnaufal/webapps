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
gsc_site_enc = urllib.parse.quote(gsc_site, safe='')
sitemap_enc = urllib.parse.quote(sitemap_url, safe='')

# Verify sitemap exists in GSC
list_req = urllib.request.Request(
    f'https://www.googleapis.com/webmasters/v3/sites/{gsc_site_enc}/sitemaps'
)
list_req.add_header('Authorization', f'Bearer {access_token}')
resp_list = json.load(urllib.request.urlopen(list_req))
sitemaps = [s['path'] for s in resp_list.get('sitemap', [])]

if sitemap_url in sitemaps:
    print(f'GSC: sitemap verified ({sitemap_url})')
else:
    print(f'GSC: sitemap NOT registered yet. Submit manually via GSC web UI.')
    print(f'Available sitemaps: {sitemaps}')
    sys.exit(1)
