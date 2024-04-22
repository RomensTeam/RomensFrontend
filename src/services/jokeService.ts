import Api from "@/api";

const JokeService = {
    loadJokes: (callback: Function, fallback: any = null) => {
        Api
            .post('/api/jokes', {'setup': 'test'})
            .then(response => {
                callback(response.data.data)
            })
            .catch(err => {
                if (typeof fallback === 'function') {
                    fallback(err)
                }
            })
        ;
    }
}

export default JokeService;
