import { getUniformRandom } from "../src/helper/uniform-random";

describe("Test getUniformRandom", () => {
  test("it should return random number less than max", () => {
    expect(getUniformRandom(3, 15)).toBeLessThan(15);
  });

  test("it should return random number more than min", () => {
    expect(getUniformRandom(3, 15)).toBeGreaterThan(3);
  });

  test("it should return random number more than min & less than max", () => {
    expect(getUniformRandom(3, 15)).toBeLessThan(15);
    expect(getUniformRandom(3, 15)).toBeGreaterThan(3);
  });
});
