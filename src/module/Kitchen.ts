import { delay } from "../helper/delay";
import { ORDER_STATUS } from "../enum";
import { IKitchen, IOrder } from "../interface";

export class Kitchen implements IKitchen {
  preparedQueue: IOrder[];

  constructor() {}
  public async prepareOrder(order: IOrder) {
    await delay(order.prepTime);
    this.preparedQueue.push(order);
    return ORDER_STATUS.PREPARED; // Assuming that order will always be prepared without any issue.
  }

  public getPreparedQueue() {
    return this.preparedQueue;
  }
}
