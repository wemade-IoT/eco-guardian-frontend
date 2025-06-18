import {PlantResponse} from "./plant-response.ts";
import {PlantRequest} from "./plant-request.ts";

export class PlantAssembler{
    static toResponse(response:any): PlantResponse{
        return new PlantResponse(
            response.id,
            response.name,
            response.type,
            response.isPlantation,
            response.areaCoverage,
            response.userId,
            response.waterThreshold,
            response.temperatureThreshold,
            response.lightThreshold,
            new Date(response.createdAt),
            new Date(response.updatedAt),
            response.wellnessStateId
        );
    }

    static toDomainModelArray(dtos: any[]): PlantResponse[] {
        if (!Array.isArray(dtos)) {
          console.warn('Expected array but received:', typeof dtos);
          return [];
        }
        
        return dtos.map(dto => this.toResponse(dto));
      }

    static toRequest(request:any): PlantRequest{
        return new PlantRequest(
            request.name,
            request.type,
            request.isPlantation,
            request.areaCoverage,
            request.userId,
            request.waterThreshold,
            request.temperatureThreshold,
            request.lightThreshold,
            request.wellnessStateId
        );
    }
}