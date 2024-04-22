<template>
    <div class="answers-catalog">
        <div class="d-grid">
            <div class="card mx-1 my-2 border-0" v-show="false">
                <input type="search" class="form-control form-control-lg" @keyup="search" @change="search" v-model="queryString" name="search" autofocus :placeholder="$t('post.search')" />
            </div>
            <div class="card mx-1 my-2 border-0" v-show="!loading && jokes.length === 0">
                <div class="card-body">
                    <h3 class="text-center display-4">{{ $t('Не понял') }}</h3>
                </div>
            </div>
            <div class="masonry-row">
                <div class="masonry-col" :key="indexKey" v-for="(joke, indexKey) in jokes">
                    <Answer type="punchline" :author="joke.author" :text="joke.punchline"></Answer>
                </div>
            </div>
            <div v-show="loading" class="text-center p-3">
                <Loader></Loader>
            </div>
        </div>
    </div>
</template>

<script type="module" setup lang="ts">
    import { ref } from 'vue';
    import { storeToRefs } from "pinia";

    import Api from "@/api";
    import Loader from "@/components/Loader.vue";
    import { useUserStore } from "@/stores/user";
		import CardTextPost from "@/components/posts/types/CardTextPost.vue";
    import {useRoute, useRouter} from "vue-router";
    import Answer from "@/components/chat/Answer.vue";

    const jokes = ref([] as any[any]);
    const { joke } = defineProps(['joke'])
    const loading = ref(false);
    const page = ref(0);
    const lastPage = ref(1);
    const router = useRoute();
    const queryString = ref(router.params.uuid);
    const { isAuth } = storeToRefs(useUserStore());

    function loadJokes() {
        if (page.value >= lastPage.value || loading.value) {
            console.debug('This is last page posts or loading new data');
            return
        }
        page.value = page.value + 1;
        loading.value = true

        Api
            .post('/jokes/' + router.params.uuid + '/?page=' + page.value + '&search=' + queryString.value)
            .then(({data}) => {
                const newPosts = data.data;
                lastPage.value = data.meta.last_page
                jokes.value.push(...newPosts)
                loading.value = false
            })
            .catch(({err}) => {
                loading.value = false
            })
    }

    function reset() {
        page.value = 0;
        lastPage.value = 1;
    }

    function search() {
        if (queryString.value.length > 2) {
            reset();
          loadJokes();
        } else {
            reset();
          loadJokes();
        }
    }


    window.onscroll = function(ev) {
        console.log(
            window.innerHeight,
            window.scrollY,
            document.body.offsetHeight
        );
        if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {
          loadJokes();
            console.info("you're at the bottom of the page");
        }
    };

    loadJokes();
</script>

<style scoped>
.masonry-row {
    -moz-column-width: 18em;
    -webkit-column-width: 18em;
    -moz-column-gap: 1em;
    -webkit-column-gap:1em;
}

.masonry-col {
    display: inline-block;
    padding:  .25rem;
    width:  100%;
}

</style>
