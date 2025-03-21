const { $ } = require('@wdio/globals')

class CalculatedResultPage {

    get resultMessage() { return $("#result-message"); }
    get minimumAmountNeededValue() { return $("#retirement-amount-results"); }
    get currentSavingValue() { return $("#current-savings-results"); }
    get editInfoButton() { return $("//button[contains(text(),'Edit')]"); }


    //to get text from UI
    async getText(element) {
        await element.waitForDisplayed({ timeout: 10000 });
        return await element.getText();
    }
    // for click edit button on result page
    async clickEditInfoButton() {
        await this.editInfoButton.waitForClickable({ timeout: 10000 });
        await this.editInfoButton.click();
        await browser.pause(2000); // Ensure navigation completes
        console.log("Navigated back to the Calculator Home Page Success");
    }

    //reusable methos to get text from pages
    async getResultText(element, elementName) {
        try {
            await element.waitForDisplayed({ timeout: 10000 });

            // Wait until the element has non-empty text
            await browser.waitUntil(async () => {
                const text = await element.getText();
                return text.trim().length > 0;
            }, {
                timeout: 10000,
                interval: 500,
            });

            // Retrieve the final result text
            const resultText = await element.getText();
            console.log(`${elementName}:`, resultText);
            return resultText;
        } catch (error) {
            console.error(`Error retrieving ${elementName}:`, error);
            throw error; // Rethrow error for test failure
        }
    }

    async resultPageText1() {
        return await this.getResultText(this.resultMessage, "Retirement Amount Results");
    }

    async resultPageText2() {
        return await this.getResultText(this.minimumAmountNeededValue, "Minimum Amount Needed to Retire");
    }

    async resultPageText3() {
        return await this.getResultText(this.currentSavingValue, "Current Savings Amount");
    }




}

module.exports = new CalculatedResultPage();