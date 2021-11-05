import api from './api.js';

async function HandleCepAPI(cep) {
    try {
        console.log('salvando informações de endereço...');
        api.get(`https://viacep.com.br/ws/${cep}/json/`)
            .then(response => {
                console.log(response.data);
                localStorage.setItem('logradouro', response.data.logradouro);
                localStorage.setItem('cidade', response.data.localidade);
                localStorage.setItem('uf', response.data.uf);
            })
    } catch (error) {
        console.log(error);
    }
}

export default HandleCepAPI;