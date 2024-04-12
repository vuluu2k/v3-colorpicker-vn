import type { Meta, StoryObj } from "@storybook/vue3";
import { VuColorCustom } from "../components/colorcustom";

const meta = {
  title: "Example/VuColorCustom",
  component: VuColorCustom,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "color" },
    output: { control: "select", options: ["hex", "rgb", "rgba", "hsb"] }
  },
  args: {
    value: "#000000",
    themes: [
      ["#ffffff", "#e3e3e3", "#979797", "#4f4f4f", "#000000"],
      ["#e8eaed", "#959ee5", "#384ad3", "#25318d", "#131946"],
      ["#f2decc", "#c2b2a3", "#917a7a", "#615952", "#30243f"],
      ["#d1dbc3", "#abb899", "#7f9463", "#556342", "#2a3121"],
      ["#c7d3d5", "#9aa9ac", "#677e82", "#45575a", "#222a2b"]
    ],
    colors: [
      "#000000",
      "#ffffff",
      "#8b0000",
      "#bada55",
      "#323232",
      "#a2a3e9",
      "#8b8cd6",
      "#e43292",
      "#ed45a0",
      "#aeebc5",
      "#38c68b",
      "#1d2cf3",
      "#b45ad3",
      "#8e3aaa"
    ],
    class: "",
    output: "hex",
    addText: "+ Add",
    editText: "Edit",
    themeText: "Theme colors",
    colorText: "My colors"
  }
} satisfies Meta<typeof VuColorCustom>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {
    value: "#000000",
    output: "hex",
    themes: [
      ["#ffffff", "#e3e3e3", "#979797", "#4f4f4f", "#000000"],
      ["#e8eaed", "#959ee5", "#384ad3", "#25318d", "#131946"],
      ["#f2decc", "#c2b2a3", "#917a7a", "#615952", "#30243f"],
      ["#d1dbc3", "#abb899", "#7f9463", "#556342", "#2a3121"],
      ["#c7d3d5", "#9aa9ac", "#677e82", "#45575a", "#222a2b"]
    ],
    colors: [
      "#000000",
      "#ffffff",
      "#8b0000",
      "#bada55",
      "#323232",
      "#a2a3e9",
      "#8b8cd6",
      "#e43292",
      "#ed45a0",
      "#aeebc5",
      "#38c68b",
      "#1d2cf3",
      "#b45ad3",
      "#8e3aaa"
    ],
    class: "",
    addText: "+ Add",
    editText: "Edit",
    themeText: "Theme colors",
    colorText: "My colors"
  }
};
