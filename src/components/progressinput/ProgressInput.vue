<script>
export default {
  name: "VuProgressInput",
  emits: ["update:value", "change", "update:selection"],
  props: {
    value: {
      type: Number,
      default: 100
    }
  },
  data() {
    return {
      startX: 0,
      oldValue: 0,
      selection: null
    };
  },
  methods: {
    handleChange(event) {
      const value = Number(event.target.value);
      this.handleAlphaChange(value);
    },
    handleAlphaChange(alpha) {
      this.$emit("update:value", alpha);
      this.$emit("update:selection", this.selection);
      this.$emit("change", { alpha, selection: this.selection });
    },
    onMouseDown(event) {
      this.startX = event.clientX;
      this.oldValue = this.value;
      document.addEventListener("mousemove", this.onMouseMove);
      document.addEventListener("mouseup", this.onMouseUp);
    },
    onMouseMove(event) {
      const change = event.clientX - this.startX;
      const alpha = Math.min(Math.round(this.oldValue + change), 100);
      if (0 <= alpha && alpha <= 100) {
        this.handleAlphaChange(alpha);
      }
    },
    onMouseUp(event) {
      document.removeEventListener("mousemove", this.onMouseMove);
      document.removeEventListener("mouseup", this.onMouseUp);
    },
    savedSelection() {
      const sel = window.getSelection();
      if (sel.rangeCount !== 0) {
        this.selection = window.getSelection().getRangeAt(0);
      } else this.selection = null;
    },
    restoreSelection() {
      if (this.selection) {
        const sel = window.getSelection();
        sel.removeAllRanges();
        sel.addRange(this.selection);
        this.selection = null;
      }
    }
  },
  beforeUnmount() {
    document.removeEventListener("mousemove", this.onMouseMove);
    document.removeEventListener("mouseup", this.onMouseUp);
  }
};
</script>

<template>
  <div class="vu-progress-input" @mousedown="onMouseDown">
    <input
      type="number"
      min="0"
      max="100"
      :value="value"
      @change="handleChange"
      @keypress.stop
      @keydown.stop
      @keyup.stop
      @mousedown="savedSelection"
      @blur="restoreSelection"
    />
    <span>%</span>
  </div>
</template>
