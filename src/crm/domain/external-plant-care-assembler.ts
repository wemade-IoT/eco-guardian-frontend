import { ExternalPlantCareResponse } from "./external-plant-care-response";

export class ExternalPlantCareAssembler {
    static toResponse(response: any): ExternalPlantCareResponse {
        return new ExternalPlantCareResponse(response);
    }
}