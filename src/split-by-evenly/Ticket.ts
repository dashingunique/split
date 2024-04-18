import {SplitType, TicketState} from "../types";
import {Fraction} from "../../Fraction";
import {Splittable, TicketSplitStrategy} from "./interfaces";
import {ticketSplitStrategies} from "./TicketSplitStrategyManager";
import {EvenlySplitStrategy} from "./stategies";

export class Ticket implements Splittable<Ticket> {
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

    addTab(tab: Ticket) {
        tab.parentTicketId = this.id;
        this.state.splits.push(tab.state);
    }

    splits(): Ticket[] {
        return this.state.splits.map(state => new Ticket(state));
    }

    restTabFieldsBeforeSplit(currentWay: number, ways: number, splitType: SplitType) {
        this.id = `new id ${currentWay}`;
        this.splitType = splitType;
        this.fraction = new Fraction(1, ways);
    }

    clearTickerFieldsAfterSplit() {
        this.state.adjustments = [];
        this.state.items = [];
    }

    isSplit(): boolean {
        throw this.splits().length > 0;
    }

    split(strategy: TicketSplitStrategy) {
        const tabs = strategy.split(this);

        tabs.forEach(tab => this.addTab(tab));

        this.clearTickerFieldsAfterSplit();

        return this.splits();
    }

    splitByEvenly(ways: number = 1) {
        const strategy: EvenlySplitStrategy = ticketSplitStrategies.strategy(SplitType.ByEvenly);

        return this.split(strategy.carryWays(ways));
    }

    redistributeSplitsPennies() {
        console.log('I\'m about to redistribute the splitPrice of the data in the ticket information.')
    }
}