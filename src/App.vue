<script setup lang="ts">
import { ref } from "vue";
import {
  VuColorPicker,
  VuColorCustom,
  VuProgressInput,
  VuColorPickerPick,
  VuColorBg,
  VuColorPickerBg
} from "./components/export";

const progressValue = ref<number>(100);
const colorValue = ref<string>("#000000");
const colorBackground = ref<string>("linear-gradient(90deg, rgba(145, 133, 122, 1) 0%, rgba(242, 222, 204, 1) 100%)");
</script>

<template>
  <div class="wrapper">
    <div class="lib-item">
      <div class="title">ColorPicker</div>
      <VuColorPicker v-model:value="colorValue" />
    </div>

    <div class="lib-item">
      <div class="title">ColorCustom</div>
      <VuColorCustom v-model:value="colorValue" />
    </div>

    <div class="lib-item">
      <div class="title">ColorBackground</div>
      <VuColorBg v-model:value="colorBackground" />
    </div>

    <div class="lib-item">
      <div class="title">ProgressInput</div>
      <VuProgressInput v-model:value="progressValue" />
      <div class="title">ColorPickerPick</div>
      <VuColorPickerPick v-model:value="colorValue" />
      <div class="title">
        ColorPickerPick <br />
        (option has more)
      </div>
      <VuColorPickerPick v-model:value="colorValue" :more="true" />
      <div class="title">ColorPickerBg</div>
      <VuColorPickerBg v-model:value="colorBackground" />

      <div class="title">
        ColorPickerBg <br />
        (option has more)
      </div>
      <VuColorPickerBg v-model:value="colorBackground" :more="true" />
    </div>
  </div>

  <div class="test-title">Color, Background display</div>
  <div class="background">
    <div :style="{ background: colorValue }"></div>
    <div :style="{ background: colorBackground }"></div>
  </div>
</template>
