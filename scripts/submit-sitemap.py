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
print('OAuth token obtained', file=sys.stderr)

site_url = sys.argv[1] if len(sys.argv) > 1 else ''
sitemap_url = sys.argv[2] if len(sys.argv) > 2 else ''
if not site_url or not sitemap_url:
    print('Usage: submit-sitemap.py <site_url> <sitemap_url>')
    sys.exit(1)

# Try list sites first to verify access
list_url = 'https://www.googleapis.com/webmasters/v3/sites'
req_list = urllib.request.Request(list_url)
req_list.add_header('Authorization', f'Bearer {access_token}')
try:
    resp_list = json.load(urllib.request.urlopen(req_list))
    sites = [s['siteUrl'] for s in resp_list.get('siteEntry', [])]
    print(f'GSC sites: {sites}', file=sys.stderr)
except urllib.error.HTTPError as e:
    print(f'List sites error: {e.code} {e.reason}', file=sys.stderr)
    print(f'Body: {e.read().decode()[:200]}', file=sys.stderr)

# Submit sitemap - two possible endpoints
for endpoint in [
    'https://searchconsole.googleapis.com/v1/sitemaps',
    'https://www.googleapis.com/webmasters/v3/sites/{su}/sitemaps/{fu}'
]:
    try:
        if 'searchconsole' in endpoint:
            params = urllib.parse.urlencode({'siteUrl': site_url, 'feedpath': sitemap_url})
            url = f'{endpoint}?{params}'
        else:
            su = urllib.parse.quote(site_url, safe='')
            fu = urllib.parse.quote(sitemap_url, safe='')
            url = endpoint.format(su=su, fu=fu)
        
        print(f'Trying: POST {url}', file=sys.stderr)
        req2 = urllib.request.Request(url, data=b'', method='POST')
        req2.add_header('Authorization', f'Bearer {access_token}')
        req2.add_header('Content-Length', '0')
        resp2 = urllib.request.urlopen(req2)
        print(f'Success! Endpoint: {endpoint}', file=sys.stderr)
        print(f'GSC sitemap submit: {resp2.status}')
        sys.exit(0)
    except urllib.error.HTTPError as e:
        print(f'Endpoint failed: {e.code} {e.reason}', file=sys.stderr)
        continue

print('All endpoints failed', file=sys.stderr)
sys.exit(1)
