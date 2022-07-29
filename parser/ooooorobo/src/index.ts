import {execSync} from "child_process";

// git log 커맨드를 실행
function runGitLogCommand() {
    /**
     * 커밋 하나 당 출력되는 형식
     * - @begin@ 부모 해시, 자기 해시, 작성자 이름, 작성자 메일, 커밋 날짜, 커밋 내용
     * - 추가된 라인, 삭제된 라인, 파일명 (n줄)
     */
    // TODO 1: 커밋 정보에 들어갈 값을 옵션으로 분리
    // TODO 2: 다른 레포지토리에서 git log를 실행 (exec의 cwd option 사용)
    const stdout = execSync('git log --pretty=@begin@%p,%h,%an,%ae,%cd,%s --reverse --numstat');
    return stdout.toString();
}

console.log(runGitLogCommand());
