
interface IList {
    id: number;
    poster_path: string;
    title: string;
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
}