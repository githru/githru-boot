import Data from "types/Data";

const data: Data = {
  name: "root",
  value: 16,
  children: [
    {
      name: "types",
      value: 11,
      children: [
        {
          name: "test",
          value: 6,
          children: [
            { name: "augmentation-test.ts", value: 3 },
            { name: "vue-test.ts", value: 3 },
          ],
        },
        { name: "index.d.ts", value: 1 },
        { name: "options.d.ts", value: 1 },
        { name: "plugin.d.ts", value: 1 },
        { name: "typings.d.ts", value: 1 },
        { name: "vue.d.ts", value: 1 },
      ],
    },
    {
      name: "src",
      value: 2,
      children: [
        { name: "transition/transition.js", value: 1 },
        { name: "util/options.js", value: 1 },
      ],
    },
    { name: ".eslintrc", value: 1 },
    { name: "package.json", value: 1 },
    { name: "test/unit/specs/util/options_spec.js", value: 1 },
  ],
};

export default data;
