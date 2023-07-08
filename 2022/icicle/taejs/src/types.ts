export type TFileData = {
  name: string; // 파일 혹은 디렉토리 이름
  value?: number; // 변경된 라인 수 
  authors: Record<string, {
      insertion: number;
      deletions: number;
      count: number;
  }>
  children: TFileData[],
}