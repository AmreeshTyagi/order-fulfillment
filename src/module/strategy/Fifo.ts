import chalk from "chalk";
import { isNullOrUndefined } from "util";
import { DISPATCH_STRATEGY } from "../../enum";
import { getRandomFromArray } from "../../helper/array.random";
import { getColoredOrderId } from "../../helper/logger";
import {
  ICourier,
  IDispatchStrategy,
  IOrder,
  IOrderCourierHandler,
} from "../../interface";
import { Statistics } from "../Statistics";

export class Fifo implements IDispatchStrategy {
  preparedQueue: IOrder[];
  courierWaitQueue: ICourier[];

  statistics: Statistics;

  constructor(statistics: Statistics) {
    this.preparedQueue = [];
    this.courierWaitQueue = [];
    this.statistics = statistics;
  }

  handlePreparedOrder(order: IOrder) {
    // Check if any Courier is waiting for order
    if (this.courierWaitQueue.length) {
      //Pick courier
      let courier = this.pickCourier(order);
      //Deliver order with this courier
      this.deliverOrder(courier);
      this.calculateStats(courier, order, new Date().getTime());
    } else {
      //No courier is available, so push order to queue
      this.preparedQueue.push(order);
    }
  }

  handleArrivedCourier(courier: ICourier) {
    //If any order available in prepared queue
    console.log(
      `${chalk.blue(`COURIER ARRIVED`)} with id ${courier.courierId}`
    );
    if (this.preparedQueue.length) {
      //Pick random order
      let order = this.pickOrder();
      courier.orderId = order.id;
      this.deliverOrder(courier);
      this.calculateStats(courier, order, new Date().getTime());
    } else {
      this.courierWaitQueue.push(courier);
    }

    //If no order available in queue, put courier to waiting line
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
    console.log(
      `${chalk.yellow(`ORDER PICKED`)} with id ${getColoredOrderId(
        order.id.toString()
      )}`
    );
    return order;
  }

  deliverOrder(courier: ICourier) {
    console.log(
      `${chalk.green(`ORDER DELIVERED`)} with id ${getColoredOrderId(
        courier.orderId.toString()
      )}`
    );
  }

  calculateStats(courier: ICourier, order: IOrder, currentTs: number) {
    const foodWaitTime = currentTs - order.preparedAtTs;
    this.statistics.recordFoodWaitTime(foodWaitTime);
    console.log(`Food waiting time: ${foodWaitTime}ms`);

    const courierWaitTime = currentTs - courier.arrivedAtTs;
    this.statistics.recordCourierWaitTime(courierWaitTime);
    console.log(`Arriving waiting time : ${courierWaitTime}ms`);

    if (this.courierWaitQueue.length == 0 && this.preparedQueue.length == 0) {
      this.statistics.print();
    }
  }
}
