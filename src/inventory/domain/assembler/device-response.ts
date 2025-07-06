export class DeviceResponse {
  id: number;
  type: string;
  voltage: number;
  deviceStateId: number | null;
  plantId: number;
  activatedAt: string | null;
  deactivatedAt: string | null;

  constructor(
    id: number,
    type: string,
    voltage: number,
    deviceStateId: number | null,
    plantId: number,
    activatedAt: string | null,
    deactivatedAt: string | null
  ) {
    this.id = id;
    this.type = type;
    this.voltage = voltage;
    this.deviceStateId = deviceStateId;
    this.plantId = plantId;
    this.activatedAt = activatedAt;
    this.deactivatedAt = deactivatedAt;
  }
}