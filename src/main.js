﻿// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
// 路由
import router from './router';
// 状态管理
import store from '@/store/index.js';
// 动态改变路由到状态管理
import { sync } from 'vuex-router-sync';
// ajax请求
import 'common/js/axios.js';
// iView UI框架
import iView from 'iview';
// iView 样式与主题
import 'common/less/iview-theme.less';
// 引入jQuery
import 'static/jquery/jquery.min.js';
// muse UI框架
import MuseUI from 'muse-ui'
import 'muse-ui/dist/muse-ui.css'
import 'muse-ui/dist/theme-light.css' // 使用 light 主题
// Mcake工具集
import '@/frame/Mcake/Mcake.js';
//echats图表
import echarts from "echarts"
// 引入element-ui 组件
import { Table, CheckboxGroup, RadioGroup, RadioButton, Checkbox, TableColumn, Menu, Carousel, Pagination, CarouselItem, Select, Option, Submenu, MenuItem, Loading, Button } from 'element-ui';


// 初始化路由状态
sync(store, router);

// 注册组件
Vue.use(iView);
Vue.config.productionTip = false;
// 注册muse-ui
Vue.use(MuseUI);

// 注册element-ui 组件
Vue.use(Table);
Vue.use(TableColumn);
Vue.use(Menu);
Vue.use(Submenu);
Vue.use(MenuItem);
Vue.use(Loading);
Vue.use(Carousel);
Vue.use(CarouselItem);
Vue.use(Button);
Vue.use(Select);
Vue.use(Option);
Vue.use(Pagination);
Vue.use(Checkbox);
Vue.use(CheckboxGroup);
Vue.use(RadioGroup);
Vue.use(RadioButton);



// 创建应用
let vm = new Vue({
    el: '#app',
    router,
    store,
    template: '<App/>',
    components: { App }
})