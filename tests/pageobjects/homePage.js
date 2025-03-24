const { $ } = require('@wdio/globals')
//const Page = require('./browserUrlPage');


class HomePage {

    get currentAge() { return $("#current-age"); }
    get retireAge() { return $("#retirement-age"); }
    get currentAnnualIncome() { return $("input#current-income"); }
    get spouseAnnualIncome() { return $("input#spouse-income"); }
    get currentRetirementSavingsBalance() { return $("#current-total-savings"); }
    get currentSaving() { return $("#current-annual-savings"); }
    get savingIncreaseRate() { return $("#savings-increase-rate"); }
    get socialSecurityBenefitsTrue() { return $("//label[@for='yes-social-benefits']"); }
    get socialSecurityBenefitsFalse() { return $("//label[@for='no-social-benefits']"); }
    get maritalStatusSingle() { return $("//label[normalize-space()='Single']"); }
    get maritalStatusMarried() { return $("//label[@for='no-social-benefits']"); }
    get socialSecurityOverrideAmount() { return $("#social-security-override"); }
    get calculateButton() { return $("button=Calculate"); }
    get clearFormButton() { return $("button=Clear Form"); }
    get defaultCalculatorValueLink() { return $("a"); }



    //function to retrive data 
    async enterValue(element, value) {
        await element.waitForDisplayed({ timeout: 10000 });
        await element.click();
        await element.clearValue();
        await element.setValue(value);
    }

    async fillRetirementForm(data) {
        console.log("Filling form with data:", data);
        await this.enterValue(this.currentAge, data.current_age);
        await this.enterValue(this.retireAge, data.retirement_age);
        await this.enterValue(this.currentAnnualIncome, data.current_income);
        await this.enterValue(this.spouseAnnualIncome, data.spouse_income);
        await this.enterValue(this.currentRetirementSavingsBalance, data.savings_balance);
        await this.enterValue(this.currentSaving, data.yearly_savings);
        await this.enterValue(this.savingIncreaseRate, data.savings_increase_rate);
        await this.enterValue(this.socialSecurityOverrideAmount, data.social_security_override);
    }

    // Maritial status radio button method called from step file       
    async maritalStatus(marital_status) {
        await browser.pause(500); // Small delay for stability
        if (marital_status.toLowerCase() === "married") {
            await this.maritalStatusMarried.waitForDisplayed();
            await this.maritalStatusMarried.click();
        } else if (marital_status.toLowerCase() === "single") {
            await this.maritalStatusSingle.waitForDisplayed();
            await this.maritalStatusSingle.click();
        } else {
            throw new Error(`Invalid option provided: ${radio_option}. Use "Married" or "Single".`);
        }
    }
    // SocialSecurity status radio button method called from step file 
    async selectSocialSecurityBenefits(option) {
        await browser.pause(500); // Small delay for stability
        if (option.toLowerCase() === "yes") {
            await this.socialSecurityBenefitsTrue.waitForDisplayed();
            await this.socialSecurityBenefitsTrue.waitForClickable();
            await this.socialSecurityBenefitsTrue.click();
        } else if (option.toLowerCase() === "no") {
            await this.socialSecurityBenefitsFalse.waitForDisplayed();
            await this.socialSecurityBenefitsFalse.waitForClickable();
            await this.socialSecurityBenefitsFalse.click();
        } else {
            throw new Error(`Invalid option provided: ${option}. Use "Yes" or "No".`);
        }
    }
    // verifying SocialSecurity status radio button selected or not methof and  called from step file 
    async isSocialSecurityBenefitsSelected(selected_Option) {
        if (selected_Option.toLowerCase() === "yes") {
            return await this.socialSecurityBenefitsTrue.isSelected();
        } else if (selected_Option.toLowerCase() === "no") {
            return await this.socialSecurityBenefitsFalse.isSelected();
        } else {
            throw new Error(`Invalid option provided: ${selected_Option}. Use "Yes" or "No".`);
        }

    }
}




module.exports = new HomePage();
