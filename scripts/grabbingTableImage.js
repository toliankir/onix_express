const puppeteer = require('puppeteer');
const fs = require('fs').promises;
const path = require('path');
const mongodb = require('./service/mongo');
const { upload } = require('./service/googleapi');
const Urls = require('./model/url');
const { getTimestamp } = require('./service/helper');

async function getTableImage(filepath) {
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
        path: filepath,
        clip: {
            x: tablePosition.left,
            y: tablePosition.top,
            width: tablePosition.width,
            height: tablePosition.height,
        },
    });

    await browser.close();
}

(async () => {
    const filepath = `${__dirname}/${getTimestamp()}.png`;
    try {
        await getTableImage(filepath);
        const url = await upload(filepath, path.basename(filepath));
        await fs.unlink(filepath);
        console.log(url);
        await Urls.create({
            url,
            createdAt: getTimestamp(),
        });
    } catch (error) {
        console.log(error.message);
    }
    mongodb.close();
})();
