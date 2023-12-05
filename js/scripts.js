const previousOperationText = document.querySelector("#previous-opartion");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelector("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText){
        this.previousOperationText = previousOperationText
        this.currentOperationText = currentOperationText
        this.currentOperation = ""
    }
    
    //add digit to calculator screen
    addDigit(digit) {

    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if(+value >= 0 || value === ".") {
            console.log(value)
        } else {
            console.log("Op: " + value);
        }
    });
});