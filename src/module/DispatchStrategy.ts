import { DISPATCH_STRATEGY } from "../enum";
import { ICourier, IDispatchStrategy, IOrder } from "../interface";
import { Fifo } from "./strategy/Fifo";
import { Matched } from "./strategy/Matched";

export class DispatchStrategy implements IDispatchStrategy {
  strategy: IDispatchStrategy;

  constructor(strategy: DISPATCH_STRATEGY) {
    this.strategy =
      strategy == DISPATCH_STRATEGY.FIFO ? new Fifo() : new Matched();
  }
  addOrderToPreparedQueue(order: IOrder): void {
    this.strategy.addOrderToPreparedQueue(order);
  }
  removeOrderFromPreparedQueue(order: IOrder): void {
    this.strategy.removeOrderFromPreparedQueue(order);
  }
  addCourierToWaitQueue(courier: ICourier): void {
    this.strategy.addCourierToWaitQueue(courier);
  }
  removeCourierFromWaitQueue(courier: ICourier): void {
    this.strategy.removeCourierFromWaitQueue(courier);
  }
}
