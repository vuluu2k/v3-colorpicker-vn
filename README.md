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

### in file main.ts

```js
import "v3-colorpicker-vn/dist/v3-colorpicker-vn.css";
```

### in file App.vue

```html
<script setup lang="ts">
  import { ref } from "vue";
  import {
    VuColorPicker,
    VuColorCustom,
    VuProgressInput,
    VuColorPickerPick,
    VuColorBg,
    VuColorPickerBg
  } from "v3-colorpicker-vn";

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

you can install it same as plugin in main.ts

```ts
import ColorPicker from "v3-colorpicker-vn";

app.use(ColorPicker);
```

or install some components of it

```ts
import { ColorPicker } from "v3-colorpicker-vn";

app.use(ColorPicker); // it's VuColorPicker
```

## Screenshot

![image](https://content.pancake.vn/web-media/ee/bf/2b/e6/1d0e6968f1a847be0f28d6b998e5fdad34c2015d99032c4837572f6d.png)

## Contact

Lưu Công Quang Vũ From Vietnamese

- Email: vuluu040320@gmail.com
- Number Phone: +84898709170
- LinkTree: [vuluu2k](https://linktr.ee/vuluu2k)
- LinkedIn: [vuluu2k](https://linkedin.com/in/vuluu2k)
