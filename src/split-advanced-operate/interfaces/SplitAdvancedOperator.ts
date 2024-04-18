export interface SplitAdvancedOperator<O> {
    readonly name: string;

    operate(payload: O): void;
}