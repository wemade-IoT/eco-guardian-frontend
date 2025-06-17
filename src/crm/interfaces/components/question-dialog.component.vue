<template>

    <!--Question Dialog-->
    <div>

        <div class="question-dialog">
            <h2>{{ props.question.title }}</h2>
            <p>{{ props.question.content }}</p>
            <p>Status: {{ (props.question.status) }}</p>
            <p>Created at: {{ new Date(props.question.created_at).toLocaleDateString() }}</p>
            <button @click="$emit('close')">Close</button>
        </div>

    </div>

</template>

<script setup lang="ts">

import type { Question } from '../../domain/model/question.entity';
// when the question is pressed the question dialog is opened
//and the question sends its data by props
const props = defineProps<{
  question: Question;
}>();

const emit = defineEmits(['close']);


</script>

<style>
</style>