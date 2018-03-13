<style lang="scss">
// 公共变量
@import '~common/scss/public/base-url';
// 后台公共样式
@import '~common/scss/admin-basic-style';

/* 当前页面使用的变量 */

$admin-layout-toggle-height: 24px;
// 左侧导航字体
$left-menu-font: 18px;
// 左侧导航背景
$left-menu-bg: #3C3F60;
// 右侧主体背景
$right-main-bg: #ECF0F5;

/* 后台主容器 */

.admin {
  /* 主容器 */
    .admin-layout {
        position: relative;
        // overflow: hidden;
        height: 100%;
        padding-top: 60px;
        background: $right-main-bg;
        // overflow-y:scroll;
    }
    /* 主体 */
    .admin-main {
        width: 100%;
        height: 100%;
        .admin-layout-left,
        .layout-container {
            transition: width .3s ease-in-out;
        }
    }
    /* 左侧导航 */
    .admin-layout-left {
        position: relative;
        height: 100%;
        background: $left-menu-bg;
        color: #b8c7ce;
        font-size: $left-menu-font;
        .admin-layout-nav {
            width: 100%;
            height: 60px;
            padding-left: 9%;
            line-height: 60px;
            font-size: 14px;
            .menu{
                letter-spacing:35px;
                @media screen and (max-width:1100px){
                    letter-spacing:20px;
                }
                @media screen and (max-width:812px){
                    letter-spacing:10px;
                }
            }
            &:nth-of-type(1) {
                color: #b8c7ce;
                background: #3C3F60;
            }
        }
    }
    /* 右侧主体内容*/
    .layout-container {
        background: $right-main-bg;
        overflow-y:auto;
        height:100%;
        .layout-content {
            margin-top: $admin-layout-toggle-height;
            margin-left: 20px;
            margin-right: 20px;
            background:#fff;
            .layout-main {
                .main-head {
                    border: 10px solid #fff;
                    height: 50px;
                    line-height: 30px;
                    .ivu-breadcrumb {
                        color: #3c8dbc;
                        font-size: 16px;
                        & > span:first-child {
                            padding-left: 10px;
                        }
                        & > span:last-child {
                            font-weight: normal;
                            color: #666;
                        }
                    }
                }
                .main-inner {
                    margin-top: 12px;
                    height: 1000px;
                    background: #fff;
                }
            }
        }
    }
}
</style>
<template>
<!-- 后台主容器  v-loading="load" -->
<div class="admin-layout" > 
    <!-- 头部 -->
    <adminHead :cusername="cusername"></adminHead>
    <!-- 主体 -->
    <Layout class="admin-main" type="flex">
        <Sider ref="side1" hide-trigger collapsible :collapsed-width="64" v-model="isCollapsed" class="admin-layout-left">
            <div class="admin-layout-nav" style="height:56px;margin:0;text-align:center;">
                <!-- <span class="menu">目录</span> -->
                <Icon @click.native="collapsedSider" :class="rotateIcon"  style="cursor:pointer;margin:17px 21px;"  type="navicon-round" size="22"></Icon>
            </div>
            <el-menu theme="dark"
                :class="menuitemClasses" 
                :router="true" 
                :unique-opened="true"
                :collapse="isCollapsed"
                :default-openeds="adminOpenMenus"
                :default-active="$route.path"
                @open="subMenuOpen"
                @close="subMenuClose">
                <div v-for="(item, index) in menuList" :key="index">
                    <!-- 判断是否存在子级菜单 -->
                    <el-menu-item  v-if="!item.subMenus.length" :index="item.url">
                        <Icon :type="item.icon"  size="22"></Icon>
                        <span slot="title">{{item.menuName}}</span>
                    </el-menu-item>
                    <el-menu-item v-else @click="showChildBar(item)"  :index="item.url">
                        <Icon :type="item.icon"  size="22"></Icon>
                        <span slot="title">{{item.menuName}}</span>
                    </el-menu-item>
                    <!-- 如果包含二级菜单 -->
                    <!-- <el-submenu v-else :index="item.menuName"> -->
                        <!-- 一级菜单 -->
                        <!-- <template slot="title">
                            <Icon :type="item.icon"  size="22"></Icon>
                            <span>{{item.menuName}}</span>
                        </template> -->
                        <!-- 子菜单菜单 -->
                        <!-- <el-menu-item @click="selecActive(subMenu.productId)"  v-for="(subMenu, idx) in item.subMenus" :index="subMenu.url+'?product='+subMenu.productId+''" :key="idx">
                            <span>{{subMenu.menuName}}</span>
                        </el-menu-item> -->
                    <!-- </el-submenu> -->
                </div>
                <!-- <Tooltip placement="right" content="罕见病" :disabled="!isCollapsed"> 
                    <el-menu-item index="/admin">
                        <Icon type="android-list" style="margin-right:8%;" size="22"></Icon>
                        <span>罕见病</span>
                    </el-menu-item>
                </Tooltip> 
                <Tooltip placement="right" content="癌症" :disabled="!isCollapsed">
                    <el-menu-item index="/admin/tomour/index">
                        <Icon type="ios-pie" style="margin-right:8%;" size="22"></Icon>
                        <span>癌症</span>
                    </el-menu-item> 
                </Tooltip>   
                <Tooltip placement="right" content="任务管理" :disabled="!isCollapsed">         
                    <el-menu-item index="/admin/task-management">
                        <Icon type="social-buffer" style="margin-right:8%;" size="22"></Icon>
                        <span>任务管理</span>
                    </el-menu-item>
                </Tooltip> 
                <Tooltip placement="right" content="文件管理" :disabled="!isCollapsed">
                    <el-menu-item index="/admin/fileManage">
                        <Icon type="folder" style="margin-right:8%;" size="22"></Icon>
                        <span>文件管理</span>
                    </el-menu-item>
                </Tooltip> 
                 <Tooltip placement="right" content="流程管理" :disabled="!isCollapsed">
                    <el-menu-item index="/admin/process_index">
                        <Icon type="network" style="margin-right:8%;" size="22"></Icon>
                        <span>流程管理</span>
                    </el-menu-item> 
                </Tooltip>     -->
            </el-menu>
        </Sider>
        <Layout>
            <Content :style="{margin: '20px', background: '#fff'}">
                <div class="layout-content">
                    <div class="layout-main">
                        <!-- 子页面展示区域 -->
                        <router-view v-if="show"></router-view>
                    </div>
                </div>
            </Content>
        </Layout>
    </Layout> 
</div>
</template>
<script>
  // 引入头部
import adminHead from './head.vue';
import {login} from 'api/index.js'
import {setCookie,getCookie} from '@/common/js/cookie.js';
// 状态
import {
    mapState,
    mapMutations
} from 'vuex';
  // 实例
export default {
    data() {
        return {
            isCollapse: false,  //菜单展开还是收缩
            menuList:[],
            product:"",
            isCollapsed: false,
            cusername:"",   //用户名
            // load:Boolean,   //加载loading
            show:false,    //子页面展示
        }
    },
    computed: {
        // 导航图标大小
        iconSize() {
            return this.spanLeft === 4 ? 16 : 20;
        },
        rotateIcon () {  //目录图标变化
            return [
                'menu-icon',
                this.isCollapsed ? 'rotate-icon' : ''
            ];
        },
        menuitemClasses () {  //菜单类名切换
            return [
                'el-menu-vertical-demo',
                this.isCollapsed ? 'collapsed-menu' : ''
            ]
        },
        // 获取状态
        ...mapState({
            // 当前展开的一级菜单集
            adminOpenMenus: (state) => state.adminOpenMenus
        })
    },
    methods:{
        collapsedSider () {       
            this.$refs.side1.toggleCollapse();
            this.product = M.url().product;
        },
        showChildBar(item){
            if(item.menuName == "任务管理"){
                // this.$store.state.taskManageMenuList = [];
                this.$store.state.taskManageMenuList = M.clone( item.subMenus );
            }else if(item.menuName == "文件管理"){
                // this.$store.state.fileManageMenuList = [];
                this.$store.state.fileManageMenuList =  M.clone( item.subMenus );
            }else if(item.menuName == "流程管理"){
                // this.$store.state.processManageMenuList = [];
                this.$store.state.processManageMenuList = M.clone( item.subMenus );
            }
        },
        getMenu(){
            let obj={};
            login.getSystemMenu(obj).then((data)=>{
                console.log(data)
                if(data.returnCode==0 || data.returnCode==200) {
                    if(data.data && data.data.length>0){
                        this.menuList = data.data;
                    }
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }else{
                    this.$Message.error(data.msg)
                }
            }).catch((err)=>{

            })
        },
        // 一级菜单被打开事件
        subMenuOpen(index) {
            // 设置新的菜单集到状态仓库
            this.setAdminOpenMenus([index]);
        },
        // 一级菜单被关闭事件
        subMenuClose(index) {
            // 设置新的菜单集到状态仓库
            this.setAdminOpenMenus([]);
        },
        // 获得状态管理方法
        ...mapMutations({
            // 设置后台一级菜单展开项 传入一级菜单中文名称数组
            setAdminOpenMenus: "setAdminOpenMenus"
        })
    },
    beforeRouteEnter(to, from, next){
        // console.log(vm)
        next(vm=>{
            console.log(vm)
            let search=window.location.search.slice(1,6);
            if(search=="code="){
                let code=window.location.search.substr(6).split("&")[0];
                console.log(code) 
                // vm.load=true;
                login.tgexLogin(code).then((data)=>{
                    if(data.returnCode==0 || data.returnCode==200){
                        if(data.data!=null || data.data!="null"){
                            M.extend(vm.$store.state.currentUser,data.data)
                            setCookie('email',data.data.user.email,null);
                            setCookie('userid',data.data.user.dchUserId,null);
                            setCookie('username',data.data.user.username,null)
                            vm.cusername=decodeURI(data.data.user.username);
                            vm.$store.state.uid=data.data.user.dchUserId;
                            vm.$store.state.code=code;
                            vm.show=true;
                            // vm.load=false;
                            console.log(vm.cusername)
                        }
                        // vm.load=false;
                    }else if(data.returnCode==422 || data.returnCode==204){
                            vm.$router.push('/login')
                    }else{
                        vm.$Message.error(data.msg);
                        // vm.load=false;
                        vm.$router.push('/')
                    }
                    
                })
            }else{
                // vm.load=false;
                vm.show=true;
                vm.cusername=decodeURI(getCookie('username'));
                console.log(vm.cusername)
            }
        })
    },
    // created() {
    //     let search=window.location.search.slice(1,6);
    //     if(search=="code="){
    //         let code=window.location.search.substr(6).split("&")[0];
    //         console.log(code) 
    //         this.load=true;
    //         login.tgexLogin(code).then((data)=>{
    //             if(data.returnCode==0 || data.returnCode==200){
    //                 if(data.data!=null || data.data!="null"){
    //                     M.extend(this.$store.state.currentUser,data.data)
    //                     setCookie('email',data.data.user.email,null);
    //                     setCookie('userid',data.data.user.dchUserId,null);
    //                     setCookie('username',data.data.user.username,null)
    //                     this.cusername=getCookie('username');
    //                     this.$store.state.uid=data.data.user.dchUserId;
    //                     this.$store.state.code=code;
    //                     this.show=true;
    //                     this.load=false;
    //                 }
    //                 this.load=false;
    //             }else if(data.returnCode==422 || data.returnCode==204){
    //                     this.$router.push('/login')
    //             }else{
    //                 this.$Message.error(data.msg);
    //                 this.load=false;
    //                 this.$router.push('/')
    //             }
                
    //         })
    //     }else{
    //         this.load=false;
    //         this.show=true;
    //         this.cusername=getCookie('username');
    //     }
    // },
    //实例创建完成
    mounted() {
       this.getMenu();
       this.product = M.url().product;
    },
    // 组件
    // created(){
        
    // },
    components: {
      // 头部
      adminHead,
    }
  }

</script>
