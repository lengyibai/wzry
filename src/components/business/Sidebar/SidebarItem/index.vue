<template>
  <div v-if="!item.leftHidden && item.path !== path">
    <template
      v-if="
        hasOneShowingChild(item.children, item) &&
        (!onlyOneChild.children || onlyOneChild.noShowingChildren) &&
        !item.alwaysShow
      "
    >
      <app-link v-if="onlyOneChild.meta" :to="resolvePath(onlyOneChild.path)">
        <el-menu-item :index="resolvePath(onlyOneChild.path)">
          <div class="submenu cursor-pointer">
            <span
              v-if="onlyOneChild.meta.icon"
              v-html="icon[onlyOneChild.meta.icon]"
            ></span>
            <span
              v-else
              style="font-size: 26px; font-weight: bold"
              >{{ onlyOneChild.meta.title[0] }}</span
            >
            <span>{{ onlyOneChild.meta && onlyOneChild.meta.title }}</span>
          </div>
        </el-menu-item>
      </app-link>
    </template>

    <!-- 二级菜单 -->
    <el-submenu
      v-else
      ref="subMenu"
      :index="resolvePath(item.path)"
      popper-append-to-body
    >
      <template v-slot:title>
        <div class="submenu cursor-pointer" @click="$click('展开')">
          <span v-if="item.meta.icon" v-html="icon[item.meta.icon]"></span>
          <span v-else style="font-size: 26px; font-weight: bold">{{
            item.meta.title[0]
          }}</span>
          <span>{{ item.meta && item.meta.title }}</span>
        </div>
      </template>
      <sidebar-item
        v-for="child in item.children"
        :key="child.path"
        :is-nest="true"
        :item="child"
        :base-path="resolvePath(child.path)"
        class="nest-menu"
      />
    </el-submenu>
  </div>
</template>

<script>
import path from 'path';
/* 用于路由跳转 */
import AppLink from './Link';
import icon from '@/assets/icon/svg/sidebar.js';

export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    basePath: {
      type: String,
      default: '',
    },
    path: {
      type: String,
      default: '',
    },
  },
  name: 'SidebarItem',
  components: { AppLink },
  data() {
    this.onlyOneChild = null;
    return {};
  },
  computed: {
    //#####··········图标··········#####//
    icon() {
      return icon;
    },
  },
  methods: {
    hasOneShowingChild(children = [], parent) {
      const showingChildren = children.filter((item) => {
        if (item.leftHidden) {
          return false;
        }
        this.onlyOneChild = item;
        return true;
      });
      if (showingChildren.length === 1) {
        return true;
      }

      if (showingChildren.length === 0) {
        this.onlyOneChild = { ...parent, path: '', noShowingChildren: true };
        return true;
      }

      return false;
    },
    resolvePath(routePath) {
      if (/^(https?:|mailto:|tel:)/.test(routePath)) {
        return routePath;
      }
      if (/^(https?:|mailto:|tel:)/.test(this.basePath)) {
        return this.basePath;
      }
      return path.resolve(this.basePath, routePath);
    },
  },
};
</script>
