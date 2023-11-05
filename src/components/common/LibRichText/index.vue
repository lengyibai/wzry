<script setup>
//https://www.wangeditor.com/
import "@wangeditor/editor/dist/css/style.css";
import { onUnmounted, ref, shallowRef, watch } from "vue";
import { Editor, Toolbar } from "@wangeditor/editor-for-vue";

const $props = defineProps({
  modelValue: {
    type: String,
    default: "<p>Hello World!</p>",
  },
  width: {
    type: String,
    default: "100%",
  },
  placeholder: {
    type: String,
    default: "请输入内容...",
  },
});

const editorRef = shallowRef();

const valueHtml = ref("");
valueHtml.value = $props.modelValue;

const $emit = defineEmits(["update:modelValue"]);
watch(valueHtml, (v) => {
  $emit("update:modelValue", v);
});

const toolbarConfig = {
  toolbarKeys: ["color", "clearStyle"],
};
const editorConfig = { placeholder: $props.placeholder };
const mode = "simple";

onUnmounted(() => {
  const editor = editorRef.value;
  if (editor == null) return;
  editor.destroy();
});

const handleCreated = (editor) => {
  editorRef.value = editor;
};
</script>

<template>
  <div
    style="margin-bottom: 3.125rem; border: 1px solid var(--theme-color-eight)"
    :style="{ width: width }"
  >
    <Toolbar
      style="border-bottom: 1px solid var(--theme-color-eight)"
      :editor="editorRef"
      :default-config="toolbarConfig"
      :mode="mode"
    />
    <Editor
      v-model="valueHtml"
      style="overflow-y: hidden; height: 18.75rem"
      :default-config="editorConfig"
      :mode="mode"
      @onCreated="handleCreated"
    />
  </div>
</template>

<style>
:root {
  --w-e-toolbar-color: #96a7c1; /* 工具栏字体颜色 */
  --w-e-toolbar-bg-color: #2c5085; /* 工具栏背景色 */
  --w-e-textarea-bg-color: transparent; /* 编辑器背景色 */
  --w-e-textarea-color: #fff; /* 编辑器字体颜色 */
  --w-e-textarea-slight-color: #4d6b8f; /* 编辑器描述色 */
  --w-e-toolbar-disabled-color: #4d6b8f; /* 编辑器失去焦点色 */
  --w-e-toolbar-active-bg-color: #395e8b; /* 选中背景色 */
  --w-e-toolbar-active-color: #8097bb; /* 工具栏悬浮背景色 */

  /* ...其他... */
}

.w-e-text-container {
  font-size: 1.25rem;
}
</style>
<!--
工具栏
function genDefaultToolbarKeys() {
    return [
        'headerSelect',
        //'header1',
        //'header2',
        //'header3',
        'blockquote',
        '|',
        'bold',
        'underline',
        'italic',
        {
            key: 'group-more-style',
            title: cp$1('editor.more'),
            iconSvg: MORE_SVG,
            menuKeys: ['through', 'code', 'sup', 'sub', 'clearStyle'],
        },
        'color',
        'bgColor',
        '|',
        'fontSize',
        'fontFamily',
        'lineHeight',
        '|',
        'bulletedList',
        'numberedList',
        'todo',
        {
            key: 'group-justify',
            title: cp$1('editor.justify'),
            iconSvg: JUSTIFY_LEFT_SVG,
            menuKeys: ['justifyLeft', 'justifyRight', 'justifyCenter', 'justifyJustify'],
        },
        {
            key: 'group-indent',
            title: cp$1('editor.indent'),
            iconSvg: INDENT_RIGHT_SVG,
            menuKeys: ['indent', 'delIndent'],
        },
        '|',
        'emotion',
        'insertLink',
        //'editLink',
        //'unLink',
        //'viewLink',
        {
            key: 'group-image',
            title: cp$1('editor.image'),
            iconSvg: IMAGE_SVG,
            menuKeys: ['insertImage', 'uploadImage'],
        },
        //'deleteImage',
        //'editImage',
        //'viewImageLink',
        {
            key: 'group-video',
            title: cp$1('editor.video'),
            iconSvg: VIDEO_SVG,
            menuKeys: ['insertVideo', 'uploadVideo'],
        },
        //'deleteVideo',
        'insertTable',
        'codeBlock',
        //'codeSelectLang',
        'divider',
        //'deleteTable',
        '|',
        'undo',
        'redo',
        '|',
        'fullScreen',
    ];
}
function genSimpleToolbarKeys() {
    return [
        'blockquote',
        'header1',
        'header2',
        'header3',
        '|',
        'bold',
        'underline',
        'italic',
        'through',
        'color',
        'bgColor',
        'clearStyle',
        '|',
        'bulletedList',
        'numberedList',
        'todo',
        'justifyLeft',
        'justifyRight',
        'justifyCenter',
        '|',
        'insertLink',
        {
            key: 'group-image',
            title: cp$1('editor.image'),
            iconSvg: IMAGE_SVG,
            menuKeys: ['insertImage', 'uploadImage'],
        },
        'insertVideo',
        'insertTable',
        'codeBlock',
        '|',
        'undo',
        'redo',
        '|',
        'fullScreen',
    ];
}
 -->
