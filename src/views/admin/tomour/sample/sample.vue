<style lang="scss">
	.build{
		margin-top:10px;
	}
	.upload {
		padding: 10px 10px 30px;
		background: #fff;
		border-radius: 3px;
		.ivu-btn {
			background: #767cc3;
			padding: 6px 20px;
			color: #fff;
		}
	}

	.fun {
		span {
			color: #3c8dbc;
			padding-right: 10px;
			font-size: 12px;
			cursor: pointer;
		}
	}
</style>
<template>
	<div class="sample-info">
		<Dropdown style="margin-left:20px;">
			<Button type="primary" class="build" @click="found">
				<Icon type="android-add"></Icon>
				添加样本
			</Button>
		</Dropdown>
		<div style="width:100%;padding:15px 20px;box-sizing:border-box;">
			<el-table :data="samplelist" border style="width: 100%;" height="250" :highlight-current-row="true">
				<el-table-column label="样本编号" min-width="10%">
					<template slot-scope="scope">
						<span style="color:#3c8dbc;cursor:pointer;" @click="sam(scope.row)">{{ scope.row.samplecode }}</span>
					</template>
				</el-table-column>
				<el-table-column prop="sampletype" label="样本类型" min-width="10%"></el-table-column>
				<el-table-column prop="samplesource" label="样本来源" min-width="10%"></el-table-column>
				<el-table-column prop="region" label="肿瘤分类" min-width="10%"></el-table-column>
				<el-table-column label="传输状态" min-width="10%">
					<template slot-scope="scope">
							<span class="status" v-if="scope.row.fastq_R1!=null && scope.row.fastq_R2!=null" style="color:#3B79BA;font-size:25px;cursor:pointer;" title="上传完成">
								<!-- <Tooltip content="上传完成" placement="top"> -->
									<Icon type="checkmark-round"></Icon>
								<!-- </Tooltip> -->
							</span>
							
							<span class="status" style="color:#84BF66;font-size:25px;cursor:pointer;" v-else-if="scope.row.fastq_R1==null && scope.row.fastq_R2==null" title="等待上传">
								<!-- <Tooltip content="等待上传" placement="top"  > -->
										<Icon type="upload"></Icon>
								<!-- </Tooltip> -->
							</span> 
							
							<span class="status" v-else style="color:#3B79BA;font-size:25px;opacity:.5;cursor:pointer;" title="正在上传">
									<!-- <Tooltip content="正在上传" placement="top">  -->
									<Icon type="upload"></Icon>
									<!-- </Tooltip>  -->
							</span>
						<!-- </div> -->
					</template>
				</el-table-column>
				<el-table-column label="分析状态" min-width="10%">
					<template slot-scope="scope">
						<!-- <div v-for="(list,index) in scope.row" class="handle" > -->
							<span class="status" v-if="scope.row.samplestatus==1" style="color:#A5ACB3;font-size:25px;" title="等待分析">
								<!-- <Tooltip content="等待分析" placement="top"> -->
									<Icon type="stats-bars"></Icon>
								<!-- </Tooltip> -->
							</span>
							<span class="status" v-else-if="scope.row.samplestatus==2" style="color:#3B79BA;font-size:25px;" title="正在分析">
								<!-- <Tooltip content="正在分析" placement="top"> -->
									<Icon type="stats-bars"></Icon>
								<!-- </Tooltip> -->
							</span>
							<span class="status" v-else-if="scope.row.samplestatus==3" style="color:#3B79BA;font-size:20px;" title="分析完成">
								<!-- <Tooltip content="分析完成" placement="top"> -->
									<Icon type="close-round"></Icon>
								<!-- </Tooltip> -->
							</span>
							<span class="status" v-else-if="scope.row.samplestatus==4" style="color:##d97b24;font-size:25px;" title="分析失敗">
								<!-- <Tooltip content="分析失敗" placement="top"> -->
									<Icon type="checkmark-round"></Icon>
								<!-- </Tooltip> -->
							</span>
						<!-- </div> -->
					</template>
				</el-table-column>
				<el-table-column label="操作" min-width="20%">
					<template slot-scope="scope">
						<div class="handle">
							<span class="bian" @click="run(scope.$index,scope.row)" v-if="scope.row.fastq_R1!=null && scope.row.fastq_R2!=null">运行</span>
							<span class="bian" @click="delet(scope.$index,scope.row)">删除</span>
							<span class="bian" @click="edit(scope.$index,scope.row)">编辑</span>
						</div>
					</template>
				</el-table-column>
			</el-table>
			<div>当前显示1-{{total}}条，共{{total}}条</div>
			<div class="patient_info_footer">
				<Row type="flex" justify="end" class="code-row-bg">
					<Col col="8">
						<Button type="ghost" @click="upStep">上一步</Button>
						<Button @click="complete" type="primary">完成</Button>
					</Col>
				</Row>
			</div>
		</div>
		<!--新建样本/编辑-->
		<Modal width="835px" v-model="sampleModal" :mask-closable="false" @on-cancel="resetForm">
			<div class="sample-title">样本信息</div>
			<div class="sample-main">
				<div class="stitle">
					<Icon type="clipboard" style="font-size:22px;"></Icon>
					<span style="padding-left:5px;">样本信息（*为必填项）</span>
				</div>
				<div class="sample-inner">
					<Form :model="sampleInfo" label-position="left" ref="modelForm" :label-width="110" inline :rules="ruleCustom">
						<Row>
							<Col class="tables">
							<FormItem label="肿瘤分类" style="width:30%;" prop="region">
								<Select v-model="sampleInfo.region">
									<Option v-for="item in region" :value="item.name" :key="item.value">{{ item.name }}</Option>
								</Select>
							</FormItem>
							<FormItem label="样本编号" style="width:30%;" prop="samplecode">
								<Input v-model="sampleInfo.samplecode"></Input>
							</FormItem>
							</Col>
							<Col class="tables">
							<FormItem label="样本来源" style="width:30%;" prop="samplesource">
								<Select v-model="sampleInfo.samplesource">
									<Option v-for="item in samplesource" :value="item.name" :key="item.value">{{ item.name }}</Option>
								</Select>
							</FormItem>
							<FormItem label="样本类型" style="width:30%;" prop="sampletype">
								<Select v-model="sampleInfo.sampletype">
									<Option v-for="item in sampletype" :value="item.name" :key="item.value">{{ item.name }}</Option>
								</Select>
							</FormItem>
							</Col>
							<Col class="tables">
							<FormItem label="测序日期" style="width:30%;">
								<DatePicker type="date" v-model="seqdate"></DatePicker>
							</FormItem>
							<FormItem label="取样日期" style="width:30%;">
								<DatePicker type="date" v-model="takendate"></DatePicker>
							</FormItem>
							</Col>
							<Col class="tables">
							<FormItem label="测序平台" style="width:30%;">
								<Select v-model="sampleInfo.platform">
									<Option v-for="item in platform" :value="item.name" :key="item.value">{{ item.name }}</Option>
								</Select>
							</FormItem>
							<FormItem label="收样日期" style="width:30%;">
								<DatePicker type="date" v-model="receivedate"></DatePicker>
							</FormItem>
							</Col>
							<Col class="tables">
							<FormItem label="测序类型" style="width:30%;">
								<Select v-model="sampleInfo.seqtype">
									<Option v-for="item in seqtype" :value="item.name" :key="item.value">{{ item.name }}</Option>
								</Select>
							</FormItem>
							</Col>
						</Row>
					</Form>
				</div>
			</div>
			<div class="sample-footer">
				<Row :gutter="16">
					<Col span="8" pull="7">
					<div class="add-save">
						<Button type="primary" @click="keep('modelForm')">保存</Button>
					</div>
					</Col>
					<Col span="8" pull="1">
					<div class="add-upload">
						<Button type="primary" @click="uploadSample" :disabled="uploadDisabled">上传</Button>
					</div>
					</Col>
				</Row>
			</div>
		</Modal>
		<!--文件上传-->
		<Modal width="835px" v-model="upModal" :mask-closable="false" @on-cancel="clearData">
			<div class="sample-title">文件上传</div>
			<div class="upload">
				<Col span="24" class="demo-tabs-style2">
				<Tabs type="card" @on-click="serverlocal" v-model="tabsVal">
					<TabPane label="upload" name="upload">
						<div>
							<Upload multiple action="/dchealth-platform/1.0/upload/fileUpload" show-upload-list :data="{'sampleid':this.samid,'userId':userId,'type':'vcf'}" :on-success="upsuccess" :on-error="uperror">
								<Button type="ghost" style="background:#4578ad;">上传文件</Button>
							</Upload>
						</div>
					</TabPane>
					<TabPane label="harddisk" name="local">
						<div style="width:100%;">
							<tree-grid :columns="columns" v-loading="loading" ref="tree" :tree-structure="true" :data-source="fileCategoryList" :requestUrl="samid">
							</tree-grid>
						</div>
					</TabPane>
					<!-- 服务器上传tab -->
					<TabPane label="server" name="server">
						<div class="fun"></div>
						<tree-grid :columns="columns" ref="tree" :tree-structure="true" :data-source="fileServerCategoryList" :requestUrl="samid">
						</tree-grid>
					</TabPane>
					<!-- 服务器上传tab结束 -->
				</Tabs>
				</Col>

			</div>
		</Modal>

		<!--样本文件信息-->
		<Modal width="835px" v-model="sampleshow" :mask-closable="false">
			<div class="sample-title">样本文件信息</div>
			<div class="sample-inner">
				<div style="padding:20px 10px;">
					<el-table border align="left" :data="sampleDataList">
						<el-table-column label="文件名称" prop="filename" min-width="150%"></el-table-column>
						<el-table-column label="文件大小" prop="size"></el-table-column>
						<el-table-column label="上传时间" prop="uploaddate"></el-table-column>
						<el-table-column label="状态" prop="status" :formatter="statusFormatter"></el-table-column>
					</el-table>
				</div>
			</div>
		</Modal>
		<!--删除确定-->
		<Modal v-model="removeModel" title="删除提示" width="300" :mask-closable="false">
			<p style="padding:20px;text-align:center;">您确定要删除这条信息吗？</p>
			<div class="fastq-footer">
				<Button size="small" type="primary" @click="saveInfoClick">确定</Button>
			</div>
		</Modal>
	</div>
</template>
<script>
import { data } from 'api/index.js'
import treeGrid from '@/components/treeTable/vue3/TreeGrid'
import { getCookie } from '@/common/js/cookie.js'
export default {
	name: "samplelist",
	data() {
		return {
			takendate: '',
			receivedate: '',
			seqdate: '',
			total: 0,
			loading: true,
			sampleid: "",
			sampleModal: false,
			change: true,
			sampleDataList: [],
			sampleshow: false,
			samplelist: [],
			upModal: false,
			upshow: false,
			fastq: false,
			choice: [],
			choices: [],
			fileCategoryList: [],
			columns: [
				{
					text: '文件名称',
					dataIndex: 'filename',
					width: '40%'
				},
				{
					text: '文件大小',
					dataIndex: 'size',
					width: '10'
				},
				// {
				// 	text: '传输时间',
				// 	dataIndex: 'transition',
				// 	width: '10'
				// }
			],

			sampleInfo: {},
			sampletype: [],    //样本类型
			samplesource: [],  //样本来源
			region: [],
			platform: [],
			pipeline: '',
			seqtarget: [{
				value: '点突变+插入缺失',
				label: '点突变+插入缺失'
			}, {
				value: '基因融合',
				label: '基因融合'
			}],
			seqtype: [], //测序类型
			ruleCustom: {
				samplecode: [
					{ required: true, message: '样本编号不能为空', trigger: 'blur' }
				],
				sampletype: [
					{ required: true, message: '样本来源不能为空', trigger: 'blur' }
				],
				samplesource: [
					{ required: true, message: '样本类型不能为空', trigger: 'blur' }
				],
				region: [
					{ required: true, message: '肿瘤分类不能为空', trigger: 'blur' }
				]
			},
			idList: [],
			removeModel: false,
			samid: '',
			userId: '',
			fileServerCategoryList: [],
			uploadDisabled: true,
			tabsVal: 'upload'
		}
	},
	// filters: {
	// 	// 格式化数据
	// 	dataFormat(cellValue) {
	// 		if (cellValue == '0' || cellValue == '5') {
	// 			return cellValue = "----"
	// 		} else if (cellValue == '1') {
	// 			return cellValue = "等待"
	// 		} else if (cellValue == '2') {
	// 			return cellValue = "正在运行"
	// 		} else if (cellValue == '3') {
	// 			return cellValue = "已完成"
	// 		} else if (cellValue == '4') {
	// 			return cellValue = "错误"
	// 		} else if (cellValue == '6') {
	// 			return cellValue = "未执行"
	// 		}
	// 	},
	// },
	methods: {
		//取消必填选项
		resetForm(){
			this.$refs.modelForm.resetFields();
		},
		//关闭上传文件弹层清空数据
		clearData() {
			this.tabsVal = 'upload'
			this.fileCategoryList = [];
			this.fileServerCategoryList = [];
		},
		// 上传成功
		upsuccess(response, file, fileList) {
			if (response.returnCode == 0) {
				this.$Message.success(response.msg)
			} else if (response.returnCode == 217) {
				this.$Message.error(response.msg)
			}
		},
		// 根据sampleId 获得对应数据
		getSampleList(row) {
			let obj = {
				userId: getCookie("userid"),
				sampleid: row.sampleid,
				productId: '2'
			}
			console.log(obj);
			data.getFileList(obj).then((data) => {
				console.log(data);
				if (data.returnCode == 0 || data.returnCode == 200) {
					this.sampleDataList = data.data;
				} else if (data.returnCode == 422 || data.returnCode == 204) {
					this.$router.push('/login')
				} else {
					this.$Message.error(data.msg)
				}
			})
		},
		// 上传失败
		uperror(error, file, fileList) {
			this.$Message.error(error.msg)
		},
		saveInfoClick() {  //删除确定
			let obj = {
				"idList": this.idList,
				"userId": getCookie('userid'),
				"productId": "2"
			}
			data.deleteSampleById(obj).then((data) => {
				if (data.returnCode == 0 || data.returnCode == 200) {
					this.$Message.success(data.msg);
					this.removeModel = false;
					this.getList();
				} else if (data.returnCode == 422 || data.returnCode == 204) {
					this.$router.push('/login')
				} else {
					this.$Message.error(data.msg);
					this.removeModel = false;
					this.getList();
				}

			})
		},
		// tabs切换事件
		serverlocal(name) {  //serverlocal
			if (name == 'local') {
				this._getLocalDataList();
			} else if (name == 'server') {
				this._getServerDataList();
			}
		},
		delet(index, row) {  //删除样本
			this.idList = [];
			this.idList.push(row.sampleid);
			this.removeModel = true;
		},
		run(index, row) {  //点击运行
			this.samid = row.sampleid;
			this.pipeline = row.region;
			this.pipeline = this.pipeline.toUpperCase();
			if (this.pipeline == "WES") {
				this.pipeline = '1'
			} else if (this.pipeline == "WGS") {
				this.pipeline = '2'
			} else if (this.pipeline == "PANEL") {
				this.pipeline = '3'
			} else if (this.pipeline == "NONE") {
				this.pipeline = '0'
			}
			let obj = {
				"sampleId": this.samid,
				"userId": getCookie("userid"),
				"productId": "2",
				"pipeline": this.pipeline,
				"templateId": "0",
				"fileGroupId": "aa",
			}
			data.executeSample(obj).then((data) => {
				if (data.returnCode == 200 || data.returnCode == 0) {
					// 再次获取列表
					this.getList();
					this.$Message.success("添加成功")
				} else if (data.returnCode == 422 || data.returnCode == 204) {
					this.$router.push('/login')
				} else {
					this.$Message.error(data.msg)
				}
			})
		},
		found() { //点击新建样本
			this.upshow = false;
			this.sampleModal = true;
			this.sampleInfo = {};
			this.uploadDisabled=true;
			this.takendate = "";
			this.receivedate = "";
			this.seqdate = "";
		},
		sam(row) {  //点击样本编号
			this.sampleshow = true;
			this.getSampleList(row);
		},
		//格式化文件状态
		statusFormatter(row, column, cellValue) {
			switch (row.status) {
				case "1":
					return '正在上传';
					break;
				case "2":
					return '上传完成';
					break;
				case "3":
					return '上传失败';
					break;
			}
		},
		keep(name) {  //点击保存
			let obj = {
				userId: getCookie("userid"),
				patientid: this.$store.state.tumourPatientInfo.tumourPatientId,
				productId: "2",
				takendate: String(this.takendate),
				receivedate: String(this.receivedate),
				seqdate: String(this.seqdate)
			}
			M.extend(this.sampleInfo, obj)
			this.$refs[name].validate((valid) => {
				if (valid) {
					if (M.has(this.sampleInfo, 'sampleid') == true) {
						data.updateSample(this.sampleInfo).then((data) => {
							if (data.returnCode == 0 || data.returnCode == 200) {
								this.$Message.success(data.msg);
								this.uploadDisabled = false;
								this.getList();
							} else if (data.returnCode == 422 || data.returnCode == 204) {
								this.$router.push('/login')
							} else {
								this.$Message.error(data.msg)
							}

						})
					} else {
						data.addSample(this.sampleInfo).then((data) => {
							if (data.returnCode == 0 || data.returnCode == 200) {
								if (data.data == "null" || data.data == null) {
									this.$Message.error(data.msg);
								} else {
									this.$Message.success(data.msg);
									this.uploadDisabled = false;
									this.getList();
									this.samid = data.data.sampleid;
								}
							} else if (data.returnCode == 422 || data.returnCode == 204) {
								this.$router.push('/login')
							} else {
								this.$Message.error(data.msg)
							}
						})
					}
				}
			})
		},
		edit(index, row) {  //点击编辑
			console.log(row);
			this.samid= row.sampleid;
			this.sampleid = row.sampleid;
			this.uploadDisabled = false;
			// this.$refs.tree.sid(row.sampleid);
			console.log(this.sampleid)
			this.sampleModal = true;
			this.upshow = true;
			this.sampleInfo={};
			this.sampleInfo =M.extend(this.sampleInfo,row);
			this.takendate = row.takendate;
			this.receivedate = row.receivedate;
			this.seqdate = row.seqdate;
		},
		//上传点击
		uploadSample() {
			this.sampleModal = false;
			this.upModal = true;
			this.loading = true;
		},
		// 获得服务
		_getServerDataList() {
			let obj = {
				"path": "/opt/serverData/",
				// "path":"/opt/NfsDir/PublicDir/demo/",
				// /opt/NfsDir/PublicDir/demo/  电信云
				// /opt/serverData/   159
				"userId": getCookie("userid"),
				"productId": "2",
				"type": "2"
			}
			data.getSingleForldList(obj).then((data) => {
				// console.log(data)
				if (data.returnCode == 0 || data.returnCode == 200) {
					if (M.isArray(data.data)) {
						this.fileServerCategoryList = data.data;
					} else {
						this.$Message.error(data.msg)
					}
				} else if (data.returnCode == 422 || data.returnCode == 204) {
					this.$router.push('/login')
				} else {
					this.$Message.error(data.msg)
				}
			})
		},
		// 获得本地
		_getLocalDataList() {
			let obj = {
				"path": "/opt/serverData/",
				// "path":"/opt/NfsDir/PublicDir/demo/",
				// /opt/NfsDir/PublicDir/demo/  电信云
				// /opt/serverData/   159
				"userId": getCookie("userid"),
				"productId": "2",
				"type": "2"
			}
			data.getSingleForldList(obj).then((data) => {
				// console.log(data)
				if (data.returnCode == 0 || data.returnCode == 200) {
					if (M.isArray(data.data)) {
						this.fileCategoryList = data.data;
						this.loading = false;
					} else {
						this.$Message.error(data.msg)
					}
				} else if (data.returnCode == 422 || data.returnCode == 204) {
					this.$router.push('/login')
				} else {
					this.$Message.error(data.msg)
				}
			})
		},
		getList() {   //获取样本列表
			this.samplelist = [];
			let obj = {
				"patientid": this.$store.state.tumourPatientInfo.tumourPatientId,
				"userId": getCookie("userid"),
				"productId": "2"
			}
			console.log(obj)
			data.getSampleList(obj).then((data) => {
				console.log(data)
				if (data.returnCode == 0 || data.returnCode == 200) {
					if ( data.data && data.data != null) {
						this.samplelist = data.data;
						this.total = data.data.length;
					}
					console.log(this.samplelist)
				} else if (data.returnCode == 422 || data.returnCode == 204) {
					this.$router.push('/login')
				} else {
					this.$Message.error(data.msg);
				}
			})
		},
		//获取样本下拉菜单
		getSampleOption(){
			let obj = {
				"userId": getCookie("userid"),
				"productId": "2"
			};
			data.getSampleOption(obj).then((data) => {
				if (data.returnCode == "200" || data.returnCode == "0") {
					console.log(data);
					if(data.data){
						this.buildSampleData(data.data);
					}
				} else if (data.returnCode == 422 || data.returnCode == 204) {
					this.$router.push('/login')
				} else {
					this.$Message.error(data.msg)
				}
			}).catch((error) => {
				this.$Message.error(error.statusText);
			})
		},
		//创建下拉菜单数据结构
		buildSampleData(data){
			this.samplesource=data.sampleSourceLists;
			this.sampletype=data.sampleTypeLists;
			this.platform=data.seqPlatformLists;
			this.seqtype=data.seqTypeLists;
			this.region=data.tumorTypeLists;
		},
		//上一步
		upStep(){
			this.$router.push('/admin/tomour/deaseInfo');
		},
		//完成
		complete(){
			this.$router.push('/admin/tomour/index');
		},
	},
	mounted() {
		this.getList();
		this.getSampleOption();
	},
	components: {
		treeGrid,
	}
}
</script>