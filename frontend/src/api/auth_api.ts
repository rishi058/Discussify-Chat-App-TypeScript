import Api from "./api_interceptor";
import SignupData from "../interfaces/SignupData";

class AuthApi extends Api {

    async login(email : string, password : string){
        try{
            const response = await this.Api.post('api/auth/login', {
                email : email,
                password : password
            });

            if(response.status>=200 && response.status<300){
                return response.data;
            }
            
        } catch (error) {
            console.error((error as Error).message);
        }
    }

    async signup({username, email, password, confirmPassword, gender } : SignupData){
        try {
            const response = await this.Api.post('api/auth/signup', {
                username : username,
                email : email,
                password : password,
                confirmPassword : confirmPassword,
                gender : gender
            });

            if(response.status>=200 && response.status<300){
                return response.data;
            }

        } catch (error) {
            console.error((error as Error).message);
        }
    }

    async logout(){
        try {
            this.Api.post('api/auth/logout'); // this sets the max-age of jwt-key to 0.
            return true;
        } catch (error) {
            console.error((error as Error).message);
        }
    } 

}

export default AuthApi;