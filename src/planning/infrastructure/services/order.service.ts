import {HttpService} from "../../../shared/services/http-common.ts";

export class OrderService extends HttpService{
    async getOrdersByUserId(userId: number): Promise<any> {
        return await this.http.get(`orders?userId=${userId}`);
    }

    //Orders is always used for plant installation...
    async createOrder(request: any): Promise<boolean> {
        try {
            const response = await this.http.post("orders", request);
            return response.status === 201;
        } catch (error) {
            return false;
        }
    }

    async updateOrder(id: number, request: any): Promise<boolean> {
        try {
            const response = await this.http.put(`orders/${id}`, request);
            return response.status === 200;
        } catch (error) {
            return false;
        }
    }
}