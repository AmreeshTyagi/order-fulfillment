import { DISPATCH_STRATEGY } from "../enum";
import {
  ICourier,
  ICourierDispatcher,
  IDispatchStrategy,
  IKitchen,
  IOrder,
  IOrderCourierHandler,
  IOrderProcessor,
} from "../interface";

export class OrderProcessor implements IOrderProcessor {
  kitchen: IKitchen;
  dispatcher: ICourierDispatcher;
  handler: IOrderCourierHandler;
  strategy: IDispatchStrategy;

  constructor(
    kitchen: IKitchen,
    dispatcher: ICourierDispatcher,
    handler: IOrderCourierHandler,
  ) {
    this.kitchen = kitchen;
    this.dispatcher = dispatcher;
    this.handler = handler;
  }

  receiveOrder(order: IOrder): void {
    this.prepareOrder(order);
    this.dispatchCourier(order);
  }
  prepareOrder(order: IOrder) {
    this.kitchen.prepareOrder(order).then((order) => {
      this.handler.handlePreparedOrder(order);
    });
  }
  dispatchCourier(order: IOrder): void {
    this.dispatcher.dispatchCourier().then((courier) => {
      this.handler.handleArrivedCourier(courier);
    });
  }
}
