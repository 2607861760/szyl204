<style lang="scss">
@import '~common/scss/public/base-variable';
@import '~common/scss/public/base-mixin';
@import '~common/scss/base-style';
.home-header{
    background:#fff;
    .home-header-top{
        height:80px;
        .home-header-top-right {
            float:right;
            line-height:60px;
            li{
                float:left;
                font-size:16px;
                color:#1996cd;
                .header-phone{
                    font-weight:700;
                    color:#1996cd;
                }
                .el-button--primary{
                    background:#1996cd;
                    &:hover{
                        opacity:0.8;
                    }
                }
                .top-own a{
                    color:#1996cd;
                    font-size:12px;
                    font-weight:700;
                }
            }
            li+li{
                margin-left:20px;
            }
        }
    }
    .home-header-nav{
        background:rgba(25, 150, 205, 1);
        height:40px;
        box-shadow:0 5px 5px #666;
        .nav-inner{
            width:1200px;
            margin:auto;
            height:100%;
            line-height:40px;
            &>li{
                float:left;
                color:#fff;
                font-size:16px;
                padding-left:20px;
                padding-right:20px;
                .nav-info{
                    display:none;
                    width:100%;
                    padding-top:10px;
                    padding-bottom:10px;
                    background:rgba(255,255,255,0.9);
                    position:absolute;
                    z-index:999;
                    left:0;
                    box-shadow:0 1px 5px rgba(0,0,0,.11);
                    .nav-info-inner{
                        @media (min-width: 768px) {
                            width: 750px;
                        }
                        @media (min-width: 992px) {
                            width: 870px;
                        }
                        @media (min-width: 1200px) {
                            width: 1200px;
                        }
                        margin:auto;
                        .goods{
                            margin-top:10px;
                            &>li{
                                float:left;
                                &>div{
                                    height:30px;
                                    line-height:30px;
                                    float:left;
                                    font-size:14px;
                                    .round{
                                        width:10px;
                                        height:10px;
                                        float:left;
                                        border-radius:50%;
                                        margin-top:10px;
                                        border:1px solid #1996cd;
                                    }
                                    span{
                                        color:#1996cd;
                                        padding-left:10px;
                                    }
                                    &:hover{
                                        .round{
                                            background:#1996cd;
                                        }
                                        span{
                                        color:#ff6600; 
                                        }
                                    }
                                }
                            }
                            &>li+li{
                                margin-left:20px;
                            }
                        }
                        .nav-txt{
                            width:600px;
                            float:left;
                            padding-left:20px;
                            padding-right:20px;
                            line-height:20px;
                            color:#000;

                        }
                    }
                }
                &:hover{
                    color:#ff6600;
                    &:after{
                        content:'';
                        width:100%;
                        height:3px;
                        float:left;
                        background:#ff6600;
                        margin-top:-3px;
                    }
                    .nav-info{
                        display:block;
                    }
                }
            }
        }
    }
}
</style>
<template>
    <header id="header" class="home-header">
        <div class="home-header-top">
            <Row style="padding:10px 20px;">
                <Col span="12">
                    <div>
                        <a href="http://www.dchealth.com/"><img style="width: 191px;height:50px;margin-top: 5px;" src='./logo.png'/></a>
                    </div>
                </Col>
                <Col span="12">
                    <ul class="home-header-top-right">
                        <li>
                            <Icon type="ios-telephone" color="#1996CD" size="16"></Icon>
                            <span class="header-phone">010-86452200</span>
                        </li>
                        <!-- <li>
                            <el-button size="small" type="primary">联系客服</el-button>
                        </li> -->
                        <li>
                            <div class="top-own">
                                <div v-if="currentUserName">
                                    <Avatar icon="person" style="margin-right:-20px;"/>
                                    <router-link to="/admin"  class="avatar-admin" style="margin-left:30px;">{{currentUserName}}</router-link>
                                </div>
                                <div v-else>
                                     <el-button size="small" type="primary" href="javascript:;" @click="loginModal" class="active">登录</el-button> 
                                     <!-- <router-link to="/login"  @click="loginModal = true" class="active" v-show="showBtn">登录</router-link>  -->
                                    <span v-show="showBtn">|</span>
                                    <!-- <router-link to="/register" v-show="showBtn">
                                        注册
                                    </router-link> -->
                                    <a href="javascript:;" v-show="showBtn">注册</a>
                                </div>
                                
                            </div>
                        </li>
                    </ul>
                </Col>
            </Row>
        </div>
        <div class="home-header-nav">
            <ul class="nav-inner container">
                <li style="cursor:pointer;" @click="gohome">首页</li>
                <li>关于我们</li>
                <li>
                    精准医学
                    <div class="nav-info">
                        <div class="nav-info-inner">
                            <div style="width:192px;height:122px;float:left;">
                                <img src="./gene.jpg" style="width:100%;height:100%;"/>
                            </div>
                            <!--<div class="nav-txt">
                                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Aenean euismod bibendum laoreet. Proin gravida dolor sit amet lacus accumsan et viverra justo commodo. Proin sodales pulvinar tempor. Cum sociis natoque penatibus et magnis dis parturient montes, nascetur ridiculus mus. Nam fermentum, nulla luctus pharetra vulputate, felis tellus mollis orci, sed rhoncus sapien nunc eget.
                            </div>-->
                            <div style="float:left;margin-left: 50px;">
                                <p style="font-size:18px;color:#1996cd;">产品中心</p>
                                <ol class="goods">
                                     <li>
                                        <div style="cursor:pointer;" @click="goGene">
                                            <div class="round"></div>
                                            <span>罕见病精准医学</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div style="cursor:pointer;" @click="goTumor">
                                            <div class="round"></div>
                                            <span>肿瘤精准医学</span>
                                        </div>
                                    </li>
                                    <li>
                                        <div>
                                            <div class="round"></div>
                                            <span>药物基因组精准分析</span>
                                        </div>
                                    </li>
                                </ol>
                            </div>
                        </div>
                    </div>
                </li>
                <li>组学云平台</li>
                <li>科研合作</li>
            </ul>
        </div>
    </header>
</template>
<script>
import {
    login
} from 'api/index.js'
import {getCookie} from '@/common/js/cookie.js';
import { register } from 'common/js/Base.js';
export default {
    name: "header",
    data() {
        return {
            avatarShow:false,
            currentUserEmail:'',
            showBtn: false,
            currentUserName: '',
            // 绑定用户名和密码
            formLogin: {},
            ruleValidate: {
                userName: [{
                    required: true,
                    message: '用户名不能为空',
                    trigger: 'blur'
                }],
                password: [{
                    required: true,
                    message: '密码不能为空',
                    trigger: 'blur'
                }],

            },
        }
    },
    methods: {
        getCookieValue() {
            let userName = getCookie('username');
            console.log(getCookie('userid')+111)
            if(getCookie('userid')) {
                this.currentUserName = userName;
                this.showBtn = false;
                this.avatarShow = true;
            }else{
                this.currentUserName="";
                this.showBtn = true;
                this.avatarShow = false;
            }
        },
        loginModal(){
            login.getSystemSetting().then((data)=>{
                console.log(data)
                if(data.returnCode==0 || data.returnCode==200){
                    if(data.data.redirecttype==1){
                        this.$router.push('/login')
                    }else if(data.data.redirecttype==2){
                        login.jump().then((data)=> {
                            if(data.returnCode==0 || data.returnCode==200){
                                let url = data.data;
                                if(url) {
                                    window.location.href = url;
                                }
                            }else{
                                this.$Message.error(data.msg)
                            }
                        })
                    }
                }
            });

        },
        gohome(){
            this.$router.push("/home");
        },
        goGene() {
            this.$router.push("/home/genePage");
        },
        goTumor() {
            this.$router.push("/home/tumourPage");
        }
    },
    created() {
        this.getCookieValue();
        this.showBtn=register.showBtn;
    },

    computed: {

    }
}
</script>
