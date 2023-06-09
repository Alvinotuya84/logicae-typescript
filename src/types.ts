export interface Route{
    path: string;
    element: JSX.Element;

}

export interface User{
    username?:string;
    token?:string;
}
export interface Joke{
    id?: number;
    Body?: string;
    Title: string |null;
    Views: number,
    Author: string;
    CreatedAt: number;
}
export interface JokeEntries{
    id?:number;
    Title: FormDataEntryValue | null;
    Views: FormDataEntryValue | null ,
    Author: FormDataEntryValue | null ;
    CreatedAt: FormDataEntryValue | number ;
}
export interface JokesInitialState{
    jokes: Joke[];
    loading: boolean;
    error: string;
}