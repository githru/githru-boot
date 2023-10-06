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
    const res = await axios.get(`https://api.github.com/repos/${repo}/pulls?state=all&per_page=100`, headers);
    
    res.data.forEach(pr => {
        prs.push(pr.number);
    });    
    console.log(prs);
    return prs;
}

const getAllIssueList = async () => {
    const issues = [];
    const res = await axios.get(`https://api.github.com/repos/${repo}/issues?state=all&per_page=1000&page=2`, headers);
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
    // console.log(dataList);
    dataList.forEach(data => {
        printLog(data.user.login, category, data[dateName], data.html_url ?? url, data[bodyName].replace(/\r?\n|\r/g, ""));
    });
}

const printCommitByAuthor = async (url, category, dateName = 'created_at') => {
    const res = await axios.get(url, headers);
    const dataList = [].concat(res.data);
    dataList.forEach(data => {
        // console.log(data);
        printLog(data.commit.author.name, category, data.commit.author.date, data.html_url ?? url, data.commit.message.replace(/\r?\n|\r/g, ""));
    });
}

const prs = [
    510, 509, 508, 506, 505, 504, 503, 502, 501, 500, 495,
  494, 493, 491, 490, 489, 487, 486, 485, 481, 478, 477,
  476, 475, 474, 473, 472, 471, 470, 469, 468, 467, 466,
  455, 454, 453, 450, 449, 448, 446, 444, 442, 441, 440,
  438, 437, 436, 434, 433, 431, 430, 429, 428, 425, 416,
  415, 412, 410, 409, 408, 407, 406, 404, 403, 398, 397,
  396, 395, 394, 391, 390, 389, 388, 387, 386, 384, 383,
  382, 381, 380, 378, 377, 374, 371, 369, 367
  ];
const issues = [
    507, 499, 498, 497, 496, 492, 488,
  484, 483, 482, 480, 479, 465, 464,
  463, 462, 461, 460, 459, 458, 457,
  456, 452, 451, 447, 445, 443, 439,
  435, 432, 427, 426, 424, 423, 422,
  421, 420, 419, 418, 417, 414, 413,
  411, 405, 402, 401, 400, 399, 393, 392, 385,
  379, 376, 375, 373, 372, 370, 368, 366,
  365, 364, 363, 362, 361, 360, 359, 358,
  357,
  ];

console.log(headerColumns.join("\t"));
  
const main = async () => {
    // const prs = await getAllPRList();
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

    // for (const prId of prs) {
    //     let url = `https://api.github.com/repos/${repo}/pulls/${prId}/commits`;
    //     await printCommitByAuthor(url, "commit", "sha");
    // };


    //////////////////////////////////////
    // ISSUE 
    // const issues = await getAllIssueList();    

    for (const issueId of issues) {
        let url = `https://api.github.com/repos/${repo}/issues/${issueId}`;
        await printByAuthor(url, "issue", "created_at", "title");
    };

    for (const issueId of issues) {
        let url = `https://api.github.com/repos/${repo}/issues/${issueId}/comments`;
        await printByAuthor(url, "issue_comment");
    };

    // ////////////////////////////////
    // reactions
    // const issueAndPrs = prs.concat(issues);
    // for (const id of issueAndPrs) {
    //     let url = `https://api.github.com/repos/${repo}/issues/${id}/reactions`;
    //     await printByAuthor(url, "reactions", "created_at", "content");
    // }

    fs.appendFile(fileName, printStrs.join("\n") + "\n", 'utf8', function(err) {});
};

main();
