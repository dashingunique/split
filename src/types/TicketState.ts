import {SplitType} from "./Split";
import {defaultFraction, Fraction} from "../../Fraction";

export interface AdjustmentState {
    id: string;
}

export interface ItemState {
    id: string;
}


export interface TicketState {
    id: string;
    splitType: SplitType;
    parentTicketId?: string;
    fraction: Fraction;
    splits: TicketState[];
    adjustments: AdjustmentState[];
    items: ItemState[];
}

export const defaultTicketState: TicketState = {
    id: 'I\'m ticket id',
    splitType: SplitType.None,
    fraction: defaultFraction,
    splits: [],
    adjustments: [],
    items: [],
}