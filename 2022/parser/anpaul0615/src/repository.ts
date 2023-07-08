import * as fs from "fs";
import * as path from "path";

import { GithruCommit } from "./domain/githru";

const writeJSON = (wStream: fs.WriteStream, data: Array<any>) => {
  return new Promise((resolve, reject) => {
    wStream.on('close', resolve)

    wStream.write('[');
    for (let i=0; i<data.length; i++) {
      wStream.write(JSON.stringify(data[i]));
      if (i < data.length - 1) {
        wStream.write(',');
      }
    }
    wStream.write(']');
    wStream.end();
  });
}

export const save = async (repoName: string, githruData: Array<GithruCommit>) => {
  const repoRootPath = path.resolve(process.cwd(), 'git-metadata');
  const filePath = path.resolve(repoRootPath, `${repoName}.commits.json`);

  if (fs.existsSync(filePath)) {
    console.warn('commits.json is already exist..!');
    console.warn('new file overwriting...');
    fs.unlinkSync(filePath);
  }

  const wStream = fs.createWriteStream(filePath, { flags: 'w' });
  await writeJSON(wStream, githruData);

  console.log(`done!! : ${filePath}`);
}
