import { classifyCommits, getCommitMessages } from "./classifier";

export function testClassifyCommit() {

    const commitMessages = getCommitMessages();

    console.log("\nCommit Classification:");
    const commitClassification = classifyCommits(commitMessages);
    for (const commitType in commitClassification) {
        console.log(`${commitType}:`);
        commitClassification[commitType].forEach((commitMessage, index) => {
        console.log(`${index + 1}. ${commitMessage}`);
        });
        console.log("\n");
    }
}