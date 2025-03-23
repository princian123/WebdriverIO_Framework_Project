Feature: Retirement Planning Calculator
  This feature calculates the retirement amount of a person using the Planning Calculator.

  Scenario Outline: Calculating Retirement Amount - Happy Path
    Given I open URL and log in on the Securian Calculator Home Page
    When I enter current age as "<current_age>"
    And I enter retirement age as "<retirement_age>"
    And I enter current annual income as "<current_income>"
    And I enter spouse's annual income as "<spouse_income>"
    And I enter current retirement savings balance as "<savings_balance>"
    And I enter currently saving each year for retirement as "<yearly_savings>"
    And I enter rate of increase in your savings each year as "<savings_increase_rate>"

    When I click on the calculate button

    Then I verify the Retirement Amount Results page is loaded
    And I verify the Minimum Amount needed for retirement
    And I verify the amount saved till now
    And I click on the Edit Info button to go back to the Home Page


  #used excel file from to get data 
#  Ex#amples:
#   | current_age | retirement_age | current_income | spouse_income | savings_balance | yearly_savings | savings_increase_rate |
#   | 40          | 68             | 100000         | 75000         | 500000          | 10%            | .25%                  |