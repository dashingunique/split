import {EvenlySplitStrategy} from "./stategies";
import {ticketSplitStrategyManager} from "./TicketSplitStrategyManager";
import {Ticket} from "./Ticket";
import {defaultTicketState} from "../types";
import {SplitTicket} from "./SplitTicket";

const strategyConfig = [
    new EvenlySplitStrategy(),
];


strategyConfig.forEach(strategy => ticketSplitStrategyManager.addStrategy(strategy));


const ticket = new Ticket(defaultTicketState);

console.log('---------------------------------------------------')
console.log('use split method to split')
const splits = ticket.split();
console.log('use split method to split down')
console.log('splits', splits);
console.log('---------------------------------------------------')
console.log('\r')
console.log('\r')
console.log('\r')


const splitTicket = new SplitTicket(ticket.state);

console.log('---------------------------------------------------')
console.log('split ticket to split')
const splitSplits = splitTicket.splitByEvenly(2);
console.log('split ticket has been re-split')
console.log('splits', splitSplits);
console.log('---------------------------------------------------')