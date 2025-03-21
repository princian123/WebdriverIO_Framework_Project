const { $, browser } = require('@wdio/globals')
//const Page = require('./homePage')
const homePage = require('./homePage')

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




}



module.exports = new Common

