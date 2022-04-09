import chalk from 'chalk';

import orderJson from '../bin/dispatch_orders.json';
import { APP_CONSTANT } from './constant/APP_CONSTANT';
import { DISPATCH_STRATEGY } from './enum';
import { delay } from './helper/delay';
import { ICourierDispatcher, IDispatchStrategy, IKitchen, IOrder, IOrderCourierHandler, IOrderProcessor } from './interface';
import { CourierDispatcher } from './module/CourierDispatcher';
import { DispatchStrategy } from './module/DispatchStrategy';
import { Kitchen } from './module/Kitchen';
import { OrderCourierHandler } from './module/OrderCourierHandler';
import { OrderProcessor } from './module/OrderProcessor';
import { Statistics } from './module/Statistics';

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
    const STRATEGY = this.getStrategy();

    if (!DISPATCH_STRATEGY.toString(STRATEGY)) {
      log(
        chalk.redBright(
          `Invalid strategy. Please use --strategy=FIFO or --strategy=MATCHED or none. Default is FIFO.`
        )
      );
      return;
    }

    App.orderData = orderJson as IOrder[];
    App.kitchen = new Kitchen();
    App.courierDispatcher = new CourierDispatcher();
    App.statistics = new Statistics();
    App.strategy = new DispatchStrategy(STRATEGY, this.statistics);
    App.handler = new OrderCourierHandler(this.strategy);
    App.orderProcessor = new OrderProcessor(
      this.kitchen,
      this.courierDispatcher,
      this.handler
    );
    App.start(STRATEGY);
  }

  static getStrategy() {
    const STRATEGY = process.env.npm_config_strategy
      ? DISPATCH_STRATEGY.fromString(process.env.npm_config_strategy)
      : APP_CONSTANT.DEFAULT_DISPATCH_STRATEGY;
    return STRATEGY;
  }
  static start(strategy: DISPATCH_STRATEGY): void {
    log(
      chalk.whiteBright(
        `Starting application to process ${chalk.green(
          this.orderData.length.toString()
        )} orders with ${DISPATCH_STRATEGY.toString(strategy)} strategy`
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
      console.log(
        `SENDING ORDER with id ${element.id.substring(24, 36)} name ${
          element.name
        }`
      );
      this.orderProcessor.receiveOrder(element);
    });
  }
}

App.init();
