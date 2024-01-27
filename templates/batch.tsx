import type { BatchOptions, BatchRequest } from '@/interfaces/batch';

const batchRunner = (params: BatchRequest, options: BatchOptions) => `
import puppeteer from "puppeteer-core";
(async () => {
  const browser = await puppeteer.connect({
    browserWSEndpoint: "ws://127.0.0.1:3000",
  });

  try {
    const page = await browser.newPage();
    await page.goto("${params.ref}", {
      waitUntil: "networkidle0",
      timeout: 0,
    });

    const file = await page.pdf({ 
      format: "${params.printOpts.format ?? 'A4'}",
      printBackground: ${params.printOpts.printBackground ?? 'true'},
      landscape: ${params.printOpts.landscape ?? 'false'},
    });

    const myHeaders = new Headers();
    myHeaders.append("accept", "*/*");
    myHeaders.append("Authorization", "${options.auth}");

    const formdata = new FormData();
    formdata.append("file", new Blob([file]), new Date().valueOf() + ".pdf");

    const requestOptions = {
      method: "POST",
      headers: myHeaders,
      body: formdata,
    };
    const result = await fetch("${options.url}/fileUpload/${options.id}", requestOptions);

    if (result.status !== 204) {
      throw new Error("Upload failed");
    }
  } catch (err) {
    await fetch("${options.url}/${options.id}", {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: "${options.auth}",
      },
      body: JSON.stringify({
        status: "failed",
      }),
    });

    process.exit(1);
  } finally {
    await browser.disconnect();
    process.exit(0);
  }
})();
`;

export default batchRunner;
