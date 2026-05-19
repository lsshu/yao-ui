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
import { YModel } from "@/components/model";

defineProps({
  config: {
    type: Object as PropType<TYPage>,
    default: () => {}
  }
});
const yTable = ref<typeof YTable>();

// 搜索 提交 reset
const handleSearch = () => {
  yTable.value?.handleGetData();
};

const yModel = ref<typeof YModel>();
// 创建 编辑 确认 关闭
const handleCreate = () => {
  yModel.value?.handleOpen();
};
</script>
<!-- @Description:  -->
<!-- @Author: Administrator Lsshu -->
<!-- @Date: 2026/4/21 -->
<template>
  <div class="y-page-default">
    <YSearch
      v-if="
        config.search?.show !== false && (config.search?.rows || []).length > 0
      "
      :config="config.search"
      @event:search="handleSearch"
      @event:reset="handleSearch"
    />
    <YTable
      v-if="
        config.table?.show !== false && (config.table?.columns || []).length > 0
      "
      ref="yTable"
      :config="config.table"
      @event:create="handleCreate"
    />
    <YModel ref="yModel" :config="config.model" />
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
