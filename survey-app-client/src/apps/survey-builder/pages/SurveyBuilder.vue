<template>
  <questions-editor :survey-id="surveyId"></questions-editor>
</template>
<script lang="ts" setup>
import { computed } from 'vue';
import { useRoute } from 'vue-router'
import QuestionsEditor from '../components/QuestionsEditor.vue';

const route = useRoute()
const surveyId =  computed(()=>route.params.id);

</script>
