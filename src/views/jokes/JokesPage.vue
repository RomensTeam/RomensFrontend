<template>
  <div class="joke-view">
    <div class="row d-flex align-items-top justify-content-center">
        <div class="col-10" v-if="joke">
            <Answer :title="joke.setup" :text="joke.punchline" :author="joke.author"></Answer>
        </div>
    </div>

    <div class="row d-flex align-items-top justify-content-center">
      <div class="col-10" v-if="joke && !loading">
        <RomensTeamAnswers :joke="joke"></RomensTeamAnswers>
      </div>
    </div>

    <div class="answer">
      <div class="row d-flex align-items-top justify-content-center">
        <div class="col-10" v-if="joke">
          <div class="card">
            <div class="card-body">
              <form class="form-group w-100" @submit="sendSetup">
                <div class="input-group">
                  <input type="joke" tabindex="1" autofocus autocomplete="false" required v-model="punchline"
                         class="form-control form-control-lg" name="punchline"/>
                  <button :class="['btn', punchline.length > 1 ? 'btn-primary' : 'btn-light']" type="submit">
                    {{ $t('Запанчлайнить!') }}
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import Api from "@/api";
import {ref} from "vue";
import { useRoute, useRouter } from 'vue-router';
import Answer from "@/components/chat/Answer.vue";
import RomensTeamAnswers from "@/components/chat/RomensTeamAnswers.vue";

const route = useRoute();
const router = useRouter();
const joke = ref(<any>{});
const loading = ref(false)
const punchline = ref('')
const tags = ref([])

const loadJoke = (uuid: string | string[]) => {
  loading.value = true;
  Api
      .get('jokes/' + uuid)
      .then(({data}: any) => {
        joke.value = data.data;
        loading.value = false;
      })
      .catch(() => {
        loading.value = false;
      })
  ;

}
loadJoke(route.params.uuid);

const prepareJoke = () => {
  return {
    setup: route.params.uuid,
    punchline: punchline.value,
    tags: tags.value || ['jokes:' + route.params.uuid]
  };
}

const sendSetup = (event: any) => {
  event.preventDefault()
  loading.value = true;
  Api
      .post('jokes', prepareJoke())
      .then(({data}) => {
        loading.value = false;
        punchline.value = '';
        loadJoke(route.params.uuid);
      })
      .catch(() => {
        loading.value = false;
      })
  ;
}

</script>
<style lang="scss" scoped>
</style>
