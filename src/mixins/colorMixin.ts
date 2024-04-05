import { rgbToHsb, hsbToRgb, hexToRgb, rgbToHex, rgbaToArray, removeAccents } from "../utils";
import { ComponentOptionsMixin } from "vue";

type dataType = {
  hex: string;
  hsb: {
    hue: number;
    saturation: number;
    brightness: number;
  };
  rgb: {
    red: number;
    green: number;
    blue: number;
  };
  alpha: number;
};

const colorMixin: ComponentOptionsMixin = {
  emits: ["change", "update:value", "blur"],
  props: {
    value: {
      type: String,
      default: "#000000"
    }
  },
  /**
   * Retrieves the data object with hex, hsb, and rgb properties.
   *
   * @return {dataType} the data object
   */
  data(): dataType {
    return {
      hex: "#000000",
      hsb: { hue: 0, saturation: 0, brightness: 0 },
      rgb: { red: 0, green: 0, blue: 0 },
      alpha: 100
    };
  },
  /**
   * Method called when the component is mounted.
   */
  mounted() {
    this.handleRecalcColor(this.value);
  },
  computed: <ComponentOptionsMixin>{
    alphaMark: {
      get() {
        return this.alpha;
      },
      set(value: number) {
        this.alpha = value;
      }
    },
    saturationMark: {
      get() {
        return this.hsb.saturation;
      },
      set(value: number) {
        this.hsb.saturation = value;
      }
    },
    brightnessMark: {
      get() {
        return this.hsb.brightness;
      },
      set(value: number) {
        this.hsb.brightness = value;
      }
    },
    hueMark: {
      get() {
        return this.hsb.hue;
      },
      set(value: number) {
        this.hsb.hue = value;
      }
    },
    redMark: {
      get() {
        return this.rgb.red;
      },
      set(value: number) {
        this.rgb.red = value;
      }
    },
    greenMark: {
      get() {
        return this.rgb.green;
      },
      set(value: number) {
        this.rgb.green = value;
      }
    },
    blueMark: {
      get() {
        return this.rgb.blue;
      },
      set(value: number) {
        this.rgb.blue = value;
      }
    },
    hexMark: {
      get() {
        return this.hex;
      },
      set(value: string) {
        const valueAccents = removeAccents(value).replace(/#|\s/g, "");
        if ([6, 8].includes(valueAccents.length)) {
          this.hex = `#${valueAccents}`;
        }
      }
    }
  },
  methods: {
    /**
     * Handle RGB values and update HSB and HEX values accordingly.
     *
     * @param {number} red - The red value of the RGB color.
     * @param {number} green - The green value of the RGB color.
     * @param {number} blue - The blue value of the RGB color.
     * @return {void}
     */
    handleRgb(red: number, green: number, blue: number): void {
      [this.hsb.hue, this.hsb.saturation, this.hsb.brightness] = rgbToHsb(red, green, blue);
      this.hex = `#${rgbToHex(red, green, blue)}`;
    },
    /**
     * Handle the given hex value by converting it to RGB, updating RGB and alpha values,
     * and then converting RGB to HSB.
     *
     * @param {string} value - the hex value to be handled
     * @return {void}
     */
    handleHex(value: string): void {
      const [red, green, blue, alpha] = hexToRgb(value);
      this.rgb = { red, green, blue };
      this.alpha = Math.round((alpha / 255) * 100);
      [this.hsb.hue, this.hsb.saturation, this.hsb.brightness] = rgbToHsb(red, green, blue);
    },
    /**
     * A description of the entire function.
     *
     * @param {number} hue - description of parameter
     * @param {number} saturation - description of parameter
     * @param {number} brightness - description of parameter
     * @return {void}
     */
    handleHsb(hue: number, saturation: number, brightness: number): void {
      [this.rgb.red, this.rgb.green, this.rgb.blue] = hsbToRgb(hue, saturation, brightness);
      this.hex = `#${rgbToHex(this.rgb.red, this.rgb.green, this.rgb.blue)}`;
    },
    /**
     * Handles the recalculation of color based on the input color value.
     *
     * @param {string} color - the input color value
     * @return {void}
     */
    handleRecalcColor(color: string): void {
      if (color.startsWith("#")) {
        this.hex = color;
        this.handleHex(color);
      } else if (color.startsWith("rgb")) {
        const [red, green, blue, alpha] = rgbaToArray(color);
        this.rgb = { red, green, blue };
        this.alpha = alpha * 100;
        this.handleRgb(red, green, blue);
      }
    },
    /**
     * A function that handles color change based on the type provided.
     *
     * @param {string} type - the type of color change ("hex", "rgb", or "hsb")
     * @return {void}
     */
    handleColorChange(type: string): void {
      switch (type) {
        case "hex":
          this.handleHex(this.hex);
          break;
        case "rgb":
          this.handleRgb(this.rgb.red, this.rgb.green, this.rgb.blue);
          break;
        case "hsb":
          this.handleHsb(this.hsb.hue, this.hsb.saturation, this.hsb.brightness);
      }
    },
    /**
     * A function that saves the current selection in the window.
     */
    savedSelection() {
      const sel = window.getSelection();
      if (sel?.rangeCount !== 0) {
        this.selection = window.getSelection()?.getRangeAt(0);
      }
    },
    /**
     * Restores the previous selection if available.
     */
    restoreSelection() {
      if (this.selection) {
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(this.selection);
      }
    }
  }
};

export default colorMixin;
