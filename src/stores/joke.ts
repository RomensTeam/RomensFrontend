import {ref} from 'vue';
import {defineStore} from 'pinia';

interface Joke {
    uuid: string | null
    punchline: string | null
    setup: string | null
}

export const useJokeStore = defineStore('joke', () => {
    const joke = ref({});
    const jokeReply = ref([]);
    const jokeLoading = ref(false);


    return {
        joke,
        jokeLoading,
        jokeReply,
    };
});
