window.onload = function () {
    const board = document.getElementById('inputBoardCar')
    const cpf = document.getElementById('inputCPF')
    const tel = document.getElementById('inputPhone')

    board.onkeyup = function () {
        applyMask(this, maskBoard);
    }
    cpf.onkeyup = function () {
        applyMask(this, maskCPF);
    }
    tel.onkeyup = function () {
        applyMask(this, maskPhone);
    }

    form.addEventListener("submit", (event) => {
        event.preventDefault();
    
        checkInputs();
    });
}

/* Validação do formulário */
const form = document.getElementById("formServices");

function checkInputs() {
    validateInput("inputModelCar", "Selecione o modelo do carro.");
    validateInput("inputYearCar", "Selecione o ano do carro.");
    validateInput("inputBoardCar", "A placa do carro é obrigatório.", checkLicensePlate, "Por favor, insira uma placa de carro válida.");
    validateInput("inputDate", "Selecione a data do serviço.");
    validateInput("inputTime", "Selecione o horário do serviço.");
    validateInput("inputName", "O nome é obrigatório.");
    validateInput("inputCPF", "O CPF é obrigatório.", checkCPF, "Por favor, insira um CPF válido.");
    validateInput("inputEmail", "O e-mail é obrigatório.", checkEmail, "Por favor, insira um e-mail válido.");
    validateInput("inputPhone", "O telefone é obrigatório.", checkPhone, "Por favor, insira um telefone válido.");

    const services = document.getElementsByClassName("form-input-service");
    const servicesValue = document.querySelector('input[name="service"]:checked');

    if (servicesValue === null) {
        setErrorFor(services[0], "Selecione o serviço.");
    } else {
        setSuccessFor(services[0]);
    }

    verifySuccess()
}

function verifySuccess() {
    const formControls = form.querySelectorAll(".form-input");

    const formIsValid = [...formControls].every((formControl) => {
        return formControl.classList.contains("success");
    });

    if (formIsValid) {
        alert("O formulário está 100% válido!");

        document.location.reload();
    }
}

function validateInput(inputId, message, checker, checkerMessage) {
    const input = document.getElementById(inputId);
    const value = input.value

    if (value === "") {
        setErrorFor(input, message);
    } else if (checker != null && !checker(value)) {
        setErrorFor(input, checkerMessage);
    } else {
        setSuccessFor(input);
    }
}

function setErrorFor(input, message) {
    const formInput = input.parentElement;
    const small = formInput.querySelector("small");

    // Adiciona a mensagem de erro
    small.innerText = message;

    // Adiciona a classe de erro
    formInput.classList.add("error");
    formInput.classList.remove("success");
}

function setSuccessFor(input) {
    const formInput = input.parentElement;

    // Adicionar a classe de sucesso
    formInput.classList.add("success");
    formInput.classList.remove("error");
}

/* Checkers */
function checkEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

    return regex.test(email.toLowerCase())
}

function checkCPF(strCPF) {
    // Valida se tem apenas número, - ou .
    const isEmpty = strCPF.replace(/^[0-9.-]*$/gm, '')
    if (isEmpty != '')
        return false

    strCPF = strCPF.replace(/[^\d]+/g, '');
    if (strCPF.length !== 11) {
        return false;
    }

    //verifica se todos os numeros sao iguais
    const expIguais = /^(?!.*(\d)\1{10}).*$/;
    if (!strCPF.match(expIguais)) {
        return false;
    }

    return true;
}

function checkPhone(phone) {
    const phoneClean = phone.replace(/[^\d]+/g, '');
    phone = phone.replace(/_/g, '');

    if (!(phoneClean.length === 10 || phoneClean.length === 11)) {
        return false;
    }
    if (phoneClean[0] == 0 || phoneClean[2] == 0) {
        return false;
    }

    return true;
}

function checkLicensePlate(placa) {
    const placaClean = placa.replace(/-/g, '')
                            .replace(/ /g, '')
                            .toUpperCase();

    const regex = /^[A-Z]{3}[0-9]{1}[A-Z0-9]{1}[0-9]{2}$/;

    return regex.test(placaClean);
}

/* Máscara para o formulário */
function applyMask(input, regex) {
    setTimeout(function () {
        var newValue = regex(input.value);

        if (newValue != input.value) {
            input.value = newValue;
        }
    }, 1);
}

function maskBoard(board) {
    return board
        .replace(/^([a-zA-Z]{3})([0-9]{1}[A-Za-z0-9]{1}[0-9]{2})$/, "$1-$2")
}

function maskCPF(cpf) {
    return cpf
        .replace(/\D/g, "")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d)/, "$1.$2")
        .replace(/(\d{3})(\d{1,2})$/, "$1-$2");
}

function maskPhone(number) {
    return number
        .replace(/\D/g, "")
        .replace(/^(\d{2})(\d)/, "($1) $2")
        .replace(/(\d)(\d{4})$/, "$1-$2");
}