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
    get socialSecurityBenefitsTrue() { return $("#yes-social-benefits"); }
    get socialSecurityBenefitsFalse() { return $("#no-social-benefits"); }
    get maritalStatusSingle() { return $("#single"); }
    get maritalStatusMarried() { return $("#married"); }
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
        await this.enterValue(this.currentAge, data.current_age);
        await this.enterValue(this.retireAge, data.retirement_age);
        await this.enterValue(this.currentAnnualIncome, data.current_income);
        await this.enterValue(this.spouseAnnualIncome, data.spouse_income); 
        await this.enterValue(this.currentRetirementSavingsBalance, data.savings_balance);
        await this.enterValue(this.currentSaving, data.yearly_savings);
        await this.enterValue(this.savingIncreaseRate, data.savings_increase_rate);

        // Handle marital status
        if (data.marital_status === "single") {
            await this.maritalStatusSingle.waitForDisplayed();
            await this.maritalStatusSingle.click();
        } else if (data.marital_status === "married") {
            await this.maritalStatusMarried.waitForDisplayed();
            await this.maritalStatusMarried.click();
        }

        // Handle Social Security Benefits
        if (data.social_security_benefits === "yes") {
            await this.socialSecurityBenefitsTrue.waitForDisplayed();
            await this.socialSecurityBenefitsTrue.click();
        } else if (data.social_security_benefits === "no") {
            await this.socialSecurityBenefitsFalse.waitForDisplayed();
            await this.socialSecurityBenefitsFalse.click();
        }

        // Enter Social Security Override Amount (if provided)
        if (data.social_security_override !== undefined && data.social_security_override !== "") {
            await this.enterValue(this.socialSecurityOverrideAmount, data.social_security_override);
        }
    }
}

module.exports = new HomePage();
