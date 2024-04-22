import {ref} from 'vue';
import {defineStore} from 'pinia';
import PlacesSearchService from '../services/placesSearchService'

interface PLace {
	id: number,
	name: string
}

export const usePlacesStore = defineStore('user', () => {
	const places = ref({});
	const placesLoading = ref(false);

	function loadPlaces(): void {
		placesLoading.value = true;
		PlacesSearchService.loadPlaces((data: {}) => {
			console.log(data);
			placesLoading.value = false;
		}, () => {
			placesLoading.value = false;
		})
	}

	return {
		placesLoading,
		loadPlaces,
		places,
	};
});
