import {TicketSplitStrategy} from "../interfaces";
import {Ticket} from "../Ticket";
import {cloneDeep} from "lodash";
import {SplitType} from "../../../types";

export class EvenlySplitStrategy implements TicketSplitStrategy {
    readonly type: SplitType = SplitType.ByEvenly;

    split(splittable: Ticket): Ticket[] {
        console.log('I\'m EvenlySplitStrategy and processing, and I\'m about to deal with it.')

        const tab = cloneDeep(splittable);

        tab.restTabFieldsBeforeSplit(1, this.type);

        return [tab];
    }
}