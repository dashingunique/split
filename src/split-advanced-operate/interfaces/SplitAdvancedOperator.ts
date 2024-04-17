import {Splittable} from "./Splittable";

export interface SplitAdvancedOperator<T, O> {
    readonly name: string;

    operate(splittable: Splittable<T>, options: O): void;
}