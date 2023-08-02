const clearBtn = document.getElementById('clear-button');
const deleteBtn = document.getElementById('delete-button');
const divideBtn = document.getElementById('divide-button');
const multiplyBtn = document.getElementById('multiply-button');
const subtractBtn = document.getElementById('subtract-button');
const decimalBtn = document.getElementById('decimal-button');
const equalBtn = document.getElementById('equal-button');
const addBtn = document.getElementById('add-button');

const numberBtn = document.querySelectorAll('.number');

const resultElement = document.getElementById('result');


let result = '';
let operation = '';
let previousOperand = 0;

const appendNumber = (number) => {
    if (number === '.' && result.includes('.'))
        return;
    result += number;
    updateDisplay();
}

const updateDisplay = () => {
    if (operation) {
        resultElement.innerText = `${previousOperand} ${operation} ${result}`
        return;
    }
    resultElement.innerText = result;
}


const selectOperator = (opratorValue) => {
    if (result === '') {
        return;
    }

    if (operation !== '' && previousOperand !== '') {
        calculateResult();
    }

    operation = opratorValue;
    previousOperand = result;
    result = '';
    updateDisplay();
}

const calculateResult = () => {
    let evalutedResul;
    const prev = parseFloat(previousOperand);
    const current = parseFloat(result);
    if (isNaN(prev) || isNaN(current)) {
        return;
    }

    switch (operation) {
        case '+':
            evalutedResul = prev + current;
            break;
        case '-':
            evalutedResul = prev - current;
            break;
        case '*':
            evalutedResul = prev * current;
            break;
        case '/':
            evalutedResul = prev / current;
            break;
        default:
            return;
    }

    result = evalutedResul.toString();
    operation = '';
    previousOperand = '';

}



numberBtn.forEach(button => {
    button.addEventListener('click', () => {
        appendNumber(button.innerText);
    })
});

decimalBtn.addEventListener('click', () => {
    appendNumber('.');
});
addBtn.addEventListener('click', () => { selectOperator('+'); });
multiplyBtn.addEventListener('click', () => { selectOperator('*'); });
subtractBtn.addEventListener('click', () => { selectOperator('-'); });
divideBtn.addEventListener('click', () => { selectOperator('/'); });

equalBtn.addEventListener('click', () => {
    if (result === '') {
        return;
    }
    calculateResult();
    updateDisplay();
});

const clearDisplay = () => {
    result = '';
    previousOperand = '';
    operation = '';
    updateDisplay();
};

clearBtn.addEventListener('click', () => { clearDisplay(); });


const deleteLastDigit = () => {
    if (result === '' && previousOperand==='' && operation ==='') {
        return;
    }

    if(result ==='' && previousOperand!=null && operation!=null){
        operation='';
        result = previousOperand;
        previousOperand = '';
    }else{
        result = result.slice(0, -1);
    }
    updateDisplay();
}

deleteBtn.addEventListener('click', () => { deleteLastDigit(); });


