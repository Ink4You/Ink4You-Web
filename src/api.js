import axios from "axios";

const api = axios.create({
    baseURL: "http://54.172.224.141:8080",
})

export default api;

