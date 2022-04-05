import { DISPATCH_STRATEGY, ORDER_STATUS } from "../enum";

export interface IOrderProcessor {
  kitchen: IKitchen;
  dispatcher: ICourierDispatcher;
  handler: IOrderCourierHandler;

  receiveOrder(order: IOrder): void;
  prepareOrder(order: IOrder): void;
  dispatchCourier(order: IOrder): void;
}

export interface IKitchen {
  preparedQueue: IOrder[];

  prepareOrder(order: IOrder): Promise<IOrder>;
}

export interface IOrder {
  id: String;
  name: String;
  prepTime: Number;
  preparedAtTs?: Number;
}

export interface ICourierDispatcher {
  arrivedQueue: [ICourier];
  dispatchOrderQueue: [ICourier];
  courierWaitQueue: [ICourier];
  strategy: IDispatchStrategy;
  courierDelay: Number;

  dispatchCourier(order: IOrder): Promise<ICourier>;
}

export interface IOrderCourierHandler {
  dispatchStrategy: IDispatchStrategy;
  handlePreparedOrder(order: IOrder);
  addOrderToPreparedQueue(order: IOrder);
  handleArrivedCourier(courier: ICourier);
  addCourierToWaitQueue(courier: ICourier);
}

export interface ICourier {
  courierId: String;
  orderId: String;
  arrivedAtTs: Number;
}

export interface IDispatchStrategy {
  strategy: DISPATCH_STRATEGY;
  addOrderToPreparedQueue(order: IOrder): void;
  removeOrderToPreparedQueue(order: IOrder): void;
  addCourierToWaitQueue(courier: ICourier): void;
  removeCourierToWaitQueue(courier: ICourier): void;
}
