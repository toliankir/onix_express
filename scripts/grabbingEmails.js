const puppeteer = require('puppeteer');
const Email = require('./model/email');
const mongodb = require('./service/mongo');
const { getTimestamp } = require('./service/helper');

async function getEmails() {
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.goto('http://localhost:3000');
    const selector = 'td';
    await page.waitForSelector(selector, { timeout: 0 });

    const allElements = await page.$$eval(selector, (element) => element.map((td) => td.innerText));
    const emails = allElements.filter((element) => /^.+@.+\..+$/.test(element));

    await browser.close();
    return emails;
}

(async () => {
    const emails = await getEmails();
    await Email.create({
        emails,
        createdAt: getTimestamp(),
    });
    mongodb.close();
})();
