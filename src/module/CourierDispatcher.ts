import { APP_CONSTANT } from "../constant/APP_CONSTANT";
import { delay } from "../helper/delay";
import { getUniformRandom } from "../helper/uniform-random";
import { ICourier, ICourierDispatcher, IOrder } from "../interface";

export class CourierDispatcher implements ICourierDispatcher {
  courierCounter: number;
  courierArrivingMINDelay: number;
  courierArrivingMAXDelay: number;

  constructor() {
    this.courierCounter = 0;
    this.courierArrivingMINDelay = APP_CONSTANT.COURIER_ARRIVING_MIN_DELAY;
    this.courierArrivingMAXDelay = APP_CONSTANT.COURIER_ARRIVING_MAX_DELAY;
  }

  public async dispatchCourier(order: IOrder) {
    //Delay time in seconds
    const delayTime = getUniformRandom(
      this.courierArrivingMINDelay,
      this.courierArrivingMAXDelay
    );
    await delay(delayTime * 1000); // Delay time in ms
    let courier = {} as ICourier;
    courier.courierId = this.courierCounter.toString();
    courier.orderId = order.id;
    this.courierCounter++;
    courier.arrivedAtTs = new Date().getTime();
    return courier;
  }
}
