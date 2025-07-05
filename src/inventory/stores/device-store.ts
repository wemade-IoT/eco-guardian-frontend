import { DeviceService } from "../infrastructure/services/device.service";
import {defineStore} from "pinia";

const deviceService = new DeviceService(); 
export const useDeviceStore = defineStore("device", {
    state: () => ({
        devices: [] as any[],
        selectedDevice: {} as any | null,
    }),
    
    getters: {
        getSelectedDeviceId: (state) => {
            return state.selectedDevice?.id || null; // Returns null if no device is selected
        }
    },

    actions: {
        async createDevice(deviceRequest: any) {
            await deviceService.createDevice(deviceRequest);
        },

        async getDevicesByPlantId(plantId: number) {
            const response = await deviceService.getDevicesByPlantId(plantId);
            this.devices = response.data.map((device: any) => ({
                id: device.id,
                type: device.type,
                voltage: device.voltage,
                plantId: device.plantId,
                createdAt: device.createdAt,
                updatedAt: device.updatedAt,
                activatedAt: device.activatedAt
            }));
            if (this.devices.length > 0) {
                this.selectDevice(this.devices[0]);
            } else {
                this.selectedDevice = null;
            }
            return this.devices;
        },

        selectDevice(device: any) {
            console.log("Device selected:", device);
            this.selectedDevice = device;
        },

        async updateDevice( deviceId: number, deviceRequest: any) {
            await deviceService.updateDevice(deviceId, deviceRequest);
            // Optionally refresh the list of devices after update
            await this.getDevicesByPlantId(deviceRequest.plantId);
        }

    }
});