let buttons = document.querySelectorAll('.button');
let button;
const input = document.getElementById('input');
let memory = null;
let raddeg = 'Deg';

// for (const i in buttons) {
//     button = document.getElementById(`${buttons[i].id}`);
//     console.dir(button);
//     buttons
// }

function removeZero() {
    if (input.value == '0') {
        input.value = '';
    }
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
                break;

            case 'button-backspace': // backspace
                
                input.value = input.value == '0' ? input.value : input.value.slice(0, -1);
                input.value = input.value == '' ? '0' : input.value;
                break;

            case 'button-factorial': // x!
                removeZero();
                input.value += '!';
                break;

            case 'button-sqrt-y': // y√x
                removeZero();
                input.value += '^(1÷';
                break;

            case 'button-ln': // ln
                removeZero();
                input.value += 'ln(';
                break;

            case 'button-log': // log
                removeZero();
                input.value += 'log(';
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
                button.textContent = raddeg == 'Rad' ? 'Deg' : 'Rad';
                raddeg = raddeg == 'Rad' ? 'Deg' : 'Rad';
                document.getElementById('rad-deg').innerText = raddeg == 'Rad' ? 'Deg' : 'Rad';
                break;
                
            case 'button-equal': // =

                break;

            default:
                removeZero();
                input.value += button.textContent;
                break;

            //ф-ция преобразования строки

        }
    })
})