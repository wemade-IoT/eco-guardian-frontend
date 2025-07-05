import { HttpService } from "../../../shared/services/http-common";

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

    async updateDevice(deviceId: number, request: any): Promise<void> {
        try {
            await this.http.put(`/devices/${deviceId}`, request);
        } catch (error) {
            throw error;
        }
    }
}