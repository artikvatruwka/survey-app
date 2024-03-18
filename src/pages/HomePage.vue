<template>
  <div class="d-flex mt-16 justify-center flex-column">
    <v-btn :href="`editor/${nanoid()}`">Create Survey</v-btn>
    <v-btn v-for="{href, title} in continueEditing" :href="href" :key="href">Continue editing {{ title }}</v-btn>
  </div>
</template>

<script lang="ts" setup>
import { nanoid } from 'nanoid'
const continueEditing =  Object.keys(localStorage)
  .filter(key=>key.startsWith('survey-'))
  .map(key=>({
    href: 'editor/'+key.replace('survey-',''),
    title: JSON.parse(localStorage.getItem(key)||'{}').title
  }))
</script>
