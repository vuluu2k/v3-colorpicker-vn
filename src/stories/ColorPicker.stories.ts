import type { Meta, StoryObj } from "@storybook/vue3";
import { VuColorPicker } from "../components/colorpicker";
import "../styles/components/_colorpicker.scss";

const meta = {
  title: "Example/VuColorPicker",
  component: VuColorPicker,
  tags: ["autodocs"],
  argTypes: {
    value: { control: "color" },
    output: { control: "select", options: ["hex", "rgb", "rgba", "hsb"] }
  },
  args: {
    value: "#000000",
    class: "",
    output: "hex",
    cancelText: "Cancel",
    okText: "Apply"
  }
} satisfies Meta<typeof VuColorPicker>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Demo: Story = {
  args: {
    value: "#000000",
    output: "hex",
    cancelText: "Cancel",
    okText: "Apply",
    class: "Test"
  }
};
