//data
// this data can be retrieved or provided by the user
let semiAnnual = 6;
let annual = 12;
let pensionRate = 7;
let inflationRate = 16.06;
let monthly = 1;

let incomeTaxRanges = [
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
//data 

const displayNumbers = (num) => {
    num = num.toFixed(2);
    return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

/*
functions
pensionCalculator(salary, pensionRate) // monthly
pensionCalculator(salary, pensionRate, semiAnnual) // semi-annual = 6
pensionCalculator(salary, pensionRate, annual) // annual = 12
let monthlyTax = progressiveTaxCalculator(salary,incomeTaxRanges); // the gross salary is to be passed
let netIncome = salary - monthlyTax - monthlyPension;
let retirementIncome = calculateRetirementIncome(yearsToRetirement, salary, salaryIncrementAmount, salaryIncrementRate, pensionRate);
*/

const pensionCalculator = (salary, pensionRate, duration = monthly) => {

    // if the provided rate is in percentage, it converts it to decimal
    if (pensionRate < 0)
        return invalidInput;

    if (pensionRate > 1)
        pensionRate = pensionRate / 100;

    if (!isNaN(salary))
        return salary * pensionRate * duration;
    else
        return invalidInput;
};

const calculateRetirementIncome = (yearsToRetirement, salary, salaryIncrementAmount, salaryIncrementRate, pensionRate) => {
    // if the provided rate is in percentage, it converts it to decimal
    if (pensionRate < 0)
        return invalidInput;

    if (pensionRate > 1)
        pensionRate = pensionRate / 100;

    let retirementIncome = 0;
    let userSalaryForecast = [salary];

    // increment calculated via rate
    if (salaryIncrementAmount === -1 && salaryIncrementRate != -1) {

        if (salaryIncrementRate <= 0)
            return invalidInput;

        // do another check to add increment percentage of more than 1
        if (salaryIncrementRate > 1)
            salaryIncrementRate = salaryIncrementRate / 100;

        for (let i = 1; i < yearsToRetirement; i++)
            userSalaryForecast[i] = userSalaryForecast[i - 1] * salaryIncrementRate;
    }

    if (salaryIncrementRate === -1 && salaryIncrementAmount != -1) {
        if (salaryIncrementRate < 0)
            return invalidInput;

        for (let i = 1; i < yearsToRetirement; i++)
            userSalaryForecast[i] = userSalaryForecast[i - 1] + salaryIncrementAmount;

    }

    if (salaryIncrementAmount === -1 && salaryIncrementRate === -1) {
        for (let i = 1; i < yearsToRetirement; i++)
            userSalaryForecast[i] = userSalaryForecast[i - 1];
    }

    for (let i = 0; i < yearsToRetirement; i++) {
        retirementIncome += pensionCalculator(userSalaryForecast[i], pensionRate, 12);
    }

    return retirementIncome;
};

const calculateRetirementIncomeWorth = (retirementIncome, inflationRate, yearsToRetirement) => {

    if (inflationRate < 0)
        return invalidInput;

    if (inflationRate > 1)
        inflationRate = inflationRate / 100;

    //if positive inflation use a different calculation
    let incomeWorth = retirementIncome / (Math.pow(1 + inflationRate, yearsToRetirement));
    return incomeWorth;
};

const progressiveTaxCalculator = (salary, incomeTaxRange = incomeTaxRanges) => {
    // using deductibles 
    for (let i = 0; i < incomeTaxRange.length; i++) {
        if (salary >= incomeTaxRange[i].minRange && salary <= incomeTaxRange[i].maxRange)
            return (salary * incomeTaxRange[i].taxRate) - incomeTaxRange[i].deductibles;
    }
};

const calculateDesiredRetirementSavings = (desiredRetirementIncome, retirementIncome) => {
    if (desiredRetirementIncome <= retirementIncome)
        return true;
    else
        return desiredRetirementIncome - retirementIncome;
};


const requiredAnnualSavings = (amountDifference, yearsToRetirement) => {
    return amountDifference / yearsToRetirement;
};

const requiredMonthlySavings = (amountDifference, yearsToRetirement) => {
    return requiredAnnualSavings(amountDifference, yearsToRetirement) / 12;
}

//module export
module.exports.displayNumbers = displayNumbers;
module.exports.pensionCalculator = pensionCalculator;
module.exports.calculateRetirementIncome = calculateRetirementIncome;
module.exports.calculateRetirementIncomeWorth = calculateRetirementIncomeWorth ;
module.exports.progressiveTaxCalculator = progressiveTaxCalculator;