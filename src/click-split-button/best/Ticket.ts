import {SplitType, TicketState} from "../../types";
import {Fraction} from "../../../Fraction";
import {TicketSplitStrategy} from "./interfaces";
import {TicketSplitStrategyManager} from "./TicketSplitStrategyManager";
import {EvenlySplitStrategy} from "./stategies";
import {cloneDeep} from "lodash";

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

    addTab(tab: Ticket) {
        tab.parentTicketId = this.id;
        this.state.splits.push(tab.state);
    }

    splits(): Ticket[] {
        return this.state.splits.map(state => new Ticket(state));
    }

    restTabFieldsBeforeSplit(ways: number, splitType: SplitType) {
        this.id = 'new id';
        this.splitType = splitType;
        this.fraction = new Fraction(1, ways);
    }

    clearTickerFieldsAfterSplit() {
        this.state.adjustments = [];
        this.state.items = [];
    }

    split(type?: SplitType) {
        const currentSplitType = type ?? SplitType.ByEvenly;
        switch (currentSplitType) {
            case SplitType.ByEvenly:
                return this.splitByEvenly();
            default:
                throw new Error('not support split')
        }
    }

    splitByEvenly() {
        const tab = cloneDeep(this);

        tab.restTabFieldsBeforeSplit(1, SplitType.ByEvenly);

        this.addTab(tab)

        this.clearTickerFieldsAfterSplit();

        return this.splits();
    }

    // split(strategy?: TicketSplitStrategy) {
    //     const currentStrategy = strategy ?? new TicketSplitStrategyManager().default();
    //
    //     const tabs = currentStrategy.split(this);
    //
    //     tabs.forEach(tab => this.addTab(tab));
    //
    //     this.clearTickerFieldsAfterSplit();
    //
    //     return this.splits();
    // }
    //
    // splitByEvenly() {
    //     return this.split(new EvenlySplitStrategy());
    // }
}