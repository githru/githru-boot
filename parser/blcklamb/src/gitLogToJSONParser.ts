import { exampleLog01, exampleResult01 } from "./data/example";

export function gitLogToJSONParser() {
  console.log("This is parser function");
  return "This is parser function";
}

// git log JSON 형태 interface
interface logInfo {
  commit: string | null;
  Author: string | null;
  Email: string | null;
  Date: string | null;
  message: string | null;
  prURL: string | null;
  reviewer: string[] | null;
}

declare let JSONArray: logInfo[];

export function parse01(log: string) {
  // line 별로 분리하기
  const splitByNewLine = log.split(/\r?\n/);

  // 분리한 것들을 쭉 돌면서 각 카테고리별로 담을 예정
  const commit: string[] = [];
  const author: string[] = [];
  const email: string[] = [];
  const date: string[] = [];
  const message: string[] = [];
  const prUrl: string[] = [];
  // reviewer의 경우 2명 이상이 될 수 있으므로 배열로 지정
  const reviewer: string[][] = [];

  // 각 카테고리로 담은 다음 다시 JSON으로 변환하기 위함
  const JSONArray: logInfo[] = [];

  // commit별 reviewer를 분리시키기 위한 임시 index
  let commitIdx = -1;
  splitByNewLine.map((str, idx) => {
    if (str.slice(0, 6) == "commit") {
      commit.push(str.split(" ")[1]);
    }
    if (str.slice(0, 6) == "Author") {
      author.push(str.split(": ")[1].split("<")[0].trim());
      email.push(str.split(": ")[1].split("<")[1].split(">")[0].trim());
    }
    if (str.slice(0, 4) == "Date") {
      date.push(str.split(": ")[1].trim());
      message.push(splitByNewLine[idx + 2].trim());
    }
    if (str.trim().slice(0, 6) == "PR-URL") {
      prUrl.push(str.split(": ")[1].trim());
    }
    // reviewer의 경우 각 commit 별 여러 사람이 될 수 있으니 commit 별로 나눠줘야 한다.
    if (str.slice(0, 6) == "commit") {
      commitIdx += 1;
      reviewer.push([]);
    }
    if (str.trim().slice(0, 11) == "Reviewed-By") {
      reviewer[commitIdx].push(str.split(": ")[1].split("<")[0].trim());
    }
  });

  // console.log("commit", commit);
  // console.log("author", author);
  // console.log("date", date);
  // console.log("message", message);
  // console.log("prURL", prUrl);
  // console.log("reviewer", reviewer);

  // 카테고리 별로 담은 것을 JSON화 시키기
  for (let i = 0; i < commit.length; i++) {
    JSONArray.push({
      commit: null,
      Author: null,
      Email: null,
      Date: null,
      message: null,
      prURL: null,
      reviewer: null,
    });
    JSONArray[i]["commit"] = commit[i];
    JSONArray[i]["Author"] = author[i];
    JSONArray[i]["Email"] = email[i];
    JSONArray[i]["Date"] = date[i];
    JSONArray[i]["message"] = message[i];
    JSONArray[i]["prURL"] = prUrl[i];
    JSONArray[i]["reviewer"] = reviewer[i];
  }

  return JSONArray;
}
