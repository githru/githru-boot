import { CommitKeywordMapper } from "./mapper/commitKeywordMapper";

export const classifierOfKeyword = (message: string) => {
  for (const key in CommitKeywordMapper) {
    const keyword = new RegExp(key, "i").exec(message);

    if (!keyword?.length) continue;

    return keyword[0];
  }
};

export const classifier = (messages: string[]) => {
  messages.forEach((message) => {
    const keyword = classifierOfKeyword(message)?.toUpperCase();

    if (keyword && CommitKeywordMapper[keyword])
      CommitKeywordMapper[keyword].collect(message);
    else CommitKeywordMapper["ETC"].collect(message);
  });

  return CommitKeywordMapper;
};
