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

  arrivedQueue: [ICourier];
  dispatchOrderQueue: [ICourier];
  courierWaitQueue: [ICourier];
  strategy: IDispatchStrategy;
  courierDelay: Number;

  constructor() {}

  public async dispatchCourier() {
    await delay(
      getUniformRandom(
        this.courierArrivingMINDelay,
        this.courierArrivingMAXDelay
      )
    );
    let courier = {} as ICourier;
    courier.courierId = this.courierCounter.toString();
    this.courierCounter++;
    courier.arrivedAtTs = new Date().getTime();

    return courier;
  }
}
