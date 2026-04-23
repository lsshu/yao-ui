<script setup lang="ts">
/**
 * 日期：2026/4/21 14:58:04
 * author：Administrator Lsshu
 * 文件 y-data-text.vue | y-data-text
 **/
import { TYTableColumns } from "@/components/tables/types";
import { type PropType, defineProps } from "vue";
defineProps({
  row: {
    type: Object as PropType<any>,
    default: () => ({})
  },
  column: {
    type: Object as PropType<any>,
    default: () => ({})
  },
  item: {
    type: Object as PropType<TYTableColumns>,
    default: () => ({})
  }
});
</script>
<!-- @Description:  -->
<!-- @Author: Administrator Lsshu -->
<!-- @Date: 2026/4/21 -->
<template>
  <div class="y-data-text">{{ row?.[column.rawColumnKey] }}</div>
</template>
