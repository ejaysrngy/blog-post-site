import { PostCardsTypes } from "../PostCards/types";

export interface PostProfileCardTypes extends PostCardsTypes {
    onDelete: () => void;
    editLink: string;
}