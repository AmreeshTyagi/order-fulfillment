import { isNullOrUndefined } from "util";
import { DISPATCH_STRATEGY } from "../../enum";
import { getRandomFromArray } from "../../helper/array.random";
import {
  ICourier,
  IDispatchStrategy,
  IOrder,
  IOrderCourierHandler,
} from "../../interface";

export class Fifo implements IDispatchStrategy {
  preparedQueue: IOrder[];
  courierWaitQueue: ICourier[];

  constructor() {
    this.preparedQueue = [];
    this.courierWaitQueue = [];
  }

  handlePreparedOrder(order: IOrder) {
    // Courier is waiting for order
    if (this.courierWaitQueue.length) {
      //Pick courier
      let courier = this.pickCourier(order);
      //Deliver order with this courier
      this.deliverOrder(courier);
      this.calculateStats(courier, order, new Date().getTime());
    }

    //No courier is available, so push order to queue
    this.preparedQueue.push(order);
  }

  handleArrivedCourier(courier: ICourier) {
    //If any order available in prepared queue
    if (this.preparedQueue.length) {
      //Pick random order
      let order = this.pickOrder();
      courier.orderId = order.id;
      this.deliverOrder(courier);
      this.calculateStats(courier, order, new Date().getTime());
    }

    //If no order available in queue, put courier to waiting line
    this.courierWaitQueue.push(courier);
  }

  pickCourier(order: IOrder) {
    let courier = this.courierWaitQueue.shift();
    courier.orderId = order.id;
    return courier;
  }

  pickOrder() {
    let randomIndex = Math.floor(Math.random() * this.preparedQueue.length);
    let order = this.preparedQueue[randomIndex];
    this.preparedQueue.splice(randomIndex, 1);
    return order;
  }

  deliverOrder(courier: ICourier) {
    console.log(
      `Order id ${courier.orderId} has been delivered by courier id ${courier.courierId}`
    );
  }

  calculateStats(courier: ICourier, order: IOrder, currentTs: number) {
    console.log(
      `Food wait time for order id ${order.id} is  ${
        currentTs - order.preparedAtTs
      }`
    );

    console.log(
      `Arriving wait time for courier id ${courier.courierId} is ${
        currentTs - courier.arrivedAtTs
      }`
    );
  }
}
