export function EmailValidator(input) {
    let resp = false;

    if (input !== '' && input !== null && input !== undefined) {
        let email = input.trim();

        let usuario = email.substring(0, email.indexOf("@"));
        let dominio = email.substring(email.indexOf("@") + 1, email.length);

        if ((usuario.length >= 1) &&
            (dominio.length >= 3) &&
            (usuario.search("@") === -1) &&
            (dominio.search("@") === -1) &&
            (usuario.search(" ") === -1) &&
            (dominio.search(" ") === -1) &&
            (dominio.search(".") !== -1) &&
            (dominio.indexOf(".") >= 1) &&
            (dominio.lastIndexOf(".") < dominio.length - 1)) {
            resp = true;
        }
    }

    return resp;
}

export function PasswordValidator(input) {
    let resp = false;

    if (input !== '' && input !== null && input !== undefined) {
        resp = input.length > 5 ? true : false;
    }

    return resp;
}

export function PasswordConfirmationValidator(input) {
    let resp = false;

    if (input !== '' && input !== null && input !== undefined) {

        if (PasswordValidator(input.password)) {
            resp = input.confirmation === input.password ? true : false;
        }
    }

    return resp;
}

export function NameValidator(input) {

    let resp = false;

    if (input !== '' && input !== null && input !== undefined) {
        resp = input.length >= 3 ? true : false;
    }

    return resp;

}

export function SizeValidator(input) {

    let resp = false;

    if (input !== '' && input !== null && input !== undefined) {
        resp = input.length > 1 ? true : false;
    }

    return resp;

}

export function CepValidator(input) {

    let resp = false;

    if (input !== '' && input !== null && input !== undefined) {

        // var strCEP = input;
        // var objER = /^[0-9]{2}.[0-9]{3}-[0-9]{3}$/;

        // if (strCEP.length > 0) {
        //     if (objER.test(strCEP))
        //         resp = true;
        // }

        resp = input.length === 8 ? true : false;

    }

    return resp;

}

export function CpfValidator(input) {

    let resp = false;

    if (input !== '' && input !== null && input !== undefined) {

        let Soma = 0;
        let Resto = 0;

        if (input === "00000000000")
            return false;

        for (let i = 1; i <= 9; i++) {
            Soma = Soma + parseInt(input.substring(i - 1, i)) * (11 - i);
        }

        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11))
            Resto = 0;

        if (Resto !== parseInt(input.substring(9, 10)))
            return false;

        Soma = 0;

        for (let i = 1; i <= 10; i++) {
            Soma = Soma + parseInt(input.substring(i - 1, i)) * (12 - i);
        }

        Resto = (Soma * 10) % 11;

        if ((Resto === 10) || (Resto === 11))
            Resto = 0;

        if (Resto !== parseInt(input.substring(10, 11)))
            return false;

        return true;

    }

    return resp;

}

export function CnpjValidator(input) {

    if (input !== '' && input !== null && input !== undefined) {
        return true;
        // let cnpj = input.replace(/[^\d]+/g, '');

        // if (cnpj === '') return false;

        // if (cnpj.length !== 14)
        //     return false;

        // // Elimina CNPJs invalidos conhecidos
        // if (cnpj === "00000000000000" ||
        //     cnpj === "11111111111111" ||
        //     cnpj === "22222222222222" ||
        //     cnpj === "33333333333333" ||
        //     cnpj === "44444444444444" ||
        //     cnpj === "55555555555555" ||
        //     cnpj === "66666666666666" ||
        //     cnpj === "77777777777777" ||
        //     cnpj === "88888888888888" ||
        //     cnpj === "99999999999999")
        //     return false;

        // // Valida DVs
        // let tamanho = cnpj.length - 2
        // let numeros = cnpj.substring(0, tamanho);
        // let digitos = cnpj.substring(tamanho);
        // let soma = 0;
        // let pos = tamanho - 7;
        // for (let i = tamanho; i >= 1; i--) {
        //     soma += numeros.charAt(tamanho - i) * pos--;
        //     if (pos < 2)
        //         pos = 9;
        // }
        // let resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        // if (resultado !== digitos.charAt(0))
        //     return false;

        // tamanho = tamanho + 1;
        // numeros = cnpj.substring(0, tamanho);
        // soma = 0;
        // pos = tamanho - 7;
        // for (let i = tamanho; i >= 1; i--) {
        //     soma += numeros.charAt(tamanho - i) * pos--;
        //     if (pos < 2)
        //         pos = 9;
        // }
        // resultado = soma % 11 < 2 ? 0 : 11 - soma % 11;
        // if (resultado !== digitos.charAt(1))
        //     return false;

        // return true;

    }

    return false;

}

export function PhoneValidator(input) {

    let resp = false;

    if (input !== '' && input !== null && input !== undefined) {

        let expression = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

        if (expression.test(input)) {
            resp = true;
        }

    }

    return resp;
}

export function DateValidator(input) {

    let resp = false;

    if (input !== '' && input !== null && input !== undefined) {

        let currentYear = new Date().getFullYear();
        let year = new Date(input).getFullYear();

        resp = currentYear > year ? true : false;

    }

    return resp;

}

export function HouseNumberValidator(input) {
    let resp = false;

    if (input !== '' && input !== null && input !== undefined) {

        resp = input.length > 0 ? true : false;

    }

    return resp;
}

export function InstagramAccountValidator(input) {
    let resp = false;

    if (input !== '' && input !== null && input !== undefined) {
        
            resp = input.length > 1 ? true : false;

    }

    console.log('entrada: ' + input)
    console.log('resp: ' + resp)

    return resp;
}