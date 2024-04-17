import {TicketSplitStrategy} from "../interfaces";
import {SplitType} from "../../../types";
import {Ticket} from "../Ticket";

export class BySeatSplitStrategy implements TicketSplitStrategy {
    readonly type: SplitType = SplitType.BySeat;

    split(splittable: Ticket): Ticket[] {
        return [splittable];
    }

}