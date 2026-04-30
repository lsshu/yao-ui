<script setup lang="ts">
/**
 * 日期：2026/4/21 11:55:14
 * author：Administrator Lsshu
 * 文件 y-page-default.vue | y-page-default
 **/
import { defineProps, PropType, ref } from "vue";
import { TYPage } from "@/types";
import { YSearch } from "@/components/search";
import { YTable } from "@/components/tables";

defineProps({
  config: {
    type: Object as PropType<TYPage>,
    default: () => {}
  }
});
const yTable = ref<typeof YTable>();
const handleSearch = () => {
  yTable.value?.handleGetData();
};
</script>
<!-- @Description:  -->
<!-- @Author: Administrator Lsshu -->
<!-- @Date: 2026/4/21 -->
<template>
  <div class="y-page-default">
    <YSearch
      v-if="config.search?.show !== false"
      :config="config.search"
      @event:search="handleSearch"
      @event:reset="handleSearch"
    />
    <YTable
      v-if="config.table?.show !== false"
      ref="yTable"
      :config="config.table"
    />
  </div>
</template>
<style scoped lang="scss">
.y-page-default {
  display: flex;
  flex: 1 1 auto;
  flex-grow: 1;
  flex-direction: column;
  gap: 10px;
  overflow: hidden;
}
</style>
