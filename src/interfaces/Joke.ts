export interface Joke {
    uuid: string | null;
    setup: string | null;
    punchline: string | null;
    creator:  null | string;
    author: Object | null | string;
}
