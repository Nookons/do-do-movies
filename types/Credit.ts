import {IMovieResponse} from "@/types/Movie";

export interface ICreditDetails {
    adult: boolean;
    also_known_as: string[];
    biography: string;
    birthday: string;
    deathday: string | null;
    gender: number;             // 1 - woman, 2 - man
    homepage: string | null;
    id: number;
    imdb_id: string;
    known_for_department: string;
    name: string;
    place_of_birth: string;
    popularity: number;
    profile_path: string;
}


export interface ICreditCombine {
    cast: IMovieResponse[];
    crew: IMovieResponse[];
    id: number;
}
