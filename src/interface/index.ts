export interface IOrderProcessor {
  kitchen: IKitchen;
  dispatcher: ICourierDispatcher;
  handler: IOrderCourierHandler;

  receiveOrder(order: IOrder): void;
  prepareOrder(order: IOrder): void;
  dispatchCourier(order: IOrder): void;
}

export interface IKitchen {
  prepareOrder(order: IOrder): Promise<IOrder>;
}

export interface IOrder {
  id: String;
  name: String;
  prepTime: number;
  preparedAtTs?: number;
}

export interface ICourierDispatcher {
  courierCounter: number;
  courierArrivingMINDelay: number;
  courierArrivingMAXDelay: number;
  dispatchCourier(order: IOrder): Promise<ICourier>;
}

export interface IOrderCourierHandler {
  dispatchStrategy: IDispatchStrategy;
  handlePreparedOrder(order: IOrder);
  handleArrivedCourier(courier: ICourier);
}

export interface ICourier {
  courierId: String;
  orderId: String;
  arrivedAtTs: number;
}

export interface IDispatchStrategy {
  handlePreparedOrder(order: IOrder);

  handleArrivedCourier(courier: ICourier);
}
