import {defineStore} from "pinia";
import {PlantService} from "../../infrastructure/services/plant.service.ts";
import {PlantResponse} from "../../domain/plant-response.ts";
import {PlantAssembler} from "../../domain/plant-assembler.ts";
import { useDeviceStore } from "../../../inventory/stores/device-store.ts";

//This vew should also reference the deviceService

const plantService = new PlantService();
export const usePlantStore = defineStore("plant", {
    state:() => ({
        plant: null as PlantResponse | null,
        plants: [] as PlantResponse[],
    }),
    getters:{
        getSelectedPlantId: (state) => {
            return state.plant?.id || null; // Devuelve null si no hay planta seleccionada
        }
    },

    actions: {
        async createPlant(plantRequest:any){
            // Pasar el request directamente - el servicio maneja el mapeo
            await plantService.createPlant(plantRequest).then(()=> {
                 this.getPlantsByUserId(plantRequest.userId);
            });

        },
        async getPlantsByUserId(userId: number) {
            const response = await plantService.getPlantsByUserId(userId);
            console.log("Plants fetched:", response.data);

            // Map the response to PlantResponse[]
            const plants = response.data.map((plant: any) => PlantAssembler.toResponse(plant));
            this.plants = plants;

            // Select the last plant if any exist
            if (plants.length > 0) {
            this.selectPlant(plants[plants.length - 1]);
            } else {
            this.plant = null;
            }

            return this.plants;
        },

        async getPlantById(plantId: number) {
            const response = await plantService.getPlantById(plantId);
            this.plant = PlantAssembler.toResponse(response.data);
            return this.plant;
        },

        // Método optimizado para seleccionar una planta de la lista existente
        selectPlant(plant: PlantResponse) {
            console.log("Plant selected:", plant);
            this.plant = plant;
            //Selecciona el dispositivo también si es necesario
            useDeviceStore().getDevicesByPlantId(plant.id).then(() => {
                console.log("Devices loaded for selected plant:", useDeviceStore().selectedDevice);
            });
        },

        // Método para obtener datos frescos solo cuando sea necesario
        async refreshPlantData(plantId: number) {
            const response = await plantService.getPlantById(plantId);
            this.plant = PlantAssembler.toResponse(response.data);
            return this.plant;
        },

        async editPlant(plantId: number, plantRequest: any) {
            const request =PlantAssembler.toRequest(plantRequest);
            await plantService.updatePlant(plantId, request);
            await this.getPlantsByUserId(request.userId);
        },

        async deletePlant(plantId: number) {
            await plantService.deletePlant(plantId)
            this.plants = this.plants.filter(plant => plant.id !== plantId);
            
            // Si la planta eliminada era la seleccionada, limpiar la selección
            if (this.plant?.id === plantId) {
                this.plant = null;
            }
        }
    }
})
