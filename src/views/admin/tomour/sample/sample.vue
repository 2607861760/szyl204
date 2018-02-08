<style lang="scss" scope>
	// 引入公共变量及方法
	@import '~common/scss/public/base-url.scss';
	.sample_content{
		padding:0 22px;
		width:100%;
		min-height:600px;
		background:#fff;
		.sample_content_title{
			height:50px;
			line-height:50px;
			background:#fff;
			border-bottom:1px solid #ccc;
			span{
				margin-left:5px;
			}
		}
		.sample_content_form{
			padding-top:20px;
			margin-top:0;
			.sample_content_form_row{
				height:55px;
				line-height:55px;
			}
		}
		.sample_content_footer{
			button{
				margin:0 10px;
			}
		}
		
	}
</style>
<template>
	<div class="sample_content">
		<div class="sample_content_title">
			<Icon type="android-person"></Icon>
			<span>样本信息（ * 为必填项）</span>
		</div>
		<div>
			<Form class="sample_content_form" :label-width="80" :model="formData" ref="modalForm" :rules="ruleValidate">
				<Row type="flex" justify="center" class="sample_content_form_row">
					<Col class="row" span="7">
						<FormItem style="width:30%;" class="sample_content_form_item handle"  label="肿瘤分类" prop="classify">
							<Select style="max-width:200px" v-model="formData.classify" class="sample_content_form_select">
        						<Option  value="0">肺癌早筛基因检测panel</Option>
        						<Option  value="1">EGFR突变ARMS检测</Option>
        						<Option  value="2">EGFR T790M突变检测</Option>
	    					</Select>
						</FormItem>
					</Col>
					<Col class="row" span="7"></Col>
					<Col class="row" span="7"></Col>
				</Row>
				<Row type="flex" justify="center"  class="sample_content_form_row">
					<Col class="row" span="7">
						<FormItem style="width:30%;" class="sample_content_form_item handle"  label="样本编号" prop="sampleCode">
							<Input style="max-width:200px" v-model="formData.sampleCode"></Input>
						</FormItem>
					</Col>
					<Col class="row" span="7">
						<FormItem style="width:30%;" class="sample_content_form_item handle"  label="样本来源" prop="sampleFrom"  >
								<Select style="max-width:200px" v-model="formData.sampleFrom" class="sample_content_form_select">
	        						<Option  value="0">Ion torrent</Option>
	        						<Option  value="1">Illumina</Option>
	        						<Option  value="2">BGI</Option>
		    					</Select>
						</FormItem>
					</Col>
					<Col class="row" span="7">
						<FormItem style="width:30%;" class="sample_content_form_item handle" prop="sampleType" label="样本类型">
								<Select style="max-width:200px" v-model="formData.sampleType" class="sample_content_form_select">
	        						<Option  value="0">Ion torrent</Option>
	        						<Option  value="1">Illumina</Option>
	        						<Option  value="2I">BGI</Option>
		    					</Select>
						</FormItem>
					</Col>
				</Row>
				<Row type="flex" justify="center" class="sample_content_form_row">
					<Col class="row" span="7">
						<FormItem style="width:30%;" class="sample_content_form_item handle"  label="测序日期">
							<DatePicker style="max-width:200px" type="date" ></DatePicker>
						</FormItem>
					</Col>
					<Col class="row" span="7">
						<FormItem style="width:30%;" class="sample_content_form_item handle"  label="取样日期">
							<DatePicker style="max-width:200px" type="date" ></DatePicker>
						</FormItem>
					</Col>
					<Col class="row" span="7">
						<FormItem style="width:30%;" class="sample_content_form_item handle"  label="收样日期">
							<DatePicker style="max-width:200px" type="date" ></DatePicker>
						</FormItem>
					</Col>
				</Row>
				<Row type="flex" justify="center" class="sample_content_form_row">
					<Col class="row" span="7">
						<FormItem style="width:30%;" class="sample_content_form_item handle"  label="测序平台">
								<Select style="max-width:200px" class="sample_content_form_select">
	        						<Option  value="Ion torrent">Ion torrent</Option>
	        						<Option  value="Illumina">Illumina</Option>
	        						<Option  value="BGI">BGI</Option>
		    					</Select>
						</FormItem>
					</Col>
					<Col class="row" span="7">
						<FormItem style="width:30%;" class="sample_content_form_item handle"  label="测序类型">
								<Select style="max-width:200px" class="sample_content_form_select">
	        						<Option  value="0">肺癌早筛基因检测panel</Option>
	        						<Option  value="0">肺癌早筛基因检测panel</Option>
	        						<Option  value="0">肺癌早筛基因检测panel</Option>
		    					</Select>
						</FormItem>
					</Col>
					<Col class="row" span="7"></Col>
				</Row>
			</Form>
		</div>
		<div class="sample_content_footer">
			<Row type="flex" justify="end" class="code-row-bg">
				<Col col="8">
					<Button type="ghost">上一步</Button>
					<Button type="primary">保存</Button>
				</Col>
			</Row>
		</div>
	</div>
</template>

<script>
	export default {
		data () {
			return{
				formData:{},  //表单数据
				//验证必填
	            ruleValidate: {
	                classify: [{
	                    required: true,
	                    message: '肿瘤分类不能为空'
	                    }
	                ],
	                sampleCode: [{
	                    required: true,
	                    message: '样本编号不能为空'
	                    }
	                ],
	                sampleFrom: [{
	                    required: true,
	                    message: '样本来源不能为空'
	                    }
	                ],
	                sampleType: [{
	                    required: true,
	                    message: '样本类型不能为空'
	                    }
	                ],
	            },
				
			}
		},
		methods:{
			sortable(){
				 $( ".row" ).sortable({
				 	connectWith: ".row",
				    handle: ".handle",
				 });
			}
		},
		mounted(){
			this.sortable();
		},
		created(){
			
		}
	}
</script>