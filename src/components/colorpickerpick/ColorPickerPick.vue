<script>
import { VuColorPicker } from "../colorpicker";
import { VuColorCustom } from "../colorcustom";
import { VuProgressInput } from "../progressinput";
import { rgbaToArray, hexToRgb } from "../../utils";
import colorMixin from "../../mixins/colorMixin";

export default {
  name: "VuColorPickerPick",
  emits: ["change", "update:value", "update:visible"],
  mixins: [colorMixin],
  components: {
    VuColorCustom,
    VuColorPicker,
    VuProgressInput
  },
  props: {
    more: {
      type: Boolean,
      default: false
    },
    placement: {
      type: String,
      default: "bottomRight"
    },
    customText: {
      type: String,
      default: "Color Custom"
    },
    colorText: {
      type: String,
      default: "Color Picker"
    },
    visible: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      show: false,
      view: "color_custom",
      views: [
        {
          key: "color_custom",
          component: "VuColorCustom",
          text: this.customText
        },
        {
          key: "color_picker",
          component: "VuColorPicker",
          text: this.colorText
        }
      ],
      pickerLocation: {
        top: 0,
        left: 0
      },
      startY: 0,
      startX: 0
    };
  },
  computed: {
    currentTab() {
      return this.views.find((v) => v.key == this.view).component;
    }
  },
  methods: {
    async toggle(event) {
      this.show = !this.show;
      if (!this.show) this.view = "color_custom";
      await this.$nextTick();
      const picker = this.$refs.picker.getBoundingClientRect();
      if (this.show) {
        if (this.placement == "bottomRight") {
          this.pickerLocation.top = picker.bottom + 2;
          this.pickerLocation.left = picker.left;
        } else if (this.placement == "leftTop") {
          const pickerOverlay = this.$refs.pickerOverlay.getBoundingClientRect();
          this.pickerLocation.top = picker.bottom - pickerOverlay.height;
          this.pickerLocation.left = picker.left - pickerOverlay.width - 10;
        }
      }
    },
    setView(view) {
      this.view = view;
    },
    onMouseDownLocation(event) {
      const headerRect = this.$refs.pickerHeader.getBoundingClientRect();
      this.startY = event.clientY - headerRect.top;
      this.startX = event.clientX - headerRect.left;
      document.addEventListener("mousemove", this.onMouseMoveLocation);
      document.addEventListener("mouseup", this.onMouseUpLocation);
    },
    onMouseMoveLocation(event) {
      this.pickerLocation.top = event.clientY - this.startY;
      this.pickerLocation.left = event.clientX - this.startX;
    },
    onMouseUpLocation(event) {
      document.removeEventListener("mousemove", this.onMouseMoveLocation);
      document.removeEventListener("mouseup", this.onMouseUpLocation);
    },
    handleAlphaChange({ alpha }) {
      const alphaHex = Math.round((alpha / 100) * 255)
        .toString(16)
        .padStart(2, "0");
      this.hex = `${this.hex.slice(0, 7)}${alphaHex}`;
      this.handleColorChange("hex");
      this.handleExportColor();
    },
    handleHexChange() {
      this.handleColorChange("hex");
      this.handleExportColor();
    },
    getColorFromComponent(event) {
      const { hex, rgb, hsb, alpha } = event;
      this.hex = hex;
      this.rgb = rgb;
      this.hsb = hsb;
      this.alpha = alpha;
      this.handleExport();
    }
  },
  beforeUnmount() {
    document.removeEventListener("mousemove", this.onMouseMoveLocation);
    document.removeEventListener("mouseup", this.onMouseUpLocation);
  }
};
</script>

<template>
  <div class="vu-colorpicker-pick">
    <div :class="{ 'picker-more': more }">
      <div @click.stop.prevent @mousedown.stop.prevent="toggle" class="picker-wrapper" ref="picker">
        <slot>
          <div class="picker" :style="{ background: value }"></div>
        </slot>
      </div>
      <div class="picker-more-info" v-if="more">
        <input
          class="picker-more-text"
          id="hex-color"
          type="text"
          v-model="hexMark"
          @input="handleHexChange"
          @keydown.stop
          @keyup.stop
          @keypress.stop
          @mouseup.prevent
          @mousedown="savedSelection"
          @blur="restoreSelection"
        />
        <VuProgressInput :value="alpha" @change="handleAlphaChange" />
      </div>
    </div>

    <Teleport to="body">
      <div
        class="vu-colorpicker-pick-modal"
        v-if="show"
        ref="pickerOverlay"
        :style="{
          position: 'absolute',
          top: `${pickerLocation.top}px`,
          left: `${pickerLocation.left}px`
        }"
        @click.stop.prevent
      >
        <div class="vu-colorpicker-pick-header" @mousedown.stop.prevent="onMouseDownLocation" ref="pickerHeader">
          <div v-for="item in views" :key="item.key" v-show="item.key == view" class="vu-colorpicker-pick-title">
            <span
              class="vu-colorpicker-pick-back"
              v-if="item.key == 'color_picker'"
              @mousedown.stop.prevent="setView('color_custom')"
            >
              <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
                <path d="M13.5 17.914 7.086 11.5 13.5 5.086 14.914 6.5l-5 5 5 5-1.414 1.414Z"></path>
              </svg>
            </span>
            <span>{{ item.text }}</span>
          </div>
          <div class="vu-colorpicker-pick-close" @mousedown.stop.prevent="toggle">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path
                d="m13.59 12 4.344-4.342a.226.226 0 0 0 0-.318L16.66 6.067a.223.223 0 0 0-.318 0L12 10.409 7.658 6.067a.223.223 0 0 0-.318 0L6.066 7.34a.226.226 0 0 0 0 .318L10.409 12l-4.343 4.343a.226.226 0 0 0 0 .318l1.274 1.273c.088.088.23.088.318 0L12 13.59l4.343 4.343c.088.088.23.088.318 0l1.273-1.273a.226.226 0 0 0 0-.318L13.59 12Z"
              ></path>
            </svg>
          </div>
        </div>
        <div class="vu-colorpicker-pick-content">
          <component
            :is="currentTab"
            :value="value"
            :alpha="alpha"
            @add="setView('color_picker')"
            @change="getColorFromComponent"
          />
        </div>
      </div>
    </Teleport>
  </div>
</template>
