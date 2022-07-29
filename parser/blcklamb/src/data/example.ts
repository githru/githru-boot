export const exampleLog01 = `
commit e5add6659d39568c23319508aaf2efe17ca65295 (HEAD -> main, origin/main, origin/HEAD)
Author: Kohei Ueno <kohei.ueno119@gmail.com>
Date:   Fri Jul 29 14:47:56 2022 +0900

    src: fix to use replacement character
    
    PR-URL: https://github.com/nodejs/node/pull/43999
    Fixes: https://github.com/nodejs/node/issues/43962
    Reviewed-By: Antoine du Hamel <duhamelantoine1995@gmail.com>
    Reviewed-By: Mohammed Keyvanzadeh <mohammadkeyvanzade94@gmail.com>
    Reviewed-By: Darshan Sen <raisinten@gmail.com>
    Reviewed-By: LiviaMedeiros <livia@cirno.name>
    Reviewed-By: Feng Yu <F3n67u@outlook.com>

commit 28a9042ee6e95c52f2ec6abcb2da205e22ae2230
Author: Tobias Nießen <tniessen@tnie.de>
Date:   Fri Jul 29 00:00:40 2022 +0200

    src: improve SPKAC::ExportChallenge()
    
    Declare buf as an unsigned char to get rid of the reinterpret_cast and
    do not ignore the return value of ASN1_STRING_TO_UTF8. This also removes
    the need to call strlen() on the result.
    
    PR-URL: https://github.com/nodejs/node/pull/44002
    Reviewed-By: Darshan Sen <raisinten@gmail.com>
    Reviewed-By: Luigi Pinca <luigipinca@gmail.com>
    Reviewed-By: Anna Henningsen <anna@addaleax.net>

commit 0616eafbc8808b6c476d268608e5e33cde3253e4
Author: npm team <ops+robot@npmjs.com>
Date:   Thu Jul 28 11:03:27 2022 -0700

    deps: upgrade npm to 8.15.1
    
    PR-URL: https://github.com/nodejs/node/pull/44013
    Reviewed-By: Mohammed Keyvanzadeh <mohammadkeyvanzade94@gmail.com>
    Reviewed-By: Tobias Nießen <tniessen@tnie.de>
    Reviewed-By: Filip Skokan <panva.ip@gmail.com>
    Reviewed-By: Luigi Pinca <luigipinca@gmail.com>
    `;

export const exampleResult01 = [
  {
    commit: "e5add6659d39568c23319508aaf2efe17ca65295",
    Author: "Kohei Uen",
    Email: "kohei.ueno119@gmail.com",
    Date: "Fri Jul 29 14:47:56 2022 +0900",
    message: "src: fix to use replacement character",
    "PR-URL": "https://github.com/nodejs/node/pull/43999",

    reviewer: [
      "Antoine du Hamel",
      "Mohammed Keyvanzadeh",
      "Darshan Sen",
      "LiviaMedeiros",
      "Feng Yu",
    ],
  },
  {
    commit: "28a9042ee6e95c52f2ec6abcb2da205e22ae2230",
    Author: "Tobias Nießen",
    Email: "tniessen@tnie.de",
    Date: "Fri Jul 29 00:00:40 2022 +0200",
    message: "src: improve SPKAC::ExportChallenge()",
    "PR-URL": "https://github.com/nodejs/node/pull/44002",

    reviewer: ["Darshan Sen", "Luigi Pinca", "Anna Henningsen"],
  },
  {
    commit: "0616eafbc8808b6c476d268608e5e33cde3253e4",
    Author: "npm team",
    Email: "ops+robot@npmjs.com",
    Date: "Thu Jul 28 11:03:27 2022 -0700",
    message: "deps: upgrade npm to 8.15.1",
    "PR-URL": "https://github.com/nodejs/node/pull/44013",

    reviewer: [
      "Mohammed Keyvanzadeh",
      "Tobias Nießen",
      "Filip Skokan",
      "Luigi Pinca",
    ],
  },
];
