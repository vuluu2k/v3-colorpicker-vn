<script setup lang="ts">
import { ref } from "vue";
import { VuColorPicker, VuColorCustom, VuProgressInput, VuColorPickerPick, VuColorBg } from "./components/export";

const progressValue = ref<number>(100);
const colorValue = ref<string>("#000000");
const colorBackground = ref<string>("#ffffff");
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
      <div class="title">ProgressInput</div>
      <VuProgressInput v-model:value="progressValue" />
      <div class="title">ColorPickerPick</div>
      <VuColorPickerPick v-model:value="colorValue" />
      <div class="title">
        ColorPickerPick <br />
        (option has more)
      </div>
      <VuColorPickerPick v-model:value="colorValue" :more="true" />
    </div>
    <div class="lib-item">
      <div class="title">ColorBackground</div>
      <VuColorBg v-model:value="colorBackground" />
    </div>
  </div>

  <div class="test-title">Color, Background display</div>
  <div class="background">
    <div :style="{ 'background-color': colorValue }"></div>
    <div :style="{ 'background-color': colorBackground }"></div>
  </div>
</template>
