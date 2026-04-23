<script setup lang="ts">
/**
 * 日期：2026/4/21 11:55:14
 * author：Administrator Lsshu
 * 文件 y-page-default.vue | y-page-default
 **/
import { defineProps, PropType } from "vue";
import { TYPage } from "@/types";
import { YTable } from "@/components/tables";

defineProps({
  config: {
    type: Object as PropType<TYPage>,
    default: () => {}
  }
});
</script>
<!-- @Description:  -->
<!-- @Author: Administrator Lsshu -->
<!-- @Date: 2026/4/21 -->
<template>
  <div class="y-page-default">
    <YTable v-bind="config.table" />
  </div>
</template>
<style scoped lang="scss">
.y-page-default {
  display: flex;
  flex: 1 1 auto;
  flex-grow: 1;
  flex-direction: column;
  overflow: hidden;
}
</style>
