<template>
  <div class="joke-setup">
    <div class="container">
      <div class="row  d-flex align-items-center justify-content-center vh-100">
        <div class="col-12 col-md-8">
          <form class="form-group w-100" @submit="sendSetup">
            <h3 class="display-5">{{ $t('Какая твоя лучшая шутка?') }}</h3>
            <div class="input-group">
              <input type="joke" tabindex="1" autofocus autocomplete="false" required v-model="setup"
                     class="form-control form-control-lg" name="setup"/>
              <button :class="['btn', setup.length > 1 ? 'btn-primary' : 'btn-light']" type="submit">
                {{ $t('Пошутить!') }}
              </button>
            </div>
            <div class="input-group" v-show="setup.length > 3 && false">
              <input type="joke" tabindex="2" autocomplete="false" v-model="punchline"
                     class="form-control form-control-lg" name="punchline"/>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useUserStore} from "@/stores/user";
import Api from "@/api";
import {ref} from "vue";
import {useRouter} from "vue-router";

const show = ref(true)
const loading = ref(false)
const setup = ref('')
const punchline = ref('')
const tags = ref([])
const user = useUserStore();
const router = useRouter();

const prepareJoke = () => {
  if (punchline.value.length >= 3) {
    return {
      setup: setup.value,
      punchline: punchline.value,
      tags: tags.value || []
    };
  } else {
    return {joke: setup.value}
  }
}

const sendSetup = (event: any) => {
  event.preventDefault()
  loading.value = true;
  Api
      .post('jokes', prepareJoke())
      .then(({data}) => {
        router.push({name: 'joke_view', params: { uuid: data.uuid } })
        loading.value = false;
      })
      .catch(() => {
        loading.value = false;
      })
  ;
}
</script>
<style lang="scss" scoped>

</style>
