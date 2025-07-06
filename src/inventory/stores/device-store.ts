import { DeviceAssembler } from "../domain/assembler/device-assembler";
import type { DeviceRequest } from "../domain/assembler/device-request";
import type { DeviceResponse } from "../domain/assembler/device-response";
import type { DeviceUpdateRequest } from "../domain/assembler/device-update-request";
import { DeviceService } from "../infrastructure/services/device.service";
import { defineStore } from "pinia";

const deviceService = new DeviceService();
const deviceAssembler = new DeviceAssembler();
export const useDeviceStore = defineStore("device", {
  state: () => ({
    devices: [] as DeviceResponse[],
    selectedDevice: {} as any | null,
  }),

  getters: {
    getSelectedDeviceId: (state) => {
      return state.selectedDevice?.id || null;
    },
  },

  actions: {
    async createDevice(deviceRequest: DeviceRequest) {
      try {
        const response = await deviceService.createDevice(deviceRequest);
        console.log("Device created successfully:", response);
        return response.data;
      } catch (error) {
        console.error("Error creating device:", error);
        throw error;
      }
    },

    async getDevicesByPlantId(plantId: number) {
      try {
        const response = await deviceService.getDevicesByPlantId(plantId);
        this.devices = response.data.map(deviceAssembler.toResponse);
        console.log("Devices fetched successfully:", this.devices);
        //We select the first device if available
        if (this.devices.length > 0) {
            this.selectedDevice = this.devices[length - 1];
            }
        return this.devices;
      } catch (error) {
        console.error("Error fetching devices:", error);
        throw error;
      }
    },

    // no se va a usar creo para eliminarlo luego NEKODEMIERDA
    selectDevice(device: any) {
      console.log("Device selected:", device);
      this.selectedDevice = device;
    },

    async updateDevice(deviceId: number, deviceRequest: DeviceUpdateRequest) {
        try {
            const updateRequest = deviceAssembler.toUpdateRequest(deviceRequest);
            await deviceService.updateDevice(deviceId, updateRequest);
            console.log("Device updated successfully:");
        } catch (error) {
            console.error("Error updating device:", error);
            throw error;
        }
    },

    clearSelectedDevice() {
      this.selectedDevice = null;
    }
  },
});
