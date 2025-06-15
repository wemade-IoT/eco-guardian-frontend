import {HttpService} from "../../../shared/services/http-common.ts";

export class PlantService extends HttpService{
    async getPlantsByUserId(userId:number) : Promise<any>{
        console.log(this.http.defaults.headers);
        return await this.http.get(`plant?userId=${userId}`);
    }

    async createPlant(request: any) : Promise<boolean>{
        try {
            const response = await this.http.post("plant", request);
            return response.status === 201;
        } catch (error) {
            return false;
        }
    }

    async updatePlant(id:number, request: any) : Promise<boolean>{
        try {
            const response = await this.http.put(`plant/${id}`, request);
            return response.status === 200;
        } catch (error) {
            return false;
        }
    }

    async deletePlant(id:number) : Promise<boolean>{
        try {
            const response = await this.http.delete(`plant/${id}`);
            return response.status === 200;
        } catch (error) {
            return false;
        }
    }


}