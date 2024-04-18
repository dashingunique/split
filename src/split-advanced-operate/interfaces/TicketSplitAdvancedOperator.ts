import {SplitAdvancedOperator} from "./SplitAdvancedOperator";

export interface TicketSplitAdvancedOperator<O extends any = any> extends SplitAdvancedOperator<O> {
    operate(options: O): void;
}