<script setup lang="ts">
/**
 * 日期：2026/5/19 11:26:02
 * author：Administrator Lsshu
 * 文件 y-model-drawer.vue | y-model-drawer
 **/
import { PropType, defineEmits, defineProps } from "vue";
import { ElDrawer } from "element-plus";

defineProps({
  config: {
    type: Object as PropType<any>,
    default: () => ({})
  },
  title: {
    type: String,
    default: () => ""
  },
  modelValue: {
    type: Boolean,
    default: () => false
  }
});
const emits = defineEmits(["close"]);
</script>
<!-- @Description:  -->
<!-- @Author: Administrator Lsshu -->
<!-- @Date: 2026/5/19 -->
<template>
  <div class="y-model-drawer">
    <el-drawer
      :modelValue="modelValue"
      :title="title"
      :close-on-click-modal="false"
      @closed="emits('close', false)"
    >
      <template #default><slot name="default" /></template>
      <template #header><slot name="header" /></template>
      <template #footer><slot name="footer" /></template>
      <template #title><slot name="title" /></template>
    </el-drawer>
  </div>
</template>
