import {Tree} from "../model/tree";

describe('Tree 작동 테스트', () => {
    const tree = new Tree('A', 'A');
    test('insert 테스트', () => {
        expect(tree.insert('A', 'B', 'B')).toBe(true);
        expect(tree.insert('A', 'C', 'C')).toBe(true);
        expect(tree.insert('C', 'D', 'D')).toBe(true);
        expect([...tree.preOrderTraversal()].map(n => n.key))
            .toEqual(['A', 'B', 'C', 'D']);
    });
    test('존재하는 노드 find 테스트', () => {
        const found = tree.find('D');
        expect(found).not.toBe(null);
        expect(found?.key).toBe('D');
    })
    test('존재하지 않는 노드 find 테스트', () => {
        expect(tree.find('F')).toBe(null);
    })
    test('key가 존재하는 노드 삭제 테스트', () => {
        expect(tree.remove('B')).toBe(true);
        expect(tree.find('A')?.children.length).toBe(1);
        expect(tree.find('B')).toBe(null);
    });
    test('key가 존재하지 않는 노드 삭제 테스트', () => {
        expect(tree.remove('F')).toBe(false);
    });
})
