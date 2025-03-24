const { $, browser } = require('@wdio/globals')
//const Page = require('./homePage')
const homePage = require('./homePage')
const fs = require('fs');
const allureReporter = require('@wdio/allure-reporter').default;

class Common {
    //to manage cookies locator
    get acceptCookiesButton() { return $('#onetrust-accept-btn-handler'); }


    //url open function,maximize function and accespt cookies
    async open() {
        await browser.url('https://www.securian.com/insights-tools/retirement-calculator.html');
        await this.acceptCookies();
        await browser.maximizeWindow();
    }
    //accept cookies function
    async acceptCookies() {
        if (await this.acceptCookiesButton.isDisplayed()) {
            await this.acceptCookiesButton.click();
        }
    }
    async captureScreenshot(screenshotName) {
        const screenshotPath = `./screenshots/${screenshotName}.png`;
        await browser.saveScreenshot(screenshotPath);
        const screenshotBuffer = fs.readFileSync(screenshotPath);
        allureReporter.addAttachment(screenshotName, screenshotBuffer, "image/png");
    }
}



module.exports = new Common

