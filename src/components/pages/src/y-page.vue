<script setup lang="ts">
/**
 * 日期：2026/4/20 17:50:13
 * author：Administrator Lsshu
 * 文件 pages.vue | pages
 **/
import { PropType, defineProps, ref } from "vue";
import { ElConfigProvider } from "element-plus";
import zhCn from "element-plus/es/locale/lang/zh-cn";
import { TYPage } from "@/types";
import * as PagesTemplate from "../components/templates";
// import { useI18n } from "vue-i18n";
// const { t } = useI18n();

defineProps({
  config: {
    type: Object as PropType<TYPage>,
    default: () => {}
  }
});
const pages = ref<any>(null);
defineExpose({
  pages
});
const slots: string[] = [];
</script>
<!-- @Description:  -->
<!-- @Author: Administrator Lsshu -->
<!-- @Date: 2026/4/20 -->
<template>
  <div class="pages grow">
    <el-config-provider :locale="zhCn">
      <component
        :is="PagesTemplate[config.template || 'YPageDefault']"
        ref="pages"
        :config="config"
      >
        <template v-for="slot in slots" #[slot]="scope">
          <slot :name="slot" v-bind="scope" />
        </template>
      </component>
    </el-config-provider>
  </div>
</template>
<style>
.grow {
  display: flex;
}
</style>
<style lang="scss" scoped>
.pages {
  display: flex;
  flex: 1 1 auto;
  flex-grow: 1;
  flex-direction: column;
  margin: 10px !important;
  overflow: hidden;
}
</style>
