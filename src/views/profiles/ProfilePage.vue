<template>
  <div class="profile-view">
	  <header-profile v-if="joke"></header-profile>
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
  </div>
</template>
<script setup lang="ts">
import Api from "@/api";
import {ref} from "vue";
import { useRoute, useRouter } from 'vue-router';
import Answer from "@/components/chat/Answer.vue";
import HeaderComponent from "@/components/HeaderComponent.vue";
import HeaderProfile from "@/components/HeaderProfile.vue";

const route = useRoute();
const router = useRouter();
const joke = ref(<any>{});
const loading = ref(false)

const loadJoke = (uuid: string | string[]) => {
  loading.value = true;
  Api
      .get('profiles/nickjayrussell')
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

</script>
<style lang="scss" scoped>
</style>
