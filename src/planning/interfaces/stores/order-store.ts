import {OrderService} from "../../infrastructure/services/order.service.ts";
import {OrderAssembler} from "../../domain/order-assembler.ts";
import {defineStore} from "pinia";
import {OrderResponse} from "../../domain/order-response.ts";
import {OrderRequest} from "../../domain/order-request.ts";

const orderService = new OrderService();
const orderAssembler = new OrderAssembler();

export const useOrderStore = defineStore("plant",{
    state: () => ({
        order: OrderResponse,
        orders: [] as OrderResponse[],
    }),
    actions: {
        async createOrder(request: OrderRequest) {
            await orderService.createOrder(request).then(() => {
                this.getOrdersByUserId(request.consumerId);
            });
        },

        async getOrdersByUserId(userId: number) {
            const response = await orderService.getOrdersByUserId(userId);
            this.orders = response.data.map((order: any) => orderAssembler.toResponse(order));
        },

        async editOrder(orderId: number, request: OrderRequest) {
            await orderService.updateOrder(orderId, request);
            await this.getOrdersByUserId(request.consumerId);
        },
    }
})