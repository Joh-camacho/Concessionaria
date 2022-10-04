/* Máscara para o formulário */
function applyMask(input, regex) {
    setTimeout(function () {
        var newValue = regex(input.value);

        if (newValue != input.value) {
            input.value = newValue;
        }
    }, 1);
}

function regexPhone(number) {
    number = number.replace(/\D/g, "");
    number = number.replace(/^(\d{2})(\d)/g, "($1) $2"); 
    number = number.replace(/(\d)(\d{4})$/, "$1-$2");

    return number;
}

function regexCPF(cpf) {
    cpf = cpf.replace(/\D/g, "")
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2") 
    cpf = cpf.replace(/(\d{3})(\d)/, "$1.$2")
    cpf = cpf.replace(/(\d{3})(\d{1,2})$/, "$1-$2")

    return cpf
}

window.onload = function () {
    const tel = document.getElementById('inputPhone')
    const cpf = document.getElementById('inputCPF')

    tel.onkeyup = function () {
        applyMask(this, regexPhone);
    }
    cpf.onkeyup = function () {
        applyMask(this, regexCPF);
    }
}