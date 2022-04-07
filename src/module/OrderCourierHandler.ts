import { DISPATCH_STRATEGY } from "../enum";
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
  handlePreparedOrder(order: IOrder) {}
  handleArrivedCourier(courier: ICourier) {}
}
