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
                    :questions="questionStore.questions"
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
import { useQuestionStore } from '../stores/question-store';
import specialistAdditionalHelpComponent from '../components/specialist-additional-help.component.vue';
import specialistAnsweringComponent from '../components/specialist-answering.component.vue';
import { onMounted } from 'vue';
import QuestionInfoComponent from '../components/question-info.component.vue';
const authStore = useAuthStore();
const questionStore = useQuestionStore();
// Sample question data using the proper Question interface

// Initialize sample data with proper Question structure

let plantName = ref(''); // Plant name for additional help
const isPlantSeleced = ref(false); // Flag to indicate if a plant is selected
let questionSelected = ref<Question | undefined>(undefined); // Selected question for answering

onMounted(async () => {
    await loadQuestions();
});

const loadQuestions = async () => {
    try {
        // Use the question store to load questions
        await questionStore.loadQuestions();
        console.log('Consulting-page: Questions loaded successfully', questionStore.questions.length);
    } catch (error) {
        console.error('Consulting-page: Error loading questions', error);
    }
};

// Funciones para manejar eventos de las questions
const handleQuestionCreated = () => {
    console.log('Consulting-page: New question created, refreshing list');
    // The question store already handles adding the new question
    // We just need to refresh if needed
};

const handlePlantData = (namePlant: string) => {
    console.log('Consulting-page: Plant data received', namePlant);
    plantName.value = namePlant;
};

const handleResponse = async (response: { questionId: number, answer: string }) => {
    console.log('Answer for question ', response.questionId , ": ", response.answer);

    let postAnswer = {
        specialistId: parseInt(authStore.id),
        answerText: response.answer
    };

    const success = await questionStore.postAnswer(postAnswer, response.questionId);
    if (success) {
        console.log('Consulting-page: Expert response posted successfully');
    } else {
        console.error('Consulting-page: Error posting expert response', questionStore.error);
    }
};

const handleQuestionClick = (question: Question) => {
    console.log('Consulting-page: Question clicked from list', question.id, question.title);
    console.log('Question details:', question);
    questionStore.selectQuestion(question);
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
        width: 100%;
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
</style>