export class OrderDetailRequest{
    deviceId: number;
    quantity: number;
    unitPrice: number;
    description: string;
    area: number;

    constructor(
        deviceId: number,
        quantity: number,
        unitPrice: number,
        description: string,
        area: number
    ) {
        this.deviceId = deviceId;
        this.quantity = quantity;
        this.unitPrice = unitPrice;
        this.description = description;
        this.area = area;
    }
}