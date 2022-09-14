const axios = require('axios');
const fs = require('fs');

const fileName = "a.txt";

const token = ``;
const repo = "githru/githru-vscode-ext";
// const repo = "${repo}";
const headers = {
    headers: {
        Authorization: `token ${token}`
    },
}
const headerColumns = ["user", "category", "date", "message", "url"];
const printStrs = [];
const printLog = (user, category, date, url, message) => {
    console.log(url);
    printStrs.push([user, category, date, url, message].join("\t"));
};

const getAllPRList = async () => {
    const prs = [];
    const res = await axios.get(`https://api.github.com/repos/${repo}/pulls?state=all&per_page=1000`, headers);
    
    res.data.forEach(pr => {
        prs.push(pr.number);
    });    
    console.log(prs);
    return prs;
}

const getAllIssueList = async () => {
    const issues = [];
    const res = await axios.get(`https://api.github.com/repos/${repo}/issues?state=all&per_page=1000`, headers);
// console.log(res.data);
    res.data
        .filter(data => data.pull_request === undefined)
        .forEach(issue => {
            issues.push(issue.number);
    });    
    console.log(issues);
    return issues;
}


const printByAuthor = async (url, category, dateName = 'created_at', bodyName="body") => {
    const res = await axios.get(url, headers);
// console.log(res.data);
    const dataList = [].concat(res.data);
    dataList.forEach(data => {
        printLog(data.user.login, category, data[dateName], data.html_url ?? url, data[bodyName].replace(/\r?\n|\r/g, ""));
    });
}

const prs = [
    180, 176, 173, 171, 163, 162, 161, 160, 159, 158, 157, 156,
    155, 154, 153, 152, 151, 150, 143, 142, 141, 140, 139, 137,
    136, 135, 134, 133, 132, 131, 130, 129, 127, 122, 121, 120,
    118, 115, 114, 112, 111, 109, 108, 107, 106, 105, 103, 101,
    100,  98,  97,  96,  95,  94,  93,  92,  91,  89,  88,  87,
     86,  83,  82,  81,  80,  76,  75,  74,  73,  72,  67,  66,
     63,  62,  61,  59,  54,  53,  52,  51,  50,  49,  48,  47,
     46,  45,  44,  43,  42,  41,  39,  38,  36,  35,  34,  33,
     30,  26,  20,  19
  ];
const issues = [
    179, 178, 177, 175, 174, 172, 170,
    169, 168, 167, 166, 165, 164, 149,
    148, 147, 146, 145, 144, 138, 128,
    126, 125, 124, 123, 119, 117, 116,
    113, 110, 104, 102,  90,  85,  84
  ];

console.log(headerColumns.join("\t"));
  
const main = async () => {
    //const prs = await getAllPRList();
    // for (const prId of prs) {
    //     let url = `https://api.github.com/repos/${repo}/pulls/${prId}`;
    //     await printByAuthor(url, "pull_request", "created_at", "title");
    // };

    // for (const prId of prs) {
    //     let url = `https://api.github.com/repos/${repo}/pulls/${prId}/comments`;
    //     await printByAuthor(url, "pull_request_review_inline_comment");
    // };

    // for (const prId of prs) {
    //     let url = `https://api.github.com/repos/${repo}/issues/${prId}/comments`;
    //     await printByAuthor(url, "pull_request_comment");
    // };

    // for (const prId of prs) {
    //     let url = `https://api.github.com/repos/${repo}/pulls/${prId}/reviews`;
    //     await printByAuthor(url, "pull_request_review", "submitted_at");
    // };

    // //////////////////////////////////////
    // // ISSUE 
    // const issues = await getAllIssueList();    

    // for (const issueId of issues) {
    //     let url = `https://api.github.com/repos/${repo}/issues/${issueId}`;
    //     await printByAuthor(url, "issue", "created_at", "title");
    // };

    // for (const issueId of issues) {
    //     let url = `https://api.github.com/repos/${repo}/issues/${issueId}/comments`;
    //     await printByAuthor(url, "issue_comment");
    // };

    ////////////////////////////////////
    // reactions
    const issueAndPrs = prs.concat(issues);
    for (const id of issueAndPrs) {
        let url = `https://api.github.com/repos/${repo}/issues/${id}/reactions`;
        await printByAuthor(url, "reactions", "created_at", "content");
    }

    fs.appendFile(fileName, printStrs.join("\n") + "\n", 'utf8', function(err) {});
};

main();