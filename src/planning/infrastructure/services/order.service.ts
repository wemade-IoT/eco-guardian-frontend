import {HttpService} from "../../../shared/services/http-common.ts";

export class OrderService extends HttpService{
    async getOrdersByUserId(userId: number): Promise<any> {
        return await this.http.get(`orders?consumerId=${userId}`);
    }

    //Orders is always used for plant installation...
    async createOrder(request: any): Promise<any> {
        try {
            return await this.http.post("orders", request);
        } catch (error) {
            return false;
        }
    }

    async updateOrder(id: number, request: any): Promise<any> {
        try {
            const response = await this.http.put(`orders/${id}`, request);
            return response.status === 200;
        } catch (error) {
            return false;
        }
    }

    async getAllOrders(): Promise<any> {
        try {
            return await this.http.get("orders/all");
        } catch (error) {
            console.error("Error fetching all orders:", error);
            throw error;
        }
    }
}