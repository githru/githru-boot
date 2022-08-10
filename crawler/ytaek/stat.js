const axios = require('axios');

// axios.get(`https://api.github.com/repos/githru/githru-feature-practices/pulls?state=all&per_page=1000`)
// .then(res => {

// console.log(res.data);
//     const prs = [];
//     res.data.map(pr => {
//         prs.push(pr.number);
//     })
// console.log(prs);
    
// }).catch(err => console.log(err));


const prs = [
    50, 49, 48, 47, 46, 45, 44, 43, 41, 38, 37,
    36, 35, 34, 32, 31, 30, 29, 28, 27, 26, 25,
    24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14,
    13, 
    12, 11, 10,  9,  8,  7,  
    6,  5,  4,  3,
     2
  ];

const token = ``;

const headers = {
    headers: {
        Authorization: `token ${token}`
    },
}
for (const prId of prs) {
    axios.get(`https://api.github.com/repos/githru/githru-feature-practices/pulls/${prId}/comments`, headers)
    .then(res => {
        const comments = res.data;
        comments.map(comment => {
            console.log(`${prId} review_comment ${comment.user.login}`);
        })
    }).catch(err => console.log(err));
    
    axios.get(`https://api.github.com/repos/githru/githru-feature-practices/issues/${prId}/comments`, headers)
    .then(res => {
        const comments = res.data;
        comments.map(comment => {
            console.log(`${prId} comment ${comment.user.login}`);
        })
    }).catch(err => console.log(err));
    
    axios.get(`https://api.github.com/repos/githru/githru-feature-practices/pulls/${prId}/reviews`, headers)
    .then(res => {
        const reviews = res.data;
        reviews
        .filter(review => review.body !== "")
        .map(review => {
            console.log(`${prId} review ${review.user.login}`);
        })
    }).catch(err => console.log(err));    
}
