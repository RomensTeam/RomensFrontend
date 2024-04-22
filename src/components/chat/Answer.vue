<template>
  <div class="answer-view">
    <div class="card mb-3" v-if="author">
      <div class="card-body">
        <div class="d-flex">
          <div class="flex-shrink-0">
            <img v-if="type === 'punchline'" :src="author.avatar || ''" height="32" alt="...">
            <img v-if="type !== 'punchline'" :src="author.avatar || ''" height="64" alt="...">
          </div>
          <div class="flex-grow-1 ms-3">
            <h5 v-if="type === 'punchline'">{{author.name}}</h5>
            <h4 v-if="type !== 'punchline'" class="display-5">{{author.name}}</h4>
          </div>
        </div>
        <div v-if="type === 'punchline'">
          <div class="text">
            {{text}}
          </div>
        </div>
      </div>
      <div v-if="false" class="card-header">
        {{title}}
      </div>
      <div v-if="type !== 'punchline'" class="card-body">
        <div class="text">
          {{text}}
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">

const {title, text, author, type} = defineProps(['title', 'text', 'author', 'type'])


</script>
<style lang="scss" scoped>
</style>
