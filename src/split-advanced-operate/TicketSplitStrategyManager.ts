import {SplitType} from "../types";
import {TicketSplitStrategy} from "./interfaces";
import {EvenlySplitStrategy} from "./stategies";
import {BySeatSplitStrategy} from "../click-split-button/best/stategies";

var _ticketSplitStrategyManager: TicketSplitStrategyManager | undefined = undefined;

export type TicketSplitStrategyMapping = {
    [SplitType.ByEvenly]: EvenlySplitStrategy;
    [SplitType.BySeat]: BySeatSplitStrategy;
}

export type TicketSplitStrategyInstance<T extends SplitType> = T extends keyof TicketSplitStrategyMapping ?
    TicketSplitStrategyMapping[T]
    : undefined;

export type CurrentTicketSplitType<T extends SplitType | undefined> = T extends undefined ?
    ReturnType<TicketSplitStrategyManager['currentDefaultSplitType']> : T;

export type SpecifyTicketSplitStrategy<T extends TicketSplitStrategy | undefined = undefined> = T extends undefined ?
    TicketSplitStrategyInstance<CurrentTicketSplitType<undefined>>
    : T;

class TicketSplitStrategyManager {
    constructor(
        private strategies: Map<SplitType, TicketSplitStrategy> = new Map(),
        private defaultSplitType: SplitType = SplitType.ByEvenly
    ) {

    }

    strategy<T extends SplitType | undefined>(type?: T): TicketSplitStrategyInstance<CurrentTicketSplitType<T>> {
        return this.resolve(type);
    }

    currentDefaultSplitType(): SplitType {
        return this.defaultSplitType;
    }

    default<T extends TicketSplitStrategy | undefined = undefined>(): SpecifyTicketSplitStrategy<T> {
        return this.resolve() as SpecifyTicketSplitStrategy<T>;
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


    protected resolve<T extends SplitType | undefined>(type?: T): TicketSplitStrategyInstance<CurrentTicketSplitType<T>> {
        const defaultSplitType = type ?? this.defaultSplitType;

        const strategy = this.strategies.get(defaultSplitType);

        if (!strategy) {
            console.error(`type: [${defaultSplitType}] split strategy not found.`)
        }

        return strategy! as TicketSplitStrategyInstance<CurrentTicketSplitType<T>>;
    }
}


export const ticketSplitStrategies = _ticketSplitStrategyManager ?? new TicketSplitStrategyManager();