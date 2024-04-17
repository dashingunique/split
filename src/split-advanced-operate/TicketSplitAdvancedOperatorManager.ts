import {TicketSplitAdvancedOperator} from "./interfaces";

var _ticketSplitAdvanceOperators: TicketSplitAdvancedOperatorManager | undefined = undefined;

class TicketSplitAdvancedOperatorManager {
    private operators: Map<string, TicketSplitAdvancedOperator> = new Map();

    register<T>(name: string, operator: TicketSplitAdvancedOperator) {
        this.operators.set(name, operator);

        return this;
    }

    operator<T extends TicketSplitAdvancedOperator = TicketSplitAdvancedOperator>(name: string): T {
        return this.resolve(name);
    }

    has(name: string): boolean {
        return this.operators.has(name);
    }

    delete(name: string): boolean {
        return this.operators.delete(name);
    }

    clear() {
        this.operators.clear();
    }

    protected resolve<T extends TicketSplitAdvancedOperator = TicketSplitAdvancedOperator>(name: string): T {
        const operator = this.operators.get(name);

        if (!operator) {
            console.error(`name: [${name}] operator not found.`)
        }

        return (operator!) as T;
    }
}

export const ticketSplitAdvancedOperators = _ticketSplitAdvanceOperators ?? new TicketSplitAdvancedOperatorManager();