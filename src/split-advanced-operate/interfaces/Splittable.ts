import {SplitStrategy} from "./SplitStrategy";

export interface Splittable<T> {
    split(strategy?: SplitStrategy<T>): T[];

    isSplit(): boolean;
}