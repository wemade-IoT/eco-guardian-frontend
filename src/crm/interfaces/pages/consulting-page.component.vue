<template>
    <div class="consulting-page">
        <!-- Page title -->
        <div class="page-header">
            <h2 v-if="isEnterprise">Ask Questions About Your Plantations</h2>
            <h2 v-else>Ask Questions About Your Plants</h2>
            <p class="page-description">
                Get expert help with your plant questions and track their status.
            </p>
        </div>

        <!-- Main content area -->
        <div class="main-content">            
            <!-- Question creation form -->
            <div class="creation-section">
                <QuestionCreationDialogueComponent 
                    @question-created="handleQuestionCreated"
                />
            </div>    
            <!-- Questions list -->
            <div class="questions-section">
                <QuestionList
                    :questions="userQuestions"
                    :title="questionsTitle"
                    @questionClick="handleQuestionClick"
                />
            </div>       
        </div>
    </div>
</template>

<script setup lang="ts">
// Add your script logic here
import { ref } from 'vue';
import { useAuthStore } from '../../../iam/interfaces/store/auth-store';
import QuestionCreationDialogueComponent from '../components/question-creation-dialogue.component.vue';
import QuestionList from '../components/question-list.component.vue';
import type { Question } from '../../../crm/domain/model/question.entity';
import { CrmService } from '../../infrastructure/services/crm.service';
const authStore = useAuthStore();
const consultingService = new CrmService();
// Sample question data using the proper Question interface
let userQuestions = ref<Question[]>([]);
let isEnterprise = false;
isEnterprise = authStore.user.role === 'ENTERPRISE';

console.log('Consulting-page: User role is', authStore.user.role, isEnterprise);

// Initialize sample data with proper Question structure
import { onMounted } from 'vue';

onMounted(async () => {
    const response = await consultingService.getConsulting();
    console.log('Consulting-page: Response from consulting service', response);
    userQuestions.value = response;
});

// Funciones para manejar eventos de las questions
const handleQuestionCreated = (newQuestion: Question) => {
    console.log('Consulting-page: New question created', newQuestion);
    userQuestions.value.push(newQuestion);
};

const handleQuestionClick = (question: Question) => {
    console.log('Consulting-page: Question clicked from list', question.id, question.title);
    console.log('Question details:', question);
};

// Computed properties for UI text
const questionsTitle = ref(isEnterprise ? 'Plantation Questions' : 'Your Plant Questions');

</script>

<style scoped>
.consulting-page {
    background-color: transparent;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 24px;
    padding: 20px;
}

/* Page header */
.page-header {
    text-align: start;
    margin-bottom: 8px;
}

.page-header h2 {
    font-weight: 700;
    color: #1f2937;
}

.page-description {
    font-size: 1rem;
    color: #6b7280;
    margin: 0;
}

/* Main content layout */
.main-content {
    display: flex;
    flex-direction: row;
    gap: 24px;
    flex: 1;
    min-height: 0;
}

.creation-section {
    flex: 0 0 400px;
    min-width: 350px;
}

.questions-section {
    flex: 1;
    min-width: 0;
    overflow: hidden;
}

/* Responsive design */
@media (max-width: 1024px) {
    .main-content {
        flex-direction: column;
    }
    
    .creation-section {
        flex: 0 0 auto;
        min-width: unset;
    }
    
    .questions-section {
        flex: 1;
        min-height: 400px;
    }
}

@media (max-width: 768px) {
    .consulting-page {
        padding: 16px;
        gap: 20px;
    }
    
    .page-header h1 {
        font-size: 1.75rem;
    }
    
    .main-content {
        gap: 20px;
    }
}

@media (max-width: 640px) {
    .consulting-page {
        padding: 12px;
        gap: 16px;
    }
    
    .page-header h1 {
        font-size: 1.5rem;
    }
    
    .page-description {
        font-size: 0.9rem;
    }
    
    .main-content {
        gap: 16px;
    }
}
</style>