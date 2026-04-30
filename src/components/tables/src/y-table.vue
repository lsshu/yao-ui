<script setup lang="ts">
/**
 * 日期：2026/4/21 14:43:26
 * author：Administrator Lsshu
 * 文件 y-table.vue | y-table
 **/
import { PropType, ref, computed, watch } from "vue";
import * as YTableData from "../components/data";
import { TYTablePagination, TYTable, TYFilter, TYSort } from "@/types";
import { service as default_service, Api } from "@/components/api";
import { Plus, Refresh } from "@element-plus/icons-vue";
import { debounce } from "@/utils/debounce";
const props = defineProps({
  config: {
    type: Object as PropType<TYTable>,
    default: () => ({})
  }
});
const emit = defineEmits(["update:sort", "update:params"]);
const { getModelIndex } = new Api(props.config.service || default_service); // 初始化服务类
// 初始化数据
const tableData = ref<any[]>([]);
const total = computed(() => tableData.value.length);
const paginationRef = ref<TYTablePagination>({
  currentPage: 1,
  pageSize: 50,
  total: total as any,
  pageSizes: [25, 50, 100, 200, 500]
}); // 分页参数配置
// 排序变化事件
const orderRef = ref<any>({}); // 查询参数
const handleSetSort = (sort: TYSort) => {
  orderRef.value = sort;
};
const handleTableSortChange = ({ order, prop }: any) => {
  orderRef.value = order ? { order, sort: prop } : {};
  return false;
};
const filterRef = ref<TYFilter>({
  filter: {},
  operator: {}
});

const handleSetFilter = (filter: TYFilter) => {
  filterRef.value = filter;
};
const handleGetData = debounce(() => {
  // 排序参数
  getModelIndex({
    model: typeof props.config.api === "string" ? props.config.api : undefined,
    url:
      typeof props.config.api !== "string"
        ? props.config.api?.index
        : undefined,
    config: {
      params: {
        pageNo: paginationRef.value?.currentPage,
        pageSize: paginationRef.value?.pageSize,
        ...props.config.params,
        order: orderRef.value,
        ...filterRef.value
      }
    }
  }).then((result: any) => {
    tableData.value = result.data?.list || result.list || [];
  });
}, 300);
// 监听分页参数变化获取数据 监听分页参数变化
watch(
  () => [
    paginationRef.value.currentPage, // 监听当前页码
    paginationRef.value.pageSize, // 监听每页条数
    orderRef.value, // 监听排序参数
    props.config.params // 监听另外查询参数
  ],
  handleGetData, // 监听变化执行获取数据方法
  {
    deep: true,
    immediate: true
  }
);
defineExpose({
  handleGetData,
  handleSetFilter,
  handleSetSort
});
</script>
<!-- @Description:  -->
<!-- @Author: Administrator Lsshu -->
<!-- @Date: 2026/4/21 -->
<template>
  <div class="y-table">
    <slot name="table">
      <div class="y-table-container">
        <slot name="table-header">
          <div class="y-table-header">
            <div class="y-table-header-title">{{ config.title }}</div>
            <div class="y-table-header-content">
              <slot name="table-header-content">
                <el-button-group>
                  <el-button type="primary" :icon="Plus"> 创建 </el-button>
                  <el-button
                    type="info"
                    :icon="Refresh"
                    @click="handleGetData"
                  />
                </el-button-group>
              </slot>
            </div>
          </div>
        </slot>
        <el-table
          stripe
          highlight-current-row
          :data="tableData"
          :height="config.height || '100%'"
          :style="{ width: config.width || '100%' }"
          @sort-change="handleTableSortChange"
        >
          <template #empty>
            <slot name="table-empty">
              <el-empty description="没有数据" />
            </slot>
          </template>
          <el-table-column
            v-if="config.selectAble"
            align="center"
            type="selection"
            width="40"
          />
          <el-table-column
            v-for="item in config.columns"
            :key="item.field"
            align="center"
            show-overflow-tooltip
            :prop="item.field"
            v-bind="item"
          >
            <template #default="scope">
              <component
                :is="YTableData[item?.type || 'text']"
                :row="scope.row"
                :column="scope.column"
                :scope="scope"
                :item="item"
              />
            </template>
          </el-table-column>
          <slot name="operate">
            <el-table-column
              fixed="right"
              align="center"
              label="操作"
              min-width="120"
            >
              <template #default="scope">
                <slot name="operate-content" v-bind="scope">
                  <slot name="operate-content-before" v-bind="scope" />
                  <!--<el-button link type="primary" size="small">编辑</el-button>-->
                  <slot name="operate-content-after" v-bind="scope" />
                </slot>
              </template>
            </el-table-column>
          </slot>
        </el-table>
      </div>
    </slot>
    <slot name="pagination">
      <div class="y-table-pagination">
        <el-pagination
          v-model:page-size="paginationRef.pageSize"
          v-model:current-page="paginationRef.currentPage"
          size="small"
          background
          layout="prev, pager, next, total, sizes"
          class="mt-4"
          v-bind="paginationRef"
        />
      </div>
    </slot>
  </div>
</template>
<style scoped lang="scss">
.y-table {
  display: flex;
  flex: 1 1 auto;
  flex-grow: 1;
  flex-direction: column;
  padding: 10px !important;
  overflow: hidden;
  background-color: #fff;
  border-radius: 5px;

  .y-table-container {
    flex-grow: 1;

    :deep(.y-table-header) {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 10px;

      .y-table-header-title {
        font-size: 1.5rem;
        font-weight: bold;
      }
    }

    :deep(.el-table__header-wrapper .el-table__header tr th) {
      background-color: var(--el-fill-color-light) !important;
    }
  }

  .y-table-pagination {
    display: flex;
    justify-content: flex-end;

    .el-pagination {
      margin: 12px 0;

      ::v-deep(.el-pager) {
        li {
          border-radius: 15px;
        }
      }

      ::v-deep(.btn-prev),
      ::v-deep(.btn-next),
      button {
        border-radius: 15px;
      }
    }
  }
}
</style>
