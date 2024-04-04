<script>
import { hexToRgb, rgbToHex, hsbToRgb, rgbToHsb, rgbaRegex, removeAccents } from "../../utils";
export default {
  emits: ["change", "blur", "update:value"],
  props: {
    value: {
      type: String,
      default: "#000000"
    },
    class: {
      type: String,
      default: ""
    },
    output: {
      type: String,
      default: "hex"
    },
    cancelText: {
      type: String,
      default: "Cancel"
    },
    okText: {
      type: String,
      default: "Apply"
    }
  },
  data() {
    return {
      selector: "hex",
      listSelector: ["hex", "rgb", "hsb"],
      clientX: 0,
      clientY: 0,
      hsb: {
        hue: 0,
        saturation: 0,
        brightness: 0
      },
      rgb: {
        red: 0,
        green: 0,
        blue: 0
      },
      hex: "#000000",
      alpha: -1,
      clientXGradient: 0,
      clientXAlpha: 0,
      selection: null
    };
  },
  mounted() {
    if (this.value.startsWith("#")) {
      this.hex = this.value;
      this.handleHex(this.value);
    }
    if (this.value.startsWith("rgb")) {
      const matches = this.value.match(rgbaRegex);

      if (matches) {
        this.rgb.red = parseInt(matches[1]);
        this.rgb.green = parseInt(matches[2]);
        this.rgb.blue = parseInt(matches[3]);
        this.alpha = matches[4] ? parseFloat(matches[4]) * 100 : 100;
      }
      this.handleRgb(this.rgb.red, this.rgb.green, this.rgb.blue);
    }
  },
  computed: {
    topSelect() {
      return `${this.clientY}px`;
    },
    leftSelect() {
      return `${this.clientX}px`;
    },
    backgroundGradient() {
      const [red, green, blue] = hsbToRgb(this.hsb.hue, 100, 100);
      return `rgb(${red},${green},${blue})`;
    },
    backgroundPicker() {
      return `rgb(${this.rgb.red},${this.rgb.green},${this.rgb.blue})`;
    },
    backgroundBlock() {
      return `rgba(${this.rgb.red},${this.rgb.green},${this.rgb.blue}, ${this.alpha / 100})`;
    },
    alphaMark: {
      get() {
        return Math.round(this.alpha);
      },
      set(value) {
        this.alpha = value;
      }
    },
    saturationMark: {
      get() {
        return Math.round(this.hsb.saturation);
      },
      set(value) {
        this.hsb.saturation = value;
      }
    },
    brightnessMark: {
      get() {
        return Math.round(this.hsb.brightness);
      },
      set(value) {
        this.hsb.brightness = value;
      }
    },
    hueMark: {
      get() {
        return Math.round(this.hsb.hue);
      },
      set(value) {
        this.hsb.hue = value;
      }
    },
    redMark: {
      get() {
        return Math.round(this.rgb.red);
      },
      set(value) {
        this.rgb.red = value;
      }
    },
    greenMark: {
      get() {
        return Math.round(this.rgb.green);
      },
      set(value) {
        this.rgb.green = value;
      }
    },
    blueMark: {
      get() {
        return Math.round(this.rgb.blue);
      },
      set(value) {
        this.rgb.blue = value;
      }
    },
    hexMark: {
      get() {
        return this.hex;
      },
      set(value) {
        const valueAccents = removeAccents(value).replace(/#|\s/g, "");
        if ([6, 8].includes(valueAccents.length)) {
          this.hex = `#${valueAccents}`;
        }
      }
    }
  },
  methods: {
    updateSaturationAndBrightness() {
      const rect = this.$refs.pickerSaturation.getBoundingClientRect();
      const saturation = ((this.clientX + 8) / rect.width) * 100;
      const brightness = 100 - ((this.clientY + 8) / rect.height) * 100;
      this.hsb.saturation = saturation;
      this.hsb.brightness = brightness;
      this.handleColorChange("hsb");
    },
    updateHue() {
      const gradientRect = this.$refs.pickerGradient.getBoundingClientRect();
      const hue = ((this.clientXGradient + 6) / gradientRect.width) * 360;
      this.hsb.hue = hue;
      this.handleColorChange("hsb");
    },
    updateAlpha() {
      const alphaRect = this.$refs.pickerAlpha.getBoundingClientRect();
      const alpha = ((this.clientXAlpha + 6) / alphaRect.width) * 100;
      this.alpha = alpha;
      const hexOpacity = (alpha / 100) * (255).toString(16).padStart(2, "0");
      this.hex = `#${this.hex.replace("#", "").slice(0, 6)}${hexOpacity}`;
    },
    updateColorFromHsb(h = this.hsb.hue, s = this.hsb.saturation, b = this.hsb.brightness) {
      [this.rgb.red, this.rgb.green, this.rgb.blue] = hsbToRgb(h, s, b);
      this.hex = `#${rgbToHex(this.rgb.red, this.rgb.green, this.rgb.blue)}`;
    },
    handleColorChange(type = this.selector) {
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

      this.$emit("change", {
        hex: this.hex,
        rgb: this.rgb,
        hsb: this.hsb,
        selection: this.selection
      });
      this.$emit("update:value", this[this.output]);
    },
    handleRgb(red, green, blue) {
      [this.hsb.hue, this.hsb.saturation, this.hsb.brightness] = rgbToHsb(red, green, blue);
      this.hex = `#${rgbToHex(red, green, blue)}`;
    },
    handleHex(value) {
      const replaceValue = value.replace("#", "");
      const getValue =
        replaceValue.length == 7
          ? replaceValue.slice(0, 6)
          : replaceValue.length >= 8
            ? replaceValue.slice(0, 8)
            : replaceValue;

      const [red, green, blue, alpha] = hexToRgb(getValue);
      this.rgb = { red, green, blue };
      this.alpha = (alpha / 255) * 100;
      [this.hsb.hue, this.hsb.saturation, this.hsb.brightness] = rgbToHsb(red, green, blue);
    },
    handleHsb(hue, saturation, brightness) {
      [this.rgb.red, this.rgb.green, this.rgb.blue] = hsbToRgb(hue, saturation, brightness);
      this.hex = `#${rgbToHex(this.rgb.red, this.rgb.green, this.rgb.blue)}`;
    },
    // Mouse move event
    onMouseDown(event) {
      event.preventDefault();
      const selectRect = this.$refs.pickerSelect.getBoundingClientRect();
      this.clientX = event.clientX - selectRect.left - 8;
      this.clientY = event.clientY - selectRect.top - 8;
      this.updateSaturationAndBrightness();
      document.addEventListener("mousemove", this.onMouseMove);
      document.addEventListener("mouseup", this.onMouseUp);
    },
    onMouseMove(event) {
      const selectRect = this.$refs.pickerSelect.getBoundingClientRect();
      if (selectRect.top < event.clientY && event.clientY < selectRect.bottom)
        this.clientY = event.clientY - selectRect.top - 8;
      if (selectRect.left < event.clientX && event.clientX < selectRect.right)
        this.clientX = event.clientX - selectRect.left - 8;
      if (event.clientX > selectRect.right) this.clientX = selectRect.width - 8;
      if (event.clientX < selectRect.left) this.clientX = -8;
      if (event.clientY > selectRect.bottom) this.clientY = selectRect.height - 8;
      if (event.clientY < selectRect.top) this.clientY = -8;
      this.updateSaturationAndBrightness();
    },
    onMouseUp(event) {
      document.removeEventListener("mousemove", this.onMouseMove);
      document.removeEventListener("mouseup", this.onMouseUp);
    },
    onMouseDownGradient(event) {
      event.preventDefault();
      const gradientRect = this.$refs.pickerGradient.getBoundingClientRect();
      this.clientXGradient = event.clientX - gradientRect.left - 8;
      this.updateHue();
      document.addEventListener("mousemove", this.onMouseMoveGradient);
      document.addEventListener("mouseup", this.onMouseUpGradient);
    },
    onMouseMoveGradient(event) {
      const gradientRect = this.$refs.pickerGradient.getBoundingClientRect();
      if (gradientRect.left < event.clientX && event.clientX < gradientRect.right)
        this.clientXGradient = event.clientX - gradientRect.left - 6;
      if (event.clientX > gradientRect.right) this.clientXGradient = gradientRect.width - 6;
      if (event.clientX < gradientRect.left) this.clientXGradient = -6;
      this.updateHue();
    },
    onMouseUpGradient(event) {
      document.removeEventListener("mousemove", this.onMouseMoveGradient);
      document.removeEventListener("mouseup", this.onMouseUpGradient);
    },
    onMouseDownAlpha(event) {
      event.preventDefault();
      const alphaRect = this.$refs.pickerAlpha.getBoundingClientRect();
      this.clientXAlpha = event.clientX - alphaRect.left - 8;
      this.updateAlpha();
      document.addEventListener("mousemove", this.onMouseMoveAlpha);
      document.addEventListener("mouseup", this.onMouseUpAlpha);
    },
    onMouseMoveAlpha(event) {
      const alphaRect = this.$refs.pickerAlpha.getBoundingClientRect();
      if (alphaRect.left < event.clientX && event.clientX < alphaRect.right)
        this.clientXAlpha = event.clientX - alphaRect.left - 6;
      if (event.clientX > alphaRect.right) this.clientXAlpha = alphaRect.width - 6;
      if (event.clientX < alphaRect.left) this.clientXAlpha = -6;
      this.updateAlpha();
    },
    onMouseUpAlpha(event) {
      document.removeEventListener("mousemove", this.onMouseMoveAlpha);
      document.removeEventListener("mouseup", this.onMouseUpAlpha);
    },
    onMouseDownInput(event) {
      this.savedSelection();
    },
    onMouseUpInput(event) {
      event.preventDefault();
    },
    savedSelection() {
      const sel = window.getSelection();
      if (sel.rangeCount !== 0) {
        this.selection = window.getSelection().getRangeAt(0);
      }
    },
    restoreSelection() {
      if (this.selection) {
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(this.selection);
      }
    }
  },
  beforeUnmount() {
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);
    document.removeEventListener("mousemove", this.onMouseMoveGradient);
    document.removeEventListener("mouseup", this.onMouseUpGradient);
    document.removeEventListener("mousemove", this.onMouseMoveAlpha);
    document.removeEventListener("mouseup", this.onMouseUpAlpha);
  }
};
</script>

<template>
  <div class="color-picker-panel" :class="class">
    <div class="color-picker-select">
      <div class="color-picker-palette" @mousedown="onMouseDown" ref="pickerSelect">
        <div
          :style="{
            position: 'absolute',
            left: leftSelect,
            top: topSelect,
            zIndex: 1
          }"
        >
          <div class="color-picker-handler" :style="{ background: backgroundPicker }" />
        </div>
        <div
          class="color-picker-saturation"
          ref="pickerSaturation"
          :style="{
            'background-color': backgroundGradient,
            'background-image':
              'linear-gradient(0deg, rgb(0, 0, 0), transparent), linear-gradient(90deg, rgb(255, 255, 255), rgba(255, 255, 255, 0))'
          }"
        />
      </div>
    </div>

    <div class="color-picker-slider-container">
      <div class="color-picker-slider-group">
        <div class="color-picker-slider-hue">
          <div class="color-picker-palette" @mousedown="onMouseDownGradient" ref="pickerGradient">
            <div
              :style="{
                position: 'absolute',
                left: `${this.clientXGradient}px`,
                top: '-2px',
                zIndex: 1
              }"
            >
              <div class="color-picker-handler" :style="{ backgroundColor: backgroundGradient }"></div>
            </div>
            <div class="color-picker-gradient"></div>
          </div>
        </div>
        <div class="color-picker-slider-alpha">
          <div class="color-picker-palette" @mousedown="onMouseDownAlpha">
            <div
              :style="{
                position: 'absolute',
                left: `${this.clientXAlpha}px`,
                top: '-2px',
                zIndex: 1
              }"
            >
              <div class="color-picker-handler" :style="{ background: backgroundBlock }"></div>
            </div>
            <div
              class="color-picker-opacity"
              ref="pickerAlpha"
              :style="{
                background: `linear-gradient(to right, rgba(255, 0, 4, 0), ${backgroundPicker}`
              }"
            ></div>
          </div>
        </div>
      </div>
      <div class="color-picker-color-block">
        <div class="color-picker-color-block-inner" :style="{ background: backgroundBlock }"></div>
      </div>
    </div>

    <div class="color-picker-input-container">
      <div class="color-picker-selector">
        <div
          v-for="item in listSelector"
          :key="item"
          class="color-picker-selector-item"
          :class="{ 'color-picker-selector-item--active': selector === item }"
          @mousedown.prevent="selector = item"
        >
          {{ item }}
        </div>
      </div>
      <div class="color-picker-input">
        <div class="color-picker-input-type">
          <div class="color-picker-input-hex" v-if="selector === 'hex'">
            <input
              type="text"
              v-model="hexMark"
              name="hex"
              maxlength="9"
              @input="() => handleColorChange()"
              @blur="restoreSelection"
              @mousedown="onMouseDownInput"
              @mouseup="onMouseUpInput"
            />
          </div>
          <div class="color-picker-input-rgb" v-if="selector === 'rgb'">
            <input
              type="number"
              min="0"
              max="255"
              maxlength="3"
              name="red"
              v-model="redMark"
              @input="() => handleColorChange()"
            />
            <input
              type="number"
              min="0"
              max="255"
              maxlength="3"
              name="green"
              v-model="greenMark"
              @input="() => handleColorChange()"
            />
            <input
              type="number"
              min="0"
              max="255"
              name="blue"
              maxlength="3"
              v-model="blueMark"
              @input="() => handleColorChange()"
            />
          </div>
          <div class="color-picker-input-hsb" v-if="selector === 'hsb'">
            <input
              name="hue"
              type="number"
              min="0"
              max="360"
              maxlength="3"
              v-model="hueMark"
              @input="() => handleColorChange()"
            />
            <input
              name="saturation"
              type="number"
              min="0"
              max="100"
              maxlength="3"
              v-model="saturationMark"
              @input="() => handleColorChange()"
            />
            <input
              name="brightness"
              type="number"
              min="0"
              max="100"
              maxlength="3"
              v-model="brightnessMark"
              @input="() => handleColorChange()"
            />
          </div>
        </div>
        <div class="color-picker-input-alpha">
          <input type="number" name="alpha" min="0" max="100" maxlength="3" v-model="alphaMark" />
        </div>
      </div>
    </div>
    <div class="color-picker-buttons">
      <button class="color-picker-cancel">{{ cancelText }}</button>
      <button class="color-picker-apply">{{ okText }}</button>
    </div>
  </div>
</template>
