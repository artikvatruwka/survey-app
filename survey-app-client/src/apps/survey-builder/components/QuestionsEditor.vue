<template>
  <v-text-field
    label="Survey title"
    v-model="surveyDraft.title"
  />
  <question-item
    v-for="question of surveyDraft?.questions"
    :question="question"
    :key="question.id"
    @remove="()=>removeQuestion(question.id)"
    @update:label="(e)=> setQuestionProperty(question.id, 'label', e)"
    @update:variant="(e)=> setQuestionProperty(question.id, 'variant', e)"
    @add:option="()=>addAnswerOption(question.id)"
    @remove:option="(e)=>removeAnswerOption(question.id, e)"
    @set:optionProperty="(...args)=>setAnswerOptionProperty(question.id, ...args)"
  />
  <v-container>
    <v-btn @click="addQuestion">Add new question</v-btn>
  </v-container>
</template>

<script lang="ts" setup>
import QuestionItem from './QuestionItem.vue';
import { useSurveyEditor } from '../composables/survey';
const props = defineProps<{
  surveyId: string
}>();

const {
  addQuestion,
  surveyDraft,
  removeQuestion,
  addAnswerOption,
  setAnswerOptionProperty,
  setQuestionProperty,
  removeAnswerOption
} = useSurveyEditor(props.surveyId);

</script>
