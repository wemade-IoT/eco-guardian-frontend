export class PlantRequest{
    name:string;
    type:string;
    isPlantation:boolean;
    areaCoverage:number;
    userId:number;
    waterThreshold:number;
    temperatureThreshold:number;
    lightThreshold:number;
    wellnessStateId:number;

    constructor(
        name:string,
        type:string,
        isPlantation:boolean,
        areaCoverage:number,
        userId:number,
        waterThreshold:number,
        temperatureThreshold:number,
        lightThreshold:number,
        wellnessStateId:number
    ){
        this.name = name;
        this.type = type;
        this.isPlantation = isPlantation;
        this.areaCoverage = areaCoverage;
        this.userId = userId;
        this.waterThreshold = waterThreshold;
        this.temperatureThreshold = temperatureThreshold;
        this.lightThreshold = lightThreshold;
        this.wellnessStateId = wellnessStateId;
    }
}