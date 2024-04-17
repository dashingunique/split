import {
    EvenlyAdvancedOperator, TicketSplitEvenlyOperateAdvancedOptions,
    TicketSplitUnsplitToOperateAdvancedOptions,
    UnsplitToAdvancedOperator
} from "../split-advance-operate/operators";

export enum SplitType {
    None,
    ByEvenly,
    BySeat
}

export interface SplitAdvanceOperateOptions {}

export enum TicketSplitAdvancedOperatorName {
    UnsplitTo = 'unsplitTo',
    Evenly = 'evenly',
}

export interface TicketSplitAdvanceOperatorMapping {
    [TicketSplitAdvancedOperatorName.UnsplitTo]: {
        operator: UnsplitToAdvancedOperator;
        options: TicketSplitUnsplitToOperateAdvancedOptions;
    };
    [TicketSplitAdvancedOperatorName.Evenly]: {
        operator: EvenlyAdvancedOperator;
        options: TicketSplitEvenlyOperateAdvancedOptions;
    };
}
export type TicketSplitAdvanceOperatorInstance<N extends TicketSplitAdvancedOperatorName> = TicketSplitAdvanceOperatorMapping[N];
export type TicketSplitAdvanceOperatorOptions<N extends TicketSplitAdvancedOperatorName> = TicketSplitAdvanceOperatorInstance<N>['options'];
export type TicketSplitAdvanceOperatorOperator<N extends TicketSplitAdvancedOperatorName> = TicketSplitAdvanceOperatorInstance<N>['operator'];
