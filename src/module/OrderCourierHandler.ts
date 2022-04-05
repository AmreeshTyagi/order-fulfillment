import { DISPATCH_STRATEGY } from "../enum";
import { ICourier, IOrder, IOrderCourierHandler } from "../interface";

export class OrderCourierHandler implements IOrderCourierHandler {
  preparedQueue: IOrder[];
  courierWaitQueue: [ICourier];
  strategy: DISPATCH_STRATEGY;

  constructor(strategy: DISPATCH_STRATEGY) {
    this.strategy = strategy;
  }

  handlePreparedOrder(order: IOrder) {
    if (this.strategy.valueOf() === DISPATCH_STRATEGY.FIFO) {
      
    }
    throw new Error("Method not implemented.");
  }
  handleArrivedCourier(courier: ICourier) {
    throw new Error("Method not implemented.");
  }

  addOrderToPreparedQueue(order: IOrder) {
    this.preparedQueue.push(order);
  }

  addCourierToWaitQueue(courier: ICourier) {
    this.courierWaitQueue.push(courier);
  }
}
