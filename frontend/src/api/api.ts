import axios, { AxiosInstance } from "axios";

export default class Api{
    Api : AxiosInstance;
    baseURL = "http://localhost:3000";

    constructor(){
        this.Api = axios.create({
            baseURL : this.baseURL,
        });
    }
}