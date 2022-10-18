class Calculator {
    constructor() {
        this.operationList = [];
        this.currentNumber = '';
        this.updateDisplay();
    }

    clear() {
        this.operationList = [];
        this.currentNumber = '';
        
        this.updateDisplay();
    }

    delete() {
        if (this.currentNumber === ''){
            if (this.operationList.length == 0) return;
            this.operationList.pop();
            this.currentNumber = this.operationList.pop();
        } else{
            this.currentNumber = this.currentNumber.slice(0, -1);
        }

        this.updateDisplay();
    }

    appendNumber(number) {
        if (this.currentNumber === '0' && number === '0') return;
        if (this.currentNumber.includes('.') && number === '.') return;
        this.currentNumber = `${this.currentNumber}${number}`;

        this.updateDisplay();
    }

    addOperator(operator) {
        this.operationList.push(this.currentNumber);
        this.operationList.push(operator);
        this.currentNumber = '';

        this.updateDisplay();
    }

    claculate() {

    }

    updateDisplay() {
        display.innerText = `${this.operationList.join(' ')} ${this.currentNumber}`;
    }
}
const display = document.querySelector('#display');
const calculator = new Calculator();

const numberButtons = document.querySelectorAll('.number');
numberButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.appendNumber(button.innerText);
    });
});

const operatorButtons = document.querySelectorAll('.operator');
operatorButtons.forEach(button => {
    button.addEventListener('click', () => {
        calculator.addOperator(button.innerText);
    });
});

const calcButton = document.querySelector('#calc');
calcButton.addEventListener('click', () => {
    calculator.claculate();
});

const clearButton = document.querySelector('#all-clear');
clearButton.addEventListener('click', () => {
    calculator.clear();
});

const deleteButton = document.querySelector('#delete');
deleteButton.addEventListener('click', () => {
    calculator.delete();
});

