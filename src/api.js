import axios from "axios";

// const api = axios.create({
//     baseURL: "http://54.172.224.141:8080",
// })

const api = axios.create({
    baseURL: "http://localhost:8080",
})

export const apiImage = axios.create({
    baseURL: "https://api.imgur.com/3"
})

export default api;

