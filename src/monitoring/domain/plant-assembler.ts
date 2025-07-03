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
            response.wellnessStateId,
            response.imageUrl
        );
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
            request.wellnessStateId,
            request.imageUrl || "" // Default to empty string if imageUrl is not provided
        );
    }

    // Nuevo método para crear request con FormData
    static toFormDataRequest(request: any): FormData {
        const formDataRequest = new FormData();
        formDataRequest.append("Name", request.name);
        formDataRequest.append("Type", request.type);
        formDataRequest.append("IsPlantation", String(request.isPlantation));
        formDataRequest.append("AreaCoverage", String(request.areaCoverage || 0));
        formDataRequest.append("UserId", String(request.userId));
        formDataRequest.append("WaterThreshold", String(request.waterThreshold));
        formDataRequest.append("TemperatureThreshold", String(request.temperatureThreshold));
        formDataRequest.append("LightThreshold", String(request.lightThreshold));
        formDataRequest.append("WellnessStateId", String(request.wellnessStateId));

        // Si hay una imagen, agregarla (ahora busca en 'image', no 'imageUrl')
        if (request.image && request.image instanceof File) {
            formDataRequest.append("Image", request.image);
        } else {
            // Si no hay imagen, agregar un campo vacío para evitar problemas en el backend
            formDataRequest.append("Image", "");
        }

        return formDataRequest;
    }
}