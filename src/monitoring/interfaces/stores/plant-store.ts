import {defineStore} from "pinia";
import {PlantService} from "../../infrastructure/services/plant.service.ts";
import {PlantResponse} from "../../domain/plant-response.ts";
import {PlantAssembler} from "../../domain/plant-assembler.ts";

const plantService = new PlantService();
export const usePlantStore = defineStore("plant", {
    state:() => ({
        plant: null as PlantResponse | null,
        plants: [] as PlantResponse[],
    }),
    actions: {
        async createPlant(plantRequest:any){
            // Pasar el request directamente - el servicio maneja el mapeo
            await plantService.createPlant(plantRequest).then(()=> {
                 this.getPlantsByUserId(plantRequest.userId);
            });
        },

        async getPlantsByUserId(userId: number){
            const response = await plantService.getPlantsByUserId(userId);
            console.log("Plants fetched:", response.data);
            return this.plants= response.data.map((plant: any) => PlantAssembler.toResponse(plant));
        },

        async getPlantById(plantId: number) {
            const response = await plantService.getPlantById(plantId);
            this.plant = PlantAssembler.toResponse(response.data);
            return this.plant;
        },

        // Método optimizado para seleccionar una planta de la lista existente
        selectPlant(plant: PlantResponse) {
            this.plant = plant;
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
