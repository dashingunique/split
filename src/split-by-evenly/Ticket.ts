import {SplitType, TicketState} from "../types";
import {Fraction} from "../../Fraction";
import {Splittable, TicketSplitStrategy} from "./interfaces";
import {ticketSplitStrategyManager} from "./TicketSplitStrategyManager";
import {EvenlySplitStrategy} from "./stategies";
import {tap} from "lodash";

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

    split(strategy?: TicketSplitStrategy) {
        const currentStrategy = strategy ?? tap(ticketSplitStrategyManager.default(), (strategy) => {
            if (strategy.type === SplitType.ByEvenly) {
                (strategy as EvenlySplitStrategy).carryWays(1);
            }
        });

        const tabs = currentStrategy.split(this);

        tabs.forEach(tab => this.addTab(tab));

        this.clearTickerFieldsAfterSplit();

        return this.splits();
    }

    splitByEvenly(ways: number = 1) {
        const strategy: EvenlySplitStrategy = ticketSplitStrategyManager.strategy(SplitType.ByEvenly) as EvenlySplitStrategy;

        return this.split(strategy.carryWays(ways));
    }
}