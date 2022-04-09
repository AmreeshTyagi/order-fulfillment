import { delay } from '../helper/delay';
import { IKitchen, IOrder } from '../interface';

export class Kitchen implements IKitchen {
  public async prepareOrder(order: IOrder) {
    await delay(order.prepTime * 1000); // in millisecond
    order.preparedAtTs = new Date().getTime();
    return order; // Assuming that order will always be prepared without any issue.
  }
}
