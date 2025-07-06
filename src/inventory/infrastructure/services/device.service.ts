import { HttpService } from "../../../shared/services/http-common";
import type { DeviceUpdateRequest } from "../../domain/assembler/device-update-request";

export class DeviceService extends HttpService {
    async getDevicesByPlantId(plantId: number): Promise<any> {
        try {
            return await this.http.get(`/devices?plantId=${plantId}`);
        } catch (error) {
            throw error;
        }
    }

    async createDevice(deviceRequest: any): Promise<any> {
        try {
            return await this.http.post('/devices', deviceRequest);
        } catch (error) {
            throw error;
        }
    }

    async updateDevice(deviceId: number, updateRequest: DeviceUpdateRequest): Promise<void> {
        try {
            await this.http.put(`/devices/${deviceId}`, updateRequest);
        } catch (error) {
            throw error;
        }
    }
}