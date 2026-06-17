(function () {
  'use strict';

  function makeNav(suffix) {
    var id = suffix ? 'sidebarNav' + suffix : 'sidebarNavDesktop';
    var s = suffix || '';
    return [
      '<nav class="nav flex-column mb-auto" id="' + id + '">',
      '  <a class="nav-link text-white" href="https://naufalrakha.my.id"><span class="fw-bold">Back to Root</span></a>',
      '  <a class="nav-link text-white" href="index.html"><span class="fw-bold">Home</span></a>',
      '  <hr class="border-secondary my-2">',
      '',
      '  <div class="sidebar-cat">',
      '    <a class="nav-link text-white sidebar-cat-header d-flex justify-content-between align-items-center py-1" data-bs-toggle="collapse" href="#catDev' + s + '" role="button" aria-expanded="true">',
      '      <span>Developer Tools</span> <span class="cat-chevron">&#x25BC;</span>',
      '    </a>',
      '    <div class="collapse show" id="catDev' + s + '" data-bs-parent="#' + id + '">',
      '      <a class="nav-link text-white ps-3 py-1 small" href="hash-generator.html">Hash Generator</a>',
      '      <a class="nav-link text-white ps-3 py-1 small" href="uuid-generator.html">UUID/GUID Generator</a>',
      '      <a class="nav-link text-white ps-3 py-1 small" href="base64-coded.html">Base64 Encode/Decode</a>',
      '      <a class="nav-link text-white ps-3 py-1 small" href="json-formatter.html">JSON Formatter</a>',
      '      <a class="nav-link text-white ps-3 py-1 small" href="regex-tester.html">Regex Tester</a>',
      '      <a class="nav-link text-white ps-3 py-1 small" href="diff-checker.html">Diff Checker</a>',
      '      <a class="nav-link text-white ps-3 py-1 small" href="sql-formatter.html">SQL Formatter</a>',
      '    </div>',
      '  </div>',
      '',
      '  <div class="sidebar-cat">',
      '    <a class="nav-link text-white sidebar-cat-header d-flex justify-content-between align-items-center py-1" data-bs-toggle="collapse" href="#catNetwork' + s + '" role="button" aria-expanded="false">',
      '      <span>Network &amp; URL</span> <span class="cat-chevron">&#x25BC;</span>',
      '    </a>',
      '    <div class="collapse" id="catNetwork' + s + '" data-bs-parent="#' + id + '">',
      '      <a class="nav-link text-white ps-3 py-1 small" href="subnetting.html">Kalkulator Subnetting</a>',
      '      <a class="nav-link text-white ps-3 py-1 small" href="ip-calculator.html">IP Calculator</a>',
      '      <a class="nav-link text-white ps-3 py-1 small" href="url-encode.html">URL Encode/Decode</a>',
      '      <a class="nav-link text-white ps-3 py-1 small" href="cron-builder.html">Cron Builder</a>',
      '    </div>',
      '  </div>',
      '',
      '  <div class="sidebar-cat">',
      '    <a class="nav-link text-white sidebar-cat-header d-flex justify-content-between align-items-center py-1" data-bs-toggle="collapse" href="#catText' + s + '" role="button" aria-expanded="false">',
      '      <span>Text &amp; Media</span> <span class="cat-chevron">&#x25BC;</span>',
      '    </a>',
      '    <div class="collapse" id="catText' + s + '" data-bs-parent="#' + id + '">',
      '      <a class="nav-link text-white ps-3 py-1 small" href="textcase.html">Text Case Converter</a>',
      '      <a class="nav-link text-white ps-3 py-1 small" href="lorem-ipsum.html">Lorem Ipsum</a>',
      '      <a class="nav-link text-white ps-3 py-1 small" href="md-preview.html">Markdown Previewer</a>',
      '      <a class="nav-link text-white ps-3 py-1 small" href="color-picker.html">Color Picker</a>',
      '      <a class="nav-link text-white ps-3 py-1 small" href="image-to-base64.html">Image to Base64</a>',
      '    </div>',
      '  </div>',
      '',
      '  <div class="sidebar-cat">',
      '    <a class="nav-link text-white sidebar-cat-header d-flex justify-content-between align-items-center py-1" data-bs-toggle="collapse" href="#catGen' + s + '" role="button" aria-expanded="false">',
      '      <span>Generators</span> <span class="cat-chevron">&#x25BC;</span>',
      '    </a>',
      '    <div class="collapse" id="catGen' + s + '" data-bs-parent="#' + id + '">',
      '      <a class="nav-link text-white ps-3 py-1 small" href="password-generator.html">Password Generator</a>',
      '      <a class="nav-link text-white ps-3 py-1 small" href="qr-generator.html">QR Code Generator</a>',
      '      <a class="nav-link text-white ps-3 py-1 small" href="rsa-generator.html">RSA Key Generator</a>',
      '    </div>',
      '  </div>',
      '',
      '  <div class="sidebar-cat">',
      '    <a class="nav-link text-white sidebar-cat-header d-flex justify-content-between align-items-center py-1" data-bs-toggle="collapse" href="#catConvert' + s + '" role="button" aria-expanded="false">',
      '      <span>Converters</span> <span class="cat-chevron">&#x25BC;</span>',
      '    </a>',
      '    <div class="collapse" id="catConvert' + s + '" data-bs-parent="#' + id + '">',
      '      <a class="nav-link text-white ps-3 py-1 small" href="konverter-bilangan.html">Konverter Bilangan</a>',
      '      <a class="nav-link text-white ps-3 py-1 small" href="unit-converter.html">Unit Converter</a>',
      '      <a class="nav-link text-white ps-3 py-1 small" href="time-converter.html">Time Converter</a>',
      '    </div>',
      '  </div>',
      '',
      '  <div class="sidebar-cat">',
      '    <a class="nav-link text-white sidebar-cat-header d-flex justify-content-between align-items-center py-1" data-bs-toggle="collapse" href="#catUtils' + s + '" role="button" aria-expanded="false">',
      '      <span>Utilities</span> <span class="cat-chevron">&#x25BC;</span>',
      '    </a>',
      '    <div class="collapse" id="catUtils' + s + '" data-bs-parent="#' + id + '">',
      '      <a class="nav-link text-white ps-3 py-1 small" href="timer.html">Timer &amp; Stopwatch</a>',
      '      <a class="nav-link text-white ps-3 py-1 small" href="csv-viewer.html">CSV Viewer</a>',
      '      <a class="nav-link text-white ps-3 py-1 small" href="contrast-checker.html">Contrast Checker</a>',
      '      <a class="nav-link text-white ps-3 py-1 small" href="screen-recorder.html">Screen Recorder</a>',
      '    </div>',
      '  </div>',
      '</nav>'
    ].join('\n');
  }

  function wrap(type, navHtml, suffix) {
    var searchId = 'sidebarSearch' + (suffix || '');
    var darkId = 'darkToggle' + (suffix || '');

    var common = [
      '    <div class="mb-4">',
      '      <a href="https://webapps.naufalrakha.my.id" class="d-flex align-items-center text-decoration-none text-white">',
      '        <span class="fw-bold">WebApps NaufalRakha</span>',
      '      </a>',
      '    </div>',
      '    <input type="text" id="' + searchId + '" class="sidebar-search form-control form-control-sm mb-2" placeholder="&#x1F50D; Cari tool..." style="background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.12);color:#fff;">',
      navHtml,
      '    <div class="mt-3 small">',
      '      <hr class="border-secondary">',
      '      <div class="mb-2">',
      '        <p class="mb-1 small"><strong>Sites Network</strong></p>',
      '        <div class="d-flex flex-wrap gap-1">',
      '          <a href="https://naufalrakha.my.id" target="_blank" class="btn btn-outline-light btn-sm py-0 px-1" style="font-size:0.65rem;">Root</a>',
      '          <a href="https://digital.naufalrakha.my.id" target="_blank" class="btn btn-outline-light btn-sm py-0 px-1" style="font-size:0.65rem;">Digital</a>',
      '          <a href="https://demo.naufalrakha.my.id" target="_blank" class="btn btn-outline-light btn-sm py-0 px-1" style="font-size:0.65rem;">Demo Art</a>',
      '          <a href="https://koleksilama.naufalrakha.my.id" target="_blank" class="btn btn-outline-light btn-sm py-0 px-1" style="font-size:0.65rem;">Koleksi</a>',
      '          <a href="https://webapps.naufalrakha.my.id" target="_blank" class="btn btn-outline-light btn-sm py-0 px-1" style="font-size:0.65rem;font-weight:700;">WebApps*</a>',
      '        </div>',
      '      </div>',
      '      <hr class="border-secondary">',
      '      <div class="d-flex justify-content-between align-items-center">',
      '        <p class="mb-1"><strong>About</strong></p>',
      '        <button class="dark-toggle btn btn-sm" style="line-height:1;font-size:1rem;padding:2px 8px;" title="Toggle Dark Mode">&#x1F319;</button>',
      '      </div>',
'      <p class="mb-0 text-light">',
'        <span class="text-white">WebApp naufalrakha</span> adalah kumpulan aplikasi mini berbasis web.',
'      </p>',
'      <a href="https://saweria.co/naufalrakha" target="_blank" class="btn btn-sm w-100 mt-2" style="background:#ff7a00;color:#fff;border:none;">&#x2615; Donasi</a>',
'    </div>'
    ].join('\n');

    if (type === 'aside') {
      return [
        '<aside class="sidebar text-white min-vh-100 p-3">',
        '  <div class="d-flex flex-column h-100">',
        common,
        '  </div>',
        '</aside>'
      ].join('\n');
    }

    return [
      '<div class="offcanvas offcanvas-start sidebar text-white" tabindex="-1" id="mobileSidebar">',
      '  <div class="offcanvas-header">',
      '    <h5 class="offcanvas-title">Menu</h5>',
      '    <button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button>',
      '  </div>',
      '  <div class="offcanvas-body">',
      '    <div class="d-flex flex-column h-100">',
      common,
      '    </div>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  // ---- Inject ----
  var desktop = document.getElementById('sidebar-desktop');
  var mobile = document.getElementById('sidebar-mobile');
  if (desktop) desktop.innerHTML = wrap('aside', makeNav(''), '');
  if (mobile) mobile.innerHTML = wrap('offcanvas', makeNav('M'), 'M');

  // ---- Active link ----
  var current = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.sidebar .nav-link').forEach(function (a) {
    if (a.getAttribute('href') === current) a.classList.add('active');
  });

  // ---- Search ----
  document.querySelectorAll('.sidebar-search').forEach(function (input) {
    var timer;
    input.addEventListener('input', function () {
      clearTimeout(timer);
      timer = setTimeout(function () {
        var q = input.value.toLowerCase();
        var root = input.closest('.sidebar') || input.closest('.offcanvas-body');
        if (!root) return;
        root.querySelectorAll('.sidebar-cat').forEach(function (cat) {
          var links = cat.querySelectorAll('.nav-link.ps-3');
          var has = false;
          links.forEach(function (a) {
            var show = a.textContent.toLowerCase().includes(q);
            a.style.display = show ? '' : 'none';
            if (show) has = true;
          });
          cat.style.display = (!q || has) ? '' : 'none';
        });
      }, 150);
    });
  });

  // ---- Dark mode ----
  function setTheme(dark) {
    document.documentElement.setAttribute('data-bs-theme', dark ? 'dark' : 'light');
    document.querySelectorAll('.dark-toggle').forEach(function (b) { b.textContent = dark ? '\u2600\uFE0F' : '\uD83C\uDF19'; });
    try { localStorage.setItem('theme', dark ? 'dark' : 'light'); } catch (e) {}
  }

  var saved;
  try { saved = localStorage.getItem('theme'); } catch (e) {}
  if (saved) setTheme(saved === 'dark');
  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme(true);

  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('dark-toggle')) setTheme(document.documentElement.getAttribute('data-bs-theme') !== 'dark');
  });

  // ---- PWA ----
  var ml = document.createElement('link');
  ml.rel = 'manifest'; ml.href = 'manifest.json';
  document.head.appendChild(ml);

  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/service-worker.js');
})();
