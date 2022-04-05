import { DISPATCH_STRATEGY } from "../enum";
import { ICourier, IDispatchStrategy, IOrder } from "../interface";

export class DispatchStrategy implements IDispatchStrategy {
  strategy: DISPATCH_STRATEGY;

  constructor(strategy: DISPATCH_STRATEGY) {
    this.strategy = strategy;
  }
  addOrderToPreparedQueue(order: IOrder): void {
    throw new Error("Method not implemented.");
  }
  removeOrderToPreparedQueue(order: IOrder): void {
    throw new Error("Method not implemented.");
  }
  addCourierToWaitQueue(courier: ICourier): void {
    throw new Error("Method not implemented.");
  }
  removeCourierToWaitQueue(courier: ICourier): void {
    throw new Error("Method not implemented.");
  }
}
