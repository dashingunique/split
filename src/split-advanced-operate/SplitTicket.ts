import {Ticket} from "./Ticket";
import {TicketState} from "../types";
import {TicketSplitStrategy} from "./interfaces";

export class SplitTicket extends Ticket {
    constructor(state: TicketState) {
        super(state);
    }

    split(strategy?: TicketSplitStrategy): Ticket[] {
        this.removeSplits();

        const splits = super.split(strategy);

        this.redistributeSplitsPennies();

        return splits;
    }

    removeSplits() {
        console.log('I\'m about to merge the data of splits in the ticket information into the ticket.')
        this.state.splits = [];
    }
}