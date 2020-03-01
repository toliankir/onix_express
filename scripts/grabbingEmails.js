const puppeteer = require('puppeteer');
const Email = require('./Models/email');
const mongodb = require('./databaseConnection');

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

function getTimestamp() {
    return Math.trunc((new Date() / 1000));
}

(async () => {
    const emails = await getEmails();
    await Email.create({
        emails,
        createdAt: getTimestamp(),
    });
    mongodb.close();
})();
