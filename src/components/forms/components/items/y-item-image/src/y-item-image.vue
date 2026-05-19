<script setup lang="ts">
/**
 * 日期：2026/4/30 17:55:41
 * author：Administrator Lsshu
 * 文件 y-item-image.vue | y-item-image
 **/
import { ElFormItem } from "element-plus";
import { Plus } from "@element-plus/icons-vue";
import { PropType, defineProps, defineEmits, ref } from "vue";
import { TYFormItem } from "@/components/forms/types";
import { service as default_service, Api } from "@/components/api";

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
const imageVisible = ref(false);
const { httpRequestUpload } = new Api(_props.item.service || default_service); // 初始化服务类
const emits = defineEmits(["handle:valueChange", "update:modelValue"]);
const handleValueChange = (value: string | null) => {
  emits("handle:valueChange", value, _props.item.field);
  emits("update:modelValue", value);
};
// 自定义上传成功回调函数，默认返回图片路径 上传成功回调
const upLoadSuccessCallback =
  _props.item?.attr?.upLoadSuccessCallback ||
  ((response: any) => {
    return response.data.path;
  });
const showImagePath =
  _props.item?.attr?.showImagePath ||
  ((path: string) => {
    return path;
  });
const handleOnSuccess = (response: any) => {
  handleValueChange(upLoadSuccessCallback(response));
  return false;
};
const handleOnRemove = () => {
  handleValueChange(null);
};
</script>
<!-- @Description:  -->
<!-- @Author: Administrator Lsshu -->
<!-- @Date: 2026/4/30 -->
<template>
  <div class="y-item-image">
    <el-form-item
      class="m-b[10px]!"
      :label="item.label"
      :prop="item.field"
      v-bind="item.props"
    >
      <slot :name="item.slotName" :item="item" :modelData="modelData">
        <el-upload
          :class="{ 'is-single-file': modelValue }"
          :http-request="httpRequestUpload"
          :on-success="handleOnSuccess"
          :on-remove="handleOnRemove"
          :on-preview="() => (imageVisible = true)"
          accept="image/*"
          list-type="picture-card"
          v-bind="item.attr || {}"
        >
          <el-icon><Plus /></el-icon>
          <!--:show-file-list="false" 取消这个才有用 #file="{ file }" -->
        </el-upload>
      </slot>
    </el-form-item>
    <!-- 图片预览 -->
    <el-image-viewer
      v-if="imageVisible"
      :url-list="[showImagePath(modelValue)]"
      show-progress
      @close="imageVisible = false"
    />
  </div>
</template>
<style scoped lang="scss">
.y-item-image {
  :deep(.is-single-file) {
    .el-upload--picture-card {
      display: none;
    }
  }
}
</style>
