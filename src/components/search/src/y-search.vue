<script setup lang="ts">
/**
 * 日期：2026/4/28
 * author：lsshu Lsshu
 * 文件 y-search.vue | y-search
 **/
import { type PropType, defineEmits, defineProps, ref } from "vue";
import { Search, RefreshRight } from "@element-plus/icons-vue";
import { YForm } from "@/components/forms";
import { TYSearch, TYProps } from "@/types";
const props = defineProps({
  config: {
    type: Object as PropType<TYSearch>,
    default: () => ({})
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
      xs: { span: 24 },
      sm: { span: 8 },
      md: { span: 8 },
      lg: { span: 4 },
      xl: { span: 4 }
    })
  },
  modelValue: {
    type: Object as PropType<any>,
    default: () => ({})
  }
});
const emits = defineEmits(["update:modelValue", "event:search", "event:reset"]);
const formValue = ref<any>({ ...props.modelValue });
const yFormRef = ref();
const handleSearchSubmit = () => {
  yFormRef.value?.formRef.validate((valid: boolean) => {
    if (!valid) return false;
    emits("event:search", formValue.value);
  });
};
const handleSearchReset = () => {
  yFormRef.value?.formRef.resetFields();
  emits("event:reset", formValue.value);
};
</script>
<!-- @Description:  -->
<!-- @Author: lsshu Lsshu -->
<!-- @Date: 2026/4/28 -->
<template>
  <div class="y-search">
    <YForm
      ref="yFormRef"
      v-model="formValue"
      :rowProps="rowProps"
      :colProps="colProps"
      :rules="config.rules"
      :rows="config.rows"
    >
      <template #rowSlotAppendName="scope">
        <slot name="rowSlotAppendName" v-bind="scope">
          <el-col v-bind="{ ...colProps, ...config.afterProps }">
            <el-button
              type="primary"
              :icon="Search"
              @click="handleSearchSubmit"
            >
              搜索
            </el-button>
            <el-button
              type="default"
              :icon="RefreshRight"
              @click="handleSearchReset"
            >
              重置
            </el-button>
            <slot
              name="rowSlotAppendNameAfter"
              v-bind="{ ...scope, ...colProps }"
            />
          </el-col>
        </slot>
      </template>
    </YForm>
  </div>
</template>
<style scoped lang="scss">
.y-search {
  display: flex;
  padding: 10px !important;
  background-color: #fff;
  border-radius: 5px;

  .el-button + .el-button {
    margin-left: 5px;
  }
}
</style>
