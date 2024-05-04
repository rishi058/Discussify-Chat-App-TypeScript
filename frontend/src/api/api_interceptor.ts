import axios, { AxiosInstance } from "axios";
import toast from "react-hot-toast";

export default class Api{
    Api : AxiosInstance;
    baseURL = "http://localhost:3000";

    constructor(){
        this.Api = axios.create({
            baseURL : this.baseURL,
            withCredentials : true    // this is needed to sent the cookie to the server.
        });
        
        this.setupResponseInterceptors();
    }

    private setupResponseInterceptors() {
        this.Api.interceptors.response.use((response) => {
            return response;
        }, (error) => {
            if (error.response && error.response.data && error.response.data.error) {  // if i received a error message in my response.
                toast.error(error.response.data.error);
                console.error(error.response.data.error);
            } else {
                toast.error(`Server Error: ${error.message}`);
            }
            console.error('Server Error:', error.message);
            return Promise.reject(error);
        });
    }
}