<template>
  <div class="login-view">
    <div class="container">
        <div class="row justify-content-center align-items-center vh-100">
            <div class="col-4">
                        <form @submit="onSubmit" v-if="show">
                             <button :disabled="loading" type="submit" class="btn btn-primary btn-lg w-100 d-block">
                               <span  v-show="!loading">{{$t('Создать профиль')}}</span>
                               <loader v-show="loading"></loader>
                             </button>
<!--                              <RouterLink to="/restore-password" class="btn btn-link">{{ $t('auth.restore') }}</RouterLink>-->
                        </form>
            </div>
        </div>
    </div>
  </div>
</template>

<style></style>
<script setup lang="ts">
import {reactive, ref} from "vue";
import Api from "@/api";
import router from "@/router/frontend_router_vue";
import { useUserStore } from "@/stores/user";
import Loader from "@/components/Loader.vue";

const form = reactive({
    email: '',
    password: '',
})
const show = ref(true)
const loading = ref(false)
const user = useUserStore();

const onSubmit = (event:any) => {
    event.preventDefault()
    loading.value = true;
    Api.post('/login', form)
        .then(({data}) => {
            const token = data.data.token;
            const csrf_token = data.data.csrf_token;
            user.setUser(data.data.profile);
            window.localStorage.setItem('token', token)
            window.localStorage.setItem('csrf_token', csrf_token)
            router.back();
            loading.value = false;
        })
        .catch(() => {
            loading.value = false;
        });
}
</script>
