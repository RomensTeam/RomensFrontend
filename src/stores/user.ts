import {computed, ref} from 'vue';
import {defineStore} from 'pinia';
import userProfileService from '../services/userProfileService'

interface User {
	uuid: string | null,
    original: string | null,
    creator: string | null,
    language: string | null,
    avatar: string | null,
    email: string | null,
	name: string | null
}

export const useUserStore = defineStore('user', () => {
	const user = ref(getDefaultUser());
	const userLoading = ref(false);

	function setUser(userData: User) {
		user.value = userData;
		window.localStorage.setItem('profile', JSON.stringify(userData))
	}

	function getDefaultUser(): User
	{
        if (localStorage.getItem('profile') !== null) {
            return JSON.parse(localStorage.getItem('profile') || '{}');
        }

		return {
			uuid: null,
			creator: null,
			original: null,
            name: 'Анонимус',
            email: 'anonymous@romens.email',
            avatar: null,
            language: 'ru',
		}
	}
	function getRomens(): User
	{
        if (localStorage.getItem('romens') !== null) {
            return JSON.parse(localStorage.getItem('romens') || '{}');
        }

		return {
			uuid: 'e5a7d141-059c-442b-a00b-7f8e02a12aef',
			creator: 'd8ee4a7c-3133-4f1d-a640-6887b3b26d16',
			original: 'e5a7d141-059c-442b-a00b-7f8e02a12aef',
            name: 'Romens',
            email: 'romens@romens.email',
            avatar: 'https://romens.org/Romens/icon_square_primary.svg',
            language: 'ru',
		}
	}

	function logout() {
		user.value = getDefaultUser();
		window.localStorage.removeItem('profile');
		window.localStorage.removeItem('token');
		window.localStorage.removeItem('csrf_token');
	}

	const isAuth = computed(() => {
		return user.value.uuid !== null;
	});

	const name = computed(() => {
		if (user.value.hasOwnProperty('name')) {
			return user.value.name;
		}
		return 'Anonymous';
	});

	function loadUserProfile(): void {
		userLoading.value = true;
		userProfileService.loadUserProfile((profile: {}) => {
			// user.value = getDefaultUser();
			userLoading.value = false;
		}, () => {
			userLoading.value = false;
		})
	}

	if (localStorage.getItem('token')) {
		loadUserProfile();
	}

	return {
		user,
		setUser,
		logout,
		isAuth,
        getRomens,
		name,
	};
});
