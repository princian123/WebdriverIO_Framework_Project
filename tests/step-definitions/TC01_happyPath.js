const { Given, When, Then } = require('@wdio/cucumber-framework');
const { expect, $ } = require('@wdio/globals');

const homePage = require('../pageobjects/homePage');
const common = require('../pageobjects/common');
const calculatedResultPage = require('../pageobjects/calculatedResultPage');
//const defaultCalculatorModelPage = require('../pageobjects/defaultCalculatorModelPage');
//const browserUrlPage = require('../pageobjects/browserUrlPage');

Given(/^I open URL and log in on the Securian Calculator Home Page$/, async () => {
	await common.open();
});

When(/^I enter current age as "(.*)"$/, async (current_age) => {
	await homePage.enterValue(homePage.currentAge, current_age);
});

When(/^I enter retirement age as "(.*)"$/, async (retirement_age) => {
	await homePage.enterValue(homePage.retireAge, retirement_age);
});

When(/^I enter current annual income as "(.*)"$/, async (current_income) => {
	await homePage.enterValue(homePage.currentAnnualIncome, current_income);
});

When(/^I enter spouse's annual income as "(.*)"$/, async (spouse_income) => {
	await homePage.enterValue(homePage.spouseAnnualIncome, spouse_income);
});

When(/^I enter current retirement savings balance as "(.*)"$/, async (savings_balance) => {
	await homePage.enterValue(homePage.currentRetirementSavingsBalance, savings_balance);
});

When(/^I enter currently saving each year for retirement as "(.*)"$/, async (yearly_savings) => {
	await homePage.enterValue(homePage.currentSaving, yearly_savings);
});

When(/^I enter rate of increase in your savings each year as "(.*)"$/, async (savings_increase_rate) => {
	await homePage.enterValue(homePage.savingIncreaseRate, savings_increase_rate);
});

When(/^I click on the calculate button$/, async () => {
	await homePage.calculateButton.click();
});


Then(/^I verify the Retirement Amount Results page is loaded$/, async () => {
	await calculatedResultPage.resultPageText1();
});

Then(/^I verify the Minimum Amount needed for retirement$/, async () => {
	await calculatedResultPage.resultPageText2();
});

Then(/^I verify the amount saved till now$/, async () => {
	await calculatedResultPage.resultPageText3();
});

Then(/^I click on the Edit Info button to go back to the Home Page$/, async () => {
	await calculatedResultPage.clickEditInfoButton();

});

