<style lang="scss" scope>
	// 引入公共变量及方法
@import '~common/scss/public/base-url.scss';
.table-box{
    width:100%;
    padding:15px 20px 60px;
    box-sizing:border-box;
}
</style>
<template>
	<div class="fileMange">
		<div class="tabs">
			<Tabs type="line" v-model="cInner">
                <TabPane label="批量上传文件" name="all"></TabPane>
            </Tabs>
		</div>
		<Row>
			<Col span="6">
				<div style="float:left;width:75px;margin-left:20px;">批次筛选:</div>
				<Select style="float:left;width:120px;" v-model="batchId" @on-change="SelectChangeData">
					<Option value="all">全部批次</Option>
                    <Option value="0">无批次</Option>
					<Option v-for="(item, index) in piciList" :value="item.value" :label="item.label" :key="index">{{item.label}}</Option>
				</Select>
			</Col>
		</Row>
		<div class="table-box">
			<el-table :data="uploadSampleFileInfos" border style="width: 100%;" :highlight-current-row="true" :height="600" v-loading="loading">
				<el-table-column align="center" v-if="this.$store.state.projectid==1" label="上传状态">
					<template slot-scope="scope">
						{{scope.row.uploadstatus | uploadstatus}}
					</template> 
				</el-table-column>
    			<el-table-column align="center" label="样本批次">
					<template slot-scope="scope">
						{{scope.row.batchID | foreignFlag}}
					</template> 
				</el-table-column>
				<el-table-column align="center" prop="fileID" label="文件id" min-width="150%"> </el-table-column>
				<el-table-column align="center" prop="uploaddate"  label="文件上传时间"> </el-table-column>
    			<el-table-column align="center" prop="patientID" label="病人编号"> </el-table-column>
    			<el-table-column align="center" prop="sampleID" label="样本编号"> </el-table-column>
    			<el-table-column align="center"  label="文件状态" width="250">
    				<template slot-scope="scope">
						<Poptip width="300" :placement="scope.$index<=2?'bottom-end':'top-end'" v-if="scope.row.fastq_R1!=null">
							<div slot="content" style="height: 80px;word-wrap: break-word;text-align: left;">
								{{scope.row.fastq_R1}}
							</div>
							<div class="imgbox">
								<div class="fastq_R1_on" ></div>
							</div>
						</Poptip>
						<div class="imgbox" v-else>
							<div class="fastq_R1_off"></div>
						</div>
						<Poptip width="300" :placement="scope.$index<=2?'bottom-end':'top-end'" v-if="scope.row.fastq_R2!=null ">
							<div slot="content" style="height: 80px;word-wrap: break-word;text-align: left;">
								{{scope.row.fastq_R2}}
							</div>
							<div class="imgbox">
								<div class="fastq_R2_on" ></div>	
							</div>
						</Poptip>
    					<div class="imgbox" v-else>
							<div class="fastq_R2_off"></div>
						</div>
						<Poptip width="300" :placement="scope.$index<=2?'bottom-end':'top-end'" v-if="scope.row.vcf!=null">
							<div slot="content" style="height: 80px;word-wrap: break-word;text-align: left;">
								{{scope.row.vcf}}
							</div>
							<div class="imgbox">
								<div class="vcf_on" ></div>
							</div>
						</Poptip>
    					<div class="imgbox" v-else>
							<div class="vcf_off"></div>
						</div>
						<Poptip :placement="scope.$index<=2?'bottom-end':'top-end'" v-if="scope.row.etcFiles!=null " width="300">
							<div class="imgbox">
								<div class="etc_on" ></div>
							</div>
							<div slot="content">
								<table>
									<tbody>
										<tr v-for="(item,index) in scope.row.etcFiles" :key="index" style="height:60px;word-wrap: break-word;text-align: left;">
											{{item}}
										</tr>
									</tbody>
								</table>
							</div>
    					</Poptip>
						<div class="imgbox" v-else>
							<div class="etc_off"></div>
						</div>
    				</template>
    			</el-table-column>
  			</el-table>
			  <div style="float:right;margin-top:15px;">
			 <el-pagination
				@size-change="handleSizeChange"
				@current-change="handleCurrentChange"
				:current-page="currentPage"
				:page-sizes="[10, 20, 50, 100]"
				:page-size="pageSize"
				layout="total, sizes, prev, pager, next, jumper"
				:total="listTotal" >
			</el-pagination> 
		</div>
		</div>
		
	</div>
</template>

<script>
import {files,data,task} from 'api/index.js'
import {getCookie} from '@/common/js/cookie.js'
	export default {
		name:"fileManage",
		data(){
			return {
				listTotal:0, //总条数
				currentPage:1,  //页数
				batchId:'',    //批次号
				pageIndex:1,   //页码
				pageSize:10,    //每页显示
				piciList:'',    //批次号集合
				uploadSampleFileInfos: [],
				loading:false,  //加载loading
				cInner:"all"
			}
		},
		methods:{
			// tabs切换
			choice(name){
				this.$store.state.projectid=name+1;
				this.cInner='all';
				this.getBatchList(); 
			},
			//每页显示改变
			handleSizeChange(val) {
				this.pageSize=val;
				this.getFileList();
			},
			//页码改变
			handleCurrentChange(val) {
				this.pageIndex=val;
				this.getFileList();
			},
			// 批次改变事件
			SelectChangeData(val) {
				this.pageIndex=1;
				// this.batchId=this.selectPcId;
				console.log(this.batchId)
				this.getFileList();
			},
			// 获得批次信息
			getBatchList() {
				let obj = {
					userId: getCookie('userid'),
					productId:this.$store.state.projectid
				}
				this.batchId="";
				task.getBatchList(obj).then((data)=> {
					console.log(data);
					if(data.returnCode==0 || data.returnCode==200) {
						if(data.data!=null){
							this.piciList = this.transformToSelect(data.data);
							M.each(data.data,(item,index)=>{
								if(item==0){
									data.data.splice(index, 1);
								}
							})
							this.batchId=data.data[data.data.length-1]
						}
					}else if(data.returnCode==422 || data.returnCode==204){
						this.$router.push('/login')
					}else{
						this.$Message.error(data.msg)
					}
				})
			},
			// 转成select需要数据
			transformToSelect(arr) {
				// 返回值
				let array = [];
				if(M.isArray(arr)) {
					M.each(arr,(item,index)=> {
						// console.log(item);
						if(item && item !=0) {
							let obj = {};
							obj.value = item;
							obj.label = item;
							array.push(obj);
						}
					})
				}
				return array;
			},
			getFileList(){
				this.uploadSampleFileInfos=[];
				if(this.batchId!=""){
					let obj={
						"productId": this.$store.state.projectid,
						"userId": getCookie('userid'),
						"pageSize":this.pageSize,
						"pageIndex":this.pageIndex,
						"batchId":this.batchId
					}
					
					this.loading=true;
					files.getUploadSamplesInfo(obj).then((data)=>{
						console.log(data)
						this.loading=false;
						if(data.returnCode==0 || data.returnCode==200) {
							if(data.data!=null){
								this.uploadSampleFileInfos=data.data.uploadSampleFileInfos;
								this.listTotal=data.data.count;
							}
							console.log(this.uploadSampleFileInfos)
						}else if(data.returnCode==422 || data.returnCode==204){
							this.$router.push('/login')
						}else{
							this.$Message.error(data.msg)
						}
					}).catch((err)=>{
						this.loading=false;
					})
				}
				
			}
		},
		mounted(){
			// let _this=this;
			// this.getBatchList(1,function(){
			// 	_this.batchId=_this.batchIds[4];
			// 	_this.getFileList();
			// });
			// this.$store.state.projectid=1;
			// this.getBatchList();
			this.$store.state.projectid = M.url().product ? M.url().product : "1";
			this.getBatchList();
		},
		watch: {
			'$route'(to, from) {
				//刷新参数放到这里里面去触发就可以刷新相同界面了
				console.log(this.$route.path);
				this.$store.state.projectid = M.url().product ? M.url().product : "1";
				this.getBatchList();
			}
		},
		filters:{
        // 格式化数据
			foreignFlag(cellValue) {
				console.log(cellValue)
				if(cellValue == '0'){
					return cellValue = "----"
				}else if(cellValue){
					return cellValue
				}
			},
			uploadstatus(cellValue){
				if (cellValue == 1) {
					return cellValue = "正在上传"
				} else if (cellValue == 2) {
					return cellValue = "上传完成"
				} else {
					return cellValue = "上传完成"
				}
			}
    	},
	}
</script>

