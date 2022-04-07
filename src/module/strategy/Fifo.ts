import { DISPATCH_STRATEGY } from "../../enum";
import { ICourier, IDispatchStrategy, IOrder } from "../../interface";

export class Fifo implements IDispatchStrategy {
  preparedQueue: IOrder[];
  courierWaitQueue: [ICourier];
  addOrderToPreparedQueue(order: IOrder): void {
    throw new Error("Method not implemented.");
  }
  removeOrderFromPreparedQueue(order: IOrder): void {
    throw new Error("Method not implemented.");
  }
  addCourierToWaitQueue(courier: ICourier): void {
    throw new Error("Method not implemented.");
  }
  removeCourierFromWaitQueue(courier: ICourier): void {
    throw new Error("Method not implemented.");
  }
}
