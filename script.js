let buttons = document.querySelectorAll('.button');
let button;
const input = document.getElementById('input');
let memory = null;
let raddeg = 'Rad';
let result;
let errorP = document.getElementById('error');
let equalFlag = false;

input.addEventListener('keypress', (event)=>{ //для навигации, отключение возможности писать в инпуте
    event.preventDefault();
})

function removeZero() {
    if (input.value == '0') {
        input.value = '';
    }
}

function convertString() {
    result = input.value;
    result = result.replaceAll("√", "Math.sqrt").replaceAll("^", "**")
    .replaceAll("e", "Math.E").replaceAll("π", "Math.PI")
    .replace("ln", "Math.log").replace("lg", "Math.log10")
    .replaceAll("÷", "/").replaceAll("×", "*").replaceAll("sin", "Math.sin")
    .replaceAll("cos", "Math.cos").replaceAll("ctg", "1/Math.tan")
    .replaceAll("tg", "Math.tan").replaceAll("%", "/100");
    //замена при deg
    if (raddeg == 'Deg') {
        const trigonometri = ['Math.sin', 'Math.cos', 'Math.tan'];
        let posStart, posEnd;
        let strSlice, strSliceEdit;
        for (const func of trigonometri) {
            posStart = result.indexOf(func); //позиция первой цифрки в ф-ции
            if (posStart != -1) {
                posStart += 9;
                posEnd = result.indexOf(')', posStart);
                strSlice = result.slice(posStart, posEnd);
                strSliceEdit = eval(Math.PI/180*result.slice(posStart, posEnd));
                console.log(strSlice + ' Rad');
                console.log(strSliceEdit + ' Deg');
                result = result.replace(strSlice, strSliceEdit);
            }
        }
    }
}

function errorString() {
    convertString();
    try {
        errorP.innerText = eval(result);
        if (errorP.innerText == 'Infinity' || errorP.innerText == 'NaN' || errorP.innerText == 'undefined') {
            errorP.innerText = 'Ошибка';
        }
    } catch (error) {
        errorP.innerText = 'Ошибка';
    }
    return errorP.innerText;
}

buttons.forEach((button) => {
    button.addEventListener('click', (event)=>{
        
        switch (button.id) {

            case 'button-minus-pow': // 1/x
                removeZero();
                input.value += '^(-1)';
                break;

            case 'button-memory-clear': // MC
                memory = null;
                break;

            case 'button-memory-plus': // M+
                // memory += "ф-ция ="
                break;

            case 'button-memory-minus': // M-
                // memory -= "ф-ция ="
                break;

            case 'button-memory-read': // MR
                input.value = memory;
                break;

            case 'button-pow-2': // x^2
                removeZero();
                input.value += '^(2)';
                break;

            case 'button-pow-3': // x^3
                removeZero();
                input.value += '^(3)';
                break;

            case 'button-pow-y': // x^y
                removeZero();
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
                break;

            case 'button-factorial': // x!
                removeZero();
                input.value += '!';
                break;

            case 'button-sqrt': //√
                removeZero();
                input.value += '√(';
                break;

            case 'button-sqrt-y': // y√x
                removeZero();
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

            case 'button-comma':
                input.value += '.';
                break;
                
            case 'button-equal': // =
                if (errorString() != 'Ошибка') {
                    input.value = errorString();
                    equalFlag = true;
                }
                errorP.innerText = '';
                break;
                

            default:
                removeZero();
                input.value += button.textContent;
                break;
            
            //ф-ция преобразования строки

        }
        if (equalFlag) {
            equalFlag = false;
        } else {
            errorString();
        }
    })
})