import type * as Parser from "../gitLogToJSONParser";
// automock: true configuration 설정때문에 jest.requireActual을 써야함
const { gitLogToJSONParser } = jest.requireActual<typeof Parser>(
  "../gitLogToJSONParser"
);
const { parse01 } = jest.requireActual<typeof Parser>("../gitLogToJSONParser");

import type * as Data from "../data/example";
const { exampleLog01, exampleResult01 } =
  jest.requireActual<typeof Data>("../data/example");

describe("parser function", () => {
  test("temporary parser function", () => {
    expect(gitLogToJSONParser()).toBe("This is parser function");
  });
});

describe("example parser01", () => {
  test("parser01", () => {
    // If it should pass with deep equality, replace "toBe" with "toStrictEqual"
    // serializes to the same string
    expect(parse01(exampleLog01)).toStrictEqual(exampleResult01);
  });
});
export {};
