const { browser } = require('@wdio/globals')

/**
* main page object containing all methods, selectors and functionality
* that is shared across all page objects
*/
class browserUrlPage {
    /**
    * Opens a sub page of the page
    * @param path path of the sub page (e.g. /path/to/page.html)
    */
    open ( ) {
        return browser.url(`https://www.securian.com/insights-tools/retirement-calculator.html`)
    }
}

module.exports = new browserUrlPage()