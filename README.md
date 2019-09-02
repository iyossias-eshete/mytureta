# mytureta
mytureta is a library that has different function to do basic salary computations. These functionalities includes things like monthly, semi-annual, and annual pension calculators. It also has a total retirement pension calculator that computes the pension by taking in factors such as age, retirement age, salary increment amount and percentages as well as inflation to give a realistic picture of what the employee is to expect when he/she retires.

Installation

mytureta can be cloned from git or installed by using npm. To install using npm, go to the project directory you would like to have mytureta in and use the following command:

npm install mytureta

Usage

Once installed, mytureta can be imported to an existing project by requiring or importing it. To do so, use the following js code before accesing the mytureta functionalities:

const mytureta = require('mytureta');

Then, the functions can be accessed from the imported mytureta variable like so:
mytureta.pensionCalculator = (salary, pensionRate, duration = monthly)

Functions

pensionCalculator (salary, pensionRate, duration )
This function is a basic pension calculator that takes in the salary, pensionRate, and duration ( in number of month) from the user and returns the pension for the specified duration. PensionRate can be provided as a percentage number, e.g 7 would mean 7%, or as a decimal, e.g 0.07 is the same as 7%. Both are valid rates. This function returns the pension for the specified parameters or an error message if something wrong happens.

calculateRetirementIncome (yearsToRetirement, salary, salaryIncrementAmount, salaryIncrementRate, pensionRate) 
This function is used to calculate the pension a person would have when he/she retires. The computation takes the number of years to a persons retirement age, their salary, and their pension rate. SalaryIncrementAmount and salaryIncrementRate are to be passed as -1 if their values aren’t known. They signify the annual increment in salary for an employee. However if one is known, then the other is to be passed as -1 so that the system will do the estimation with whichever isn’t given as -1. Again the same rule applies as that of pensionRate for the salaryIncrementRate if that it can be passed as a whole number signifying percentage or as a fraction signifying a multiplier. This function returns the estimated pension a person would get when he/she retires for the specified parameters or an error message if something wrong happens.

calculateRetirementIncomeWorth(retirementIncome, inflationRate, yearsToRetirement)
This function takes the inflation rate and the estimated retirement income to do a computation to see what the amount would be worth today. Inflation rate can be given like pensionRate and salaryIncrementRate. This function returns the amount that retirement income would be worth if it were today.

const progressiveTaxCalculator (salary, incomeTaxRange = incomeTaxRanges)
The use of this function is to do a simple tax calculation. This can be used along with pension to be deducted from the salary to get an estimate of the net salary an employee will get. The incomeTaxRange is supposed to be provided in the following way:
incomeTaxRanges = [
    {
        minRange: 0,
        maxRange: 600,
        taxRate: 0,
        deductibles: 0
    },
    {
        minRange: 601,
        maxRange: 1650,
        taxRate: 0.1,
        deductibles: 60
    },
    {
        minRange: 1651,
        maxRange: 3200,
        taxRate: 0.15,
        deductibles: 142.5
    },
    {
        minRange: 3201,
        maxRange: 5250,
        taxRate: 0.20,
        deductibles: 302.5
    },
    {
        minRange: 5251,
        maxRange: 7800,
        taxRate: 0.25,
        deductibles: 565
    },
    {
        minRange: 7801,
        maxRange: 10900,
        taxRate: 0.3,
        deductibles: 955
    },
    {
        minRange: 10901,
        maxRange: 100000,
        taxRate: 0.35,
        deductibles: 1500
    }
];
