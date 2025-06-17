// src/crm/domain/services/question-assembler.service.ts
import { useAuthStore } from '../../../iam/interfaces/store/auth-store';
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

// 🔧 Request para crear pregunta
export interface CreateQuestionRequest {
  title: string;
  content: string;
  plantId: number;
  userId: number;
  imageUrls?: string[];
}

export class QuestionAssemblerService {
  
  // 🔧 FROM FORM TO API REQUEST
  static toApiRequest(formData: {
    title: string;
    content: string;
    plantId: number;
    userId: number;
    images?: File[];
  }): CreateQuestionRequest {
    return {
      title: formData.title,
      content: formData.content,
      plantId:formData.plantId,
      userId: useAuthStore().id, // Obtener el ID del usuario desde el store
      // Convertir imágenes a URLs simuladas (o manejar subida real)
      imageUrls: formData.images?.map((_, i) => `image-${i}.jpg`) || []
    };
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
      console.warn('Expected array but received:', typeof dtos);
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