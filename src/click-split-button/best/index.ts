import {Ticket} from "./Ticket";
import {defaultTicketState} from "../../types";

const ticket = new Ticket(defaultTicketState);

console.log('use split method to split')
ticket.split();
console.log('use split method to split down')

console.log('use splitByEvenly method to split')
ticket.splitByEvenly();
console.log('use splitByEvenly method to split down')

