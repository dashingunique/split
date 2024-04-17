import {SplitStrategy} from "./SplitStrategy";
import {Ticket} from "../Ticket";
import {SplitType} from "../../types";

export interface TicketSplitStrategy extends SplitStrategy<Ticket> {
    readonly type: SplitType;
}