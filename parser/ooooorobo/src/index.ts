import {execSync} from "child_process";
import {Commit, EditedFileInfo} from "./model/commit";

const LOG_PREFIX = '@begin@';
const LOG_DELIMITER = ','

// git log 커맨드를 실행
function runGitLogCommand() {
    /**
     * 커밋 하나 당 출력되는 형식
     * - @begin@ 부모 해시, 자기 해시, 작성자 이름, 작성자 메일, 커밋 날짜, 커밋 내용
     * - 추가된 라인, 삭제된 라인, 파일명 (n줄)
     */
    // TODO 1: 커밋 정보에 들어갈 값을 옵션으로 분리
    // TODO 2: 다른 레포지토리에서 git log를 실행 (exec의 cwd option 사용)
    const stdout = execSync(
        `git log --reverse --pretty=${LOG_PREFIX}%p${LOG_DELIMITER}%h${LOG_DELIMITER}%an${LOG_DELIMITER}%ae${LOG_DELIMITER}%cd${LOG_DELIMITER}%s --numstat`
        );
    return stdout.toString();
}

/**
 * git log로 생성된 라인을 커밋 리스트로 파싱
 * @param log
 */
function parseLogIntoCommit(log: string): Commit[] {
    return log
        .split(`${LOG_PREFIX}`)
        .filter(x => Boolean(x))
        .map(commitLog => {
            const lines = commitLog.split('\n');
            // TODO: git log 실행할 때 pretty 옵션에 줬던 순서와 동일하도록 한 곳에서 관리하기
            const [parentHash, commitHash, authorName, authorMail, committedAt, title] = lines[0].split(LOG_DELIMITER);
            const editedFileInfoList: EditedFileInfo[] = lines.splice(1)
                .filter(x => Boolean(x))
                .map(line => {
                    const [addedLineCount, removedLineCount, fileName] = line.trim().split('\t')
                    return {
                        fileName,
                        addedLineCount: Number(addedLineCount) ?? 0,
                        removedLineCount: Number(removedLineCount) ?? 0
                    } as EditedFileInfo;
                });
            return {
                parentHash,
                commitHash,
                committedAt,
                title,
                author: {
                    name: authorName,
                    email: authorMail
                },
                editedFileInfoList
            } as Commit;
        })
}

parseLogIntoCommit(runGitLogCommand())
    .forEach(commit => console.log(commit));
