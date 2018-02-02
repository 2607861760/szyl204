<style lang="scss">
    .tomour_nav{
        padding:40px 20px;
        .tomour_nav_card{
            width:100%;
            height:115px;
            padding:3px 20px;
            border-radius: 5px;
            box-sizing: border-box;
            text-align: center;
            p{
                font-size:48px;
            }
            span{
                font-size:20px;
            }
            i{
                font-size:74px;
                margin-top:15px;
            }
        }
        .tomour_nav_card1{
            color:#78c06e;
            border:1px solid #78c06e;
        }
        .tomour_nav_card2{
            color:#1996cd;
            border:1px solid #1996cd;
        }
        .tomour_nav_card3{
            color:#d97b24;
            border:1px solid #d97b24;
        }
        .tomour_nav_card4{
            background: #1996cd;
            color: #fff;
            p{
                font-size:24px;
                line-height: 100px;
            }
            i{
                font-size:60px;
                margin-top:20px;
            }
        }
    }
    .domain{
        padding-top:15px;
        height:615px;
        background: #f5f7f9;
        .domain_table{
            width:70%;
            height:100%;
            padding:20px;
            float:left;
            box-sizing: border-box;
            background: #fff;
            .domain_table_search{
                width:380px;
                float:right;
                .ivu-input-group-append{
                    cursor: pointer;
                }
            }
        }
        .domain_echats{
            width:30%;
            padding-left:15px;
            box-sizing: border-box;
            float:right;
        }
    }
</style>
<template>
    <div>
        <!-- 顶部nav 开始-->
        <div class="tomour_nav">
            <Row type="flex" justify="space-between">
                <Col span="4">
                    <div class="tomour_nav_card tomour_nav_card4">
                        <Row type="flex" justify="space-between">
                            <Col span="12">
                                <Icon type="ios-plus-outline"></Icon>
                            </Col>
                            <Col span="12">
                                <p>新建病例</p>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span="4">
                    <div class="tomour_nav_card tomour_nav_card1">
                        <Row type="flex" justify="space-between">
                            <Col span="12">
                                <p>6</p>
                                <span>待上传</span>
                            </Col>
                            <Col span="12">
                                <Icon type="ios-clock"></Icon>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span="4">
                    <div class="tomour_nav_card tomour_nav_card2">
                        <Row type="flex" justify="space-between">
                            <Col span="12">
                                <p>3</p>
                                <span>已完成</span>
                            </Col>
                            <Col span="12">
                                <Icon type="ios-checkmark"></Icon>
                            </Col>
                        </Row>
                    </div>
                </Col>
                <Col span="4">
                    <div class="tomour_nav_card tomour_nav_card3">
                        <Row type="flex" justify="space-between">
                            <Col span="12">
                                <p>3</p>
                                <span>报告下载</span>
                            </Col>
                            <Col span="12">
                                <Icon type="ios-cloud-download"></Icon>
                            </Col>
                        </Row>
                    </div>
                </Col>
            </Row>
        </div>
        <!-- 顶部nav 结束-->
        <!-- 功能区 开始 -->
        <div class="domain">
            <!-- 表格 开始 -->
            <div class="domain_table">
                <Row>
                    <div class="domain_table_search">
                        <Input v-model="searchData">
                            <Select v-model="searchValue" slot="prepend" style="width: 80px" @on-change="selectChange">
                                <Option v-for="(item,index) of searchList" :key="index" :value="item.value" :label="item.label">{{item.label}}</Option>
                            </Select>
                            <span slot="append"><Icon type="ios-search" ></Icon></span>
                        </Input>
                    </div>
                </Row>
                <Row>

                </Row>
            </div>
            <!-- 表格 结束 -->
            <!-- 图表 开始 -->
             <div class="domain_echats"> 
                <div id="piecharts" style="width:'100%',height:'300px'">
                    <div id="piecharts_main" :style="{width:'100%',height:'300px'}"></div>
                </div>
                <div id="barcharts" style="width:'100%',height:'300px'">
                    <div id="barcharts_main" :style="{width:'100%',height:'300px'}"></div>
                </div>
             </div> 
            <!-- 图表 结束 -->
        </div>
        <!-- 功能区 结束 -->
    </div>
</template>
<script>
// echarts相关
let echarts = require('echarts/lib/echarts');
// 引入饼图组件
require('echarts/lib/chart/bar');
require('echarts/lib/chart/pie');
// 引入提示框和图例组件
require('echarts/lib/component/tooltip')
require('echarts/lib/component/legend')
export default{
    name:'test',
    data(){
        return{
            searchData:'',
            searchValue:'',           
            searchList:[{
                label:"全部数据",
                value:"all"
            },{
                label:"病人编号",
                value:"patientCode"
            },{
                label:"样本编号",
                value:"sampleCode"
            }]
        }
    },
    methods:{
        selectChange(val){
            this.searchValue=val;
        }
    },
    mounted(){
        let myChartpie=echarts.init(document.getElementById('piecharts_main'));
        let myChartbar=echarts.init(document.getElementById('barcharts_main'));
        myChartpie.setOption({
            title: {
                text: '天气情况统计',
                subtext: '虚构数据',
                left: 'center'
            },
            tooltip : {
                trigger: 'item',
                formatter: "{a} <br/>{b} : {c} ({d}%)"
            },
            legend: {
                // orient: 'vertical',
                // top: 'middle',
                bottom: 10,
                left: 'center',
                data: ['西凉', '益州','兖州','荆州','幽州']
            },
            series : [
                {
                    type: 'pie',
                    radius : '65%',
                    center: ['50%', '50%'],
                    selectedMode: 'single',
                    data:[
                        {
                            value:1548,
                            name: '幽州',
                        },
                        {value:535, name: '荆州'},
                        {value:510, name: '兖州'},
                        {value:634, name: '益州'},
                        {value:735, name: '西凉'}
                    ],
                    itemStyle: {
                        emphasis: {
                            shadowBlur: 10,
                            shadowOffsetX: 0,
                            shadowColor: 'rgba(0, 0, 0, 0.5)'
                        }
                    }
                }
            ]

        })
        myChartbar.setOption({
            title: {
                text: '天气情况统计',
                subtext: '虚构数据',
                left: 'center'
            },
            xAxis: {
                type: 'category',
                data: ['1', '2', '3', '4', '5', '6']
            },
            yAxis: {
                type: 'value'
            },
            legend: {
                width:'1000px',
                bottom: 10,
                left: 'center',
                data: ['幽州','荆州','西凉', '兖州','益州','中州']
            },
            // color:['#c23531','#2f4554', '#61a0a8', '#d48265', '#91c7ae','#749f83'],
            series : [
                {
                    type: 'bar',
                    data:[10, 52, 200, 334, 390, 330, 220],
                    itemStyle: {  
                        normal:{  
        　　　　　　　　　　　　//每个柱子的颜色即为colorList数组里的每一项，如果柱子数目多于colorList的长度，则柱子颜色循环使用该数组
                            color: function (params){
                                var colorList = ['#c23531','#2f4554','#61a0a8','#61a0a8','#d48265','#91c7ae','#749f83'];
                                return colorList[params.dataIndex];
                            }
                        },
                    }
                }
            ]
        })
    }
}   
</script>

