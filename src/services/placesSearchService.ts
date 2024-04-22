import Api from "@/api";

const PlacesSearchService = {
	loadPlaces: (callback: Function, fallback:any = null) => {
        Api
            .get('/api/places')
            .then(response => {
                callback(response.data.data);
            })
            .catch(err => {
                // console.error('UserProfileService@loadUserProfile', err);
                if (typeof fallback === 'function') {
                    fallback(err)
                }
            })
        ;
    }
}

export default PlacesSearchService;
