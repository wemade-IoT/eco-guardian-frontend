import { DeviceRequest } from './device-request';
import { DeviceResponse } from './device-response';
import { DeviceUpdateRequest } from './device-update-request';

export class DeviceAssembler {
  toResponse(deviceRequest: any): DeviceResponse {
    return new DeviceResponse(
      deviceRequest.id,
      deviceRequest.type,
      deviceRequest.voltage,
      deviceRequest.deviceStateId,
      deviceRequest.plantId,
      deviceRequest.activatedAt,
      deviceRequest.deactivatedAt
    );
  }

  toRequest(deviceResponse: any): DeviceRequest {
    return new DeviceRequest(
      deviceResponse.type,
      deviceResponse.voltage,
      deviceResponse.plantId
    );
  }

  toUpdateRequest(deviceResponse: any): DeviceUpdateRequest {
    return new DeviceUpdateRequest(
      deviceResponse.type,
      deviceResponse.voltage,
      deviceResponse.deviceStateId,
      deviceResponse.plantId
    );
  }
}