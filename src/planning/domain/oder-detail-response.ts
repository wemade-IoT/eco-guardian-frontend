export class OderDetailResponse{
    orderId: number;
    deviceId: number;
    quantity: number;
    unitPrice: number;
    description: string;
    area: number;

    constructor(
        orderId: number,
        deviceId: number,
        quantity: number,
        unitPrice: number,
        description: string,
        area: number
    ) {
        this.orderId = orderId;
        this.deviceId = deviceId;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.description = description;
        this.area = area;
    }
}