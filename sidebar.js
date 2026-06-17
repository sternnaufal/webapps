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

  function wrap(wrapper, navHtml) {
    if (wrapper === 'aside') {
      return [
        '<aside class="d-none d-md-block col-md-3 col-lg-2 sidebar text-white min-vh-100 p-3">',
        '  <div class="d-flex flex-column h-100">',
        '    <div class="mb-4">',
        '      <a href="https://webapps.naufalrakha.my.id" class="d-flex align-items-center text-decoration-none text-white">',
        '        <span class="fw-bold">WebApps NaufalRakha</span>',
        '      </a>',
        '    </div>',
        navHtml,
        '    <div class="mt-4 small">',
        '      <hr class="border-secondary">',
        '      <p class="mb-1"><strong>About</strong></p>',
        '      <p class="mb-0 text-light">',
        '        <span class="text-white">WebApp naufalrakha</span> adalah kumpulan aplikasi mini berbasis web.',
        '      </p>',
        '    </div>',
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
      '      <div class="mb-4">',
      '        <a href="https://webapps.naufalrakha.my.id" class="d-flex align-items-center text-decoration-none text-white">',
      '          <span class="fw-bold">WebApps NaufalRakha</span>',
      '        </a>',
      '      </div>',
      navHtml,
      '      <div class="mt-4 small">',
      '        <hr class="border-secondary">',
      '        <p class="mb-1"><strong>About</strong></p>',
      '        <p class="mb-0 text-light">',
      '          <span class="text-white">WebApp naufalrakha</span> adalah kumpulan aplikasi mini berbasis web.',
      '        </p>',
      '      </div>',
      '    </div>',
      '  </div>',
      '</div>'
    ].join('\n');
  }

  var desktop = document.getElementById('sidebar-desktop');
  if (desktop) desktop.innerHTML = wrap('aside', makeNav(''));

  var mobile = document.getElementById('sidebar-mobile');
  if (mobile) mobile.innerHTML = wrap('offcanvas', makeNav('M'));
})();
