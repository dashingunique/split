import {Ticket} from "../Ticket";
import {ItemState, SplitAdvanceOperateOptions, TicketSplitAdvancedOperatorName} from "../../types";
import {TicketSplitAdvancedOperator} from "../interfaces";

export interface TicketSplitUnsplitToOperateAdvancedOptions extends SplitAdvanceOperateOptions {
    tab: Ticket;
    item: ItemState;
}

export class UnsplitToAdvancedOperator implements TicketSplitAdvancedOperator<TicketSplitUnsplitToOperateAdvancedOptions> {
    readonly name: string = TicketSplitAdvancedOperatorName.UnsplitTo;

    operate(ticket: Ticket, options: TicketSplitUnsplitToOperateAdvancedOptions): void {
        console.log('UnsplitToAdvanceOperator.operate', ticket, options);
    }
}