
export interface IList {
    id: number;
    poster_path: string;
    title: string;
}

export interface IListNotFinished {
    id: number;
    poster_path: string;
    title: string;
    runtime: number;
    user_runtime: string;
}

export default interface IUser {
    createdAt: Date;
    email: string;
    type: string;
    favorite_list?: IList[];
    id: string;
    image: string;
    name: string;
    updatedAt: Date;
    watch_later_list?: IList[];
    watched_list?: IList[];
    not_finished?: IListNotFinished[];
}