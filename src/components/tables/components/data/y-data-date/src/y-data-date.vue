<script setup lang="ts">
/**
 * 日期：2026/4/22 22:12:51
 * author：Administrator Lsshu
 * 文件 y-data-date.vue | y-data-date
 **/
import { TYTableColumns } from "@/components/tables/types";
import { type PropType, defineProps, computed } from "vue";
import { formatDateTime } from "@/utils/date";
const props = defineProps({
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
const value = computed(() => {
  const date = props.row?.[props.column.rawColumnKey] || undefined;
  return date ? formatDateTime(date, props.item?.format) : date;
});
</script>
<!-- @Description:  -->
<!-- @Author: Administrator Lsshu -->
<!-- @Date: 2026/4/22 -->
<template>
  <div class="y-data-date">
    {{ value }}
  </div>
</template>
