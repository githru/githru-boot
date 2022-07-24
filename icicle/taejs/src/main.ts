import './style.css';
import * as d3 from 'd3';
import { TFileData } from './types';

const WIDTH = 600;
const HEIGHT = 400;

const getData = async (): Promise<TFileData> => {
  const response = await fetch('/data.json');
  return response.json();
}

// https://observablehq.com/@d3/icicle 참고
const drawIcicleTree = async (data: TFileData) => {
  const $container = d3.select('#icicle')
    .attr('width', WIDTH)
    .attr('height', HEIGHT);

  // icicle tree를 위한 hierarchy 데이터 생성
  // https://github.com/d3/d3-hierarchy/blob/v3.1.2/README.md#hierarchy
  const hierachy = d3.hierarchy(data);

  // hierarchy 데이터를 그리기전에 필수로 호출
  // 트리를 순회하면서 leaf의 값을 상위로 끌어올림 (post order traversal)
  // 호출 대상을 변형함(mutating function)  
  // https://observablehq.com/@d3/visiting-a-d3-hierarchy#count
  hierachy.count();

  // githru FileIcicleSummary 따라서 value 내림차순 정렬
  hierachy.sort((a, b) => (b.value ?? 0) - (a.value ?? 0));

  // icicle tree 생성 
  // https://github.com/d3/d3-hierarchy/blob/v3.1.2/README.md#partition
  const partition = d3.partition<TFileData>()
    .size([HEIGHT, WIDTH])(hierachy);

  // 파티션 위치 설정
  const cell = $container.selectAll('g')
    .data(partition.descendants())
    .join('g')
      .attr('transform', d => `translate(${d.y0},${d.x0})`);

  // 파티션 각 영역 그리기
  cell.append('rect')
    .attr('width', d => d.y1 - d.y0)
    .attr('height', d => d.x1 - d.x0);
}

const main = async () => {
  const data = await getData();
  drawIcicleTree(data);
}

main();