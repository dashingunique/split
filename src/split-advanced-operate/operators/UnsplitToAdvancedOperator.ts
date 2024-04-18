import {Ticket} from "../Ticket";
import {ItemState, SplitAdvanceOperatePayload, TicketSplitAdvancedOperatorName} from "../../types";
import {TicketSplitAdvancedOperator} from "../interfaces";

export interface TicketSplitUnsplitToOperateAdvancedPayload extends SplitAdvanceOperatePayload {
    currentTab: Ticket;
    otherTabs: Ticket[];
    item: ItemState;
}

export class UnsplitToAdvancedOperator implements TicketSplitAdvancedOperator<TicketSplitUnsplitToOperateAdvancedPayload> {
    readonly name: string = TicketSplitAdvancedOperatorName.UnsplitTo;

    operate(options: TicketSplitUnsplitToOperateAdvancedPayload): void {
        console.log('UnsplitToAdvanceOperator.operate', options);
    }
}