import { delay } from "../helper/delay";
import { getUniformRandom } from "../helper/uniform-random";
import {
  ICourier,
  ICourierDispatcher,
  IDispatchStrategy,
  IOrder,
} from "../interface";

export class CourierDispatcher implements ICourierDispatcher {
  courierCounter = 0;
  courierArrivingMINDelay = 3;
  courierArrivingMAXDelay = 15;

  constructor() {}
  arrivedQueue: [ICourier];
  dispatchOrderQueue: [ICourier];
  courierWaitQueue: [ICourier];
  strategy: IDispatchStrategy;
  courierDelay: Number;

  public async dispatchCourier(order: IOrder) {
    await delay(
      getUniformRandom(
        this.courierArrivingMINDelay,
        this.courierArrivingMAXDelay
      )
    );
    let courier = {} as ICourier;
    courier.orderId = order.id;
    courier.courierId = this.courierCounter.toString();
    this.courierCounter++;
    courier.arrivedAtTs = new Date().getTime();

    return courier;
  }
}
