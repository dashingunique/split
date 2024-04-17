import {EvenlySplitStrategy} from "./stategies";
import {ticketSplitStrategies} from "./TicketSplitStrategyManager";
import {Ticket} from "./Ticket";
import {defaultTicketState} from "../types";

const strategyConfig = [
    new EvenlySplitStrategy(),
];


strategyConfig.forEach(strategy => ticketSplitStrategies.addStrategy(strategy));


const ticket = new Ticket(defaultTicketState);

console.log('use split method to split')
ticket.split();
console.log('use split method to split down')