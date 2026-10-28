import puppeteer from 'puppeteer-core';
const urls = [
  ['home', 'https://webapps.naufalrakha.my.id/'],
  ['age', 'https://webapps.naufalrakha.my.id/tools/age-calculator/'],
  ['contact', 'https://webapps.naufalrakha.my.id/contact/'],
];
const browser = await puppeteer.launch({ executablePath: 'C:/Program Files/Google/Chrome/Application/chrome.exe', headless: 'new', args: ['--no-sandbox'] });
for (const [n, u] of urls) {
  const p = await browser.newPage();
  await p.setViewport({ width: 320, height: 800 });
  await p.goto(u, { waitUntil: 'networkidle2' });
  const r = await p.evaluate(() => {
    const over = [...document.querySelectorAll('body *')]
      .filter(el => { const b = el.getBoundingClientRect(); return b.width > 0 && b.right > document.documentElement.clientWidth + 1; })
      .map(el => `${el.tagName.toLowerCase()}.${(el.className || '').toString().split(' ').slice(0, 2).join('.')}`)
      .slice(0, 8);
    return { scrollW: document.documentElement.scrollWidth, clientW: document.documentElement.clientWidth, over };
  });
  console.log(n, JSON.stringify(r));
  await p.close();
}
await browser.close();
