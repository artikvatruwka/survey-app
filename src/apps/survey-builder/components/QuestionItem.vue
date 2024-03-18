<template>
  <v-container>
    <v-btn @click="emit('remove')">remove question</v-btn>
    <v-text-field
      label="Label"
      :model-value="question.label"
      @update:model-value="e=>emit('update:label', e)"
    />
    <v-btn-toggle :model-value="question.variant" @update:model-value="(e)=>emit('update:variant',e)">
      <v-btn :value="QuestionVariants.LikertScale">Likert Scale</v-btn>
      <v-btn :value="QuestionVariants.OpenQuestion">Open question</v-btn>
    </v-btn-toggle>
    <open-question v-if="question.variant === QuestionVariants.OpenQuestion"  />
    <likert-question
      v-if="question.variant === QuestionVariants.LikertScale"
      :options="question.options"
      @remove="e=> emit('remove:option',e)"
      @add="()=>emit('add:option')"
      @update:label="(id, val)=>emit('set:optionProperty', id, 'label', val)"
    />
  </v-container>
</template>

<script lang="ts" setup>
import { AnswerOption, Question, QuestionVariants } from '../api/survey';
import LikertQuestion from './LikertQuestion.vue';
import OpenQuestion from './OpenQuestion.vue';
import { defineEmits } from 'vue'
defineProps<{
  question: Question;
}>();
const emit = defineEmits<{
  'remove': [],
  'update:label': [string], // [value]
  'update:variant': [QuestionVariants], // [value]
  'add:option': [],
  'remove:option': [string], // [id]
  'set:optionProperty': [string, keyof AnswerOption, string], // [id, property, value]
}>()

</script>
