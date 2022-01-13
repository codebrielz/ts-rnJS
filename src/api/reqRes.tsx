import axios from "axios";

export const reqResApi = axios.create({
    //base a la que voy hacer la peticion
    baseURL: 'https://reqres.in/api'
});