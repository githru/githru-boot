// 참고: https://www.30secondsofcode.org/articles/s/js-data-structures-tree
export class TreeNode<T> {
    private _key: string;
    private _value: T;
    private _parent: TreeNode<T> | null;
    private _children: TreeNode<T>[] = [];

    constructor (key: string, value: T, parent: TreeNode<T> | null = null) {
        this._key = key;
        this._value = value;
        this._parent = parent;
    }

    get key(): string {
        return this._key;
    }

    get value(): T {
        return this._value;
    }

    get parent(): TreeNode<T> | null {
        return this._parent;
    }

    get children(): TreeNode<T>[] {
        return this._children;
    }

    get isLeaf(): boolean {
        return this._children.length === 0;
    }

    public removeChild(key: string): void {
        this._children = this._children.filter(child => {
            return child.key !== key
        });
    }
}

export class Tree<T> {
    private root: TreeNode<T>;

    constructor(key: string, value: T) {
        this.root = new TreeNode<T>(key, value, null);
    }

    /**
     * 특정 node로부터 전위순회
     * @param node
     */
    public* preOrderTraversal(node = this.root): Generator<TreeNode<T>> {
        yield node;
        if (!node.isLeaf) {
            for (const child of node.children) {
                yield* this.preOrderTraversal(child);
            }
        }
    }

    /**
     * 특정 노드에 새로운 값을 삽입
     * @param parentKey
     * @param key
     * @param child
     */
    public insert(parentKey: string, key: string, child: T): boolean {
        const parentNode = this.find(parentKey);
        if (!parentNode) {
            return false;
        }
        parentNode.children.push(new TreeNode<T>(key, child, parentNode));
        return true;
    }

    /**
     * key 값을 가지는 노드를 Tree에서 삭제
     * @param key
     */
    public remove(key: string): boolean {
        let removed = false;
        for (const node of this.preOrderTraversal(this.root)) {
            if (node.key === key) {
                node.parent?.removeChild(key);
                removed = true;
            }
        }
        return removed;
    }

    /**
     * key와 일치하는 노드 찾기
     * 일치하는 노드가 없으면 null을 반환
     * @param key
     */
    public find(key: string): TreeNode<T> | null {
        for (const node of this.preOrderTraversal(this.root)) {
            if (node.key === key) return node;
        }
        return null;
    }
}
