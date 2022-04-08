import chalk from "chalk";
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
    handler: IOrderCourierHandler
  ) {
    this.kitchen = kitchen;
    this.dispatcher = dispatcher;
    this.handler = handler;
  }

  receiveOrder(order: IOrder): void {
    console.log(
      `${chalk.yellow(`ORDER RECEIVED`)} with id ${chalk
        .hex(`#` + order.id.substring(30, 36))
        .bold(order.id.substring(24, 36))}`
    );
    this.prepareOrder(order);
    this.dispatchCourier();
  }
  prepareOrder(order: IOrder) {
    this.kitchen.prepareOrder(order).then((order) => {
      console.log(
        `${chalk.blue(`ORDER PREPARED`)} with id ${chalk
          .hex(`#` + order.id.substring(30, 36))
          .bold(order.id.substring(24, 36))}`
      );
      this.handler.handlePreparedOrder(order);
    });
  }
  dispatchCourier(): void {
    console.log(`${chalk.yellow(`COURIER DISPATCHED`)}`);
    this.dispatcher.dispatchCourier().then((courier) => {
      this.handler.handleArrivedCourier(courier);
    });
  }
}
