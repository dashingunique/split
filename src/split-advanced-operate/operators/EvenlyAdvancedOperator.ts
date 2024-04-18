import {ItemState, SplitAdvanceOperatePayload, TicketSplitAdvancedOperatorName} from "../../types";
import {Ticket} from "../Ticket";
import {TicketSplitAdvancedOperator} from "../interfaces";

export interface TicketSplitEvenlyOperateAdvancedPayload extends SplitAdvanceOperatePayload {
    currentTab: Ticket;
    otherTabs: Ticket[];
    item: ItemState;
}

export class EvenlyAdvancedOperator implements TicketSplitAdvancedOperator<TicketSplitEvenlyOperateAdvancedPayload> {
    readonly name: string = TicketSplitAdvancedOperatorName.Evenly;

    operate(payload: TicketSplitEvenlyOperateAdvancedPayload): void {
        console.log('EvenlyAdvanceOperator.operate', payload);
    }
}