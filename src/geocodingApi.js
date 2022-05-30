import api from './api.js';

async function GeocodingApi(cep) {

    try {
        console.log('Obtendo informações de coordenadas...');
        const response = await api.get(`https://maps.googleapis.com/maps/api/geocode/json?address=${cep}&key=AIzaSyClZmxpcaXtnc_EQwnEtJ7Rx3Tqx2Nz1Dw`)
        
        if (response.data.status === "ZERO_RESULTS") {
            throw console.error("Erro ao buscar coordenadas");
        }

        const data = response.data.results[0].geometry.location;
        localStorage.setItem('latitude', data.lat);
        localStorage.setItem('longitude', data.lng);


    } catch (error) {
        console.log(error);
    }
}

export default GeocodingApi;