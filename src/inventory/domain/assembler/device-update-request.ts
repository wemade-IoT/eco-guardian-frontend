export class DeviceUpdateRequest {
  type: string;
  voltage: number;
  deviceStateId: number;
  plantId: number;

  constructor(
    type: string,
    voltage: number,
    deviceStateId: number,
    plantId: number
  ) {
    this.type = type;
    this.voltage = voltage;
    this.deviceStateId = deviceStateId;
    this.plantId = plantId;
  }
}