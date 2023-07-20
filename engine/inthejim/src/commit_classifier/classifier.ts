import { execSync } from "child_process";

export function getCommitMessages(): string[] {
    try {
        const stdout = execSync("git log --pretty=format:%s").toString();
        return stdout.trim().split("\n");
    } catch (error) {
        console.error("Error executing 'git log' command:", error);
        return [];
    }
}

function hasKeyword(commitMessage: string, keyword: string): boolean {
    return commitMessage.toLowerCase().includes(keyword.toLowerCase());
}

export function classifyCommits(commitMessages: string[]): Record<string, string[]> {
    const commitClassification: Record<string, string[]> = {
        "Feature Enhancement": [],
        "Bug Fix": [],
        "Documentation Update": [],
        "Style": [],
        "Refactoring": [],
        "Test Update": [],
        "Chore": [],
        "Performance": [],
        "Other": [],
    };

    commitMessages.forEach((commitMessage) => {
        if (
        hasKeyword(commitMessage, "feature") ||
        hasKeyword(commitMessage, "feat") ||
        hasKeyword(commitMessage, "add:")
        ) {
        commitClassification["Feature Enhancement"].push(commitMessage);
        } else if (
        hasKeyword(commitMessage, "bug") ||
        hasKeyword(commitMessage, "fix")
        ) {
        commitClassification["Bug Fix"].push(commitMessage);
        } else if (
        hasKeyword(commitMessage, "documentation") ||
        hasKeyword(commitMessage, "docs") ||
        hasKeyword(commitMessage, "doc")
        ) {
        commitClassification["Documentation Update"].push(commitMessage);
        } else if (hasKeyword(commitMessage, "style")) {
        commitClassification["Style"].push(commitMessage);
        } else if (hasKeyword(commitMessage, "refactor")) {
        commitClassification["Refactoring"].push(commitMessage);
        } else if (hasKeyword(commitMessage, "test")) {
        commitClassification["Test Update"].push(commitMessage);
        } else if (hasKeyword(commitMessage, "chore")) {
        commitClassification["Chore"].push(commitMessage);
        } else if (hasKeyword(commitMessage, "perf")) {
        commitClassification["Performance"].push(commitMessage);
        } else {
        commitClassification["Other"].push(commitMessage);
        }
    });

    return commitClassification;
}


