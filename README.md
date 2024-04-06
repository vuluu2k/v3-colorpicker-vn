# Vue3 ColorPicker Vietnamese

## Demo project

You are visiting [Vue3 ColorPicker Vietnamese](https://v3-colorpicker-vn.vercel.app/) now!

## Install library

```bash
npm install v3-colorpicker-vn
```

or

```bash
yarn add v3-colorpicker-vn
```

## How to use

```vue
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

  <div class="test-title">Code in view</div>
  <img src="./assets/demo.png" alt="demo" width="1006px" />
</template>
```

## Some images in project

![image](https://github.com/vuluu2k/color-picker-vue3/assets/73820126/5854465a-aa4f-4a21-815a-ccaf9b2f1f6b)

![image](https://github.com/vuluu2k/color-picker-vue3/assets/73820126/619e72a7-f62b-47b2-a0d1-d7f1fb7823ae)

## Contact

Lưu Công Quang Vũ From Vietnamese

- Email: vuluu040320@gmail.com
- Number Phone: +84898709170
- LinkTree: [vuluu2k](https://linktr.ee/vuluu2k)
- LinkedIn: [vuluu2k](https://linkedin.com/in/vuluu2k)
