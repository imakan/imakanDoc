const puppeteer = require('puppeteer');

(async () => {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto('https://www.jianshu.com/u/5ab594d638a6');
  await page.screenshot({path: 'example.png'});

  await browser.close();
})();