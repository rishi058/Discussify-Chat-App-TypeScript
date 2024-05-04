import Api from "./api_interceptor";

class UserApi extends Api {

    async getUser(){
        try {
            const response = await this.Api.get('api/users');
        
            if(response.status>=200 && response.status<300){
                return response.data;
            }
            return "";
        } catch (error){
            console.error((error as Error).message);
            return "";
        }
    }
}

export default UserApi