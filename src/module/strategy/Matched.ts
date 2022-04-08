import chalk from "chalk";
import { getColoredId } from "../../helper/logger";
import orderJson from "../../../bin/dispatch_orders.small.json";

import { ICourier, IDispatchStrategy, IOrder } from "../../interface";
import { Statistics } from "../Statistics";

export class Matched implements IDispatchStrategy {
  preparedQueue: IOrder[];
  courierWaitQueue: ICourier[];
  deliveryCounter: number;
  statistics: Statistics;

  constructor(statistics: Statistics) {
    this.preparedQueue = [];
    this.courierWaitQueue = [];
    this.statistics = statistics;
    this.deliveryCounter = 0;
  }

  handlePreparedOrder(order: IOrder) {
    // Check if any Courier is waiting for order
    if (this.courierWaitQueue.length) {
      //Pick courier
      let courier = this.pickCourier(order);
      //Deliver order with this courier
      if (courier) {
        this.deliverOrder(courier);
        this.recordStats(courier, order, new Date().getTime());
      } else {
        this.preparedQueue.push(order);
      }
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
      const order = this.pickOrder(courier);
      if (order) {
        this.deliverOrder(courier);
        this.recordStats(courier, order, new Date().getTime());
      } else {
        this.courierWaitQueue.push(courier);
      }
    } else {
      this.courierWaitQueue.push(courier);
    }

    //If no order available in queue, put courier to waiting line
  }

  pickCourier(order: IOrder) {
    // Pick courier if it has given order assigned.
    const courierIndex = this.courierWaitQueue.findIndex(
      (courier) => courier.orderId == order.id
    );
    if (courierIndex > -1) {
      const courier = this.courierWaitQueue[courierIndex];
      // Remove from queue once courier is ready for pickup
      this.courierWaitQueue.splice(courierIndex, 1);
      return courier;
    } else {
      return null;
    }
  }

  pickOrder(courier: ICourier) {
    // Pick order if it is assigned to given courier.
    const orderIndex = this.preparedQueue.findIndex(
      (order) => order.id == courier.orderId
    );
    if (orderIndex > -1) {
      const order = this.preparedQueue[orderIndex];
      // Remove from queue once order is pickedup
      this.preparedQueue.splice(orderIndex, 1);
      console.log(
        `${chalk.yellow(`ORDER PICKED`)} with id ${getColoredId(
          order.id.toString()
        )}`
      );
      return order;
    } else {
      return null;
    }
  }

  deliverOrder(courier: ICourier) {
    this.deliveryCounter++;
    console.log(
      `${chalk.green(`ORDER DELIVERED`)} with id ${getColoredId(
        courier.orderId.toString()
      )}`
    );
  }

  recordStats(courier: ICourier, order: IOrder, currentTs: number) {
    const foodWaitTime = currentTs - order.preparedAtTs;
    this.statistics.recordFoodWaitTime(foodWaitTime);
    console.log(
      `${chalk.cyan(`Food waiting time for order`)} ${getColoredId(
        order.id.toString()
      )}: ${chalk.whiteBright(foodWaitTime.toString())}ms`
    );

    const courierWaitTime = currentTs - courier.arrivedAtTs;
    this.statistics.recordCourierWaitTime(courierWaitTime);
    console.log(
      `${chalk.cyan(`Arriving waiting time for courier`)} ${getColoredId(
        courier.courierId.toString()
      )}: ${chalk.whiteBright(courierWaitTime.toString())}ms`
    );

    if (this.deliveryCounter == orderJson.length) {
      this.statistics.print();
    }
  }
}
