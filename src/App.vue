<script setup lang="ts">
import { ref } from "vue";
import { VuColorPicker, VuColorCustom, VuProgressInput, VuColorPickerPick } from "./components/export";

const progressValue = ref<number>(100);
const colorValue = ref<string>("#000000");
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
      <VuColorPickerPick />
      <div class="title">
        ColorPickerPick <br />
        (option has more)
      </div>
      <VuColorPickerPick v-model:value="colorValue" :more="true" />
    </div>
  </div>

  <div class="background">
    <div>Background test in here</div>
  </div>
</template>
