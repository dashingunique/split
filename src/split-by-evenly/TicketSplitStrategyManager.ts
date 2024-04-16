import {SplitType} from "../types";
import {TicketSplitStrategy} from "./interfaces";

var _ticketSplitStrategyManager: TicketSplitStrategyManager | undefined = undefined;

export class TicketSplitStrategyManager {
    constructor(
        private strategies: Map<SplitType, TicketSplitStrategy> = new Map(),
        private defaultSplitType: SplitType = SplitType.ByEvenly
    ) {

    }

    strategy(type?: SplitType) {
        return this.resolve(type);
    }

    default(): TicketSplitStrategy {
        return this.resolve();
    }

    addStrategy(strategy: TicketSplitStrategy): this;
    addStrategy(type: SplitType, strategy: TicketSplitStrategy): this;
    addStrategy(strategyType: TicketSplitStrategy | SplitType, strategy?: TicketSplitStrategy): this {
        let currentStrategyType: SplitType;
        let currentStrategy: TicketSplitStrategy;

        if (!strategy) {
            currentStrategyType = (strategyType as TicketSplitStrategy).type;
            currentStrategy = strategyType as TicketSplitStrategy;
        } else {
            currentStrategyType = strategyType as SplitType;
            currentStrategy = strategy;
        }

        this.strategies.set(currentStrategyType, currentStrategy);

        return this;
    }


    protected resolve(type?: SplitType) {
        const defaultSplitType = type ?? this.defaultSplitType;

        const strategy = this.strategies.get(defaultSplitType);

        if (!strategy) {
            console.error(`type: [${defaultSplitType}] split strategy not found.`)
        }

        return strategy!;
    }
}


export const ticketSplitStrategyManager = _ticketSplitStrategyManager ?? new TicketSplitStrategyManager();