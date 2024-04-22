<template>
    <div class="romens romens-blue d-flex bd-highlight">
			<div class="chats p-2 flex-shrink-1">
				<div class="d-flex align-items-start flex-column mb-3" style="height: 90vh;">
					<div class="mb-auto p-2 bd-highlight" v-if="romensExsist">
						<div class="d-flex">
							<div class="flex-shrink-0">
								<img :src="romens.avatar" height="40" alt="...">
							</div>
							<div class="flex-grow-1 ms-3" v-show="avatarNotSet">
								{{romens.name}}
							</div>
						</div>
					</div>
					<div class="p-2" v-if="youExsist">
						<div class="d-flex">
							<div class="flex-shrink-0">
								<img :src="you.avatar" height="40" alt="...">
							</div>
							<div class="flex-grow-1 ms-3">
								{{you.name}}
							</div>
						</div>
					</div>
				</div>
			</div>
	    <div class="messages-area p-2 w-100">
		      <div class="messages card">
			      <div class="message card-body">
				      <div class="d-flex">
					      <div class="flex-shrink-0">
<!--						      <img :src="romens.avatar" height="40" alt="...">-->
					      </div>
					      <div class="flex-grow-1 ms-3">
						      {{romens.name}}
					      </div>
				      </div>
			      </div>
		      </div>
		      <div class="answer card">
			      <div class="card-body" v-if="answerText">
				      <div class="input-group">
					      <input type="text" class="form-control" v-model="setup">
					      <button @submit="sendJoke" class="send-joke btn romens-blue ">
						      {{$t('Отправить шутку!')}}
					      </button>
				      </div>
			      </div>
		      </div>
	    </div>

    </div>
</template>
<script setup lang="ts">

import {ref} from "vue";
import Api from "@/api";

const romens = ref({
	'uuid': 'e5a7d141-059c-442b-a00b-7f8e02a12aef',
	'name': 'Romens',
	'avatar': 'https://romens.org/Romens/logo_wide_primary_null.svg',
	'isAvatarSet': true,
});

const you = ref(romens.value ?? {});

const avatarNotSet = ref(!romens.value.isAvatarSet);
const romensExsist = ref(romens.value.uuid);
const youExsist = ref(you.value.uuid);
const answerText = ref(true);
const loading = ref(false);
const defaultChat = ref('e5a7d141-059c-442b-a00b-7f8e02a12aef');
const chatWithRomens = ref(defaultChat === romens.value.uuid);
const chatWithYou = ref(defaultChat === you.value.uuid);

// Joke
const romensJoke = ref('Я - Шутка!');

const setup = ref(romensJoke.value);
const punchline = ref(romensJoke.value);

const prepareJoke = () => {
		return {
			'setup': setup.value,
		}
}

const thinkAboutJoke = () => {
	return {

	}
}

const sendJoke = (event: any) => {
	event.preventDefault()
	loading.value = true;
	let joke = prepareJoke();
	axios
			.post('https://api.romens.org/talk/Romens', joke())
			.then(({data}) => {
				loading.value = false;
			})
			.catch(() => {
				loading.value = false;
			})
	;
}

</script>
<style scoped>
 .romens-blue {
	 --bs-list-group-bg: #0f86ff;
	 background-color: #0f86ff;

	 .list-group {
		 background-color: #0f86ff;
		 --bs-list-group-bg: #0f86ff;
	 }
 }
 .chats {
	 .list-group {
		 .list-group-item {
			 border: 0 !important;
		 }
	 }
 }

</style>