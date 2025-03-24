const { AfterStep } = require('@wdio/cucumber-framework');
const CommonPage = require('../tests/pageobjects/common');

AfterStep(async (step) => {
    const stepName = step.pickle.name.replace(/ /g, "_"); // Convert spaces to underscores
    await CommonPage.captureScreenshot(stepName);
});