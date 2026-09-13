const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
  const page = await browser.newPage();
  await page.setViewport({ width: 1280, height: 800 });
  await page.goto('https://happyitaly.nl/', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'happyitaly-home.png', fullPage: true });
  await page.goto('https://happyitaly.nl/menukaart/', { waitUntil: 'networkidle2' });
  await page.screenshot({ path: 'happyitaly-menu.png', fullPage: true });
  await browser.close();
})();
