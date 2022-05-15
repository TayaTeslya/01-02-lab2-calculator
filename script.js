let buttons = document.querySelectorAll('.button');
let button;
const input = document.getElementById('input');
let memory = 0;
const memoryP = document.getElementById('memory');
let raddeg = 'Rad';
let result;
let errorP = document.getElementById('error');
let equalFlag = false;

input.addEventListener('keypress', (event)=>{ //отключение возможности писать в инпуте
    event.preventDefault();
})

function removeZero() {
    if (input.value == '0') {
        input.value = '';
    }
}

function convertString() {
    result = input.value;
    let lengthRes = result.length - 1;
    for (let i = 0; i < lengthRes - 1; i++) {
        if (result[i + 1] == '(' && (result[i] == 'e' || result[i] == 'π' || /[0-9]/.test(result[i]))) {
            result = result.slice(0, i + 1) + '×' + result.slice(i + 1, lengthRes + 1);
            lengthRes = result.length - 1;
        }
        if (result[i + 1] == '√' && (result[i] == 'π' || /[0-9]/.test(result[i]))) {
            result = result.slice(0, i + 1) + '×' + result.slice(i + 1, lengthRes + 1);
            lengthRes = result.length - 1;
        }
        if ((result[i + 1] == 'π' || result[i + 1] == 'e') && /[0-9]/.test(result[i])) {
            result = result.slice(0, i + 1) + '×' + result.slice(i + 1);
            lengthRes = result.length - 1;
        }
        let arrFunc = ['sin', 'cos', 'tg(', 'ctg', 'ln(', 'lg('];
        if (arrFunc.includes(result.slice(i + 1, i + 4)) && (result[i] == 'e' || result[i] == 'π' || /[0-9]/.test(result[i]))) {
            result = result.slice(0, i + 1) + '×' + result.slice(i + 1, lengthRes + 1);
            lengthRes = result.length - 1;
        }
    }
    if ((result[lengthRes] == 'π' || result[lengthRes] == 'e') && /[0-9]/.test(result[lengthRes - 1])) {
        result = result.slice(0, lengthRes) + '×' + result[lengthRes];
    }
    result = result.replaceAll('√', 'Math.sqrt').replaceAll('^', '**')
    .replaceAll('e', 'Math.E').replaceAll('π', 'Math.PI')
    .replaceAll('ln', 'Math.log').replaceAll('lg', 'Math.log10')
    .replaceAll('÷', '/').replaceAll('×', '*').replaceAll('sin', 'Math.sin')
    .replaceAll('cos', 'Math.cos').replaceAll('ctg', '1/Math.tan')
    .replaceAll('tg', 'Math.tan').replaceAll('%', '/100');
    if (raddeg == 'Deg') { //замена при deg
        const trigonometri = ['Math.sin', 'Math.cos', 'Math.tan'];
        let posStart, posEnd;
        let strSlice, strSliceEdit;
        for (const func of trigonometri) {
            posStart = result.indexOf(func); //позиция первой цифрки в ф-ции
            if (posStart != -1) {
                posStart += 9;
                posEnd = result.indexOf(')', posStart);
                strSlice = result.slice(posStart, posEnd);
                strSliceEdit = eval(Math.PI/180*(eval(strSlice)));
                result = result.replace(strSlice, strSliceEdit);
                console.log(strSlice + ' ' + strSliceEdit);
            }
        }
    }
}

function errorString() {
    convertString();
    try {
        errorP.innerText = eval(result);
        if (errorP.innerText == 'Infinity' || errorP.innerText == 'NaN' || errorP.innerText == 'undefined' || errorP.innerText == '-Infinity') {
            errorP.innerText = 'Ошибка';
        }
    } catch (error) {
        errorP.innerText = 'Ошибка';
    }
    return errorP.innerText;
}

function checkRepeat() { // ИСПРАВИТЬ !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    // if () {
    //     equalFlag = true;
    // }
    let arrSymbol = ['-', '+', '.', '×', '÷'];
    let i = input.value.length - 1;
    if (arrSymbol.includes(input.value[i]) && arrSymbol.includes(input.value[i-1])) {
        if (!((input.value[i-1] == '×' || input.value[i-1] == '÷') && input.value[i] == '-')) {
            input.value = input.value.slice(0, i-1) + input.value[i];
        }
    }
}

function equalRes() {
    if (errorString() != 'Ошибка') {
        input.value = errorString();
        equalFlag = true;
    }
    errorP.innerText = '';
}

buttons.forEach((button) => {
    button.addEventListener('click', (event)=>{

        switch (button.id) {

            case 'button-minus-pow': // 1/x
                input.value += '^(-1)';
                break;

            case 'button-memory-clear': // MC
                memory = 0;
                memoryP.textContent = '';
                break;

            case 'button-memory-plus': // M+
                equalRes();
                console.log(errorP.textContent);
                if (errorP.textContent != 'Ошибка') {
                    memory += Number(input.value);
                    memoryP.textContent = 'M';
                }
                break;

            case 'button-memory-minus': // M-
                // memory -= "ф-ция ="
                equalRes();
                memory -= Number(input.value);
                memoryP.textContent = 'M';
                break;

            case 'button-memory-read': // MR
                removeZero();
                input.value += memory;
                break;

            case 'button-pow-2': // x^2
                input.value += '^(2)';
                break;

            case 'button-pow-3': // x^3
                input.value += '^(3)';
                break;

            case 'button-pow-y': // x^y
                input.value += '^(';
                break;

            case 'button-clear': // c
                input.value = '0';
                errorP.innerText = '';
                equalFlag = true;
                break;

            case 'button-backspace': // backspace
                input.value = input.value == '0' ? input.value : input.value.slice(0, -1);
                input.value = input.value == '' ? '0' : input.value;
                let arrFunc = ['c', 'o', 's', 'i', 'n', 't', 'g', 'l'];
                while(arrFunc.includes(input.value[input.value.length - 1])) {
                    input.value = input.value == '0' ? input.value : input.value.slice(0, -1);
                    input.value = input.value == '' ? '0' : input.value;
                }
                break;

            case 'button-ten-pow': // 10^x
                removeZero();
                input.value += '10^(';
                break;

            case 'button-sqrt': //√
                removeZero();
                input.value += '√(';
                break;

            case 'button-sqrt-y': // y√x
                input.value += '^(1÷';
                break;

            case 'button-ln': // ln
                removeZero();
                input.value += 'ln(';
                break;

            case 'button-lg': // lg
                removeZero();
                input.value += 'lg(';
                break;

            case 'button-sin': // sin
                removeZero();
                input.value += 'sin(';
                break;

            case 'button-cos': // cos
                removeZero();
                input.value += 'cos(';
                break;
            
            case 'button-tg': // tg
                removeZero();
                input.value += 'tg(';
                break;

            case 'button-ctg': // ctg
                removeZero();
                input.value += 'ctg(';
                break;

            case 'button-deg-rad': // deg / rad
                raddeg = raddeg == 'Deg' ? 'Rad' : 'Deg';
                document.getElementById('rad-deg').innerText = raddeg;
                button.textContent =  raddeg == 'Deg' ? 'Rad' : 'Deg';
                break;

            case 'button-comma': //.
                let i = input.value.length - 1;
                if (/[0-9]/.test(input.value[i])) {
                    for (i; i >= 0; i--) {
                        if (!/[0-9]/.test(input.value[i]) || i == 0) {
                            if (input.value[i] != '.') {
                                input.value += '.';
                            }
                            break;
                        }
                    }
                }
                    break;
                
            case 'button-equal': // =
                equalRes();
                break;
                
            default:
                removeZero();
                input.value += button.textContent;
                break;
        }
        checkRepeat();
        if (equalFlag) {
            equalFlag = false;
        } else {
            errorString();
        }
        if (input.value == '9309706') {
            errorP.innerText = 'сам такой.';
        }
        ficha();
    })
})

function ficha() {
    //sin(50)^(2)+cos(50)^(2)
    //cos(100-50)^(2)+sin(50)^(2)
    if (/sin\(.*\)\^\(2\)\+cos\(.*\)\^\(2\)/.test(input.value) || /cos\(.*\)\^\(2\)\+sin\(.*\)\^\(2\)/.test(input.value)) {
        convertString();
        if (Math.round(eval(result)) == 1) {
            errorP.innerText = 'Это не баг, это фича! (тут 1 если че)';
        }
    }
}
