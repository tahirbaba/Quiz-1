#! usr/bin/env
import chalk from "chalk";
import inquirer from "inquirer";

const apiLink:string = 
"https://opentdb.com/api.php?amount=06&category=18&difficulty=easy&type=multiple";

let fetchData = async (data:string) => {
    let fetchQuiz:any = await fetch(data)
    let response = await fetchQuiz.json()
    return response.results;
}

let data = await fetchData(apiLink);
// console.log(data.results);
let starQuiz = async () => {
    let score:number = 0
    // for user name
    let name = await inquirer.prompt({
        type: "input",
        name: "fname",
        message:"What is your Name?"
    })

for(let i = 1 ; i <= 5 ; i++){
    let answers = [...data[i]. incorrect_answers, data[i].correct_answer]

    let ans = await inquirer.prompt({
        type:"list",
        name:"quiz",
        message:data[i].question,
        choices: answers.map((val:any)=>val),
    });

    if (ans.quiz == data[i].correct_answer) {
        ++score
        console.log(chalk.bold.italic.blue("Correct"));
    } else {
        console.log(`Correct answer is ${chalk.bold.italic.green(data[i].correct_answer)}`)
    }
}

console.log(`Dear ${chalk.blue.bold(name.fname)},your score is ${chalk.green.bold(score)} out of ${chalk.red.bold('5')}`);
};

starQuiz();
