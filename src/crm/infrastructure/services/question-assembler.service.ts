// src/consulting/infrastructure/services/question-assembler.service.ts
import type { Question } from '../../domain/model/question.entity';

export interface QuestionDTO {
  id: number;
  code: string;
  question: string;
  status: string;
  // Campos opcionales que pueden no venir de la API
  title?: string;
  content?: string;
  plant_id?: string;
  user_id?: string;
  diagnostic_images?: string[];
  created_at?: string;
}

export interface CreateQuestionRequest {
  title: string;
  content: string;
  plantId: string;
  userId: string;
  images?: File[];
}

export class QuestionAssemblerService {
  
  // 🔧 Transformar desde el formulario hacia DTO para API
  static fromFormToDTO(formData: CreateQuestionRequest): any {
    return {
      // Mapear a la estructura que espera tu API
      question: formData.title.trim(), // ← Usar 'question' en lugar de 'title'
      code: formData.plantId || Math.random().toString(36).substr(2, 9),
      status: 'Pending',
      // Agregar otros campos si la API los necesita
      title: formData.title.trim(),
      content: formData.content.trim(),
      plant_id: formData.plantId,
      user_id: formData.userId,
      diagnostic_images: formData.images?.map((_, i) => `image-${i}.jpg`) || [],
      created_at: new Date().toISOString()
    };
  }

  // 🔧 Transformar múltiples DTOs
  static fromDTOArrayToDomain(dtos: QuestionDTO[]): Question[] {
    console.log("Transforming DTOs to domain model:", dtos);
    return dtos.map(dto => this.fromDTOToDomain(dto));
  }

  // 🔧 Transformar un solo DTO a dominio
  static fromDTOToDomain(dto: QuestionDTO): Question {
    console.log("🔥 Transforming DTO to domain model:", dto);

    let question: Question = {
      id: dto.id.toString(), // Convertir number a string si es necesario
      title: dto.title || dto.question || 'No title', // ← Usar 'question' field
      content: dto.content || dto.question || 'No content', // ← Usar 'question' field
      plant_id: dto.plant_id || dto.code || '', // ← Usar 'code' como fallback
      user_id: dto.user_id || 'unknown-user',
      diagnostic_images: dto.diagnostic_images || [],
      created_at: dto.created_at ? new Date(dto.created_at) : new Date(),
      status: dto.status || 'pending'
    };

    console.log("✅ Transformed question:", question);
    return question;
  }

  // 🔧 Formatear para mostrar en UI
  static formatForDisplay(question: Question) {
    return {
      ...question,
      displayTitle: `#${question.id} - ${question.title}`,
      formattedDate: question.created_at.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric'
      }),
      statusLabel: question.status
    };
  }

  
  
}