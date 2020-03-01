const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const mongodb = require('./service/mongo');
const { upload } = require('./service/googleapi');
const Urls = require('./model/url');


async function getTableImage() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    const selector = 'table';
    await page.waitForSelector(selector, { timeout: 0 });

    const tablePosition = await page.$eval(selector, (element) => ({
        width: element.offsetWidth,
        height: element.offsetHeight,
        top: element.offsetTop,
        left: element.offsetLeft,
    }));

    await page.screenshot({
        path: 'image.png',
        clip: {
            x: tablePosition.left,
            y: tablePosition.top,
            width: tablePosition.width,
            height: tablePosition.height,
        },
    });

    await browser.close();
}

function getTimestamp() {
    return Math.trunc((new Date() / 1000));
}

(async () => {
    await getTableImage();
    const url = await upload('./image.png');
    await fs.unlink('./image.png');
    console.log(url);
    await Urls.create({
        url,
        createdAt: getTimestamp(),
    });
    mongodb.close();
})();
