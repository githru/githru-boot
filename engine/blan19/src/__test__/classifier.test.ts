import { classifier } from "../commit/classifier";

describe("classifier 유닛 테스트", () => {
  test("예상치 못한 커밋 메세지는 ETC로 분류", () => {
    const messages = ["safqwoekgnoqengoke;'qwfm", ""];
    const mapper = classifier(messages);
    const etcInstance = mapper["ETC"];

    expect(etcInstance.messages).toHaveLength(2);
  });
});
