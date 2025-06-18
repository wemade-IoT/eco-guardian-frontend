import {OderDetailResponse} from "./oder-detail-response.ts";
import {OrderDetailRequest} from "./order-detail-request.ts";

export class OrderDetailAssembler {
    toResponse(response:any): OderDetailResponse{
        return new OderDetailResponse(
            response.orderId,
            response.deviceId,
            response.quantity,
            response.unitPrice,
            response.description,
            response.area
        );
    }

    toRequest(request:any): OrderDetailRequest{
        return new OrderDetailRequest(
            request.deviceId,
            request.quantity,
            request.unitPrice,
            request.description,
            request.area
        );
    }
}