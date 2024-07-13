# Intro. 🙋🏻‍♀️

안녕하세요! SmartMind라는 스타트업에서 일하고 있는 3년차 Frontend Developer 정소원입니다. <br />
발대식에서는 `태릉인 꿈나무`라는 별명으로 인사드렸었는데요, 요즘 운동을 굉장히 열심히 하고 있어서 해당 키워드를 선정해보았습니다. 🏃🏻‍♀️ <br />

#### 취미 생활

키워드에서도 알 수 있듯이 제 취미 생활은 운동입니다. 크로스핏, 필라테스, 클라이밍 하고있고 셋 다 썩 잘하진 못합니다ㅋㅋㅋ.. 건강을 위해서 2년 전에 필라테스부터 시작해서 클라이밍, 크로스핏까지 시작하게 되었고 어쩌다 보니 이렇게 운동 광인이 되었네요. 혹시 클라이밍 좋아하시거나 관심이 있으신 분들 계시면 같이 하러가요 💪🏻!!!

#### 관심 기술 & 분야

> **Note**
>
> Web, `기술 번역`, Rollup or Vite로 모듈 만들기, `Microfrontend`, `BFF(Backend for Frontend)`

최근에 monorepo로 회사 주요 프로젝트를 migration 하면서, microfrontend에 대해서도 알게되고 자연스럽게 서비스 설계에 관심이 생겨서 공부하고 있는데 관심있으신 분들과 나중에 함께 스터디 하면 좋을 것 같아요!!! 컴퓨터공학을 전공했지만 여전히 정말 모르는게 많아서(학부때 공부 열심히 안했습니다ㅋㅋ..) CS도 함께 공부해요 🤗...

#### TMI

- MBTI는 INTP나 ISTP가 주로 나옵니다.
- 저녁형 인간입니다.
- 코딩하면서 혼잣말 많이 합니다.
- 오픈소스 컨트리뷰톤 2회차 입니다. (2020년에 TypeScript Handbook 번역으로 Microsoft repo에 기여했습니다.)
- 낯가리는데 친해지면 투머치토커입니다.

## Project 소개

- [lsp-example](https://github.com/microsoft/vscode-extension-samples/tree/main/lsp-sample)을 기반
- emoji로 시작하지 않는 line은 syntax에러가 발생하도록 만든 emoji-prefix-extension 입니다.
- 주요기능
  - validation check를 위한 diagnostics
  - 미리 만들어 둔 이모지와 단어 조합을 제공하는 completion provider
    > **INFO**
    >
    > completion provider는 이미 에러가 발생했고 completion provider에 적합한 text가 없는 문장에서는 동작하지 않도록 만들었습니다.

### get started

```node
// run lsp extension
code vscode/ss-won // or vscode로 githru/vscode/ss-won open
npm i
Ctrl(Cmd) + Shift + B -> build // 혹시 에러가 발생하면 npm run clean 한번 돌려주시고 다시 시도하세요~
Run Tab 이동 후 Launcher Client Run -> run
Extension Development Host 창에서 root 경로에 txt 파일을 만들고 text를 입력하면 동작합니다.

// build
npm run clean && npm run build

// test
npm run test:client
```
