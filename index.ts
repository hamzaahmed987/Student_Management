
//#! /usr/bin/env node

import inquirer from "inquirer";
import chalk from "chalk";

console.log(chalk.bold.underline("\n\tStudent Managment System\n"));

const randomNumber = Math.floor(10000 + Math.random() * 9000);
let myBlance: number = 0;

let answer = await inquirer.prompt([
  {
    name: "students",
    type: "input",
    message: chalk.yellow("Enter student name:"),
    validate: function (emptyError) {
      if (emptyError.trim() !== "") {
        return true;
      }
      return "Please enter a name.";
    },
  },
  {
    name: "courses",
    type: "list",
    message: chalk.yellow("Select the course to enrolled."),
    choices:[
      "Practical Deep Learning",
      "Blockchain",
      "Generative AI",
      "TypeScript Essential Training",
      "Machine Learning Engineering",
    ],
  },
]);

const coursesFee: { [key: string]: number } = {
  "Practical Deep Learning": 10000,
  "Blockchain": 4500,
  "Generative AI": 5000,
  "TypeScript Essential Training": 5000,
  "Machine Learning Engineering": 1000,
};
console.log(chalk.bold(`\n\t Coures fees: ${coursesFee[answer.courses]}`));
console.log(chalk.bold(`\t Balance: ${myBlance}\n`));

let paymentType = await inquirer.prompt([
  {
    name: "payment",
    type: "list",
    message: chalk.yellow("Please select payment method:"),
    choices:["Bank transfer", "PayPal", "Easypaisa", "jazzcash"],
  },
  {
    name: "amount",
    type: "input",
    message: chalk.bold("Money transfer."),
    validate: function (emptyMoney) {
      if (emptyMoney.trim() !== "") {
        return true;
      }
      return "Please enter a value.";
    },
  },
]);
console.log(chalk.bgGray.bold(`\n\tPayment method: ${paymentType.payment}.`));

const courseFeess = coursesFee[answer.courses];
const paymentAmount = parseFloat(paymentType.amount);

if (courseFeess === paymentAmount) {
  console.log(chalk.bgGray.bold(`\n\tCongratulation you have succesfully enrolled in: ${answer.courses}\n`));

  let ans = await inquirer.prompt([
    {
      name: "select",
      type: "list",
      message: chalk.yellow("What would you like to do next?"),
      choices: ["View Satus", "Exit"],
    },
  ]);
  if (ans.select === "View Satus") {
    console.log(chalk.bgBlack.bold.blue("\n\t Status"));
    console.log(`\n 1: Student name: ${answer.students} \n 2: Student ID: ${randomNumber} \n 3: Course: ${answer.courses} \n 4: Course fees: ${paymentAmount} \n 5: Balance: ${myBlance =+ paymentAmount}`);
  }
  else{
    setTimeout(() => {
      console.log(chalk.red.bold("\n\tExiting Student Managment System..."));
    }, 3000);
  }
} 
else {
  setTimeout(() => {
    console.log(chalk.bgBlack.red.bold(`\nI appreciate your interest! The course fee is: ${coursesFee[answer.courses]}\n`));
  }, 2000);
}