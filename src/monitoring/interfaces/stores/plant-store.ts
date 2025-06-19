import {defineStore} from "pinia";
import {PlantService} from "../../infrastructure/services/plant.service.ts";
import {PlantResponse} from "../../domain/plant-response.ts";
import type {PlantRequest} from "../../domain/plant-request.ts";
import {PlantAssembler} from "../../domain/plant-assembler.ts";

const plantService = new PlantService();
const plantAssembler = new PlantAssembler();
export const usePlantStore = defineStore("plant", {
    state:() => ({
        plant: PlantResponse,
        plants: [] as PlantResponse[],
    }),
    actions: {
        async createPlant(request:PlantRequest){
            await plantService.createPlant(request).then(()=> {
                 this.getPlantsByUserId(request.userId);
            });
        },

        async getPlantsByUserId(userId: number){
            const response = await plantService.getPlantsByUserId(userId);
            return this.plants= response.data.map((plant: any) => PlantAssembler.toResponse(plant));
        },

        async editPlant(plantId: number, request: PlantRequest) {
            await plantService.updatePlant(plantId, request);
            await this.getPlantsByUserId(request.userId);
        },

        async deletePlant(plantId: number) {
            await plantService.deletePlant(plantId)
            this.plants = this.plants.filter(plant => plant.id !== plantId);
        }
    }
})
