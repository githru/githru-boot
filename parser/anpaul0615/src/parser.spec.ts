import { parse } from "./parser"
import { GithruCommit } from "./domain/githru";

describe('parser', () => {
  describe('parse', () => {
    it('git log 출력을 입력으로 받아 GithruCommit 목록을 변환한다', async () => {
      // given
      const fullerGitLog = `
commit 2f7aaf6e3e9c6a5d89e541f41a90b3d260f42570 6d1b8349a6f39f69b50294ae8dc3bd3aca305faf
Author:     paulan <anpaul0615@gmail.com>
AuthorDate: Sun Jul 24 21:44:04 2022 +0900
Commit:     paulan <anpaul0615@gmail.com>
CommitDate: Sun Jul 24 21:44:04 2022 +0900

    chore: 프로젝트 구조 초기화 (copy from parser-ansrlm)
    
    - https://github.com/githru/2022-tutorial/pull/4

2	0	parser/anpaul0615/.eslintignore
19	0	parser/anpaul0615/.eslintrc.json
2	0	parser/anpaul0615/.gitignore
3	0	parser/anpaul0615/.prettierrc.js
3117	0	parser/anpaul0615/package-lock.json
29	0	parser/anpaul0615/package.json
10	0	parser/anpaul0615/scripts/build.js
4	0	parser/anpaul0615/src/index.ts
36	0	parser/anpaul0615/tsconfig.json

commit 6d1b8349a6f39f69b50294ae8dc3bd3aca305faf d3aa564cd1bd2c7d1fbd15e4c6618ffb7259473f
Author:     paulan <anpaul0615@gmail.com>
AuthorDate: Sun Jul 24 21:13:53 2022 +0900
Commit:     paulan <anpaul0615@gmail.com>
CommitDate: Sun Jul 24 21:13:53 2022 +0900

    chore: README 상세 작성

21	0	parser/anpaul0615/README.md

commit d3aa564cd1bd2c7d1fbd15e4c6618ffb7259473f 5e104bd61bd266624bbd968200123ef2d283a533
Author:     paulan <anpaul0615@gmail.com>
AuthorDate: Sun Jul 24 20:45:48 2022 +0900
Commit:     paulan <anpaul0615@gmail.com>
CommitDate: Sun Jul 24 20:45:48 2022 +0900

    init

1	0	parser/anpaul0615/README.md
`;

      // when
      const githruCommits = await parse(fullerGitLog);

      // then
      expect(githruCommits).toBeDefined();
      expect(githruCommits instanceof Array<GithruCommit>).toBe(true);

      expect(githruCommits[0] instanceof GithruCommit).toBe(true);
      expect(githruCommits[0].id).toBe('2f7aaf6e3e9c6a5d89e541f41a90b3d260f42570');
      expect(githruCommits[0].parents).toEqual(['6d1b8349a6f39f69b50294ae8dc3bd3aca305faf']);
      
      expect(githruCommits[1] instanceof GithruCommit).toBe(true);
      expect(githruCommits[1].id).toBe('6d1b8349a6f39f69b50294ae8dc3bd3aca305faf');
      expect(githruCommits[1].parents).toEqual(['d3aa564cd1bd2c7d1fbd15e4c6618ffb7259473f']);
      
      expect(githruCommits[2] instanceof GithruCommit).toBe(true);
      expect(githruCommits[2].id).toBe('d3aa564cd1bd2c7d1fbd15e4c6618ffb7259473f');
      expect(githruCommits[2].parents).toEqual(['5e104bd61bd266624bbd968200123ef2d283a533']);
      expect(githruCommits[2].author).toBe('paulan <anpaul0615@gmail.com>');
      expect(githruCommits[2].authorDate).toBe('Sun Jul 24 20:45:48 2022 +0900');
      expect(githruCommits[2].committer).toBe('paulan <anpaul0615@gmail.com>');
      expect(githruCommits[2].date).toBe('Sun Jul 24 20:45:48 2022 +0900');
      expect(githruCommits[2].message).toBe('init');
      expect(githruCommits[2].diffStat.changedFileCount).toBe(1);
      expect(githruCommits[2].diffStat.insertions).toBe(1);
      expect(githruCommits[2].diffStat.deletions).toBe(0);
      expect(githruCommits[2].diffStat.files['parser/anpaul0615/README.md']).toBeDefined();
      expect(githruCommits[2].diffStat.files['parser/anpaul0615/README.md'].insertions).toBe(1);
      expect(githruCommits[2].diffStat.files['parser/anpaul0615/README.md'].deletions).toBe(0);
    });

    it('fuller format 이 아닌 git log 는 파싱하지 않는다', async () => {
      // given
      const onelineFormatLog = `
ee1b96c (HEAD -> main, origin/main, origin/HEAD) feat: git log 수집기 구현
9b1c249 chore: jest 환경설정
2b0a5eb chore: 코드 구조 작성
2f7aaf6 chore: 프로젝트 구조 초기화 (copy from parser-ansrlm)
6d1b834 chore: README 상세 작성
d3aa564 init
      `;

      // when
      const githruCommits = await parse(onelineFormatLog);

      // then
      expect(githruCommits).toEqual([]);
    });
  });
});
