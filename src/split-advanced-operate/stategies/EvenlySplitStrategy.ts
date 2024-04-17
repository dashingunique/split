import {TicketSplitStrategy} from "../interfaces";
import {Ticket} from "../Ticket";
import {cloneDeep} from "lodash";
import {SplitType} from "../../types";

export class EvenlySplitStrategy implements TicketSplitStrategy {
    readonly type: SplitType = SplitType.ByEvenly;

    constructor(private ways: number = 1) {
    }

    carryWays(ways: number = 1): this {
        this.ways = ways;

        return this;
    }

    split(splittable: Ticket): Ticket[] {
        console.log('I\'m EvenlySplitStrategy and processing, and I\'m about to deal with it.')

        const tabs: Ticket[] = [];

        for (let i = 1; i <= this.ways; i++) {
            const tab = cloneDeep(splittable);
            tab.restTabFieldsBeforeSplit(i, this.ways, this.type);
            tabs.push(tab);
        }

        return tabs;
    }
}