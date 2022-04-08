import chalk from "chalk";

export const getColoredOrderId = (id: string) => {
  return chalk.hex(`#` + id.substring(30, 36)).bold(id.substring(24, 36));
};
