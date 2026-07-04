(function () {
  'use strict';

  var categories = [
    {
      name: 'Developer Tools',
      tools: [
        { name: 'Hash Generator',       url: 'hash-generator.html' },
        { name: 'UUID/GUID Generator',  url: 'uuid-generator.html' },
        { name: 'Base64 Encode/Decode', url: 'base64-coded.html' },
        { name: 'JSON Formatter',       url: 'json-formatter.html' },
        { name: 'Regex Tester',         url: 'regex-tester.html' },
        { name: 'Diff Checker',         url: 'diff-checker.html' },
        { name: 'SQL Formatter',        url: 'sql-formatter.html' },
        { name: 'YAML/JSON Converter',  url: 'yaml-json.html' },
      ],
    },
    {
      name: 'Network & URL',
      tools: [
        { name: 'Kalkulator Subnetting', url: 'subnetting.html' },
        { name: 'IP Calculator',         url: 'ip-calculator.html' },
        { name: 'URL Encode/Decode',     url: 'url-encode.html' },
        { name: 'Cron Builder',          url: 'cron-builder.html' },
      ],
    },
    {
      name: 'Text & Media',
      tools: [
        { name: 'Text Case Converter',  url: 'textcase.html' },
        { name: 'Lorem Ipsum',          url: 'lorem-ipsum.html' },
        { name: 'Markdown Previewer',   url: 'md-preview.html' },
        { name: 'Color Picker',         url: 'color-picker.html' },
        { name: 'Image to Base64',      url: 'image-to-base64.html' },
        { name: 'Palindrome Checker',   url: 'palindrome-checker.html' },
        { name: 'Anagram Finder',       url: 'anagram-finder.html' },
        { name: 'Text Repeater',        url: 'text-repeater.html' },
        { name: 'Reverse Text',         url: 'reverse-text.html' },
        { name: 'List Sorter',          url: 'list-sorter.html' },
        { name: 'Morse Code Converter', url: 'morse-code-converter.html' },
      ],
    },
    {
      name: 'Generators',
      tools: [
        { name: 'Password Generator',     url: 'password-generator.html' },
        { name: 'QR Code Generator',      url: 'qr-generator.html' },
        { name: 'RSA Key Generator',      url: 'rsa-generator.html' },
        { name: 'CSS Gradient Generator', url: 'gradient-generator.html' },
        { name: 'Random Number Generator', url: 'random-number-generator.html' },
        { name: 'JWT Decoder',           url: 'jwt-decoder.html' },
        { name: 'HTML Live Preview',     url: 'html-preview.html' },
        { name: 'HTTP Status Codes',     url: 'http-status.html' },
        { name: 'Character Counter',     url: 'char-counter.html' },
        { name: 'JSON ↔ CSV Converter',  url: 'json-csv.html' },
        { name: 'CSS Unit Converter',    url: 'css-unit.html' },
        { name: 'HTML Entity Encoder/Decoder', url: 'html-entity.html' },
        { name: 'Random Color Generator', url: 'random-color-generator.html' },
        { name: 'Epoch / Unix Timestamp Converter', url: 'epoch-converter.html' },
      ],
    },
    {
      name: 'Converters',
      tools: [
        { name: 'Konverter Bilangan', url: 'konverter-bilangan.html' },
        { name: 'Unit Converter',     url: 'unit-converter.html' },
        { name: 'Time Converter',     url: 'time-converter.html' },
        { name: 'Date Duration Calculator', url: 'date-calculator.html' },
      ],
    },
    {
      name: 'Utilities',
      tools: [
        { name: 'Timer & Stopwatch',  url: 'timer.html' },
        { name: 'Stopwatch',           url: 'stopwatch.html' },
        { name: 'Typing Speed Test',   url: 'typing-speed-test.html' },
        { name: 'Notes App',           url: 'notes-app.html' },
        { name: 'CSV Viewer',         url: 'csv-viewer.html' },
        { name: 'Contrast Checker',   url: 'contrast-checker.html' },
        { name: 'Screen Recorder',    url: 'screen-recorder.html' },
        { name: 'World Clock',        url: 'world-clock.html' },
        { name: 'Password Strength',  url: 'password-strength.html' },
        { name: 'BMI Calculator',     url: 'bmi-calculator.html' },
        { name: 'Tip Calculator',     url: 'tip-calculator.html' },
        { name: 'Decision Maker',     url: 'decision-maker.html' },
        { name: 'Age Calculator',     url: 'age-calculator.html' },
        { name: 'Percentage Calculator', url: 'percentage-calculator.html' },
        { name: 'Pomodoro Timer',     url: 'pomodoro.html' },
        { name: 'Countdown Timer',    url: 'countdown.html' },
        { name: 'Savings Calculator', url: 'savings-calculator.html' },
        { name: 'Number to Words',         url: 'number-to-words.html' },
        { name: 'Roman Numeral Converter', url: 'roman-numeral.html' },
        { name: 'Sleep Cycle Calculator', url: 'sleep-cycle.html' },
        { name: 'Calorie Calculator',     url: 'calorie-calculator.html' },
        { name: 'Discount Calculator',    url: 'discount-calculator.html' },
        { name: 'Mortgage Calculator',    url: 'mortgage-calculator.html' },
        { name: 'Dice Roller',            url: 'dice-roller.html' },
      ],
    },
  ]

  var sites = [
    { name: 'Root',   url: 'https://naufalrakha.my.id' },
    { name: 'Digital', url: 'https://digital.naufalrakha.my.id' },
    { name: 'Demo',   url: 'https://demo.naufalrakha.my.id' },
    { name: 'Koleksi', url: 'https://koleksilama.naufalrakha.my.id' },
    { name: 'WebApps', url: 'https://webapps.naufalrakha.my.id' },
  ]

  function makeNav(suffix) {
    var s = suffix || ''
    var current = window.location.pathname.split('/').pop() || 'index.html'
    var out = ''

    categories.forEach(function (cat, i) {
      var open = i === 0 ? 'show' : ''
      var expanded = i === 0 ? 'true' : 'false'
      out += '<div class="sidebar-cat">'
      out += '<a class="nav-link text-white sidebar-cat-header d-flex justify-content-between align-items-center py-1" data-bs-toggle="collapse" href="#cat' + i + s + '" role="button" aria-expanded="' + expanded + '">'
      out += '<span>' + cat.name + '</span> <span class="cat-chevron">&#x25BC;</span>'
      out += '</a>'
      out += '<div class="collapse ' + open + '" id="cat' + i + s + '">'
      cat.tools.forEach(function (t) {
        var active = t.url === current ? ' active' : ''
        out += '<a class="nav-link text-white ps-3 py-1 small' + active + '" href="' + t.url + '">' + t.name + '</a>'
      })
      out += '</div></div>'
    })

    return out
  }

  function sideHTML(suffix) {
    var siteLinks = sites.map(function (s) {
      return '<a href="' + s.url + '" target="_blank" class="text-white-50 text-decoration-none" style="font-size:0.65rem;">' + s.name + '</a>'
    }).join(' <span style="color:#444;">|</span> ')

    return [
      '  <div class="sidebar-header">',
      '    <a href="https://webapps.naufalrakha.my.id" class="text-decoration-none text-white fw-bold" style="font-size:0.95rem;">WebApps</a>',
      '  </div>',
      '  <div class="sidebar-search-wrap">',
      '    <input type="text" class="sidebar-search form-control form-control-sm" placeholder="Cari tool..." style="background:rgba(255,255,255,.08);border-color:rgba(255,255,255,.12);color:#fff;font-size:.8rem;">',
      '  </div>',
      '  <nav class="nav flex-column sidebar-tools">',
           makeNav(suffix),
      '  </nav>',
      '  <div class="sidebar-footer">',
      '    <div class="text-center py-1">' + siteLinks + '</div>',
      '    <hr class="border-secondary my-1">',
      '    <div class="d-flex justify-content-between align-items-center pt-1">',
      '      <span style="color:rgba(255,255,255,0.4);font-size:0.65rem;">Tema Gelap</span>',
      '      <button class="dark-toggle btn btn-sm" style="line-height:1;font-size:0.85rem;padding:0 6px;color:rgba(255,255,255,0.6);background:transparent;border:none;">&#x1F319;</button>',
      '    </div>',
      '  </div>'
    ].join('\n')
  }

  var desktop = document.getElementById('sidebar-desktop')
  var mobile = document.getElementById('sidebar-mobile')
  if (desktop) desktop.innerHTML = '<aside class="sidebar vh-100 p-2 d-flex flex-column text-white" style="overflow:hidden;position:sticky;top:0;">' + sideHTML('') + '</aside>'
  if (mobile) mobile.innerHTML = '<div class="offcanvas offcanvas-start sidebar text-white" tabindex="-1" id="mobileSidebar"><div class="offcanvas-header"><h5 class="offcanvas-title">Menu</h5><button type="button" class="btn-close btn-close-white" data-bs-dismiss="offcanvas"></button></div><div class="offcanvas-body p-2 d-flex flex-column">' + sideHTML('M') + '</div></div>'

  var searchTimer
  document.addEventListener('input', function (e) {
    if (!e.target.classList.contains('sidebar-search')) return
    clearTimeout(searchTimer)
    searchTimer = setTimeout(function () {
      var q = e.target.value.toLowerCase()
      var root = e.target.closest('.sidebar') || e.target.closest('.offcanvas-body')
      if (!root) return
      root.querySelectorAll('.sidebar-cat').forEach(function (cat) {
        var links = cat.querySelectorAll('.nav-link.ps-3')
        var has = false
        links.forEach(function (a) {
          var show = a.textContent.toLowerCase().includes(q)
          a.style.display = show ? '' : 'none'
          if (show) has = true
        })
        cat.style.display = (!q || has) ? '' : 'none'
        if (q && has) {
          var header = cat.querySelector('.sidebar-cat-header')
          if (header && header.getAttribute('aria-expanded') === 'false') header.click()
        }
      })
    }, 150)
  })

  function setTheme(dark) {
    document.documentElement.setAttribute('data-bs-theme', dark ? 'dark' : 'light')
    document.querySelectorAll('.dark-toggle').forEach(function (b) { b.textContent = dark ? '\u2600\uFE0F' : '\uD83C\uDF19' })
    var ft = document.querySelector('.dark-float')
    if (ft) ft.innerHTML = dark ? '\u2600\uFE0F' : '\uD83C\uDF19'
    try { localStorage.setItem('theme', dark ? 'dark' : 'light') } catch (e) {}
  }
  var saved
  try { saved = localStorage.getItem('theme') } catch (e) {}
  if (saved) setTheme(saved === 'dark')
  else if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) setTheme(true)

  document.addEventListener('click', function (e) {
    if (e.target.classList.contains('dark-toggle')) setTheme(document.documentElement.getAttribute('data-bs-theme') !== 'dark')
    if (e.target.classList.contains('dark-float')) setTheme(document.documentElement.getAttribute('data-bs-theme') !== 'dark')
  })

})()

