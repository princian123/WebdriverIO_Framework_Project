//work in progress

const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect, $ } = require('@wdio/globals');
const allureReporter = require('@wdio/allure-reporter');
const logger = require('../../utils/logger');
const homePage = require('../pageobjects/homePage');
const common = require('../pageobjects/common');
const calculatedResultPage = require('../pageobjects/calculatedResultPage');
const { getExcelData } = require('../../utils/excelReader');
// Fetch all rows from Excel
const excelData = getExcelData("Sheet1");


if (!excelData || excelData.length === 0) {
    console.error("ERROR: Excel Data is empty or not loaded correctly.");
} else {
    console.log("✅ Excel Data Loaded Successfully:", excelData);
}
//Pick the first row of test data (if available)
const testData = excelData.length > 0 ? excelData[0] : {};


Given(/^I open URL and log in on the Securian Calculator Home Page$/, async () => {
    try {
        allureReporter.startStep('Opening Application');
        logger.info('Opening Application');
        await common.open();
        logger.info('Application opened successfully');
        allureReporter.endStep();
    } catch (error) {
        logger.error(`Failed to open application: ${error}`);
        throw error;
    }
});

When(/^I enter current age as "(.*)"$/, async (current_age) => {
    allureReporter.startStep(`Entering Current Age: ${current_age}`);
    logger.info(`Entering Current Age: ${current_age}`);
    await homePage.enterValue(homePage.currentAge, String(testData.current_age));
    allureReporter.endStep();

});

When(/^I enter retirement age as "(.*)"$/, async (retirement_age) => {
    allureReporter.startStep(`Entering Retirement Age: ${retirement_age}`);
    logger.info(`Entering Retirement Age: ${retirement_age}`);
    await homePage.enterValue(homePage.retireAge, String(testData.retirement_age));
    const screenshot = await browser.saveScreenshot(`./screenshots/retirmentAge.png`);  // example of taking scrren shot attchec in one step only
    allureReporter.addAttachment("Savings Balance Screenshot", screenshot, "image/png");
    allureReporter.endStep();
});

When(/^I enter current annual income as "(.*)"$/, async (current_income) => {
    allureReporter.startStep(`Entering Current Annual Income: ${current_income}`);
    logger.info(`Entering Current Annual Income: ${current_income}`);
    await homePage.enterValue(homePage.currentAnnualIncome, String(testData.current_income));
    allureReporter.endStep();
});

When(/^I enter spouse's annual income as "(.*)"$/, async (spouse_income) => {
    allureReporter.startStep(`Entering Spouse's Annual Income: ${spouse_income}`);
    logger.info(`Entering Spouse's Annual Income: ${spouse_income}`);
    await homePage.enterValue(homePage.spouseAnnualIncome, String(testData.spouse_income));
    allureReporter.endStep();
});

When(/^I enter current retirement savings balance as "(.*)"$/, async (savings_balance) => {
    allureReporter.startStep(`Entering Current Retirement Savings Balance: ${savings_balance}`);
    logger.info(`Entering Current Retirement Savings Balance: ${savings_balance}`);
    await homePage.enterValue(homePage.currentRetirementSavingsBalance, String(testData.savings_balance));
    allureReporter.endStep();
});

When(/^I enter currently saving each year for retirement as "(.*)"$/, async (yearly_savings) => {
    allureReporter.startStep(`Entering Yearly Savings: ${yearly_savings}`);
    logger.info(`Entering Yearly Savings: ${yearly_savings}`);
    await homePage.enterValue(homePage.currentSaving, String(testData.yearly_savings));
    allureReporter.endStep();
});

When(/^I enter rate of increase in your savings each year as "(.*)"$/, async (savings_increase_rate) => {
    allureReporter.startStep(`Entering Savings Increase Rate: ${savings_increase_rate}`);
    logger.info(`Entering Savings Increase Rate: ${savings_increase_rate}`);
    await homePage.enterValue(homePage.savingIncreaseRate, String(testData.savings_increase_rate));
    allureReporter.endStep();
});
When(/^I select Social Security benefits radio button as "(.*)"$/, async (option) => { 
    const selectedOption1 = String(testData.SocialSecurityBenefits).trim().toLowerCase();  
    await homePage.selectSocialSecurityBenefits(selectedOption1); 
});

Then(/^The Social Security benefits radio button "(.*)" should be selected$/, async (selected_Option) => {
    const isSelected1 = String(testData.SocialSecurityBenefits).trim().toLowerCase();  
     await homePage.isSocialSecurityBenefitsSelected(isSelected1);
});

When(/^I select marital status as "(.*)"$/, async (marital_status) => {
    const selectedStatus = String(testData.maritalStatus).trim().toLowerCase();
    await homePage.maritalStatus(selectedStatus);
});
When(/^I enter social Security Override Amount as "(.*)"$/, async (social_security_override) => {
    allureReporter.startStep(`Entering Override Amount: ${social_security_override}`);
    logger.info(`Entering Yearly Savings: ${social_security_override}`);
    await homePage.enterValue(homePage.socialSecurityOverrideAmount, String(testData.social_security_override));
    allureReporter.endStep();
});

When(/^I click on the calculate button$/, async () => {
    allureReporter.startStep("Clicking on Calculate Button");
    logger.info("Clicking on Calculate Button");
    await homePage.calculateButton.click();
    allureReporter.endStep();
});


Then(/^I verify the Retirement Amount Results page is loaded$/, async () => {
    allureReporter.startStep("Verifying that the Retirement Amount Results page is loaded");
    logger.info("Verifying Retirement Amount Results Page");
    //added assertion to verify text is returning correct or not. if text incorrect test will fail.
    const actualText = await calculatedResultPage.resultPageText1();
    expect(actualText).toContain("In order to retire by 68, you might need to consider increasing your monthly savings by $57 a month.");
    allureReporter.endStep();
});

Then(/^I verify the Minimum Amount needed for retirement$/, async () => {
    allureReporter.startStep("Verifying the Minimum Amount needed for retirement");
    logger.info("Checking Minimum Retirement Amount");
    ////added assertion to verify value is returning correct or not. if text incorrect test will fail.
    const actualText = await calculatedResultPage.resultPageText2();
    expect(actualText).toContain("$4,372,690.03");
    allureReporter.endStep();
});

Then(/^I verify the amount saved till now$/, async () => {
    allureReporter.startStep("Verifying the Amount Saved till now");
    logger.info("Verifying Amount Saved Till Now");
    ////added assertion to verify value is returning correct or not. if text incorrect test will fail.
    const actualText = await calculatedResultPage.resultPageText3();
    expect(actualText).toContain("$500,000.00");
    allureReporter.endStep();
});

Then(/^I click on the Edit Info button to go back to the Home Page$/, async () => {
    try {
        allureReporter.startStep("Clicking on Edit Info button to return to Home Page");
        await calculatedResultPage.clickEditInfoButton();
        logger.info("Clicking Edit Info Button");
        allureReporter.endStep();
    } catch (error) {
        logger.error("Failed to click Edit Info button");
        throw error;
    }

});