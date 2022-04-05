import {
  ICourier,
  ICourierDispatcher,
  IKitchen,
  IOrder,
  IOrderProcessor,
} from "../interface";

export class OrderProcessor implements IOrderProcessor {
  kitchen: IKitchen;
  dispatcher: ICourierDispatcher;
  courierCounter = 0;

  constructor(kitchen: IKitchen, dispatcher: ICourierDispatcher) {
    this.kitchen = kitchen;
    this.dispatcher = dispatcher;
  }

  receiveOrder(order: IOrder): void {
    this.prepareOrder(order);
    this.dispatchCourier(order);
  }
  prepareOrder(order: IOrder): void {
    this.kitchen.prepareOrder(order);
  }
  dispatchCourier(order: IOrder): void {
    this.dispatcher.dispatchCourier(order);
  }
}
