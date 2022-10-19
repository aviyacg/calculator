class Calculator {
    constructor() {
        this.operationList = []; // a list of operands and operators
        this.currentNumber = ''; // the last operand

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
        if (this.currentNumber === '') return;
        this.operationList.push(this.currentNumber);
        this.operationList.push(operator);
        this.currentNumber = '';

        this.updateDisplay();
    }

    claculate() {
        if (this.operationList.length < 2 || this.currentNumber == '') return;

        // add currenNumber to the list
        this.operationList.push(this.currentNumber);
        this.currentNumber = '';
        // handle all multiply and division first
        let index = this.operationList.findIndex(item => item == "\u00D7" || item == "\u00F7");
        while (index != -1){
            if (this.operationList[index] === "\u00D7"){
                this.operationList[index-1] = parseFloat(this.operationList[index-1]) * parseFloat(this.operationList[index+1]);
            } else{
                this.operationList[index-1] = parseFloat(this.operationList[index-1]) / parseFloat(this.operationList[index+1]);
            }
            this.operationList.splice(index, 2);
            index = this.operationList.findIndex(item => item == "\u00D7" || item == "\u00F7");
        }

        index = this.operationList.findIndex(item => item == '+' || item == '-');
        while (index != -1){
            if (this.operationList[index] === '+'){
                this.operationList[index-1] = parseFloat(this.operationList[index-1]) + parseFloat(this.operationList[index+1]);
            } else{
                this.operationList[index-1] = parseFloat(this.operationList[index-1]) - parseFloat(this.operationList[index+1]);
            }
            this.operationList.splice(index, 2);
            index = this.operationList.findIndex(item => item == '+' || item == '-');
        }

        this.currentNumber = this.operationList.pop().toString();
        this.updateDisplay();
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

