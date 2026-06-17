(function () {
  'use strict';

  var tools = [
    { name: 'Konverter Bilangan',     url: 'konverter-bilangan.html' },
    { name: 'Kalkulator Subnetting',  url: 'subnetting.html' },
    { name: 'Hash Generator',         url: 'hash-generator.html' },
    { name: 'Password Generator',     url: 'password-generator.html' },
    { name: 'Base64 Encode/Decode',   url: 'base64-coded.html' },
    { name: 'UUID/GUID Generator',    url: 'uuid-generator.html' },
    { name: 'QR Code Generator',      url: 'qr-generator.html' },
    { name: 'Color Picker',           url: 'color-picker.html' },
    { name: 'Markdown Previewer',     url: 'md-preview.html' },
    { name: 'Lorem Ipsum',            url: 'lorem-ipsum.html' },
    { name: 'Text Case Converter',    url: 'textcase.html' },
    { name: 'JSON Formatter',         url: 'json-formatter.html' },
    { name: 'URL Encode/Decode',      url: 'url-encode.html' },
    { name: 'Regex Tester',           url: 'regex-tester.html' },
    { name: 'Unit Converter',         url: 'unit-converter.html' },
    { name: 'Diff Checker',           url: 'diff-checker.html' },
    { name: 'Image to Base64',        url: 'image-to-base64.html' },
    { name: 'Timer & Stopwatch',      url: 'timer.html' },
    { name: 'IP Calculator',          url: 'ip-calculator.html' },
    { name: 'Cron Builder',           url: 'cron-builder.html' },
    { name: 'SQL Formatter',          url: 'sql-formatter.html' },
    { name: 'RSA Key Generator',      url: 'rsa-generator.html' },
    { name: 'Screen Recorder',        url: 'screen-recorder.html' },
    { name: 'Contrast Checker',       url: 'contrast-checker.html' },
    { name: 'CSV Viewer',             url: 'csv-viewer.html' },
    { name: 'Time Converter',         url: 'time-converter.html' },
  ]

  var sites = [
    { name: 'Root',   url: 'https://naufalrakha.my.id' },
    { name: 'Digital', url: 'https://digital.naufalrakha.my.id' },
    { name: 'Demo',   url: 'https://demo.naufalrakha.my.id' },
    { name: 'Koleksi', url: 'https://koleksilama.naufalrakha.my.id' },
    { name: 'WebApps', url: 'https://webapps.naufalrakha.my.id' },
  ]

  function sideHTML() {
    var current = window.location.pathname.split('/').pop() || 'index.html'
    var links = tools.map(function (t) {
      var active = t.url === current ? ' active' : ''
      return '<a class="nav-link text-white ps-3 py-1 small' + active + '" href="' + t.url + '">' + t.name + '</a>'
    }).join('\n')

    var siteLinks = sites.map(function (s) {
      return '<a href="' + s.url + '" target="_blank" class="text-white-50 text-decoration-none small" style="font-size:0.65rem;">' + s.name + '</a>'
    }).join(' <span style="color:#444;">|</span> ')

    return [
      '  <div class="sidebar-header">',
      '    <a href="https://webapps.naufalrakha.my.id" class="text-decoration-none text-white fw-bold" style="font-size:0.95rem;">WebApps</a>',
      '  </div>',
      '  <div class="sidebar-search-wrap">',
      '    <input type="text" class="sidebar-search form-control form-control-sm" placeholder="Cari tool..." style="background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.12);color:#fff;font-size:.8rem;">',
      '  </div>',
      '  <nav class="nav flex-column sidebar-tools">',
           links,
      '  </nav>',
      '  <div class="sidebar-footer">',
      '    <div class="text-center py-1">' + siteLinks + '</div>',
      '    <hr class="border-secondary my-1">',
      '    <div class="d-flex justify-content-between align-items-center pt-1">',
      '      <span style="color:rgba(255,255,255,0.4);font-size:0.65rem;">Tema Gelap</span>',
      '      <button class="dark-toggle btn btn-sm" style="line-height:1;font-size:0.85rem;padding:0 6px;color:rgba(255,255,255,0.6);background:transparent;border:none;" title="Toggle Dark Mode">&#x1F319;</button>',
      '    </div>',
      '  </div>'
    ].join('\n')
  }

  var desktop = document.getElementById('sidebar-desktop')
  var mobile = document.getElementById('sidebar-mobile')
  if (desktop) desktop.innerHTML = '<aside class="sidebar vh-100 p-2 d-flex flex-column text-white" style="overflow:hidden;position:sticky;top:0;">' + sideHTML() + '</aside>'
  if (mobile) mobile.innerHTML = '<div class="offcanvas offcanvas-start sidebar text-white" tabindex="-1" id="mobileSidebar"><div class="offcanvas-header"><h5 class="offcanvas-title">Menu</h5><button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button></div><div class="offcanvas-body p-2 d-flex flex-column">' + sideHTML() + '</div></div>'

  var searchTimer
  document.addEventListener('input', function (e) {
    if (!e.target.classList.contains('sidebar-search')) return
    clearTimeout(searchTimer)
    searchTimer = setTimeout(function () {
      var q = e.target.value.toLowerCase()
      var root = e.target.closest('.sidebar') || e.target.closest('.offcanvas-body')
      if (!root) return
      root.querySelectorAll('.sidebar-tools .nav-link').forEach(function (a) {
        a.style.display = a.textContent.toLowerCase().includes(q) ? '' : 'none'
      })
    }, 150)
  })

  function setTheme(dark) {
    document.documentElement.setAttribute('data-bs-theme', dark ? 'dark' : 'light')
    document.querySelectorAll('.dark-toggle').forEach(function (b) { b.textContent = dark ? '\u2600\uFE0F' : '\uD83C\uDF19' })
    try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch (e) {}
  }
  var saved
  try { saved = localStorage.getItem('theme') } catch (e) {}
  if (saved) setTheme(saved === 'dark')
  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme(true)

  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('dark-toggle')) setTheme(document.documentElement.getAttribute('data-bs-theme') !== 'dark')
  })

  var ml = document.createElement('link')
  ml.rel = 'manifest'; ml.href = 'manifest.json'
  document.head.appendChild(ml)
  if ('serviceWorker' in navigator) navigator.serviceWorker.register('/service-worker.js')
})()
