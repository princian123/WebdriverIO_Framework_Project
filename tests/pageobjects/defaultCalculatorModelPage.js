const { $ } = require('@wdio/globals')
const Page = require('../pageobjects/browserUrlPage');

class defaultCalculatorModelPage extends browserUrlPage{

    get otherIncomDuringRetirement () { return $();}
    get yearsDepenRretirementIncome () { return $();}
    get postRetirementIincomeIncreaseWithInflationYes () { return $();}
    get postRetirementIincomeIncreaseWithInflationNo () { return $();}
    get expectedInflationRate () { return $();}
    get finalAnnualIncome () { return $();}
    get preRetirementInvestmentReturn  () { return $();}
    get postRetirementInvestmentReturn  () { return $();}
    get saveChangeButton () { return $();}
    get cancleeButton () { return $();}

}
module.exports = new defaultCalculatorModelPage();