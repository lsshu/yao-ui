<script setup lang="ts">
/**
 * 日期：2026/4/21 14:02:26
 * author：Administrator Lsshu
 * 文件 y-item-input.vue | y-item-input
 **/
import { ElFormItem } from "element-plus";
import { PropType, defineProps, defineEmits } from "vue";
import { TYFormItem } from "@/components/forms/types";
const _props = defineProps({
  item: {
    type: Object as PropType<TYFormItem>,
    default: () => ({})
  },
  modelData: {
    type: Object,
    default: () => ({})
  },
  modelValue: {
    type: String,
    default: () => ""
  }
});
const emits = defineEmits(["handle:valueChange", "update:modelValue"]);
const handleValueChange = (value: string) => {
  emits("handle:valueChange", value, _props.item.field);
  emits("update:modelValue", value);
};
</script>
<!-- @Description:  -->
<!-- @Author: Administrator Lsshu -->
<!-- @Date: 2026/4/21 -->
<template>
  <div class="y-item-input">
    <el-form-item
      class="m-b[10px]!"
      :label="item.label"
      :prop="item.field"
      v-bind="item.props"
    >
      <slot :name="item.slotName" :item="item" :modelData="modelData">
        <el-input
          :model-value="modelValue as any"
          v-bind="item.attr"
          @update:model-value="handleValueChange"
        />
      </slot>
    </el-form-item>
  </div>
</template>
