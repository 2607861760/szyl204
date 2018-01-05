// <style lang="scss" scoped>
// .wrap {
//     width: 80%;
//     margin: 0 auto;
//     background: #fff;
// }
// .box{
//     padding: 20px;
// }

// </style>

// <template>
//     <div class="wrap">
//         <div class="box">
//             <div class="tools clear">
//             <p>我是测试页面</p>
            
//             </div>
//             <div class="mol-view-body">
//                 <molView :data="nowMol" :defaultFileType="fileType"></molView>
//             </div>
            
//            <!--  <molView></molView> -->
//         </div>
//     </div>
// </template>

// <script>
// // 引入组件
// import molView from 'components/mol-view/mol-view.vue';
// // 引入测试数据
// import molDatas from './data/data.js';


// export default {
//     data () {
//         return {
//             // 测试数据
//             molDatas: molDatas,
//             // 当前展示数据
//             nowMol: molDatas[0],
//             // 背景颜色
//             backgroundColor: "#f00",
//             // 显示形状
//             defaultType: "line",
//             // 文件类型
//             fileType: "pdb"

//         }
//     },
//     mounted() {
//         // 默认第一个为展示数据
//         // this.nowMol = this.molDatas[1];
//     },
//     methods: {
//         // 改变展示数据
//         changeViewData(index) {
//             this.molData = molDatas[index];
//         }
//     },
//     components: {
//         molView
//     },
// };

// </script>
<template>
    <Tree :data="data4" show-checkbox ></Tree>
</template>
<script>
    export default {
        data () {
            return {
                data4: [
                    {
                        title: 'parent 1',
                        expand: true,
                        selected: true,
                        disableCheckbox: false,
                        children: [
                            {
                                title: 'parent 1-1',
                                expand: true,
                                disableCheckbox: false,
                                children: [
                                    {
                                        title: 'leaf 1-1-1',
                                        disableCheckbox: false
                                    },
                                    {
                                        title: 'leaf 1-1-2',
                                        disableCheckbox: false
                                    }
                                ]
                            },
                            {
                                title: 'parent 1-2',
                                expand: true,
                                disableCheckbox: false,
                                children: [
                                    {
                                        title: 'leaf 1-2-1',
                                        disableCheckbox: false
                                    },
                                    {
                                        title: 'leaf 1-2-1',
                                        disableCheckbox: false
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        }
    }
</script>
