<template>
    <tree-grid :columns="columns" :tree-structure="true" :data-source="fileCategoryList" ></tree-grid>
</template>
<script>
    import treeGrid from '@/components/treeTable/vue3/TreeGrid';
    import {data} from 'api/index.js'
    import {getCookie} from '@/common/js/cookie.js'
    export default{
        name:'test',
        data(){
            return{
                fileCategoryList: [],
                columns: [
                    {
                        text: '文件名称',
                        dataIndex: 'filename',
                        width:'20%'
                    },
                    {
                        text: '文件大小',
                        dataIndex: 'size',
                        width:'10'
                    }
                ]
            }
        },
        methods:{
            // 获得本地/storage/serverData/
        _getLocalDataList() {
            let obj={
                "path":"/storage/serverData/",
                // "path":"/opt/NfsDir/PublicDir/demo/",
                        // /opt/NfsDir/PublicDir/demo/  电信云
                        // /storage/serverData/   159
                "userId":getCookie("userid"),
                "productId":"1"
            }
            data.getSingleForldList(obj).then((data)=>{

                if(data.returnCode==0 || data.returnCode==200){
                    if(M.isArray(data.data)) {
                        this.fileCategoryList=data.data;
                    }
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }else{
                    this.$Message.error(data.msg)
                }
                
            }).catch((error)=>{

            })
        },
        // 获得服务列表 /opt/NfsDir/PublicDir/demo/
        // /storage/serverData/
        _getServerDataList() {
            let obj={
                "path":"/storage/serverData/",
                // "path":"/opt/NfsDir/PublicDir/demo/",
                        // /opt/NfsDir/PublicDir/demo/  电信云
                        // /storage/serverData/   159
                "userId":getCookie("userid"),
                "productId":"1"
            }
            data.getSingleForldList(obj).then((data)=>{
                    // console.log(data)
                if(data.returnCode==0 || data.returnCode==200){
                    if(M.isArray(data.data)) {
                        this.fileServerCategoryList=data.data;
                    }
                }else if(data.returnCode==422 || data.returnCode==204){
                    this.$router.push('/login')
                }else{
                    this.$Message.error(data.msg)
                }
            }).catch((error)=>{

            })
        }
        },
        components:{
            treeGrid
        },
        created(){
            this._getLocalDataList();
        }
    }
</script>