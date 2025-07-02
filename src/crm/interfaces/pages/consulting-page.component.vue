<template>
    <div class="consulting-page">
        <!-- Page title -->
        <div class="page-header">
            <h2>{{mainText.Title}}</h2>
            <p class="page-description">
                {{mainText.subtitle}}
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
            <!-- Shows the answers done by this specialist -->
                
                <div v-if="authStore.isSpecialist" class="question-info-container">
                    <QuestionInfoComponent
                    :question="questionSelected"
                    @plant-title="handlePlantData"
                    ></QuestionInfoComponent>
                </div>
                <div v-if="authStore.isSpecialist" class="answer-specialist-section">
                <!-- Shows the questions that this specialist is answering -->
                    <specialistAnsweringComponent
                    :question="questionSelected"
                    @expert-response="handleResponse"

                    />
                <!-- Shows additional help if needed -->
                    <specialistAdditionalHelpComponent 
                    :plant-name="plantName"
                    :plant-selected="isPlantSeleced"/> 
                </div>

            <!-- Questions list -->
            <div class="questions-section">
                <QuestionList
                    :questions="userQuestions"
                    :title="questionsTitle"
                    :is-specialist="authStore.isSpecialist"
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
import specialistAdditionalHelpComponent from '../components/specialist-additional-help.component.vue';
import specialistAnsweringComponent from '../components/specialist-answering.component.vue';
import { onMounted } from 'vue';
import QuestionInfoComponent from '../components/question-info.component.vue';
const authStore = useAuthStore();
const consultingService = new CrmService();
// Sample question data using the proper Question interface
let userQuestions = ref<Question[]>([]);

// Initialize sample data with proper Question structure

let plantName = ref(''); // Plant name for additional help
const isPlantSeleced = ref(false); // Flag to indicate if a plant is selected
let questionSelected = ref<Question | undefined>(undefined); // Selected question for answering

onMounted(async () => {
    await loadQuestions();
});

const loadQuestions = async () => {
    try {//When specialist fetch all, when user fetch only the questions that he created
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

const handlePlantData = (namePlant: string) => {
    console.log('Consulting-page: Plant data received', namePlant);
    plantName.value = namePlant;
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
    questionSelected.value = question;
    isPlantSeleced.value = question.plant_id !== null && question.plant_id !== undefined;
};

//Revisar y refactorizar esta función y logica de componentes luego, ya se sobre complico el tema...

// Computed properties for UI text
const questionsTitle = ref(authStore.isSpecialist ? authStore.isEnterprise ?  ' Your Plant Questions': 'Questions from Users' : ' Plantation Questions');

const mainText = {
    Title:  ref(authStore.isSpecialist ? authStore.isEnterprise ?  ' Ask Questions About Your Plants': 'Share your knowledge!' : 'Ask Questions About Your Plantations'),
    subtitle: ref(authStore.isSpecialist ? authStore.isEnterprise ?  'Help our users solve their questions.': 'Help our users solve their questions' : 'Get expert help with your plantation questions and track their status.')
}

</script>

<style>
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

.specialist-content{
    display: flex;
    flex-direction: row;
    width: 60%;
}

.question-info-container {
    flex: 2;
    width: 30%;
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
    flex: 2;
    width: 40%;
    overflow: hidden;
}

.answer-specialist-section {
    flex: 1;
    display: flex;
    flex-direction: column;
    gap: 16px;
    width: 30%;
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