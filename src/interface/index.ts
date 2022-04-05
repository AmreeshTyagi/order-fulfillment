import { ORDER_STATUS } from "../enum";

export interface IOrderProcessor {
  kitchen: IKitchen;
  dispatcher: ICourierDispatcher;

  receiveOrder(order: IOrder): void;
  prepareOrder(order: IOrder): void;
  dispatchCourier(order: IOrder): void;
}

export interface IKitchen {
  preparedQueue: IOrder[];

  prepareOrder(order: IOrder): Promise<ORDER_STATUS>;
}

export interface IOrder {
  id: String;
  name: String;
  prepTime: Number;
}

export interface ICourierDispatcher {
  arrivedQueue: [ICourier];
  dispatchOrderQueue: [ICourier];
  courierWaitQueue: [ICourier];
  strategy: IDispatchStrategy;
  courierDelay: Number;

  dispatchCourier(order: IOrder);
}

export interface ICourier {
  courierId: String;
  orderId: String;
  arrivedTs: Number;
}

export interface IDispatchStrategy {
  setOrder(order: IOrder): void;
  getOrder(order: IOrder): void;
  setCourier(courier: ICourier): void;
  getCourier(courier: ICourier): void;
}


