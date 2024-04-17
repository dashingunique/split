import {ItemState, SplitAdvanceOperateOptions, TicketSplitAdvancedOperatorName} from "../../types";
import {Ticket} from "../Ticket";
import {TicketSplitAdvancedOperator} from "../interfaces";

export interface TicketSplitEvenlyOperateAdvancedOptions extends SplitAdvanceOperateOptions {
    tab: Ticket;
    item: ItemState;
}

export class EvenlyAdvancedOperator implements TicketSplitAdvancedOperator<TicketSplitEvenlyOperateAdvancedOptions> {
    readonly name: string = TicketSplitAdvancedOperatorName.Evenly;

    operate(ticket: Ticket, options: TicketSplitEvenlyOperateAdvancedOptions): void {
        console.log('EvenlyAdvanceOperator.operate', ticket, options);
    }
}