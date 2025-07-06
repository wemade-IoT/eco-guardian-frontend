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
    imageUrl:string;

    constructor(
        name:string,
        type:string,
        isPlantation:boolean,
        areaCoverage:number,
        userId:number,
        waterThreshold:number,
        temperatureThreshold:number,
        lightThreshold:number,
        wellnessStateId:number,
        imageUrl:string
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
        this.imageUrl = imageUrl;
    }
}