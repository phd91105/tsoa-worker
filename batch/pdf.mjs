import puppeteer from 'puppeteer';

import { updateStatus, uploadFile } from './utils.mjs';

const run = async () => {
  const params = JSON.parse(process.argv[2]);

  const { ref, id, url, auth } = params;
  const { format, printBackground, landscape } = params.printOpts;

  const browser = await puppeteer.launch({
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
    headless: 'new'
  });

  try {
    const page = await browser.newPage();
    await page.goto(ref, {
      waitUntil: 'networkidle2'
    });

    const file = await page.pdf({
      format: format ?? 'A4',
      printBackground: printBackground ?? true,
      landscape: landscape ?? false
    });

    await uploadFile({ file, url, id, auth });
  } catch (err) {
    await updateStatus({ url, id, auth, status: 'failed' });
  } finally {
    process.exit();
  }
};

run();
