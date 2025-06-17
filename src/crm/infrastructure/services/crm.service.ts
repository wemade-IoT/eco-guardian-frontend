
import { HttpService } from "../../../shared/services/http-common";
import { QuestionAssemblerService } from "./question-assembler.service";

export class CrmService extends HttpService {
  private baseUrl: string = "";
  
  constructor() {
    super(); // ← Inicializa HttpService (con token interceptor incluido)
    console.log("🔥 CrmService initialized with HttpService base");
  }
  public async postQuestion(question: any): Promise<any> {
    console.log("ConsultingService: About to POST to /question");
    console.log("Base URL:", this.baseUrl);
    console.log("Question data:", question);
    const questionRequest = QuestionAssemblerService.toApiRequest(question);
    console.log("Transformed question request:", questionRequest);
    
    try {
      const response = await this.http.post('/question', questionRequest);
      console.log("Success! Response from consulting service:", response.data);

      const transformedQuestion = QuestionAssemblerService.toDomainModel(response.data);

      return {
        success: true,

        data: transformedQuestion
      };
    } catch (error: any) {
      console.error("Error creating question in service:", error);
      
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
      console.log("Fetching crm data from /question");
      console.log("Base URL:", this.baseUrl);
      console.log("Base URL que deberia ser:", import.meta.env.VITE_API_URL);
      // Realizar la solicitud GET a la API
      const response = await this.http.get(`/question`);

      // Usar el assembler para transformar los datos en objeto Question
      const questions = QuestionAssemblerService.toDomainModelArray(response.data);
      console.log("Transformed questions:", questions);
      return questions;
    } catch (error) {
      console.error("Error fetching crm:", error);
      throw error;
    }
  }
}
