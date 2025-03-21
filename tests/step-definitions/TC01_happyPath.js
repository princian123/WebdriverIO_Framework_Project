const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect, $ } = require('@wdio/globals');
const allureReporter = require('@wdio/allure-reporter');

const homePage = require('../pageobjects/homePage');
const common = require('../pageobjects/common');
const calculatedResultPage = require('../pageobjects/calculatedResultPage');
//const defaultCalculatorModelPage = require('../pageobjects/defaultCalculatorModelPage');
//const browserUrlPage = require('../pageobjects/browserUrlPage');

Given(/^I open URL and log in on the Securian Calculator Home Page$/, async () => {
    allureReporter.startStep('Opening Home Page'); 
    await common.open(); 
    allureReporter.endStep();
});

When(/^I enter current age as "(.*)"$/, async (current_age) => {
	allureReporter.startStep(`Entering Current Age: ${current_age}`);
	await homePage.enterValue(homePage.currentAge, current_ag);
	allureReporter.endStep();
});

When(/^I enter retirement age as "(.*)"$/, async (retirement_age) => {
	allureReporter.startStep(`Entering Retirement Age: ${retirement_age}`);
    await homePage.enterValue(homePage.retireAge, retirement_age);
    allureReporter.endStep();
});

When(/^I enter current annual income as "(.*)"$/, async (current_income) => {
	allureReporter.startStep(`Entering Current Annual Income: ${current_income}`);
    await homePage.enterValue(homePage.currentAnnualIncome, current_income);
    allureReporter.endStep();
});

When(/^I enter spouse's annual income as "(.*)"$/, async (spouse_income) => {
	allureReporter.startStep(`Entering Spouse's Annual Income: ${spouse_income}`);
    await homePage.enterValue(homePage.spouseAnnualIncome, spouse_income);
    allureReporter.endStep();
});

When(/^I enter current retirement savings balance as "(.*)"$/, async (savings_balance) => {
	allureReporter.startStep(`Entering Current Retirement Savings Balance: ${savings_balance}`);
    await homePage.enterValue(homePage.currentRetirementSavingsBalance, savings_balance);
    allureReporter.endStep();
});

When(/^I enter currently saving each year for retirement as "(.*)"$/, async (yearly_savings) => {
	allureReporter.startStep(`Entering Yearly Savings: ${yearly_savings}`);
    await homePage.enterValue(homePage.currentSaving, yearly_savings);
    allureReporter.endStep();
});

When(/^I enter rate of increase in your savings each year as "(.*)"$/, async (savings_increase_rate) => {
	allureReporter.startStep(`Entering Savings Increase Rate: ${savings_increase_rate}`);
    await homePage.enterValue(homePage.savingIncreaseRate, savings_increase_rate);
    allureReporter.endStep();
});

When(/^I click on the calculate button$/, async () => {
	allureReporter.startStep("Clicking on Calculate Button");
    await homePage.calculateButton.click();
    allureReporter.endStep();
});


Then(/^I verify the Retirement Amount Results page is loaded$/, async () => {
	allureReporter.startStep("Verifying that the Retirement Amount Results page is loaded");
    await calculatedResultPage.resultPageText1();
    allureReporter.endStep();
});

Then(/^I verify the Minimum Amount needed for retirement$/, async () => {
	allureReporter.startStep("Verifying the Minimum Amount needed for retirement");
    await calculatedResultPage.resultPageText2();
    allureReporter.endStep();
});

Then(/^I verify the amount saved till now$/, async () => {
	allureReporter.startStep("Verifying the Amount Saved till now");
    await calculatedResultPage.resultPageText3();
    allureReporter.endStep();
});

Then(/^I click on the Edit Info button to go back to the Home Page$/, async () => {
	allureReporter.startStep("Clicking on Edit Info button to return to Home Page");
    await calculatedResultPage.clickEditInfoButton();
    allureReporter.endStep();

});

