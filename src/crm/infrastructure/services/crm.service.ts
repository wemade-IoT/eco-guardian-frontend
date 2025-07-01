
import { HttpService } from "../../../shared/services/http-common";
import { QuestionAssemblerService } from "./question-assembler.service";

export class CrmService extends HttpService {

  public async postQuestion(question: any): Promise<any> {
   
    const questionRequest = QuestionAssemblerService.toApiRequest(question);
    console.log("Transformed question request:", questionRequest);
    
    try {
      const response = await this.http.post('questions', questionRequest);
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
      // Realizar la solicitud GET a la API
      const response = await this.http.get(`questions`);

      // Usar el assembler para transformar los datos en objeto Question
      const questions = QuestionAssemblerService.toDomainModelArray(response.data);
      console.log("Transformed questions:", questions);
      return questions;
    } catch (error) {
      console.error("Error fetching crm:", error);
      throw error;
    }
  }

  public async getAnswersByQuestionId(questionId: number): Promise<any> {
   try {
    const answer = await this.http.get(`questions/${questionId}/answers`);
    console.log("Response from getAnswersByQuestionId:", answer.data);

    return answer.data[0];
   }
    catch (error) {
        console.error("Error fetching answers by question ID:", error);
        throw error;
      }
  };


  public async postAnswer(answer: any, questionId: number): Promise<any> {
   
    const postAnswer = answer;
    console.log("Transformed question request:", postAnswer);
    
    try {
      const response = await this.http.post(`questions/${questionId}/answers`, postAnswer);
      console.log("Success! Response from consulting service:", response.data);
      return {
        success: true,

        data: response.data
      };
    } catch (error: any) {
      console.error("Error answering in service:", error);
      
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
}
