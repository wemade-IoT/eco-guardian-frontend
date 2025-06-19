import { HttpService } from "../../../shared/services/http-common";
import { PlantAssembler } from "../../domain/plant-assembler";

export class MonitoringService extends HttpService {
  private baseUrl: string = "";

  constructor() {
    super(); // ← Inicializa HttpService (con token interceptor incluido)
    console.log("🔥 CrmService initialized with HttpService base" + this.baseUrl);
  }


  public async getPlants(): Promise<any> {
    try {
      const response = await this.http.get(`/plant`);
      return response.data;
    } catch (error) {
      console.error("Error fetching analytics:", error);
      throw error;
    }
  }
  public async getPlantByUserId(plantId: number): Promise<any> {
    try {
      const response = await this.http.get(`/plant?userId=${plantId}`);
      const plants = PlantAssembler.toDomainModelArray(response.data);
            console.log("Response from getPlantByUserId:", plants);

      return plants;
    } catch (error) {
      console.error("Error fetching plant by ID:", error);
      throw error;
    }
  }

}
