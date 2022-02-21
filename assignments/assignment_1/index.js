function getNameFromCommandLine() {
    // Write you code here, name should be taken as args in process.argv
    const name=process.argv
    return (name[name.length-1])

}

function getNameFromEnv() {
    // Write your code here
    return process.env.name;

}

function getNameFromReadLine() {
    // Write your code here
    const readline = require("readline");
    const rl = readline.createInterface({
        input:process.stdin,
        output: process.stdout
    });
    rl.question('What is your name', (name)=>{
        return name
        rl.close();
    });
    
}

module.exports = {
    getNameFromCommandLine,
    getNameFromEnv,
    getNameFromReadLine
}