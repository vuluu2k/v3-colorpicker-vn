<script>
import { VuColorPickerPick } from "../colorpickerpick";

export default {
  name: "VuColorBg",
  emits: ["change", "update:value", "add"],
  components: {
    VuColorPickerPick
  },
  props: {
    value: {
      type: String,
      default: "linear-gradient(90deg, rgba(145, 133, 122, 1) 0%, rgba(242, 222, 204, 1) 100%)"
    },
    gradientColorsDefault: {
      type: Array,
      default: [
        "linear-gradient(90deg, rgba(145, 133, 122, 1) 0%, rgba(242, 222, 204, 1) 100%)",
        "linear-gradient(50.4988deg, rgba(127, 148, 99, 1) 17.0105%, rgba(242, 222, 204, 1) 48.2697%, rgba(56, 74, 211, 1) 80.9021%)",
        "radial-gradient(circle at 50% 50%, rgba(56, 74, 211, 1) 15.0635%, rgba(232, 234, 237, 1) 80.2887%)",
        "radial-gradient(circle at 32% 26%, rgba(209, 219, 195, 1) 0%, rgba(127, 148, 99, 1) 36.0321%, rgba(37, 49, 141, 1) 75.6775%)",
        "conic-gradient(from 152deg at 50% 50%, rgba(0, 87, 225, 1) 0%, rgba(249, 197, 180, 1) 68%, rgba(0, 87, 225, 1) 100%)",
        "conic-gradient(from 136deg at 50% 0%, rgba(85, 14, 155, 1) 0%, rgba(128, 21, 232, 1) 6%, rgba(243, 167, 143, 1) 12%, rgba(85, 14, 155, 1) 28%)"
      ]
    }
  },
  mounted() {
    this.handleChangeValue(this.value);
    if (!this.value.includes("gradient")) {
      this.$emit("change", "linear-gradient(90deg, rgba(145, 133, 122, 1) 0%, rgba(242, 222, 204, 1) 100%)");
    }
  },
  data() {
    return {
      degree: 0,
      centalPoint: {
        x: 0,
        y: 0
      },
      gradientType: "linear",
      colorIndexSelected: 0,
      processColors: [
        { x: 0, r: 145, g: 133, b: 122, a: 1 },
        { x: 128, r: 242, g: 222, b: 204, a: 1 }
      ],
      radialPointer: {
        x: 120,
        y: 60
      },
      conicPointer: {
        degree: 0,
        x: 120,
        y: 60,
        key: "",
        central: {
          x: 0,
          y: 0
        }
      }
    };
  },
  computed: {
    gradientColors() {
      return this.gradientColorsDefault;
    },
    colorsPreview() {
      const colors = this.processColors.map((process) => {
        const processPercent = Math.round((process.x / 128) * 100);
        return `${process.color} ${processPercent}%`;
      });

      return colors.join(", ").trim();
    },
    gradientPreview() {
      const gradient =
        this.gradientType == "linear"
          ? `linear-gradient(${this.degree}deg`
          : this.gradientType == "radial"
            ? `radial-gradient(circle at ${(this.radialPointer.x / 240) * 100}% ${(this.radialPointer.y / 120) * 100}%`
            : `conic-gradient(from ${this.conicPointer.degree}deg at ${
                (this.conicPointer.x / 240) * 100
              }% ${(this.conicPointer.y / 120) * 100}%`;

      return `${gradient}, ${this.colorsPreview})`;
    },
    colorPickerValue: {
      get() {
        return this.processColors[this.colorIndexSelected].color;
      },
      set(value) {
        const [r, g, b, a] = value;
        this.processColors[this.colorIndexSelected].color = `rgba(${r}, ${g}, ${b}, ${a})`;
        this.processColors[this.colorIndexSelected].r = r;
        this.processColors[this.colorIndexSelected].g = g;
        this.processColors[this.colorIndexSelected].b = b;
        this.processColors[this.colorIndexSelected].a = a;
      }
    }
  },
  methods: {
    onMouseDownGradient(event) {
      const previewRect = this.$refs.gradientPreview.getBoundingClientRect();
      if (this.gradientType == "linear") {
        this.centalPoint.x = previewRect.left + previewRect.width / 2;
        this.centalPoint.y = previewRect.top + previewRect.height / 2;
        this.degree = this.handleRoundCentral(event.clientX, event.clientY, this.centalPoint.x, this.centalPoint.y);
      } else if (this.gradientType == "radial") {
        this.radialPointer.x = event.clientX - previewRect.left;
        this.radialPointer.y = event.clientY - previewRect.top;
      } else if (this.gradientType == "conic") {
        const conicPointerRect = this.$refs.conicPointer.getBoundingClientRect();
        if (event.target.id == "conic-slider") {
          this.conicPointer.central.x = conicPointerRect.left + conicPointerRect.width / 2;
          this.conicPointer.central.y = conicPointerRect.top + conicPointerRect.height / 2;
          this.conicPointer.degree = this.handleRoundCentral(
            event.clientX,
            event.clientY,
            this.conicPointer.central.x,
            this.conicPointer.central.y
          );
          this.conicPointer.key = "conic-slider";
        } else {
          this.conicPointer.x = event.clientX - previewRect.left;
          this.conicPointer.y = event.clientY - previewRect.top;
          this.conicPointer.key = "conic-pointer";
        }
      }
      document.addEventListener("mousemove", this.onMouseMoveGradient);
      document.addEventListener("mouseup", this.onMouseUpGradient);
    },
    onMouseMoveGradient(event) {
      if (this.gradientType == "linear") {
        this.degree = this.handleRoundCentral(event.clientX, event.clientY, this.centalPoint.x, this.centalPoint.y);
      } else if (this.gradientType == "radial") {
        const previewRect = this.$refs.gradientPreview.getBoundingClientRect();
        if (previewRect.top < event.clientY && event.clientY < previewRect.bottom) {
          this.radialPointer.y = event.clientY - previewRect.top;
        }
        if (previewRect.left < event.clientX && event.clientX < previewRect.right) {
          this.radialPointer.x = event.clientX - previewRect.left;
        }
        if (previewRect.right <= event.clientX) {
          this.radialPointer.x = previewRect.width;
        }
        if (previewRect.left >= event.clientX) {
          this.radialPointer.x = 0;
        }
        if (previewRect.bottom <= event.clientY) {
          this.radialPointer.y = previewRect.height;
        }
        if (previewRect.top >= event.clientY) {
          this.radialPointer.y = 0;
        }
      } else if (this.gradientType == "conic") {
        if (this.conicPointer.key == "conic-slider")
          this.conicPointer.degree = this.handleRoundCentral(
            event.clientX,
            event.clientY,
            this.conicPointer.central.x,
            this.conicPointer.central.y
          );
        else if (this.conicPointer.key == "conic-pointer") {
          const previewRect = this.$refs.gradientPreview.getBoundingClientRect();
          if (previewRect.top < event.clientY && event.clientY < previewRect.bottom) {
            this.conicPointer.y = event.clientY - previewRect.top;
          }
          if (previewRect.left < event.clientX && event.clientX < previewRect.right) {
            this.conicPointer.x = event.clientX - previewRect.left;
          }
          if (previewRect.right <= event.clientX) {
            this.conicPointer.x = previewRect.width;
          }
          if (previewRect.left >= event.clientX) {
            this.conicPointer.x = 0;
          }
          if (previewRect.bottom <= event.clientY) {
            this.conicPointer.y = previewRect.height;
          }
          if (previewRect.top >= event.clientY) {
            this.conicPointer.y = 0;
          }
        }
      }
    },
    onMouseUpGradient(event) {
      if (this.gradientType == "conic") {
        this.conicPointer.key = "";
      }
      document.removeEventListener("mousemove", this.onMouseMoveGradient);
      document.removeEventListener("mouseup", this.onMouseUpGradient);
    },
    onMouseDownProcessColor(event) {
      const colorPickerCustom = this.$refs.colorPickerCustom;
      if (event.target.id !== "processPointer") {
        if (colorPickerCustom.show == false) {
          colorPickerCustom.pickerLocation.left = event.clientX - 60;
          colorPickerCustom.pickerLocation.top = event.clientY + 20;
        }
        colorPickerCustom.show = true;
        const processRect = processColor.getBoundingClientRect();
        const processX = event.clientX - processRect.left;
        const newColor = { color: colorPickerCustom.value, x: processX };

        let insertIndex = -1;
        for (let i = 0; i < this.processColors.length; i++) {
          if (this.processColors[i].x === newColor.x) {
            insertIndex = i;
            break;
          } else if (this.processColors[i].x > newColor.x) {
            insertIndex = i;
            break;
          }
        }

        if (insertIndex === -1) {
          this.processColors.push(newColor);
          this.colorIndexSelected = this.processColors.length - 1;
        } else {
          this.processColors.splice(insertIndex, 0, newColor);
          this.colorIndexSelected = insertIndex;
        }
      } else {
        document.addEventListener("mousemove", this.onMouseMoveProcessColor);
        document.addEventListener("mouseup", this.onMouseUpProcessColor);
      }
    },
    onMouseMoveProcessColor(event) {
      const processRect = processColor.getBoundingClientRect();
      if (processRect.left <= event.clientX && event.clientX <= processRect.right) {
        const processX = event.clientX - processRect.left;
        this.processColors[this.colorIndexSelected].x = processX;
      }
      if (event.clientX <= processRect.left) {
        this.processColors[this.colorIndexSelected].x = 0;
      }
      if (event.clientX >= processRect.right) {
        this.processColors[this.colorIndexSelected].x = processRect.width;
      }
    },
    onMouseUpProcessColor(event) {
      document.removeEventListener("mousemove", this.onMouseMoveProcessColor);
      document.removeEventListener("mouseup", this.onMouseUpProcessColor);
    },
    onMouseDownOpacity(event) {
      const opacityRect = this.$refs.opacityColor.getBoundingClientRect();
      const alpha = (event.clientX - opacityRect.left) / opacityRect.width;
      this.processColors[this.colorIndexSelected].color = this.replaceAlpha(
        this.processColors[this.colorIndexSelected].color,
        alpha.toFixed(2)
      );
      document.addEventListener("mousemove", this.onMouseMoveOpacity);
      document.addEventListener("mouseup", this.onMouseUpOpacity);
    },
    onMouseMoveOpacity(event) {
      const opacityRect = this.$refs.opacityColor.getBoundingClientRect();
      let alpha;

      if (opacityRect.left <= event.clientX && event.clientX <= opacityRect.right) {
        alpha = (event.clientX - opacityRect.left) / opacityRect.width;
      }
      if (event.clientX <= opacityRect.left) {
        alpha = 0;
      }
      if (event.clientX >= opacityRect.right) {
        alpha = 1;
      }
      this.processColors[this.colorIndexSelected].color = this.replaceAlpha(
        this.processColors[this.colorIndexSelected].color,
        alpha.toFixed(2)
      );
    },
    onMouseUpOpacity(event) {
      document.removeEventListener("mousemove", this.onMouseMoveOpacity);
      document.removeEventListener("mouseup", this.onMouseUpOpacity);
    },
    replaceAlpha(rgbaString, newAlpha) {
      return rgbaString.replace(/[^,]+(?=\))/, newAlpha);
    },
    handleRoundCentral(clientX, clientY, x, y) {
      const dx = clientX - x;
      const dy = clientY - y;
      let angle = Math.round((Math.atan2(dx, -dy) * 180) / Math.PI);
      if (angle < 0) angle += 360;
      return angle;
    },
    handleChangeColor(color) {
      this.processColors[this.colorIndexSelected].color = color;
    },
    handleChangeAlpha(event) {
      const alpha = event.target.value / 100;
      this.processColors[this.colorIndexSelected].color = this.replaceAlpha(
        this.processColors[this.colorIndexSelected].color,
        alpha.toFixed(2)
      );
    },
    handleFlipColor() {
      this.processColors = this.processColors.reverse().map((process) => ({ ...process, x: 128 - process.x }));
    },
    handleDeleteColor() {
      if (this.processColors.length > 2) this.processColors.pop();
    },
    handleChangeValue(valueChange) {
      if (valueChange.startsWith("linear-gradient")) {
        const { degree, colors } = this.parseLinearGradient(valueChange);
        this.degree = degree;
        this.processColors = colors;
        this.gradientType = "linear";
      } else if (valueChange.startsWith("radial-gradient")) {
        const { position, colors } = this.parseRadialGradient(valueChange);
        this.radialPointer = position;
        this.processColors = colors;
        this.gradientType = "radial";
      } else if (valueChange.startsWith("conic-gradient")) {
        const { degree, position, colors } = this.parseConicGradient(valueChange);
        this.conicPointer.degree = degree;
        this.conicPointer.x = position.x;
        this.conicPointer.y = position.y;
        this.processColors = colors;
        this.gradientType = "conic";
      }
    },
    handleAddTemplate() {
      const existing = this.gradientColors.find((gradient) => gradient == this.gradientPreview);
      if (!existing)
        this.siteStore.updateSite(this.$route.params.site_id, {
          settings: {
            ...this.siteStore.getSettings,
            gradients: [this.gradientPreview].concat(this.siteStore.getSettings?.gradients || [])
          }
        });
    },
    parseLinearGradient(gradientString) {
      const degree = gradientString.match(/-?\d+(\.\d+)?(deg|grad|rad|turn)/)[0];

      const colors = gradientString.match(/rgba?\([\d\s,]+\)\s\d+(\.\d+)?%/g).map((colorString) => {
        const [color, percent] = colorString.match(/rgba?\([\d\s,]+\)|\d+(\.\d+)?%/g);
        return {
          color,
          x: (parseFloat(percent) / 100) * 128
        };
      });

      return { degree: parseFloat(degree), colors };
    },
    parseRadialGradient(gradientString) {
      const [position, shape] = gradientString
        .match(/(circle|ellipse) at [\d.]+% [\d.]+%/)
        .map((str) => str.split(" "));

      const colors = gradientString.match(/rgba?\([\d\s,]+\)\s\d+(\.\d+)?%/g).map((colorString) => {
        const [color, percent] = colorString.match(/rgba?\([\d\s,]+\)|\d+(\.\d+)?%/g);
        return {
          color,
          x: (parseFloat(percent) / 100) * 128
        };
      });
      return {
        shape: shape[0],
        position: {
          x: (parseFloat(position[2]) / 100) * 240,
          y: (parseFloat(position[3]) / 100) * 120
        },
        colors
      };
    },
    parseConicGradient(gradientString) {
      const [[angle, _, x, y]] = gradientString
        .match(/-?\d+(\.\d+)?deg at [\d.]+% [\d.]+%/)
        .map((str) => str && str.split(" "));

      const colors = gradientString.match(/rgba?\([\d\s,]+\)\s\d+(\.\d+)?%/g).map((colorString) => {
        const [color, percent] = colorString.match(/rgba?\([\d\s,]+\)|\d+(\.\d+)?%/g);
        return {
          color,
          x: (parseFloat(percent) / 100) * 128
        };
      });

      return {
        degree: parseFloat(angle),
        position: { x: parseFloat(x), y: parseFloat(y) },
        colors
      };
    }
  },
  watch: {
    gradientPreview() {
      this.$emit("change", this.gradientPreview);
    }
  },
  beforeUnmount() {
    document.removeEventListener("mousemove", this.onMouseMoveGradient);
    document.removeEventListener("mouseup", this.onMouseUpGradient);
    document.removeEventListener("mousemove", this.onMouseMoveProcessColor);
    document.removeEventListener("mouseup", this.onMouseUpProcessColor);
    document.removeEventListener("mousemove", this.onMouseMoveOpacity);
    document.removeEventListener("mouseup", this.onMouseUpOpacity);
  }
};
</script>

<template>
  <div class="vu-color-gradient">
    <div class="vu-color-gradient-select">
      <select v-model="gradientType" style="width: 196px; margin: 0 22px; padding: 0 12px">
        <option value="linear">Linear</option>
        <option value="radial">Radial</option>
        <option value="conic">Conic</option>
      </select>
    </div>
    <div class="vu-color-gradient-container">
      <div
        class="vu-color-gradient-preview"
        ref="gradientPreview"
        @mousedown.stop.prevent="onMouseDownGradient"
        :style="{
          'background-image': gradientPreview
        }"
      >
        <div class="vu-color-gradient-preview-action" v-if="gradientType == 'linear'">
          <div class="vu-color-gradient-preview-overlay"></div>
          <div class="vu-color-gradient-preview-slider" :style="{ transform: `rotate(${degree}deg)` }"></div>
          <div class="vu-color-gradient-preview-degree">{{ degree }}</div>
        </div>
        <div class="vu-color-gradient-preview-radial" v-if="gradientType == 'radial'">
          <div
            class="vu-color-gradient-preview-radial-pointer"
            :style="{
              transform: `translateX(${radialPointer.x}px) translateY(${radialPointer.y}px)`
            }"
          ></div>
        </div>
        <div
          class="vu-color-gradient-preview-conic"
          v-if="gradientType == 'conic'"
          :style="{
            transform: `translateX(${conicPointer.x}px) translateY(${conicPointer.y}px)`
          }"
        >
          <div
            class="vu-color-gradient-preview-conic-slider"
            :data-active="conicPointer.key == 'conic-slider'"
            id="conic-slider"
          ></div>
          <div
            class="vu-color-gradient-preview-conic-pointer"
            id="conic-pointer"
            ref="conicPointer"
            :style="{ transform: `rotate(${conicPointer.degree}deg)` }"
          ></div>
        </div>
      </div>

      <div class="vu-color-gradient-change">
        <div class="vu-color-gradient-process">
          <div
            class="vu-color-gradient-processing"
            :style="{
              'background-image': `linear-gradient(90deg, ${this.colorsPreview})`
            }"
          >
            <div
              class="vu-color-gradient-processing-overlay"
              @mousedown.prevent="onMouseDownProcessColor"
              ref="processColor"
              id="processColor"
            >
              <div
                class="vu-color-gradient-processing-node"
                v-for="(processColor, index) in processColors"
                :style="{
                  '--handle-color': processColor.color,
                  '--handle-translate-x': `${processColor.x}px`,
                  '--handle-translate-y': 0
                }"
                :data-selected="colorIndexSelected == index"
                :key="index"
                @mousedown.prevent="colorIndexSelected = index"
                id="processPointer"
              />
            </div>
          </div>
          <div class="vu-color-gradient-flip-color" @mousedown.prevent="handleFlipColor">
            <svg viewBox="0 0 24 24" fill="currentColor" width="24" height="24">
              <path
                d="M7.70710678,8 L9.85355339,10.1464466 C10.0488155,10.3417088 10.0488155,10.6582912 9.85355339,10.8535534 C9.65829124,11.0488155 9.34170876,11.0488155 9.14644661,10.8535534 L5.79289322,7.5 L9.14644661,4.14644661 C9.34170876,3.95118446 9.65829124,3.95118446 9.85355339,4.14644661 C10.0488155,4.34170876 10.0488155,4.65829124 9.85355339,4.85355339 L7.70710678,7 L12,7 C15.3137085,7 18,9.6862915 18,13 L17,13 C17,10.2385763 14.7614237,8 12,8 L7.70710678,8 Z M16.2928932,16 L14.1464466,13.8535534 C13.9511845,13.6582912 13.9511845,13.3417088 14.1464466,13.1464466 C14.3417088,12.9511845 14.6582912,12.9511845 14.8535534,13.1464466 L18.2071068,16.5 L14.8535534,19.8535534 C14.6582912,20.0488155 14.3417088,20.0488155 14.1464466,19.8535534 C13.9511845,19.6582912 13.9511845,19.3417088 14.1464466,19.1464466 L16.2928932,17 L12,17 C8.6862915,17 6,14.3137085 6,11 L7,11 C7,13.7614237 9.23857625,16 12,16 L16.2928932,16 Z"
              ></path>
            </svg>
          </div>
          <div class="vu-color-gradient-delete-color" @mousedown.prevent="handleDeleteColor">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <g>
                <path
                  fill="#000000"
                  d="M16 16c0 1.104-.896 2-2 2h-4c-1.104 0-2-.896-2-2V8h8v8zm-6-9.5c0-.271.24-.5.525-.5h2.867c.301 0 .608.252.608.5V7h-4v-.5zm5 .5v-.5c0-.799-.752-1.5-1.608-1.5h-2.867C9.684 5 9 5.673 9 6.5V7H6v1h1v8c0 1.657 1.343 3 3 3h4c1.657 0 3-1.343 3-3V8h1V7h-3zm-2 9h1v-6h-1v6zm-3 0h1v-6h-1v6z"
                ></path>
              </g>
            </svg>
          </div>
        </div>
      </div>

      <div class="vu-color-gradient-custom" :style="{ '--color': processColors[colorIndexSelected].color }">
        <div
          ref="opacityColor"
          class="vu-color-gradient-opacity"
          :style="{
            '--range-input-value': alpha / 100,
            '--range-input-width': '80px'
          }"
          @mousedown.prevent="onMouseDownOpacity"
        >
          <span class="vu-color-gradient-opacity-range"></span>
        </div>
        <div class="vu-color-gradient-opacity-input">
          <input type="number" min="0" max="100" step="1" v-model="alpha" @input="handleChangeAlpha" />
          <span>%</span>
        </div>
        <VuColorPickerPick
          v-model:value="processColors[colorIndexSelected].color"
          output="rgba"
          ref="colorPickerCustom"
        />
      </div>

      <div class="vu-color-gradient-add">
        <div class="vu-color-gradient-add-title">
          <div class="vu-color-gradient-add-title-text">My color gradients</div>
          <div class="vu-color-gradient-add-title-add" @mousedown.prevent="handleAddTemplate">+ Add</div>
        </div>

        <div class="vu-color-gradient-add-preview">
          <div
            class="vu-color-gradient-add-preview-item"
            v-for="(gradient, index) in gradientColors"
            :key="index"
            @mousedown.prevent="handleChangeValue(gradient)"
          >
            <div class="vu-color-gradient-add-preview-item-inner" :style="{ 'background-image': gradient }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
