import {HttpService} from "../../../shared/services/http-common.ts";

export class OrderService extends HttpService{
    async getOrdersByUserId(userId: number): Promise<any> {
        return await this.http.get(`order?userId=${userId}`);
    }

    async createOrder(request: any): Promise<boolean> {
        try {
            const response = await this.http.post("order", request);
            return response.status === 201;
        } catch (error) {
            return false;
        }
    }

    async updateOrder(id: number, request: any): Promise<boolean> {
        try {
            const response = await this.http.put(`order/${id}`, request);
            return response.status === 200;
        } catch (error) {
            return false;
        }
    }
}