<template>
    <div class="consulting-page">
        <!-- Page title -->
        <div class="page-header">
            <h2 v-if="authStore.isEnterprise">Ask Questions About Your Plantations</h2>
            <h2 v-else-if="authStore.isSpecialist">Share your knowledge! Help our users solve their questions</h2>
            <h2 v-else>Ask Questions About Your Plants</h2>
            <p class="page-description">
                Get expert help with your plant questions and track their status.
            </p>
        </div>

        <!-- Main content area -->
        <div class="main-content">            
            <!-- Question creation form -->
            <div v-if="!authStore.isSpecialist" class="creation-section">
                <QuestionCreationDialogueComponent 
                    @question-created="handleQuestionCreated"
                />
            </div>    
            <!-- Questions list -->
            <div class="questions-section">
                <QuestionList
                    :questions="userQuestions"
                    :title="questionsTitle"
                    :is-specialist="authStore.isSpecialist"
                    @questionClick="handleQuestionClick"
                    @expert-response="handleResponse"
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

// Initialize sample data with proper Question structure
import { onMounted } from 'vue';

onMounted(async () => {
    await loadQuestions();
});

const loadQuestions = async () => {
    try {
        const response = await consultingService.getConsulting();
        console.log('Consulting-page: Questions loaded successfully', response);
        userQuestions.value = response;
    } catch (error) {
        console.error('Consulting-page: Error loading questions', error);
    }
};

// Funciones para manejar eventos de las questions
const handleQuestionCreated = (newQuestion: Question) => {
    console.log('Consulting-page: New question created', newQuestion);
    userQuestions.value.push(newQuestion);
};

const handleResponse = async (id: number, answer: string) => {
    console.log('Answer for question ', id , ": ", answer);

    let postAnswer = {
        specialistId: parseInt(authStore.id),
        answerText: answer
    };

    await consultingService.postAnswer(postAnswer, id)
        .then(response => {
            console.log('Consulting-page: Expert response posted successfully', response);
        })
        .catch(error => {
            console.error('Consulting-page: Error posting expert response', error);
            
        });
    await loadQuestions(); 
};

const handleQuestionClick = (question: Question) => {
    console.log('Consulting-page: Question clicked from list', question.id, question.title);
    console.log('Question details:', question);
};

//Revisar y refactorizar esta función y logica de componentes luego, ya se sobre complico el tema...

// Computed properties for UI text
const questionsTitle = ref(authStore.isSpecialist ? authStore.isEnterprise ?  ' Your Plant Questions': 'Questions from Users' : ' Plantation Questions');

</script>

<style scoped>
.consulting-page {
    background-color: transparent;
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: column;
    gap: 1rem;
    padding: 20px 0;
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