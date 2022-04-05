import { DISPATCH_STRATEGY } from "../enum";
import {
  ICourier,
  IDispatchStrategy,
  IOrder,
  IOrderCourierHandler,
} from "../interface";

export class OrderCourierHandler implements IOrderCourierHandler {
  preparedQueue: IOrder[];
  courierWaitQueue: [ICourier];
  dispatchStrategy: IDispatchStrategy;

  constructor(dispatchStrategy: IDispatchStrategy) {
    this.dispatchStrategy = dispatchStrategy;
  }

  handlePreparedOrder(order: IOrder) {
    this.dispatchStrategy.
  }
  handleArrivedCourier(courier: ICourier) {}

  addOrderToPreparedQueue(order: IOrder) {
    this.preparedQueue.push(order);
  }

  addCourierToWaitQueue(courier: ICourier) {
    this.courierWaitQueue.push(courier);
  }
}
