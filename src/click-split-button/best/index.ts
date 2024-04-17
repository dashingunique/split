import {Ticket} from "./Ticket";
import {defaultTicketState} from "../../types";
import {cloneDeep} from "lodash";

const ticket = new Ticket(cloneDeep(defaultTicketState));

console.log('---------------------------------------------------')
console.log('use split method to split')
const splits = ticket.split();
console.log('use split method to split down')
console.log('splits', splits);
console.log('---------------------------------------------------')
console.log('\r')
console.log('\r')
console.log('\r')


console.log('---------------------------------------------------')
console.log('use splitByEvenly method to split')
const ticket2 = new Ticket(cloneDeep(defaultTicketState));
const evenlySplits = ticket2.splitByEvenly();
console.log('use splitByEvenly method to split down')
console.log('evenlySplits', evenlySplits);
console.log('---------------------------------------------------')

