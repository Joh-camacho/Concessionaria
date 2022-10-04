/* Máscara para o formulário */
function applyMask(input, regex) {
    setTimeout(function () {
        var newValue = regex(input.value);

        if (newValue != input.value) {
            input.value = newValue;
        }
    }, 1);
}

function regeBoard(board) {
    // /^[A-Z]{3}[0-9]{4}$/
    // /^[a-zA-Z]{3}[0-9][A-Za-z0-9][0-9]{2}$/

    return board.replace(/^([a-zA-Z]{3})([0-9][A-Za-z0-9][0-9]{2})$/, "$1-$2")
}

function regexCPF(cpf) {
    return cpf
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function regexPhone(number) {
    return number
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d)(\d{4})$/, "$1-$2");
}

window.onload = function () {
    const board = document.getElementById('inputBoardCar')
    const cpf = document.getElementById('inputCPF')
    const tel = document.getElementById('inputPhone')

    board.onkeyup = function () {
        applyMask(this, regeBoard);
    }
    cpf.onkeyup = function () {
        applyMask(this, regexCPF);
    }
    tel.onkeyup = function () {
        applyMask(this, regexPhone);
    }
}

// https://www.youtube.com/watch?v=3Ec9zY1C2og