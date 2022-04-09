import chalk from 'chalk';

export class Statistics {
  foodWaitTime: number[]; //Average food wait time (milliseconds) between order ready and pickup
  courierWaitTime: number[]; // Average courier wait time (milliseconds) between arrival and order pickup

  constructor() {
    this.foodWaitTime = [];
    this.courierWaitTime = [];
  }

  recordFoodWaitTime(timetaken: number) {
    this.foodWaitTime.push(timetaken);
  }

  recordCourierWaitTime(timetaken: number) {
    this.courierWaitTime.push(timetaken);
  }
  getAverageFoodWaitTime() {
    const sum = this.foodWaitTime.reduce((a, b) => a + b, 0);
    const avg = sum / this.foodWaitTime.length || 0;
    return avg;
  }

  getAverageCourierWaitTime() {
    const sum = this.courierWaitTime.reduce((a, b) => a + b, 0);
    const avg = sum / this.courierWaitTime.length || 0;
    return avg;
  }

  printAverageStats() {
    const foodWT = this.getAverageFoodWaitTime();
    const courierWT = this.getAverageCourierWaitTime();
    console.log(`${chalk.bgCyan(`Average food wait time: ${foodWT}ms`)}`);
    console.log(`${chalk.bgCyan(`Average courier wait time: ${courierWT}ms`)}`);
  }
}
