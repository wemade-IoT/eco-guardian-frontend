import {OrderService} from "../../infrastructure/services/order.service.ts";
import {OrderAssembler} from "../../domain/order-assembler.ts";
import {defineStore} from "pinia";
import {OrderResponse} from "../../domain/order-response.ts";
import {OrderRequest} from "../../domain/order-request.ts";

const orderService = new OrderService();
const orderAssembler = new OrderAssembler();

export const useOrderStore = defineStore("order",{
    state: () => ({
        order: OrderResponse,
        orders: [] as OrderResponse[],
        // Estado para crear nueva orden
        // Se va agregando paso a paso cada valor
        newOrder: {} as OrderRequest,
    }),
    getters: {
        getSelectedInstallationDateTime: (state) => {
            if (!state.newOrder.installationDate || state.newOrder.installationDate === null) {
                return null;
            }
            return state.newOrder.installationDate;
        },
        isOrderDataComplete: (state) => {
            return state.newOrder.installationDate !== null;
        }
    },
    actions: {
        // Acciones existentes
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

        // Nuevas acciones para manejar la creación de orden
        setInstallationDate(date: Date) {
            this.newOrder.installationDate = date;
        },

        setAction(action: string) {
            this.newOrder.action = action;
        },

        clearNewOrder() {
            this.newOrder = {} as OrderRequest;
        }
    }
})