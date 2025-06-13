import type { AxiosInstance } from "axios";
import axios from "axios";
import { QuestionAssemblerService } from "./question-assembler.service";

export class CrmService {
  private baseUrl: string = "";
  private http!: AxiosInstance;

  constructor() {
    //inicializar assembler 
    this.baseUrl = import.meta.env.VITE_API_URL;
    this.http = axios.create({
      baseURL: this.baseUrl,
    });
  }
  public async postQuestion(question: any): Promise<any> {
    console.log("ConsultingService: About to POST to /queries");
    console.log("Base URL:", this.baseUrl);
    console.log("Question data:", question);
    
    try {
      // 🔧 CAMBIO: Solo usar '/queries' porque baseURL ya está configurado
      const response = await this.http.post('/queries', question);
      console.log("Success! Response from consulting service:", response.data);
      return {
        success: true,
        data: response.data
      };
    } catch (error: any) {
      console.error("Error creating question in service:", error);
      
      // 🔧 CAMBIO: Más detalle del error pero no throw - controlar completamente
      if (error.response) {
        console.error("Response error:", error.response.status, error.response.data);
      } else if (error.request) {
        console.error("Request error:", error.request);
      } else {
        console.error("Unknown error:", error.message);
      }
      
      return {
        success: false,
        error: true,
        details: {
          message: error.message || 'Unknown error',
          status: error.response?.status || 0,
          data: error.response?.data || null
        }
      };
    }
  }

  public async getConsulting(): Promise<any> {
    try {
      const response = await this.http.get(`${this.baseUrl}/queries`);
      console.log("Response from crm service:", response.data);
      return response.data;
    } catch (error) {
      console.error("Error fetching crm:", error);
      throw error;
    }
  }
}
