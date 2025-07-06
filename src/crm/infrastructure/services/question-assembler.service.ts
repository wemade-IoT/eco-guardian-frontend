// src/crm/domain/services/question-assembler.service.ts
import type { Question } from '../../domain/model/question.entity';

// 🔧 DTO basado en la estructura REAL de tu API
export interface QuestionApiDTO {
  questionId: number;
  title: string;
  content: string;
  status: string; // "Resolved", "Closed", "Pending"
  createdAt: string; // ISO string "2025-06-15T13:58:38.438902",
  updatedAt: string; // ISO string "2025-06-15T14:15:02.893139"
  plantId: number;
  userId: number;
  imageUrls: string[];
}


export interface CreateQuestionFormRequest {
  title: string;
  content: string;
  plantId: number;
  userId: number;
  images?: File[];
}

export class QuestionAssemblerService {
  static toFormDataRequest(request: CreateQuestionFormRequest): FormData {

    console.log('Creating FormData from request:', request);

    const formData = new FormData();
    
    // Agregar campos básicos con nombres en PascalCase para el backend
    formData.append("Title", request.title);
    formData.append("Content", request.content);
    formData.append("UserId", request.userId.toString());
    formData.append("PlantId", request.plantId.toString());
    
    // Agregar imágenes si existen
    if (request.images && request.images.length > 0) {
      request.images.forEach((image) => {
        //ImagesUrl is a list of images file so we append each image with the same key
        if (image instanceof File) {
          formData.append(`ImageUrls`, image, image.name);
        } else {
        }
      });
    } else {
    }
    
    for (let [key, value] of formData.entries()) {
      if (value instanceof File) {
        console.log(`${key}: File(${value.name}, ${value.size} bytes, ${value.type})`);
      } else {
        console.log(`${key}: ${value}`);
      }
    }
    
    return formData;
  }

  // 🔧 FROM API RESPONSE TO DOMAIN MODEL
  static toDomainModel(dto: QuestionApiDTO): Question {
    return {
      id: dto.questionId,
      title: dto.title,
      content: dto.content,
      plant_id: dto.plantId,
      status: dto.status.toLowerCase(), // Normalizar a lowercase
      created_at: new Date(dto.createdAt),
      updated_at: dto.updatedAt ? new Date(dto.updatedAt) : undefined,
      image_urls: dto.imageUrls || [],
      user_id: dto.userId // Normalizar a string
    };
  }

  // 🔧 FROM API ARRAY TO DOMAIN ARRAY
  static toDomainModelArray(dtos: QuestionApiDTO[]): Question[] {
    if (!Array.isArray(dtos)) {
      return [];
    }
    
    return dtos.map(dto => this.toDomainModel(dto));
  }

  static toDisplayModel(question: Question) {
    return {
      ...question,
      displayTitle: `#${question.id} - ${question.title}`,
      formattedDate: question.created_at.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      hasImages: (question.image_urls?.length ?? 0) > 0,
    }; // to use in UI components
    // to use this in UI components, you can import this method and call it with a Question object
    // // Example: const displayQuestion = QuestionAssemblerService.toDisplayModel(question);
    // then in the template, you can use displayQuestion.displayTitle, displayQuestion.formattedDate, etc.
  }
}