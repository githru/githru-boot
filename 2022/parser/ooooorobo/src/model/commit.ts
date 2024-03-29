export interface Commit {
    commitHash: string;
    parentHashList: string[];
    committedAt: Date;
    title: string;
    author: Author;
    editedFileInfoList: EditedFileInfo[];
}

export interface Author {
    name: string;
    email: string;
}

export interface EditedFileInfo {
    fileName: string;
    addedLineCount: number;
    removedLineCount: number;
}
