export class PlantResponse{
    id:number;
    name:string;
    type:string;
    isPlantation:boolean;
    areaCoverage:number;
    userId:number;
    waterThreshold:number;
    temperatureThreshold:number;
    lightThreshold:number;
    createdAt:Date;
    updatedAt:Date;
    wellnessStateId:number;

    constructor(
        id:number,
        name:string,
        type:string,
        isPlantation:boolean,
        areaCoverage:number,
        userId:number,
        waterThreshold:number,
        temperatureThreshold:number,
        ligthThreshold:number,
        createdAt:Date,
        updatedAt:Date,
        wellnessStateId:number
    ){
        this.id = id;
        this.name = name;
        this.type = type;
        this.isPlantation = isPlantation;
        this.areaCoverage = areaCoverage;
        this.userId = userId;
        this.waterThreshold = waterThreshold;
        this.temperatureThreshold = temperatureThreshold;
        this.lightThreshold = ligthThreshold;
        this.createdAt = createdAt;
        this.updatedAt = updatedAt;
        this.wellnessStateId =wellnessStateId;
    }

}