// src/crm/interfaces/stores/question-store.ts
import { defineStore } from 'pinia';
import { ref, computed } from 'vue';
import type { Question } from '../../domain/model/question.entity';
import { CrmService } from '../../infrastructure/services/crm.service';
import type { CreateQuestionFormRequest } from '../../infrastructure/services/question-assembler.service';

export const useQuestionStore = defineStore('question', () => {
  // State
  const questions = ref<Question[]>([]);
  const selectedQuestion = ref<Question | null>(null);
  const isLoading = ref(false);
  const error = ref<string | null>(null);

  // Services
  const crmService = new CrmService();

  // Getters
  const questionCount = computed(() => questions.value.length);
  const hasQuestions = computed(() => questions.value.length > 0);
  const questionsByStatus = computed(() => {
    return questions.value.reduce((acc, question) => {
      const status = question.status.toLowerCase();
      if (!acc[status]) acc[status] = [];
      acc[status].push(question);
      return acc;
    }, {} as Record<string, Question[]>);
  });

  // Actions
  const loadQuestions = async () => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await crmService.getConsulting();
      questions.value = Array.isArray(response) ? response : [];
      console.log('Question store: Questions loaded successfully', questions.value.length);
    } catch (err: any) {
      error.value = err.message || 'Failed to load questions';
      console.error('Question store: Error loading questions', err);
      questions.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  const loadQuestionsByPlantId = async (plantId: number) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await crmService.getQuestionsByPlantId(plantId);
      questions.value = Array.isArray(response) ? response : [];
      console.log(`Question store: Questions loaded for plant ${plantId}`, questions.value.length);
    } catch (err: any) {
      error.value = err.message || 'Failed to load questions for plant';
      console.error('Question store: Error loading questions by plant ID', err);
      questions.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  const loadQuestionsByUserId = async (userId: number) => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const response = await crmService.getQuestionsByUserId(userId);
      questions.value = Array.isArray(response) ? response : [];
      console.log(`Question store: Questions loaded for user ${userId}`, questions.value.length);
    } catch (err: any) {
      error.value = err.message || 'Failed to load questions for user';
      console.error('Question store: Error loading questions by user ID', err);
      questions.value = [];
    } finally {
      isLoading.value = false;
    }
  };

  const createQuestion = async (questionData: CreateQuestionFormRequest): Promise<boolean> => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const result = await crmService.postQuestion(questionData);
      
      if (result.success && result.data) {
        // Add the new question to the store
        questions.value.unshift(result.data);
        console.log('Question Store: Question created successfully', result.data);
        return true;
      } else {
        error.value = result.details?.message || 'Failed to create question';
        console.error('Question Store: Error creating question', result.details);
        return false;
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to create question';
      console.error(' Question Store: Error creating question', err);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const selectQuestion = (question: Question) => {
    selectedQuestion.value = question;
    console.log('Question store: Question selected', question.id);
  };

  const clearSelectedQuestion = () => {
    selectedQuestion.value = null;
  };

  const postAnswer = async (answer: any, questionId: number): Promise<boolean> => {
    isLoading.value = true;
    error.value = null;
    
    try {
      const result = await crmService.postAnswer(answer, questionId);
      
      if (result.success) {
        // Optionally reload questions to get updated state
        await loadQuestions();
        console.log('Question store: Answer posted successfully');
        return true;
      } else {
        error.value = result.details?.message || 'Failed to post answer';
        console.error('Question store: Error posting answer', result.details);
        return false;
      }
    } catch (err: any) {
      error.value = err.message || 'Failed to post answer';
      console.error('Question store: Error posting answer', err);
      return false;
    } finally {
      isLoading.value = false;
    }
  };

  const getAnswersByQuestionId = async (questionId: number) => {
    try {
      const answers = await crmService.getAnswersByQuestionId(questionId);
      console.log(`Question store: Answers loaded for question ${questionId}`);
      return answers;
    } catch (err: any) {
      console.error('Question store: Error loading answers', err);
      return null;
    }
  };

  const clearError = () => {
    error.value = null;
  };

  const refreshQuestions = async () => {
    await loadQuestions();
  };

  return {
    // State
    questions,
    selectedQuestion,
    isLoading,
    error,
    
    // Getters
    questionCount,
    hasQuestions,
    questionsByStatus,
    
    // Actions
    loadQuestions,
    loadQuestionsByPlantId,
    loadQuestionsByUserId,
    createQuestion,
    selectQuestion,
    clearSelectedQuestion,
    postAnswer,
    getAnswersByQuestionId,
    clearError,
    refreshQuestions,
  };
});
