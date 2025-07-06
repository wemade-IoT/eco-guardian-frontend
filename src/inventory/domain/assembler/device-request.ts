export class DeviceRequest {
  type: string;
  voltage: number;
  plantId: number;

  constructor(
    type: string,
    voltage: number,
    plantId: number
  ) {
    this.type = type;
    this.voltage = voltage;
    this.plantId = plantId;
  }
}