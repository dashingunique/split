import {TicketState, SplitType} from "../../types";
import {cloneDeep} from "lodash";
import {Fraction} from "../../../Fraction";

function splitByEvenlyStrategy(ticket: Ticket, ways: number) {
    const tab = cloneDeep(ticket);

    tab.restTabFieldsBeforeSplit(ticket, ways, SplitType.ByEvenly);

    ticket.addTab(tab);

    ticket.clearTickerFieldsAfterSplit();

    return ticket.splits();
}

export class Ticket {
    constructor(readonly state: TicketState) {
    }

    get id(): string {
        return this.state.id;
    }

    set id(id: string) {
        this.state.id = id;
    }

    set splitType(type: SplitType) {
        this.state.splitType = type;
    }

    set fraction(fraction: Fraction) {
        this.state.fraction = fraction;
    }

    set parentTicketId(id: string) {
        this.state.parentTicketId = id;
    }

    split(strategy?: SplitType) {
        const currentSplitType = strategy ?? SplitType.ByEvenly;
        switch (currentSplitType) {
            case SplitType.ByEvenly:
                return this.splitByEvenly();
            default:
                throw new Error('not support split')
        }
    }

    splitByEvenly(ways: number = 1): Ticket[] {
        const tab = cloneDeep(this);

        tab.restTabFieldsBeforeSplit(this, ways, SplitType.ByEvenly);

        this.addTab(tab);

        this.clearTickerFieldsAfterSplit();

        return this.splits();
    }

    addTab(tab: Ticket) {
        this.state.splits.push(tab.state);
    }

    splits(): Ticket[] {
        return this.state.splits.map(state => new Ticket(state));
    }

    restTabFieldsBeforeSplit(parentTicket: Ticket, ways: number, splitType: SplitType) {
        this.id = 'new id';
        this.splitType = splitType;
        this.fraction = new Fraction(1, ways);
        this.parentTicketId = parentTicket.id;
    }

    clearTickerFieldsAfterSplit() {
        this.state.adjustments = [];
        this.state.items = [];
    }
}