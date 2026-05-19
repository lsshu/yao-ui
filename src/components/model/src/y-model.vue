<script setup lang="ts">
/**
 * 日期：2026/5/19 10:59:58
 * author：Administrator Lsshu
 * 文件 y-model.vue | y-model
 **/
import * as ModelItems from "../components";
import { defineProps, PropType, computed, ref } from "vue";
import { TYModel } from "../types";
import { YForm } from "@/components/forms";
import { TYProps } from "@/components/forms/types";
const props = defineProps({
  config: {
    type: Object as PropType<TYModel>,
    default: () => {}
  },
  rowProps: {
    type: Object as PropType<TYProps>,
    default: () => ({
      gutter: 24
    })
  },
  colProps: {
    type: Object as PropType<TYProps>,
    default: () => ({
      gutter: 24,
      sm: { span: 24 },
      md: { span: 12 },
      lg: { span: 12 }
    })
  }
});

const dialogTitle = computed(() => {
  return (
    props.config?.title || props.config?.modelProps?.title || "数据" //+
    // (props.modelData.id ? "编辑" : "新增")
  );
});
// 弹窗控制
const modelValue = ref(false);
const handleOpen = () => {
  // 打开弹窗
  modelValue.value = true;
};
// Object.fromEntries(Object.entries(ModelItems)) 获取配置里的组件默认值
const defaultModelValue = Object.fromEntries(
  props.config?.rows
    ?.map(row =>
      row.cols
        ?.filter(col => col.item && col.item.value)
        .map(col => [col.item?.field, col.item?.value])
    )
    .flat() as any
);
// 表单数据默认值
const formValue = ref<any>({
  ...defaultModelValue
});
// 表单ref
const yFormRef = ref<typeof YForm | null>();
defineExpose({
  handleOpen
});
</script>
<!-- @Description:  -->
<!-- @Author: Administrator Lsshu -->
<!-- @Date: 2026/5/19 -->
<template>
  <div class="y-model">
    <component
      :is="ModelItems[config.type || 'YModelDialog']"
      :modelValue="modelValue"
      :config="config.modelProps"
      :title="dialogTitle"
      @close="modelValue = false"
    >
      <YForm
        ref="yFormRef"
        v-model="formValue"
        :rowProps="rowProps"
        :colProps="colProps"
        :rows="config.rows"
        :rules="config.rules"
      />
    </component>
  </div>
</template>
