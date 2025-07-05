export class OrderDetailRequest{
    deviceId: number; //This needs to be Assigned once the device is selected by the specialist
    quantity: number; //Always 1, since the Device is a single unit
    unitPrice: number; //Same price
    description: string; //Any info about the Device or the process
    area: number; //In case its Plantation, this is the area in square meters

    

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
