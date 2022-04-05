import { delay } from "../helper/delay";
import { ORDER_STATUS } from "../enum";
import { IKitchen, IOrder } from "../interface";
import dayjs from "dayjs";

export class Kitchen implements IKitchen {
  preparedQueue: IOrder[];

  constructor() {}
  public async prepareOrder(order: IOrder) {
    await delay(order.prepTime);
    order.preparedAtTs = new Date().getTime();
    return order; // Assuming that order will always be prepared without any issue.
  }

  public getPreparedOrderQueue() {
    return this.preparedQueue;
  }
}
