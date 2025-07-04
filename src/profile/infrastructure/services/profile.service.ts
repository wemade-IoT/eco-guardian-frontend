import {HttpService} from "../../../shared/services/http-common.ts";
export class ProfileService extends HttpService{

    async createProfile(request: any){
        console.log('Original request:', request);
        return await this.http.post("/profiles", request);

    }

    async updateProfile(id: number, request: any) {
        console.log('Form request:', request);
        return await this.http.put(`/profiles/${id}`, request,
            {
                headers: {
                    'Content-Type': 'multipart/form-data' //El http service sobre escribe asi q mejor usarlo asi
                }
            });
    }

    async getProfileByEmail(email: string) {
        return await this.http.get(`/profiles/${email}`);
    }
}