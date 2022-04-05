import { APP_CONSTANT } from "./constant/APP_CONSTANT";
import {
  ICourierDispatcher,
  IKitchen,
  IOrder,
  IOrderProcessor,
} from "./interface";
import chalk from "chalk";
import * as fs from "fs";
import orderJson from "../bin/dispatch_orders.json";
import { OrderProcessor } from "./module/OrderProcessor";
import { Kitchen } from "./module/Kitchen";
import { delay } from "./helper/delay";
const log = console.log;

class App {
  private static orderData: IOrder[];
  private static orderReceiveCount = APP_CONSTANT.ORDER_RECEIVE_COUNT;
  private static receiveFrequency = APP_CONSTANT.ORDER_RECEIVE_FREQUENCY; //1 sec in ms
  private static orderProcessor: IOrderProcessor;
  private static kitchen: IKitchen;
  private static courierDispatcher: ICourierDispatcher;
  static init(): void {
    log(chalk.blue(`Initilizing application`));
    App.orderData = orderJson as IOrder[];
    App.kitchen = new Kitchen();
    App.orderProcessor = new OrderProcessor(
      this.kitchen,
      this.courierDispatcher
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
