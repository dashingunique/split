import {SplitType, TicketState} from "../../types";
import {cloneDeep} from "lodash";
import {defaultFraction, Fraction} from "../../../Fraction";

export type TicketFieldsOptions = Partial<TicketState> & {ways?: number; parentTicket?: TicketState | Ticket};

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

        restTabFieldsBeforeSplit(tab, {
            splitType: SplitType.ByEvenly,
            fraction: new Fraction(1, ways),
            parentTicket: this
        });

        this.addTab(tab);

        this.clearTickerFieldsAfterSplit();

        return this.splits();
    }

    splitBySeat(): Ticket[] {
        const tab = cloneDeep(this);

        restTabFieldsBeforeSplit(tab, {
            splitType: SplitType.BySeat,
            fraction: new Fraction(1, 1),
            parentTicket: this
        });

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

export function restTabFieldsBeforeSplit(ticket: TicketState, options: TicketFieldsOptions): void;
export function restTabFieldsBeforeSplit(ticket: Ticket, options: TicketFieldsOptions): void;
export function restTabFieldsBeforeSplit(ticket: TicketState | Ticket, options: TicketFieldsOptions): void {
    ticket.id = options.id ?? 'new id';
    ticket.splitType = options.splitType ?? SplitType.ByEvenly;
    ticket.fraction = options.fraction ?? defaultFraction;
    ticket.parentTicketId = options.parentTicket?.id ?? '';
}