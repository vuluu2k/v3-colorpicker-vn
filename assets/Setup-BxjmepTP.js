import{d as m,M as v}from"./index-D0f35tzw.js";import{u as d}from"./index-XC0wZN8E.js";import"./iframe-cc4ZoeuW.js";import"../sb-preview/runtime.js";import"./index-D6puyI63.js";import"./index-B_J8iUie.js";import"./index-DrFu-skq.js";var u={exports:{}},l={};/**
 * @license React
 * react-jsx-runtime.production.min.js
 *
 * Copyright (c) Facebook, Inc. and its affiliates.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */var h=m,k=Symbol.for("react.element"),g=Symbol.for("react.fragment"),x=Object.prototype.hasOwnProperty,j=h.__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED.ReactCurrentOwner,f={key:!0,ref:!0,__self:!0,__source:!0};function p(r,e,c){var o,i={},s=null,t=null;c!==void 0&&(s=""+c),e.key!==void 0&&(s=""+e.key),e.ref!==void 0&&(t=e.ref);for(o in e)x.call(e,o)&&!f.hasOwnProperty(o)&&(i[o]=e[o]);if(r&&r.defaultProps)for(o in e=r.defaultProps,e)i[o]===void 0&&(i[o]=e[o]);return{$$typeof:k,type:r,key:s,ref:t,props:i,_owner:j.current}}l.Fragment=g;l.jsx=p;l.jsxs=p;u.exports=l;var n=u.exports;function a(r){const e={a:"a",code:"code",h1:"h1",h2:"h2",h3:"h3",img:"img",li:"li",p:"p",pre:"pre",ul:"ul",...d(),...r.components};return n.jsxs(n.Fragment,{children:[n.jsx(v,{title:"Setup"}),`
`,n.jsx(e.h1,{id:"vue3-colorpicker-vietnamese",children:"Vue3 ColorPicker Vietnamese"}),`
`,n.jsx(e.h2,{id:"demo-project",children:"Demo project"}),`
`,n.jsxs(e.p,{children:["You are visiting ",n.jsx(e.a,{href:"https://v3-colorpicker-vn.vercel.app/",rel:"nofollow",children:"Vue3 ColorPicker Vietnamese"})," now!"]}),`
`,n.jsx(e.h2,{id:"install-library",children:"Install library"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`npm install v3-colorpicker-vn
`})}),`
`,n.jsx(e.p,{children:"or"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-bash",children:`yarn add v3-colorpicker-vn
`})}),`
`,n.jsx(e.h2,{id:"how-to-use",children:"How to use"}),`
`,n.jsx(e.h3,{id:"in-file-maints",children:"in file main.ts"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-js",children:`import 'v3-colorpicker-vn/dist/v3-colorpicker-vn.css'
`})}),`
`,n.jsx(e.h3,{id:"in-file-appvue",children:"in file App.vue"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-html",children:`<script setup lang="ts">
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
<\/script>

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
`})}),`
`,n.jsx(e.p,{children:"you can install it same as plugin in main.ts"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`import ColorPicker from "v3-colorpicker-vn";

app.use(ColorPicker);
`})}),`
`,n.jsx(e.p,{children:"or install some components of it"}),`
`,n.jsx(e.pre,{children:n.jsx(e.code,{className:"language-ts",children:`import { ColorPicker } from "v3-colorpicker-vn";

app.use(ColorPicker); // it's VuColorPicker
`})}),`
`,n.jsx(e.h2,{id:"screenshot",children:"Screenshot"}),`
`,n.jsx(e.p,{children:n.jsx(e.img,{src:"https://content.pancake.vn/web-media/ee/bf/2b/e6/1d0e6968f1a847be0f28d6b998e5fdad34c2015d99032c4837572f6d.png",alt:"image"})}),`
`,n.jsx(e.h2,{id:"contact",children:"Contact"}),`
`,n.jsx(e.p,{children:"Lưu Công Quang Vũ From Vietnamese"}),`
`,n.jsxs(e.ul,{children:[`
`,n.jsxs(e.li,{children:["Email: ",n.jsx(e.a,{href:"mailto:vuluu040320@gmail.com",children:"vuluu040320@gmail.com"})]}),`
`,n.jsx(e.li,{children:"Number Phone: +84898709170"}),`
`,n.jsxs(e.li,{children:["LinkTree: ",n.jsx(e.a,{href:"https://linktr.ee/vuluu2k",rel:"nofollow",children:"vuluu2k"})]}),`
`,n.jsxs(e.li,{children:["LinkedIn: ",n.jsx(e.a,{href:"https://linkedin.com/in/vuluu2k",rel:"nofollow",children:"vuluu2k"})]}),`
`]})]})}function B(r={}){const{wrapper:e}={...d(),...r.components};return e?n.jsx(e,{...r,children:n.jsx(a,{...r})}):a(r)}export{B as default};
