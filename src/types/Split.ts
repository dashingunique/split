import {
    EvenlyAdvancedOperator, TicketSplitEvenlyOperateAdvancedPayload,
    TicketSplitUnsplitToOperateAdvancedPayload,
    UnsplitToAdvancedOperator
} from "../split-advanced-operate/operators";

export enum SplitType {
    None,
    ByEvenly,
    BySeat
}

export interface SplitAdvanceOperatePayload {}

export enum TicketSplitAdvancedOperatorName {
    UnsplitTo = 'unsplitTo',
    Evenly = 'evenly',
}

export interface TicketSplitAdvanceOperatorMapping {
    [TicketSplitAdvancedOperatorName.UnsplitTo]: {
        operator: UnsplitToAdvancedOperator;
        payload: TicketSplitUnsplitToOperateAdvancedPayload;
    };
    [TicketSplitAdvancedOperatorName.Evenly]: {
        operator: EvenlyAdvancedOperator;
        payload: TicketSplitEvenlyOperateAdvancedPayload;
    };
}
export type TicketSplitAdvanceOperatorInstance<N extends TicketSplitAdvancedOperatorName> = TicketSplitAdvanceOperatorMapping[N];
export type TicketSplitAdvanceOperatorPayload<N extends TicketSplitAdvancedOperatorName> = TicketSplitAdvanceOperatorInstance<N>['payload'];
export type TicketSplitAdvanceOperatorOperator<N extends TicketSplitAdvancedOperatorName> = TicketSplitAdvanceOperatorInstance<N>['operator'];
