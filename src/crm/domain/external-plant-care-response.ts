
//Not needed really but its kept for reference
export interface PlantCareSection {
    id: number;
    type: 'watering' | 'sunlight' | 'pruning';
    description: string;
}



export interface PlantCareGuide {
    id: number;
    species_id: number;
    common_name: string;
    scientific_name: string[];
    section: PlantCareSection[];
}

//We only want the Data array from the response so that we may allow the specialist to select the plant care guide that best suits the plant in question
export class ExternalPlantCareResponse {
    data: PlantCareGuide[];

    constructor(response: any) {
        this.data = response.data.map((item: any) => ({
            id: item.id,
            species_id: item.species_id,
            common_name: item.common_name,
            scientific_name: item.scientific_name,
            section: item.section.map((section: any) => ({
                id: section.id,
                type: section.type,
                description: section.description
            }))
        }));
    }

}