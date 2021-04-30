export const componetsList = [
  {
    name: "el-button",
    attrs: {
      type: {
        value: "primary",
        options: ["primary", "success", "info", "warning", "danger"],
      },
      disabled: {
        value: false,
        options: [true, false],
      },
    },
    text: "按钮",
  },
  {
    name: "el-input",
    attrs: {
      ["v-model"]: "a",
    },
  },
  {
    name: "el-radio",
    attrs: {
      label: "上海",
      ["v-model"]: "a",
    },
  },
  {
    name: "el-row",
    attrs: {
      justify: {
        value: "start",
        options: ["start", "end", "center", "space-around", "space-between"],
      },
    },
    children: [
      {
        name: "el-col",
        attrs: {
          span: 12,
        },
        text: "1",
      },
      {
        name: "el-col",
        attrs: {
          span: 12,
        },
        text: "1",
      },
    ],
  },
];
