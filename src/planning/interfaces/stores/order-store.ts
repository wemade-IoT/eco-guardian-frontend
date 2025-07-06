import { OrderService } from "../../infrastructure/services/order.service.ts";
import { OrderAssembler } from "../../domain/order-assembler.ts";
import { defineStore } from "pinia";
import { OrderResponse } from "../../domain/order-response.ts";
import { OrderRequest } from "../../domain/order-request.ts";
import type { OrderUpdateRequest } from "../../domain/order-update-request.ts";
import type { NewOrder } from "../../../public/utils/interfaces/order.ts";

const orderService = new OrderService();
const orderAssembler = new OrderAssembler();

export const useOrderStore = defineStore("order", {
  state: () => ({
    order: OrderResponse,
    orders: [] as OrderResponse[],
    // Estado para crear nueva orden
    // Se va agregando paso a paso cada valor -> oke
    newOrder: {} as NewOrder,
  }),
  getters: {
    getSelectedInstallationDateTime: (state) => {
      if (
        !state.newOrder.installationDate ||
        state.newOrder.installationDate === null
      ) {
        return null;
      }
      return state.newOrder.installationDate;
    },
    isOrderDataComplete: (state) => {
      return state.newOrder.installationDate !== null;
    },
  },
  actions: {
    async createOrder(request: OrderRequest): Promise<any> {
      try {
        const response = await orderService.createOrder(request);
        console.log("Order created successfully:", response);
        return response.data;
      } catch (error) {
        console.error("Error creating order:", error);
        throw error;
      }
    },

    async getOrdersByUserId(userId: number) {
      try {
        const response = await orderService.getOrdersByUserId(userId);
        return response.data.map(orderAssembler.toResponse);
      } catch (error) {
        console.error("Error fetching orders:", error);
        throw error;
      }
    },

    async editOrder(orderId: number, request: OrderUpdateRequest) {
      try {
        const updateRequest = orderAssembler.toUpdateRequest(request);
        await orderService.updateOrder(orderId, updateRequest);
        console.log("Order updated successfully:");
      } catch (error) {
        console.error("Error updating order:", error);
        throw error;
      }
    },

    async getAllOrders() {
      try {
        const response = await orderService.getAllOrders();
        this.orders = response.data.map(orderAssembler.toResponse);
        return this.orders;
      } catch (error) {
        console.error("Error fetching all orders:", error);
        throw error;
      }
    },

    // Nuevas acciones para manejar la creación de orden
    setInstallationDate(date: Date) {
      this.newOrder.installationDate = date;
    },

    setAction(action: string) {
      this.newOrder.action = action;
    },

    clearNewOrder() {
      this.newOrder = {} as NewOrder;
    },

    setNewOrder(request: NewOrder) {
      this.newOrder = request;
    }
  },
});
