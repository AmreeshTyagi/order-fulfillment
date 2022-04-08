import { DISPATCH_STRATEGY } from "../enum";
import { ICourier, IDispatchStrategy, IOrder } from "../interface";
import { Statistics } from "./Statistics";
import { Fifo } from "./strategy/Fifo";
import { Matched } from "./strategy/Matched";

export class DispatchStrategy implements IDispatchStrategy {
  strategy: IDispatchStrategy;

  constructor(strategy: DISPATCH_STRATEGY, statistics: Statistics) {
    this.strategy =
      strategy == DISPATCH_STRATEGY.FIFO ? new Fifo(statistics) : new Matched(statistics);
  }
  handlePreparedOrder(order: IOrder) {
    this.strategy.handlePreparedOrder(order);
  }
  handleArrivedCourier(courier: ICourier) {
    this.strategy.handleArrivedCourier(courier);
  }
}
