import { DISPATCH_STRATEGY } from "../../enum";
import { ICourier, IDispatchStrategy, IOrder } from "../../interface";

export class Matched implements IDispatchStrategy {
  handlePreparedOrder(order: IOrder) {
    throw new Error("Method not implemented.");
  }
  handleArrivedCourier(courier: ICourier) {
    throw new Error("Method not implemented.");
  }
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

  pickOrder(order: IOrder) {}
}
