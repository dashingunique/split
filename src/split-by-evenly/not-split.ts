import {EvenlySplitStrategy} from "./stategies";
import {ticketSplitStrategyManager} from "./TicketSplitStrategyManager";
import {Ticket} from "./Ticket";
import {defaultTicketState} from "../types";

const strategyConfig = [
    new EvenlySplitStrategy(),
];


strategyConfig.forEach(strategy => ticketSplitStrategyManager.addStrategy(strategy));


const ticket = new Ticket(defaultTicketState);

console.log('use split method to split')
ticket.split();
console.log('use split method to split down')