<script>
import { parseConicGradient, parseLinearGradient, parseRadialGradient } from "../../utils";
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
    },
    gradientColorSaved: {
      type: Array,
      default: []
    },
    gradientCountSaved: {
      type: Number,
      default: 24
    }
  },
  mounted() {
    this.handleRecalcGradient(this.value);
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
      progressColors: [
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
      return [...this.gradientColorSaved, ...this.gradientColorsDefault].slice(0, this.gradientCountSaved);
    },
    progressColorsComputed() {
      return this.progressColors.map((process) => {
        return { ...process, color: `rgba(${process.r}, ${process.g}, ${process.b}, ${process.a})` };
      });
    },
    colorsPreview() {
      const colors = this.progressColorsComputed.map((process) => {
        const processPercent = Math.round((process.x / 128) * 100);
        return `${process.color} ${processPercent}%`;
      });

      return colors.join(", ").trim();
    },
    gradientPreview() {
      let gradient;
      switch (this.gradientType) {
        case "linear":
          gradient = `linear-gradient(${this.degree}deg`;
          break;
        case "radial":
          gradient = `radial-gradient(circle at ${(this.radialPointer.x / 240) * 100}% ${(this.radialPointer.y / 120) * 100}%`;
          break;
        case "conic":
          gradient = `conic-gradient(from ${this.conicPointer.degree}deg at ${(this.conicPointer.x / 240) * 100}% ${(this.conicPointer.y / 120) * 100}%`;
          break;
      }

      return `${gradient}, ${this.colorsPreview})`;
    },
    progressColorSelected() {
      return this.progressColors[this.colorIndexSelected];
    },
    alpha: {
      get() {
        return Math.round(this.progressColorSelected.a * 100);
      },
      set(value) {
        this.progressColorSelected.a = value / 100;
      }
    },
    colorPickerValue: {
      get() {
        const color = this.progressColorSelected;
        return `rgba(${color.r}, ${color.g}, ${color.b}, ${color.a})`;
      },
      set(value) {
        const { red, green, blue, alpha } = value;
        this.progressColorSelected.r = red;
        this.progressColorSelected.g = green;
        this.progressColorSelected.b = blue;
        this.progressColorSelected.a = alpha / 100;
      }
    }
  },
  methods: {
    handleExport() {
      this.$emit("change", this.gradientPreview);
      this.$emit("update:value", this.gradientPreview);
    },
    onMouseDownGradient(event) {
      const previewRect = this.$refs.gradientPreview.getBoundingClientRect();
      switch (this.gradientType) {
        case "linear":
          this.centalPoint.x = previewRect.left + previewRect.width / 2;
          this.centalPoint.y = previewRect.top + previewRect.height / 2;
          this.degree = this.handleRoundCentral(event.clientX, event.clientY, this.centalPoint.x, this.centalPoint.y);
          break;

        case "radial":
          this.radialPointer.x = event.clientX - previewRect.left;
          this.radialPointer.y = event.clientY - previewRect.top;
          break;

        case "conic":
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
          break;
      }

      document.addEventListener("mousemove", this.onMouseMoveGradient);
      document.addEventListener("mouseup", this.onMouseUpGradient);
    },
    onMouseMoveGradient(event) {
      switch (this.gradientType) {
        case "linear":
          this.degree = this.handleRoundCentral(event.clientX, event.clientY, this.centalPoint.x, this.centalPoint.y);
          break;
        case "radial":
          this.handleRadial(event, "radialPointer");
          break;
        case "conic":
          if (this.conicPointer.key == "conic-slider")
            this.conicPointer.degree = this.handleRoundCentral(
              event.clientX,
              event.clientY,
              this.conicPointer.central.x,
              this.conicPointer.central.y
            );
          else this.handleRadial(event, "conicPointer");
          break;
      }
    },
    onMouseUpGradient(event) {
      if (this.gradientType == "conic") this.conicPointer.key = "";
      document.removeEventListener("mousemove", this.onMouseMoveGradient);
      document.removeEventListener("mouseup", this.onMouseUpGradient);
    },
    onMouseDownProgressColor(event) {
      const colorPickerCustom = this.$refs.colorPickerCustom;
      const progressColor = this.$refs.progressColor;
      if (event.target.id !== "progressPointer" && progressColor) {
        if (colorPickerCustom.show == false) {
          colorPickerCustom.pickerLocation.left = event.clientX - 60;
          colorPickerCustom.pickerLocation.top = event.clientY + 20;
        }
        colorPickerCustom.show = true;
        const progressRect = progressColor.getBoundingClientRect();
        const processX = event.clientX - progressRect.left;
        const newColor = {
          r: colorPickerCustom.rgb.red,
          g: colorPickerCustom.rgb.green,
          b: colorPickerCustom.rgb.blue,
          a: colorPickerCustom.alpha / 100,
          x: processX
        };

        let insertIndex = -1;
        for (let i = 0; i < this.progressColors.length; i++) {
          if (this.progressColors[i].x === newColor.x) {
            insertIndex = i;
            break;
          } else if (this.progressColors[i].x > newColor.x) {
            insertIndex = i;
            break;
          }
        }

        if (insertIndex === -1) {
          this.progressColors.push(newColor);
          this.colorIndexSelected = this.progressColors.length - 1;
        } else {
          this.progressColors.splice(insertIndex, 0, newColor);
          this.colorIndexSelected = insertIndex;
        }
      } else {
        document.addEventListener("mousemove", this.onMouseMoveProgressColor);
        document.addEventListener("mouseup", this.onMouseUpProgressColor);
      }
    },
    onMouseMoveProgressColor(event) {
      const progressRect = progressColor.getBoundingClientRect();
      if (progressRect.left <= event.clientX && event.clientX <= progressRect.right) {
        const processX = event.clientX - progressRect.left;
        this.progressColors[this.colorIndexSelected].x = processX;
      }
      if (event.clientX <= progressRect.left) {
        this.progressColors[this.colorIndexSelected].x = 0;
      }
      if (event.clientX >= progressRect.right) {
        this.progressColors[this.colorIndexSelected].x = progressRect.width;
      }
    },
    onMouseUpProgressColor(event) {
      document.removeEventListener("mousemove", this.onMouseMoveProgressColor);
      document.removeEventListener("mouseup", this.onMouseUpProgressColor);
    },
    onMouseDownOpacity(event) {
      const opacityRect = this.$refs.opacityColor.getBoundingClientRect();
      const alpha = ((event.clientX - opacityRect.left) / opacityRect.width).toFixed(2);
      this.progressColorSelected.a = alpha;

      document.addEventListener("mousemove", this.onMouseMoveOpacity);
      document.addEventListener("mouseup", this.onMouseUpOpacity);
    },
    onMouseMoveOpacity(event) {
      const opacityRect = this.$refs.opacityColor.getBoundingClientRect();
      let alpha;

      if (opacityRect.left <= event.clientX && event.clientX <= opacityRect.right) {
        alpha = ((event.clientX - opacityRect.left) / opacityRect.width).toFixed(2);
      }
      if (event.clientX <= opacityRect.left) {
        alpha = 0;
      }
      if (event.clientX >= opacityRect.right) {
        alpha = 1;
      }

      this.progressColorSelected.a = alpha;
    },
    onMouseUpOpacity(event) {
      document.removeEventListener("mousemove", this.onMouseMoveOpacity);
      document.removeEventListener("mouseup", this.onMouseUpOpacity);
    },
    handleRoundCentral(clientX, clientY, x, y) {
      const dx = clientX - x;
      const dy = clientY - y;
      let angle = Math.round((Math.atan2(dx, -dy) * 180) / Math.PI);
      if (angle < 0) angle += 360;
      return angle;
    },
    handleRadial(event, key) {
      const previewRect = this.$refs.gradientPreview.getBoundingClientRect();
      if (previewRect.top < event.clientY && event.clientY < previewRect.bottom) {
        this[key].y = event.clientY - previewRect.top;
      }
      if (previewRect.left < event.clientX && event.clientX < previewRect.right) {
        this[key].x = event.clientX - previewRect.left;
      }
      if (previewRect.right <= event.clientX) {
        this[key].x = previewRect.width;
      }
      if (previewRect.left >= event.clientX) {
        this[key].x = 0;
      }
      if (previewRect.bottom <= event.clientY) {
        this[key].y = previewRect.height;
      }
      if (previewRect.top >= event.clientY) {
        this[key].y = 0;
      }
    },
    handleChangeColor(color) {
      this.progressColors[this.colorIndexSelected].color = color;
    },
    handleFlipColor() {
      this.progressColors = this.progressColors.reverse().map((process) => ({ ...process, x: 128 - process.x }));
    },
    handleDeleteColor() {
      if (this.progressColors.length > 2) this.progressColors.splice(this.colorIndexSelected, 1);
      if (this.colorIndexSelected > this.progressColors.length - 1)
        this.colorIndexSelected = this.progressColors.length - 1;
    },
    handleRecalcGradient(gradient) {
      if (gradient.startsWith("linear-gradient")) {
        const { degree, colors } = parseLinearGradient(gradient);
        this.degree = degree;
        this.progressColors = colors;
        this.gradientType = "linear";
      } else if (gradient.startsWith("radial-gradient")) {
        const { position, colors } = parseRadialGradient(gradient);
        this.radialPointer = position;
        this.progressColors = colors;
        this.gradientType = "radial";
      } else if (gradient.startsWith("conic-gradient")) {
        const { degree, position, colors } = parseConicGradient(gradient);
        this.conicPointer.degree = degree;
        this.conicPointer.x = position.x;
        this.conicPointer.y = position.y;
        this.progressColors = colors;
        this.gradientType = "conic";
      }
    },
    handleAddTemplate() {
      this.$emit("add");
    }
  },
  watch: {
    gradientPreview() {
      this.handleExport();
    }
  },
  beforeUnmount() {
    document.removeEventListener("mousemove", this.onMouseMoveGradient);
    document.removeEventListener("mouseup", this.onMouseUpGradient);
    document.removeEventListener("mousemove", this.onMouseMoveProgressColor);
    document.removeEventListener("mouseup", this.onMouseUpProgressColor);
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
              @mousedown.prevent="onMouseDownProgressColor"
              ref="progressColor"
              id="progressColor"
            >
              <div
                class="vu-color-gradient-processing-node"
                v-for="(progressColor, index) in progressColorsComputed"
                :style="{
                  '--handle-color': progressColor.color,
                  '--handle-translate-x': `${progressColor.x}px`,
                  '--handle-translate-y': 0
                }"
                :data-selected="colorIndexSelected == index"
                :key="index"
                @mousedown.prevent="colorIndexSelected = index"
                id="progressPointer"
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

      <div class="vu-color-gradient-custom" :style="{ '--color': progressColorsComputed[colorIndexSelected].color }">
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
          <input type="number" min="0" max="100" step="1" v-model="alpha" />
          <span>%</span>
        </div>
        <VuColorPickerPick v-model:value="colorPickerValue" output="rgba" ref="colorPickerCustom" />
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
            @mousedown.prevent="handleRecalcGradient(gradient)"
          >
            <div class="vu-color-gradient-add-preview-item-inner" :style="{ 'background-image': gradient }"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
