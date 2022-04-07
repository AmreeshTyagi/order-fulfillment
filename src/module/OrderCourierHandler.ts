import { DISPATCH_STRATEGY, ORDER_STATUS } from "../enum";
import { Notifier } from "./Notifier";
import {
  ICourier,
  IDispatchStrategy,
  IOrder,
  IOrderCourierHandler,
} from "../interface";

export class OrderCourierHandler implements IOrderCourierHandler {
  dispatchStrategy: IDispatchStrategy;

  constructor(dispatchStrategy: IDispatchStrategy) {
    this.dispatchStrategy = dispatchStrategy;
  }
  handlePreparedOrder(order: IOrder) {
    this.dispatchStrategy.handlePreparedOrder(order);
  }
  handleArrivedCourier(courier: ICourier) {
    this.dispatchStrategy.handleArrivedCourier(courier);
  }
}
