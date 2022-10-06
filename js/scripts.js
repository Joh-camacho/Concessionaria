/* Validação do formulário */

const form = document.getElementById("formServices");

form.addEventListener("submit", (event) => {
    event.preventDefault();

    checkInputs();
});

function checkInputs() {
    // Inputs
    const modelCar = document.getElementById("inputModelCar");
    const yearCar = document.getElementById("inputYearCar");
    const licensePlateCar = document.getElementById("inputBoardCar");

    const services = document.getElementsByClassName("form-input-service");

    const date = document.getElementById("inputDate");
    const time = document.getElementById("inputTime");

    const name = document.getElementById("inputName");
    const cpf = document.getElementById("inputCPF");
    const email = document.getElementById("inputEmail");
    const phone = document.getElementById("inputPhone");

    // Values
    const modelCarValue = modelCar.value;
    const yearCarValue = yearCar.value;
    const licensePlateCarValue = licensePlateCar.value;

    const servicesValue = document.querySelector('input[name="service"]:checked');

    const dateValue = date.value;
    const timeValue = time.value;

    const nameValue = name.value;
    const cpfValue = cpf.value;
    const emailValue = email.value;
    const phoneValue = phone.value;

    if (modelCarValue === "") {
        setErrorFor(modelCar, "Selecione o modelo do carro.");
    } else {
        setSuccessFor(modelCar);
    }

    if (yearCarValue === "") {
        setErrorFor(yearCar, "Selecione o ano do carro.");
    } else {
        setSuccessFor(yearCar);
    }

    if (licensePlateCarValue === "") {
        setErrorFor(licensePlateCar, "A placa do carro é obrigatório.");
    } else if (!checkLicensePlate(licensePlateCarValue)) {
        setErrorFor(licensePlateCar, "Por favor, insira uma placa de carro válida.");
    } else {
        setSuccessFor(licensePlateCar);
    }

    if (servicesValue === null) {
        setErrorFor(services[0], "Selecione o serviço.");
    } else {
        setSuccessFor(services[0]);
    }

    if (dateValue === "") {
        setErrorFor(date, "Selecione a data do serviço.");
    } else {
        setSuccessFor(date);
    }

    if (timeValue === "") {
        setErrorFor(time, "Selecione o horário do serviço.");
    } else {
        setSuccessFor(time);
    }

    if (nameValue === "") {
        setErrorFor(name, "O nome é obrigatório.");
    } else {
        setSuccessFor(name);
    }

    if (cpfValue === "") {
        setErrorFor(cpf, "O CPF é obrigatório.");
    } else if (!checkCPF(cpfValue)) {
        setErrorFor(cpf, "Por favor, insira um CPF válido.");
    } else {
        setSuccessFor(cpf);
    }

    if (emailValue === "") {
        setErrorFor(email, "O e-mail é obrigatório.");
    } else if (!checkEmail(emailValue)) {
        setErrorFor(email, "Por favor, insira um e-mail válido.");
    } else {
        setSuccessFor(email);
    }

    if (phoneValue === "") {
        setErrorFor(phone, "O telefone é obrigatório.");
    } else if (!checkPhone(phoneValue)) {
        setErrorFor(phone, "Por favor, insira um telefone válido.");
    } else {
        setSuccessFor(phone);
    }

    const formControls = form.querySelectorAll(".form-input");

    const formIsValid = [...formControls].every((formControl) => {
        return formControl.classList.contains("success");
    });

    if (formIsValid) {
        alert("O formulário está 100% válido!");
    }

    console.log(formIsValid);
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
}