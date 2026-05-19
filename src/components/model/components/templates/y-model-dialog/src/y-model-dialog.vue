<script setup lang="ts">
/**
 * 日期：2026/5/19 11:02:00
 * author：Administrator Lsshu
 * 文件 y-model-dialog.vue | y-model-dialog
 **/
import { PropType, defineEmits, defineProps } from "vue";
import { ElDialog } from "element-plus";

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
  <div class="y-model-dialog">
    <el-dialog
      :modelValue="modelValue"
      destroy-on-close
      :close-on-click-modal="false"
      v-bind="config"
      :title="title"
      @close="emits('close', false)"
    >
      <template #default><slot name="default" /></template>
      <template #header><slot name="header" /></template>
      <template #footer><slot name="footer" /></template>
    </el-dialog>
  </div>
</template>
