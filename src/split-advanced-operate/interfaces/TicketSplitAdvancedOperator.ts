import {SplitAdvancedOperator} from "./SplitAdvancedOperator";
import {Ticket} from "../Ticket";

export interface TicketSplitAdvancedOperator<O extends any = any> extends SplitAdvancedOperator<Ticket, O> {
    operate(splittable: Ticket, options: O): void;
}