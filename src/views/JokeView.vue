<template>
    <MainLayout>
      <BestJoke v-if="!$route.params.uuid"></BestJoke>
      <JokesPage v-if="$route.params.uuid"></JokesPage>
    </MainLayout>
</template>

<script setup lang="ts">
import MainLayout from "@/layouts/MainLayout.vue";
import BestJoke from "@/views/jokes/BestJoke.vue";
import JokesPage from "@/views/jokes/JokesPage.vue";
</script>