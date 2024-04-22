<template>
    <footer>
        <div class="container text-center">
            <p>
                <a href="https://romens.org/about" class="link-underline link-underline-opacity-0" target="_blank">Romens</a>
                {{ (thisYear > 2024) ? ('2024 - ' + thisYear) : thisYear }}
            </p>
          <p>Сайт будет работать до <b>{{lastDay}}</b></p>
        </div>
    </footer>
</template>
<script setup lang="ts">
import {computed, ref} from "vue";

    const lastDay = ref('19 июля 2024 года');

    const thisYear = computed(() => {return (new Date().getFullYear()); })
</script>

<style scoped>
</style>
