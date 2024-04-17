export interface SplitStrategy<T> {
    split(splittable: T): T[];
}