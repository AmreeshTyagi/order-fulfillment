import { ICourier, ICourierDispatcher, IDispatchStrategy, IOrder } from "../interface";

export class CourierDispatcher implements ICourierDispatcher {
  
  constructor() {}
  arrivedQueue: [ICourier];
  dispatchOrderQueue: [ICourier];
  courierWaitQueue: [ICourier];
  strategy: IDispatchStrategy;
  courierDelay: Number;
  
  dispatchCourier(order: IOrder): void {
    throw new Error("Method not implemented.");
  }


}
