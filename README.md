Welcome to githru-boot

목적은 아래와 같습니다.
- Project에 필요한 모듈을 미리 만들면서
- GitHub과 친해지기
- **팀원들과 친해지기**
- 코드리뷰에 익숙해지기
- Githru 맛보기

> 생성한 결과물은 리뷰를 거쳐서 githru-vscode-ext repo에 반영 예정입니다.

### Directory Structure
- githru-boot/[module]/[github-id]
- ex) githru-boot/vscode/ytaek

### Ground Rules (대부분 githru-vscode-ext와 동일)
- 개인 Repo로 Fork한 뒤, PR 생성
- 2명 이상 리뷰어의 승인
- Main 이외의 브랜치 생성 금지

### FEATURES
#### VSCODE
- LSP(Language Server Protocol)로 간단한 API 호출 뼈대 생성

#### ENGINE
1. Keyword를 이용한 commit 분류 구분 모듈
1. author별 PR, Review 통계 수집 모듈: Octopus API(https://github.com/topics/octopus-api) 활용

#### VIEW
- Line Chart, Bar chart
- 데이터는 자율적으로 선택 가능