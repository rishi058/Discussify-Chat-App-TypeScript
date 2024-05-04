import Api from "./api_interceptor";

class MessageApi extends Api {

    async getMessages(userToChatId : string){
        try {
            const response = await this.Api.get(`api/messages?userToChatId=${userToChatId}`);
            if(response.status>=200 && response.status<300){
                return response.data;
            }
        } catch (error) {
            console.error((error as Error).message);
        }
    }

    async sendMessage(receiverId : string, message : string){
        try {
            const response = await this.Api.post(`api/messages/send?receiverId=${receiverId}`, {
                message : message
            });

            if(response.status>=200 && response.status<300){
                return response.data;
            }

        } catch (error) {
            console.error((error as Error).message);
        }
    }

}

export default MessageApi;