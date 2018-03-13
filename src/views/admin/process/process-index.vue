<style lang="scss" scope>
	// 引入公共变量及方法
	@import '~common/scss/public/base-url.scss';
	.process_index{
		width:100%;
		height:100%;
		min-height:680px;
		position:relative;
		.mainBox{
			position:absolute;
			left:0;
			right:0;
			width:762px;
			height:489px;
			margin:auto;
			background:#fff;
			.main_temp{
				width:762px;
				height:412px;
				border:1px solid rgba(24, 131, 215, 1);
				.process_title{
					background: #f2f2f2;
					height:60px;
					line-height:60px;
					.toggleIcon {
						cursor: pointer;
						text-align: center;
						line-height:25px;
					    width:25px;
					    height:25px;
					    float:right;
					    margin:17px;
					}
				}
				.process_title span{
					font-size:14px;
					margin-left:20px;
				}
				.procee_temp_content{
					height:352px;
					padding-top:10px;
					overflow-y:auto;
					text-align: center;
					.tempItem{
						position:relative;
						cursor: pointer;
						display:inline-block;
						line-height:60px;
						color:#333;
						font-size:14px;
						width:640px;
						height:60px;
						background:#E2F1FC;
						margin:4px 0;
						.delIcon{
							text-align: center;
							line-height:18px;
						    cursor: pointer;
						    width:18px;
						    height:18px;
						    position: absolute;
						    right:-7px;
						    top:-9px;
						}
					}
					.tempItem:nth-child(even){
						background:#fff;
					}
					.tempItem:hover{
						background: #69B5ED;
					}
				}
				.procee_temp_add{
					width:762px;
					height:60px;
					background: rgba(107, 112, 163, 1);
					color:#fff;
					text-align: center;
					line-height:60px;
					margin-top:15px;
					font-size:16px;
					cursor:pointer;
				}
			}
		}
	}
	.sample-main{
		padding:30px 40px;
	}
	.slot-footer{
		padding:15px 0px;
	}
	
</style>
<template>
	<div class="process_index">
		<Tabs type="card" @on-click="choice" >
            <TabPane v-for="(item,index) in tabsdata" :name="item.productId" :key="item.productId" :label="item.menuName"></TabPane>
            <!-- <TabPane label="癌症" class="tabcard"></TabPane> -->
        </Tabs>
		<div class="mainBox">
			<div class="main_temp">
				<div class="process_title"><span>历史模板</span><p class="toggleIcon" @click="changeDel"><Icon size=25 type="ios-trash-outline"></Icon></p></div>
				<div class="procee_temp_content">
					<div v-for="(item,index) in tempList" @click="doEditTemp(item.templateId,item.templateName)" class="tempItem">
						{{item.templateName}}
						<p class="delIcon" @click.stop="delIcon(item.templateId)"><Icon size=18 color="#aaa"  v-if="deleteFlag" type="ios-close"></Icon></p>
					</div>
				</div>
				<div @click="addTemp" class="procee_temp_add">新建模板</div>
			</div>
		</div>
		<!--删除提示-->
        <Modal v-model="removeModel" title="删除提示" width="300" :mask-closable="false">
            <p style="padding:20px;text-align:center;">您确定要删除该模板吗？</p>
            <div class="fastq-footer">
                <Button size="small" type="primary" @click="deleteClick">确定</Button>
            </div>
        </Modal>
        <!-- 模版名称-->
        <Modal v-model="tempModel" title="模板名称" width="600" :mask-closable="false">   
            <div class="sample-main">
                <Input v-model="tempName" placeholder="请输入模板名称"></Input>
            </div>
            <div class="slot-footer">
                <Row>
                    <Col span="6" push="6">
                        <Button type="default" @click="cancelBtn">取消</Button> 
                    </Col>
                    <Col span="6" push="6">
                        <Button type="primary" @click="handleSubmit">确定</Button> 
                    </Col>
                </Row>
            </div>
        </Modal>
	</div>
</template>

<script>
	import {process} from 'api/index.js'
	import {getCookie} from '@/common/js/cookie.js'
	
	export default {
		"name":"processtemp",
		data () {
		    return {
		    	deleteIds:[],      //删除模板id
		    	removeModel:false, //删除弹窗
		    	tempName : ""   ,   //模版名称
		    	tempModel : false, //模版名称弹窗
		    	deleteFlag:false, //是否显示删除啊按钮
				tempList:[],       //模板列表
				tabsdata: [],    //选项卡内容
		    }
		},
		methods:{
			// tabs切换
			choice(name) {
				this.$store.state.projectid = name;
				this.getBatchList();
			},
			//点击删除Icon
			changeDel(){
				this.deleteFlag = !this.deleteFlag;
			},
			//点击删除模板Icon
			delIcon(id){
				this.removeModel=true;
				this.deleteIds.push(id);
			},
			//编辑模板
			doEditTemp(id,name){
				this.$store.state.processTempId=id;
				this.$store.state.processTempName=name;
				this.$router.push('/admin/processtemp');
			},
			//新建模板
			addTemp(){
				this.tempModel=true;
			},
			//点击删除弹窗 确定按钮
			deleteClick(){
				console.log("要删除的模板id为："+this.deleteIds);
				let obj={
					"userId":getCookie('userid'),
					"productId":this.$store.state.projectid,
					"pipelineTemples":this.deleteIds
				}
				process.deletePipelineTemplate(obj).then((data)=> {
					console.log(data);
					if(data.returnCode==0 || data.returnCode==200) {
						 this.$Message.success("删除成功");
						 this.getPipelineTemplateList();
					}else if(data.returnCode==422 || data.returnCode==204){
						this.$router.push('/login')
					}
				}).catch((error)=>{
	            	console.log(error);
	            })
				this.removeModel=false;
			},
			changeProject(name){
				this.$store.state.projectid=name+1;
				this.getPipelineTemplateList();
			},
			//获取流程列表
			getPipelineTemplateList(){
				let obj = {
                    "userId":getCookie('userid'),
                    "productId":this.$store.state.projectid,
                    "pageSize":10,
                    "pageIndex":1
				}
				this.tempList = [];
				process.getPipelineTemplateList(obj).then((data)=> {
					if(data.returnCode==0 || data.returnCode==200) {
						if(data.data&& data.data.length>0){
							this.tempList=data.data;
						}else{
							this.tempList=[];
						}
					}else if(data.returnCode==422 || data.returnCode==204){
						this.$router.push('/login')
					}
				}).catch((error)=>{
	            	console.log(error);
	            })
			},
			//取消添加模板弹窗
			cancelBtn(){
				this.tempModel=false;
			},
			//确认新增模版
			handleSubmit(){
				if(this.tempName==""){
		    		this.$Message.error("请输入模板名称");
		    		return;
		    	}
				this.$store.state.processTempName=this.tempName;
				this.$store.state.processTempId='';
				this.$router.push('/admin/processtemp');
			}
		},
		created(){
			//this.$store.state.projectid=1;
			//获取流程列表
			//this.getPipelineTemplateList();
			if (this.$store.state.processManageMenuList.length > 0) {
				this.tabsdata = M.clone(this.$store.state.processManageMenuList);
				this.$store.state.projectid = this.tabsdata[0].productId;
				this.getPipelineTemplateList();
			} else {
				let obj = {
					"menuName": "罕见病",
					"productId": "1"
				}
				this.tabsdata.push(obj);
				this.$store.state.projectid = this.tabsdata[0].productId;
				this.getPipelineTemplateList();
			}
		},
		// watch: {
		// 	'$route'(to, from) {
		// 		//刷新参数放到这里里面去触发就可以刷新相同界面了
		// 		this.$store.state.projectid = M.url().product ? M.url().product : "1";
		// 		this.getPipelineTemplateList();
		// 	}
		// },
	}
</script>
