// https://typescript-eslint.io/docs/
// https://typescript-eslint.io/docs/linting/typed-linting

module.exports = {
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:@typescript-eslint/recommended-requiring-type-checking",
  ],
  // 소스 파일을 분석할 때 어떤 패키지를 쓰는지
  parser: "@typescript-eslint/parser",
  parserOptions: {
    // 분석 프로그램에게 프로젝트의 루트 파일의 절대 경로를 알려준다
    tsconfigRootDir: __dirname,
    // 분석 프로그램에게 프로젝트의 tsconfig.json 파일이 어딨는지 알려준다
    project: ["./tsconfig.json"],
  },
  plugins: ["@typescript-eslint"],
  root: true,
};
