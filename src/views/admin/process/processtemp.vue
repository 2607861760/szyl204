<style lang="scss" scope>
	// 引入公共变量及方法
	@import '~common/scss/public/base-url.scss';
	#drawer{
		width:296px;
		position:fixed;
		right:-256px;
		top:60px;
		height:100%;
		z-index:1;
		transition:all ease 0.5;
		.drawer_fun{
			width: 256px;
			height: 44px;
			background: #E5E4E2;
			line-height: 44px;
			text-align: center;
			position: absolute;
			bottom: 60px;
			right: -256px;
			z-index: 555;
			.drawer_fun_icon{
				cursor: pointer;
				color:#1883D7;
			}
			.drawer_fun_txt{
				cursor: pointer;
				background:#1883D7;
				text-align:center;
				line-height:44px;
				color:#fff;
			}
			.drawer_fun_txt_cancel{
				width:100px;
				height:30px;
				line-height:30px;
				cursor: pointer;
				text-align: center;
				border: 1px solid #999;
				display: inline-block;
				border-radius: 3px;
			}
			
		}
	}
	.process_content{
		height:100%;
		padding-bottom:10px;
		width:calc(100% - 22px);
		width: -moz-calc(100% - 22px);
		width: -webkit-calc(100% - 22px);
		.processBox{
			min-height:600px;
			_height:600px;
			padding-bottom:20px;
			.rowBox{
				position:relative;
				height:100px;
				text-align: center;
				line-height:100px;
				border:1px solid #1883D7; 
				margin:10px;
				box-shadow:0px 0px 10px rgba(0, 0, 0, 0.349019607843137);	
				.stepsDescribe{
					border:1px solid #333;
					border-radius: 3px;
					padding:0 10px;
					line-height:40px;
					word-break:keep-all;
					overflow: hidden;
					text-overflow:ellipsis;
					cursor: pointer;
					white-space:nowrap;
					display:block;
					height:40px;
					text-align:center;
					background:#fff;
					color:#000;
					font-size:14px;
				}
				.stepsDescribe:hover .delIcon{
					display:block;
				}
				.delIcon{
					display:none;
					text-align: center;
					line-height:18px;
				    cursor: pointer;
				    width:18px;
				    height:18px;
				    position: absolute;
				    right:-9px;
				    top:-12px;
				}
			}
			.arrowLine{
				text-align:center;
			}
			
		}
		.processFooter{
			box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.349019607843137);
			-webkit-box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.349019607843137);
			min-height:50px;
			margin:0 10px;
			width:calc(100% - 22px);
			width: -moz-calc(100% - 22px);
			width: -webkit-calc(100% - 22px);
			background:rgba(248, 248, 248, 1);
			.process_addrow{
				padding-left:10px;
				margin-top:7px;
				button{
					margin:0;
				}
			}
			button{
				margin-top:7px;
				padding:6px 33px;
				margin-right:20px;
			}
		}
		.processTop{
			line-height:50px;
			font-size:16px;
			.templateName{
				margin-left:10px;
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
	<div v-loading="loadding" class="drawer_box">
		<div id="drawer">
           <mu-drawer class="mu-drawer" style="box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.35);" right :open="open" @close="toggle()">
             <mu-list v-for="(item,index) in drawerlist">
               <mu-list-item v-if="checked">
                   <mu-checkbox name="group" :label="item.tooldescribe" :nativeValue="item.toolId" v-model="drawerListId" class="demo-checkbox"/>
               </mu-list-item>
               <p v-else :data-index="index" class="drag-item"><mu-list-item :title="item.tooldescribe"/></p >
              </mu-list>
				<p class="null" style="width:100%;height:44px;"></p>
         </mu-drawer>
            <span class="close-drawer" @click="toggle()" ><i v-if="!open" class="el-icon-d-arrow-left"></i><i v-if="open" class="el-icon-d-arrow-right"></i></span>	
            <div class="drawer_fun">
				<Row v-if="draw_fun_show">
					<Col class="drawer_fun_icon"  span="7">
						<p @click="showAddModel"><Icon style="display:block;margin-top:7px;" size="30" type="plus-round"></Icon></p>
					</Col>
					<Col  span="17">
						<div @click="drawer_edit" class="drawer_fun_txt">编辑</div>
					</Col>
				</Row>
				<Row v-else>
					<Col  span="12">
						<div @click="drawer_edit_cancel" class="drawer_fun_txt_cancel">取消</div>
					</Col>
					<Col class="drawer_fun_icon_delete"  span="6">
						<p @click="drawer_delete"><Icon style="display:block;margin-top:13px;cursor: pointer;" color="#ed3f14" size="24" type="ios-trash"></Icon></p>
					</Col>
					<Col class="drawer_fun_icon_edit"  span="6">
						<p @click="editTool"><Icon style="display:block;margin-top:13px;cursor: pointer;" color="#ed3f14" size="24" type="edit"></Icon></p>
					</Col>
				</Row>
            </div>
        </div>
		<div class="process_content">
			<div class="processBox">
				<div class="processTop">
					<span class="templateName">模板名称：{{tempName}}</span>
				</div>
				<div v-for="(item,index) in processList">
					<div class="arrowLine" v-if="index!=0">
						<Row type="flex" justify="center" align="middle">
							<Col  span="4">
								<img style="display:inline-block;margin:0 auto;width:40px;height:40px;" src="./img/arrow.png">
							</col>
							<Col span="3"></Col>
						</Row>
					</div>
					<div class="rowBox">
						<Row type="flex" justify="center" align="middle">
							<Col span="21">
								<div :data-index="index"  class="drop-item"> 
									<Row type="flex" style="border:1px dashed #ccc;height:60px;margin:18px 20px;line-height:60px;" justify="space-around" align="middle">
										<Col span="4" v-if="item.pipelineTools.length>0" v-for="(list,idx) in item.pipelineTools">
											<span class="stepsDescribe">{{list.tooldescribe}}<p @click.stop="delPipelineTools(index,idx)" class="delIcon"><Icon size=18 color="#aaa"  v-if="deleteStepFlag" type="ios-close"></Icon></p></span>									
										</Col>
									</Row>
								</div>
							</Col>
							<Col  span="3">
								<div style="height: 33px;line-height:0px; border-left:1px solid #ccc;">
									<Dropdown style="box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.35);">
								        <Button type="primary" style="padding:5px 20px;" size="small">
								            编辑
								        </Button>
								        <DropdownMenu slot="list">
								            <p @click="insetAboveRow(index)"><DropdownItem>上方添加行</DropdownItem></p>
								            <p @click="insetNextRow(index)"><DropdownItem>下方添加行</DropdownItem></p>
								            <p @click="deleteRow(index)"><DropdownItem>删除行</DropdownItem></p>
								        </DropdownMenu>
								    </Dropdown>
								</div>
							</Col>
						</Row>
					</div>
				</div>
			</div>
			<div v-if="showProcessFooter" class="processFooter">
				<div class="process_addrow" style="float:left">
					<Dropdown placement="top" style="box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.35);">
				        <Button type="primary" style="padding:5px 20px;" size="small">
				            添加行
				        </Button>
				        <DropdownMenu  slot="list">
				            <p @click="addSingleRow"><DropdownItem>添加一行</DropdownItem></p>
				            <p @click="addMulRow"><DropdownItem>添加多行</DropdownItem></p>
				        </DropdownMenu>
				    </Dropdown>
				</div>
				<div style="float:right">
					<Button @click="reset">重置</Button><Button @click="savePiplineTemp" type="primary">保存</Button>
				</div>
			</div>
		</div>
		<!-- 添加多行-->
        <Modal v-model="addRowModel" title="添加多行" width="600" :mask-closable="false">   
            <div class="sample-main">
                <Input v-model="rowLength" placeholder="请输入要添加的行数"></Input>
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
         <!-- 添加或修改工具 -->
        <Modal title="编辑工具" v-model="toolsModel" id="toolModel" class-name="vertical-center-modal" @on-cancel="resetForm">
            <Form :label-width="120" :model="formData" ref="modalForm" :rules="ruleValidate">
                <Form-item label="工具描述" prop="tooldescribe">
                    <Input v-model="formData.tooldescribe"></Input>
                </Form-item>
                <Form-item label="工具名称" prop="toolName">
                    <Input v-model="formData.toolName"></Input>
                </Form-item>
            </Form>
             <!-- 自定义页脚 -->
            <div slot="footer" class="foot-btn">
                <Button type="primary" shape="circle" @click="confirmClick('modalForm')">确定</Button>
            </div>
        </Modal>
        <!-- 对话框 确认删除 -->
        <Modal v-model="modalConfirmDel" title="删除提示" width="300" :mask-closable="false">
			<p style="padding:20px;text-align:center;">您确定要删除这条信息吗？</p >
			<div class="fastq-footer">
				<Button size="small" type="primary" @click="deleteTool">确定</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
	import 'static/jquery/jquery-ui.min.js';
	import {process} from 'api/index.js'
	import {getCookie} from '@/common/js/cookie.js'
	
	export default {
	  	data () {
		    return {
		    	deleteStepFlag:true, //删除流程具体步骤
		    	loadding:false,
		    	checked:false,
		    	pickDrawerObj:{},    //拖拽的项目详情
		    	addRowModel:false,   //添加多行弹窗
		    	showProcessFooter:false,    //是否显示流程操作栏
		      	open: false,
		      	tempName:"",
		      	rowLength:"",//添加多行时 要添加的行数
		      	draw_fun_show:true, //工具编辑菜单
		      	drawerListId:[], //drawer 模板列表id
		      	drawerlist:[],   //drawer 列表
		      	processList:[],  //流程列表
		      	formData : {},  //添加或修改弹层数据
		      	toolsModel:false, //添加或修改弹层
		      	modalConfirmDel:false, //删除工具弹层
		      	//验证必填
	            ruleValidate: {
	                tooldescribe: [{
	                    required: true,
	                    message: '工具描述不能为空'
	                    }
	                ],
	                toolName: [{
	                    required: true,
	                    message: '工具名称不能为空'
	                    }
	                ],
	            },
		    }
		},
	  	methods: {
		    toggle () {
		      this.open = !this.open;
		      this.open?$("#drawer").animate({"right":"0px"},"fast") : $("#drawer").animate({"right":"-256px"},"fast");
		      this.open?$(".process_content").css({"width":"calc(100% - 278px)"}) : $(".process_content").css("width","calc(100% - 22px)") ;
		      this.open?$(".drawer_fun").animate({"right":"0"},"fast") : $(".drawer_fun").animate({"right":"-256px"},"fast");
		    },
		    showAddModel(){
		    	this.formData={};
		    	this.toolsModel=true;
		    },
		    //点击编辑工具按钮
		    editTool(){
		    	if(this.drawerListId.length==0){
		    		this.$Message.error("请选择要编辑的工具");
		    	}else if(this.drawerListId.length>1){
		    		this.$Message.error("只能编辑一个工具");
		    	}else{
		    		this.doGetToolbyId();
		    	}
		    },
		    changeCheak(){
		        this.checked? this.checked=false : this.checked=true;
		    },
		    //根据工具id获取工具详情
		    doGetToolbyId(){
		    	let obj={
		    		"toolId":this.drawerListId[0],
		    		"productId":this.$store.state.projectid,
		    		"userId":getCookie('userid')
		    	};
		    	process.getExecToolById(obj).then((data)=> {
		    		console.log(data);
					if(data.returnCode==0 || data.returnCode==200) {
						if(data.data){
							this.formData.toolId=data.data.toolId;
							this.formData.toolName=data.data.toolName;
							this.formData.tooldescribe=data.data.tooldescribe;
							this.toolsModel=true;
						}else{
							this.formData={};
						}
					}else if(data.returnCode==422 || data.returnCode==204){
						this.$router.push('/login');
					}
				}).catch((error)=>{
	            	console.log(error);
	            })
		    },
		    //获取流程详细信息
		    getProcessById(id){
		    	this.loadding=true;
		    	let obj={
		    		"templateId":id,
		    		"productId":this.$store.state.projectid,
		    		"userId":getCookie('userid')
		    	};
		    	process.getPipelineTemplateById(obj).then((data)=> {
					if(data.returnCode==0 || data.returnCode==200) {
						if(data.data && data.data.stepsArry && data.data.stepsArry.length>0){
							this.processList=data.data.stepsArry;
						}else{
							this.processList=[];
						}
					}else if(data.returnCode==422 || data.returnCode==204){
						this.$router.push('/login');
					}
					this.loadding=false;
					this.getProcess=true;
				}).catch((error)=>{
					this.loadding=false;
	            	this.$Message.error(error.statusText);
	            })
		    },
		    //获取工具列表
		    getExecTools(cb){
				let obj = {
                    "userId":getCookie('userid'),
                    "productId":this.$store.state.projectid,
                    "pageSize":10,
                    "pageIndex":1
                }
				process.getExecTools(obj).then((data)=> {
					if(data.returnCode==0 || data.returnCode==200) {
						if(data.data&& data.data.length>0){
							this.drawerlist=data.data;
						}else{
							$(".mu-drawer").html("暂无可用工具，请先添加工具！");
						}
					}else if(data.returnCode==422 || data.returnCode==204){
						this.$router.push('/login')
					}
					if(cb && typeof(cb)=="function"){
						this.layoutHeight();
					}
				}).catch((error)=>{
	            	this.$Message.error(error.statusText);
	            	if(cb && typeof(cb)=="function"){
						this.layoutHeight();
					}
	           })
		    },
		    //返回上一页
		    backPrePage(){
		    	this.$router.push("/admin/process_index");
		    },
		    //删除行
		    deleteRow(index){
		    	this.processList.splice(index,1);
		    },
		    //添加一行
		    addSingleRow(){
		    	let obj={"steptype":"1","pipelineTools":[]};
		        this.processList.push(this.buildProcess(obj));
		    },
		    //上方添加行
		    insetAboveRow(index){
		    	let obj={"steptype":"1","pipelineTools":[]};
		    	this.processList.splice(Number(index),0,this.buildProcess(obj));
		    },
		    //下方添加行
		    insetNextRow(index){
		    	let obj={"steptype":"1","pipelineTools":[]};
		    	this.processList.splice(Number(index)+1,0,this.buildProcess(obj));
		    },
		    //添加多行
		    addMulRow(){
		    	this.addRowModel=true;
		    },
		    //创建Process数据
		    buildProcess(obj){
		    	let stepObj={};
		    	if(obj){
		    		stepObj.steptype=obj.steptype;
		    		stepObj.pipelineTools=obj.pipelineTools;
		    	}
		    	return stepObj;
		    },
		    //创建PipelineTools数据
		    buildPipelineTools(obj){
		    	let pipelineTools={};
		    	if(obj){
		    		pipelineTools.toolId=obj.toolId;
		    		pipelineTools.tooldescribe=obj.tooldescribe;
		    		pipelineTools.toolName=obj.toolName;
		    	}
		    	return pipelineTools;
		    },
		    //创建多行数据
		    doBuildMulRow(len){
		    	for(let i=0;i<len;i++){
		    		let obj={"steptype":"1","pipelineTools":[]};
		    		this.processList.push(this.buildProcess(obj));
		    	}
		    },
		    //取消添加行数弹窗
		    cancelBtn(){
		    	this.addRowModel=false;
		    },
		    //删除pipelineTools
		    delPipelineTools(rowindex,index){
		    	this.processList[rowindex].pipelineTools.splice(index,1);
		    },
		    //点击添加行数确定按钮
		    handleSubmit(){
		    	if(this.rowLength==""){
		    		this.$Message.error("请输入要添加的行数");
		    		return;
		    	}
		    	this.doBuildMulRow(Number(this.rowLength));
		    	this.addRowModel=false;
		    	this.rowLength="";
		    },
			pushObjToList(index){
				let  obj=this.pickDrawerObj;
				let  pipelineTools=this.buildPipelineTools(obj);
				this.processList[index].pipelineTools.push(pipelineTools);
			},
			//保存模板 
			savePiplineTemp(){
				this.loadding=true;
				let obj = {
                    "userId":getCookie('userid'),
                    "productId":this.$store.state.projectid,
                    "templateName":this.tempName,
                    "templateId":this.templateId,
                    "stepModels":this.processList
                }
				process.submitPipelineTemplateById(obj).then((data)=> {
					if(data.returnCode==0 || data.returnCode==200) {
						this.$Message.success(data.msg);
						this.$router.push('/admin/process_index');
					}else if(data.returnCode==422 || data.returnCode==204){
						this.$router.push('/login')
					}else{
						this.$Message.error(data.msg);
					}
					this.loadding=false;
				}).catch((error)=>{
	            	this.$Message.error(error.statusText);
	            	this.loadding=false;
	            })
			},
			//点击工具栏编辑按钮
			drawer_edit(){
				this.checked=true;
				this.draw_fun_show=false;
			},
			//点击工具栏取消按钮
			drawer_edit_cancel(){
				this.checked=false;
				this.draw_fun_show=true;
				this.drawerListId=[];
			},
			//点击添加或修改工具弹层 取消按钮
			resetForm(){
				 this.$refs.modalForm.resetFields();
			},
			//点击添加或修改工具 确定按钮
			confirmClick(name){
				this.$refs[name].validate((valid) => {
	            	if(valid){
	            		this.doSubmit();
	            	}
	            })
			},
			//添加或修改
			doSubmit(){
				console.log(this.drawerListId);
				console.log(this.formData);
				if(this.drawerListId.length==0){
					this.formData.toolId="";
				}else{
					this.formData.toolId=this.drawerListId[0];
				}
				let _this=this;
				let obj = {
                    "toolId":this.formData.toolId,
                    "toolName":this.formData.toolName,
                    "productId":this.$store.state.projectid,
                    "tooldescribe":this.formData.tooldescribe
                }
				process.submitExecTool(obj).then((data)=> {
					if(data.returnCode==0 || data.returnCode==200) {
						this.$Message.success(data.msg);
						this.getExecTools();
					}else if(data.returnCode==422 || data.returnCode==204){
						this.$router.push('/login')
					}else{
						this.$Message.error(data.msg);
					}
					this.toolsModel=false;
				}).catch((error)=>{
	            	console.log(error);
	            })
			},
			//点击删除工具
            drawer_delete(){
                if(this.drawerListId.length==0){
                    this.$Message.error("请选择需要删除的工具项")
                }else{
                    this.modalConfirmDel=true
                }
            },
            //删除工具
            deleteTool(){
                let obj={
                    "ids":this.drawerListId,
                    "userId":getCookie('userid'),
                    "productId":this.$store.state.projectid
                }
                process.deleteExecTools(obj).then((data)=>{
                    console.log(data)
                    if(data.returnCode==0 || data.returnCode==200){
                        this.modalConfirmDel=false;
                        this.$Message.success(data.msg)
                    }else if(data.returnCode==422 || data.returnCode==204){
                        this.$router.push('/login')
                    }else{
                        this.modalConfirmDel=false;
                        this.$Message.error(data.msg)
                    }
                })
            },
			//重置
			reset(){
				this.getProcessById(this.$store.state.processTempId);
			},
			//计算layout高度
			layoutHeight(){
				let relHeight=$(".ivu-layout-content").height();
				$(".processBox").css("min-height",(relHeight-60)+'px');
				this.showProcessFooter=true;
			},
		    //初始化拖拽事件
		    initDrag(){
		    	let _this=this;
		    	$("#drawer").on("mouseenter",".drag-item",function(){
		    		$(".drag-item").draggable({
			    		appendTo:"body",
						connectToSortable:".drop-item",
						revert: "invalid",    //还原位置 当没有到达目标容器时还原
					    helper: "clone" ,     //拖拽项目 复制当前项目
					    start:function(e){
					    	let index=Number(e.target.dataset.index);
					    	_this.pickDrawerObj={}
					    	_this.pickDrawerObj=_this.drawerlist[index];
			    		}
			      	});
		    	})
		      	$(".processBox").on("mouseenter",".drop-item",function(){
		      		$(".drop-item").droppable({
			            activeClass:"active", 		//拖拽项目不在放置容器时class
			            hoverClass:"hover",   		//拖拽项目在放置容器时class
			            accept:".drag-item",  	//指定可放置的拖拽项目
			            //元数据放下时回调函数
			            drop: function(e,item) {
			            	let index=e.target.dataset.index;
			            	_this.pushObjToList(index);
						}
			       	})
		      	})
		    }
		},
		mounted(){
			this.initDrag();
		},
		created(){
			let _this=this;
			if(this.$store.state.processTempId==''){
				this.processList=[];
				this.templateId="";
			}else{
				let id=this.$store.state.processTempId;
				this.templateId=this.$store.state.processTempId;
				this.getProcessById(id);
			}
			this.tempName=this.$store.state.processTempName;
			this.getExecTools(function(){
				_this.layoutHeight();
			});
		}	
	}	
</script>

