
<template>
  <div class="d-flex justify-space-evenly">
      <div
        v-for="(option, i) in options || []"
        :key="option.id"
        class="flex-grow-1 d-flex"
        :style="`background-color: ${colors[i]};`"
      >
        <v-text-field
          label="Option"
          :model-value="option.label"
          @update:model-value="e=>emit('update:label', option.id, e)"
        />
        <v-btn variant="text" icon="$close" size="small" @click="()=>emit('remove',option.id)"></v-btn>
      </div>
  </div>
  <div class="d-flex justify-end">
    <v-btn @click="emit('add')">Add  option</v-btn>
  </div>
</template>

<script lang="ts" setup>
import { AnswerOption } from '../api/survey';
import { generateGradientColors } from '../../../helpers/colors'
import { computed, defineEmits } from 'vue';
const props = defineProps<{
  options: AnswerOption[],
}>();
const emit = defineEmits<{
  'update:label': [string, string], //[id, value]
  'remove': [string], //[id]
  'add': [],
}>()
const colors = computed(()=>generateGradientColors('#d2222d',"#ffbf00","#007000", props.options.length))
</script>
