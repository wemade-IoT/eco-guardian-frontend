import {OrderResponse} from "./order-response.ts";
import {OrderRequest} from "./order-request.ts";

export class OrderAssembler{
    toResponse(response: any): OrderResponse{
        return new OrderResponse(
            response.id,
            response.action,
            new Date(response.createdAt),
            new Date(response.completedAt),
            response.stateId,
            response.consumerId,
            response.specialistId,
            new Date(response.installationDate),
            response.details.map((detail: any) => ({OrderDetailResponse: detail}))
        );
    }
    toRequest(request: any): OrderRequest{
        return new OrderRequest(
            request.action,
            request.consumerId,
            new Date(request.installationDate),
            request.details.map((detail: any) => ({OrderDetailRequest: detail}))
        );
    }
}