const previousOperationText = document.querySelector("#previous-operation");
const currentOperationText = document.querySelector("#current-operation");
const buttons = document.querySelectorAll("#buttons-container button");

class Calculator {
    constructor(previousOperationText, currentOperationText) {
        this.previousOperationText = previousOperationText;
        this.currentOperationText = currentOperationText;
        this.currentOperation = "";
    }

    // Adiciona digito a calculator screen
    addDigit(digit) {
        // Verifica se a current operation já possiu um ponto
        if (digit === "." && this.currentOperationText.innerText.includes(".")) {
            return;
        }

        this.currentOperation += digit;
        this.updateScreen();
    }

    // Processa todas calculator operations
    processOperation(operation) {
        // Checa se a current value é vazio
        if (this.currentOperationText.innerText === "" && operation !== "C") {
            // Change operation
            if (this.previousOperationText.innerText !== "") {
                this.changeOperation(operation);
            }
            return;
        }

        // Obter o current and previous value
        let operationValue;
        const previous = +this.previousOperationText.innerText.split(" ")[0];
        const current = +this.currentOperationText.innerText;

        switch (operation) {
            case "+":
                operationValue = previous + current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "-":
                operationValue = previous - current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "/":
                operationValue = previous / current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "*":
                operationValue = previous * current;
                this.updateScreen(operationValue, operation, current, previous);
                break;
            case "DEL":
                this.processDelOperator();
                break;
            case "CE":
                this.processClearCurrentOperation();
                break;
            case "C":
                this.processClearAllOperation();
                break;
            case "=":
                this.processEqualsOperator();
                break;
            default:
                return;
        }
    }

    // Muda values of the calculator screen
    updateScreen(
        operationValue = null,
        operation = null,
        current = null,
        previous = null
    ) {
        if (operationValue === null) {
            this.currentOperationText.innerText = this.currentOperation;
        } else {
            // Checa se o value é zero, se é adiciona o current value
            if (previous === 0) {
                operationValue = current;
            }

            // Adiciona current value to previous 
            this.previousOperationText.innerText = `${operationValue} ${operation}`;
            this.currentOperationText.innerText = "";
        }
    }

    // Muda a math operation
    changeOperation(operation) {
        const mathOperations = ["*", "/", "+", "-"];

        if (!mathOperations.includes(operation)) {
            return;
        }

        this.previousOperationText.innerText =
            this.previousOperationText.innerText.slice(0, -1) + operation;
    }

    // Deleta o último digit
    processDelOperator() {
        this.currentOperation = this.currentOperation.slice(0, -1);
        this.updateScreen();
    }

    // Limpa a current operation
    processClearCurrentOperation() {
        this.currentOperationText.innerText = "";
        this.currentOperation = "";
    }

    // Limpa todas as operations
    processClearAllOperation() {
        this.currentOperationText.innerText = "";
        this.previousOperationText.innerText = "";
        this.currentOperation = "";
    }

    // Processa an operation
    processEqualsOperator() {
        const operation = previousOperationText.innerText.split(" ")[1];
        this.processOperation(operation);
    }
}

const calc = new Calculator(previousOperationText, currentOperationText);

buttons.forEach((btn) => {
    btn.addEventListener("click", (e) => {
        const value = e.target.innerText;

        if (+value >= 0 || value === ".") {
            calc.addDigit(value);
        } else {
            calc.processOperation(value);
        }
    });
});

// Adiciona um event listener para capturar eventos de teclado
document.addEventListener(`keydown`, function (event) {
    const key = event.key;

    // Verifica se a tecla pressionada é um número ou operador
    if ((+key >= 0 && +key <= 9) || key === '.') {
        calc.addDigit(key);
    } else {
        calc.processOperation(key);
    }
});