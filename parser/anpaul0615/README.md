# parser

## 개요
- git log 명령어로 콘솔에 찍은 내용을 json으로 만들기
- input
   git log 명령어를 이용하여 생성된 문자열들
- output
   githru에서 보여지는 필요정보들 (파일 별 수정/삭제된 라인 수 포함, json)


## 컨셉
- 1\. 최대한 기존 레포 그대로 옮겨(porting)오자
- 2\. 정규식으로 만들어보자


## 참고
- https://github.com/githru/git-metadata-preprocessor/blob/master/code/logGenerator.ipynb
  - https://github.com/githru/git-metadata-preprocessor/blob/master/log/realm-java-gitlog-all-parents-numstat-date.log
  - https://github.com/githru/git-metadata-preprocessor/blob/master/log/realm-java-gitlog-all-parents-numstat-date.log.json
- https://git-scm.com/docs/pretty-formats/2.21.0
- https://www.npmjs.com/package/simple-git
- https://www.npmjs.com/package/git-log-parser
