import { APP_CONSTANT } from "./constant/APP_CONSTANT";
import {
  ICourierDispatcher,
  IDispatchStrategy,
  IKitchen,
  IOrder,
  IOrderCourierHandler,
  IOrderProcessor,
} from "./interface";
import chalk from "chalk";
import * as fs from "fs";
import orderJson from "../bin/dispatch_orders.small.json";
import { OrderProcessor } from "./module/OrderProcessor";
import { Kitchen } from "./module/Kitchen";
import { delay } from "./helper/delay";
import { OrderCourierHandler } from "./module/OrderCourierHandler";
import { DISPATCH_STRATEGY } from "./enum";
import { DispatchStrategy } from "./module/DispatchStrategy";
import { CourierDispatcher } from "./module/CourierDispatcher";
import { Statistics } from "./module/Statistics";
const log = console.log;

class App {
  private static orderData: IOrder[];
  private static orderReceiveCount = APP_CONSTANT.ORDER_RECEIVE_COUNT;
  private static receiveFrequency = APP_CONSTANT.ORDER_RECEIVE_FREQUENCY; //1 sec in ms
  private static orderProcessor: IOrderProcessor;
  private static kitchen: IKitchen;
  private static courierDispatcher: ICourierDispatcher;
  private static statistics: Statistics;
  private static handler: IOrderCourierHandler;
  private static strategy: IDispatchStrategy;
  static init(): void {
    log(chalk.blue(`Initilizing application`));
    App.orderData = orderJson as IOrder[];
    App.kitchen = new Kitchen();
    App.courierDispatcher = new CourierDispatcher();
    App.statistics = new Statistics();
    App.strategy = new DispatchStrategy(
      APP_CONSTANT.DISPATCH_STRATEGY,
      this.statistics
    );
    App.handler = new OrderCourierHandler(this.strategy);
    App.orderProcessor = new OrderProcessor(
      this.kitchen,
      this.courierDispatcher,
      this.handler
    );
    App.start();
  }

  static start(): void {
    log(
      chalk.whiteBright(
        `Starting application to process ${chalk.green(
          this.orderData.length.toString()
        )} orders`
      )
    );
    App.processOrderData();
  }

  static processOrderData(): void {
    async function triggerReceive() {
      for (
        let orderIndex = 0;
        orderIndex <= App.orderData?.length;
        orderIndex += App.orderReceiveCount
      ) {
        let batch = [] as IOrder[];
        batch.push(
          ...App.orderData.slice(orderIndex, orderIndex + App.orderReceiveCount)
        );
        if (batch.length > 0) {
          log(
            chalk.green(
              `Requesting order number ${chalk.yellow(
                (orderIndex + 1).toString()
              )} & ${chalk.yellow((orderIndex + 2).toString())}`
            )
          );
          App.receiveOrder(batch);
          await delay(App.receiveFrequency);
        } else {
          setTimeout(function () {
            App.statistics.print();
          }, 2000);
        }
      }
    }

    triggerReceive();
  }

  static receiveOrder(order: IOrder[]) {
    order.forEach((element) => {
      console.log(`Sending order id ${element.id} name ${element.name}`);
      this.orderProcessor.receiveOrder(element);
    });
  }
}

App.init();
