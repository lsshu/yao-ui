<script setup lang="ts">
/**
 * 日期：2026/4/21 13:56:51
 * author：Administrator Lsshu
 * 文件 y-form.vue | y-form
 **/
import type { FormInstance, FormRules } from "element-plus";
import {
  type PropType,
  defineEmits,
  defineProps,
  ref,
  watch,
  defineExpose
} from "vue";
import * as FormItems from "../components/items";
import { TYFormCol, TYFormRow, TYProps } from "../types";
const _props = defineProps({
  data: {
    type: Object,
    default: () => {}
  },
  rules: {
    type: Object as PropType<FormRules>,
    default: () => {}
  },
  rows: {
    type: Array as PropType<TYFormRow[]>,
    default: () => []
  },
  rowProps: {
    type: Object as PropType<TYProps>,
    default: () => ({})
  },
  colProps: {
    type: Object as PropType<TYProps>,
    default: () => ({
      xs: { span: 24 },
      sm: { span: 24 },
      md: { span: 12 },
      lg: { span: 12 },
      xl: { span: 12 }
    })
  },
  formProps: {
    type: Object as PropType<TYProps>,
    default: () => ({})
  },
  modelValue: {
    type: Object,
    default: () => ({})
  }
});
const tempModelValue = ref({ ..._props.data, ..._props.modelValue });
const rulesValue = ref({ ..._props.rules });
const formRef = ref<FormInstance>();
const emits = defineEmits(["update:modelValue"]);

const handleValueChange = (value: any, field: string) => {
  // 如果值有变化，则更新内部状态，并触发事件
  if (value !== tempModelValue.value[field]) {
    tempModelValue.value = { ...tempModelValue.value, [field]: value };
  }
  // emits('update:modelValue', { ...tempModelValue.value })
};

// 根据组件类型获取合适的默认值
const getDefaultValueByType = (type: string) => {
  switch (type) {
    case "input":
    case "select":
      return "";
    case "number":
      return 0;
    case "checkbox":
      return [];
    default:
      return "";
  }
};
// 优化后的 model-value 计算
const getModelValueForItem = (col: TYFormCol) => {
  const field = col.item?.field || "";
  return field in tempModelValue.value
    ? tempModelValue.value[field]
    : getDefaultValueByType(col.item?.type as string);
};

// 监听 model-value 变化，更新内部状态并触发事件
watch(
  () => tempModelValue.value,
  newVal => emits("update:modelValue", { ...newVal }),
  { deep: true }
);
watch(
  () => _props.modelValue,
  newVal => {
    for (const key in newVal) {
      if (newVal[key] !== tempModelValue.value[key]) {
        tempModelValue.value[key] = newVal[key];
      }
    }
  },
  { deep: true }
);
defineExpose({
  formRef
});
</script>
<!-- @Description:  -->
<!-- @Author: Administrator Lsshu -->
<!-- @Date: 2026/4/21 -->
<template>
  <div class="y-form">
    <el-form
      ref="formRef"
      :model="modelValue"
      :rules="rulesValue"
      label-width="auto"
      :status-icon="true"
      v-bind="{ ...formProps }"
    >
      <el-row
        v-for="(row, row_index) in rows"
        :key="row_index"
        v-bind="{ ...rowProps, ...row.props }"
      >
        <slot
          :name="row.slotPrependName || 'rowSlotPrependName'"
          :row="row"
          :modelData="tempModelValue"
          :colProps="colProps"
        />
        <el-col v-if="row.rowTitle">
          <el-divider content-position="left">
            <h3 class="row-title">{{ row.rowTitle }}</h3>
          </el-divider>
        </el-col>
        <el-col
          v-for="(col, col_index) in row.cols"
          :key="col_index"
          v-bind="{ ...colProps, ...col.props }"
        >
          <component
            :is="FormItems[col.item?.type || 'input']"
            v-if="col.item"
            :model-value="getModelValueForItem(col)"
            :modelData="tempModelValue"
            :item="col.item"
            @handle:value-change="handleValueChange"
          >
            <template v-if="col.item.slotName" #[col.item.slotName]>
              <slot
                :name="col.item.slotName"
                :item="col.item"
                :modelData="tempModelValue"
              />
            </template>
            <!--前置-->
            <template
              v-if="col.item.slotPrependName"
              #[col.item.slotPrependName]
            >
              <slot
                :name="col.item?.slotPrependName"
                :item="col.item"
                :modelData="tempModelValue"
              />
            </template>
            <!--追加-->
            <template v-if="col.item.slotAppendName" #[col.item.slotAppendName]>
              <slot
                :name="col.item?.slotAppendName"
                :item="col.item"
                :modelData="tempModelValue"
              />
            </template>
          </component>
          <slot v-else-if="col.slotName" :name="col.slotName" />
        </el-col>
        <slot
          :name="row.slotAppendName || 'rowSlotAppendName'"
          :row="row"
          :modelData="tempModelValue"
          :colProps="colProps"
        />
      </el-row>
    </el-form>
  </div>
</template>
<style scoped lang="scss">
.y-form {
  display: flex;
  flex: 1 1 auto;
  flex-grow: 1;
  flex-direction: column;
}
</style>
