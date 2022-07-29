import type * as Parser from "../gitLogToJSONParser";
// automock: true configuration 설정때문에 jest.requireActual을 써야함
const { gitLogToJSONParser } = jest.requireActual<typeof Parser>(
  "../gitLogToJSONParser"
);

describe("parser function", () => {
  test("temporary parser function", () => {
    expect(gitLogToJSONParser()).toBe("This is parser function");
  });
});

export {};
