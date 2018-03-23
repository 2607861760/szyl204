
<style lang="scss">
.patient-info {
    padding: 12px 15px;
    color: #333;
}
</style>
<template>
<div class="patient-info">
    <div>
        <div>
            <div class="info-title" style="border-bottom:1px solid #ccc;padding-bottom:10px;">
                <Icon type="android-person" style="font-size:14px;"></Icon>
                <span style="margin-left:10px;">基本信息（*为必填项）</span>
            </div>
            <div style="padding:0 20px 20px;">
                <Form :model="basicInfo" ref="basicInfo" :rules="rules" label-position="left" :label-width="80" inline>
                    <Row>
                        <Col class="tables">
                            <FormItem label="病人编号" style="width:30%;" prop="patientcode">
                                <Input v-model="basicInfo.patientcode"></Input>
                            </FormItem>
                            <FormItem label="病人姓名" style="width:30%;">
                                <Input v-model="basicInfo.patientname"></Input>
                            </FormItem>
                             <FormItem label="出生日期" style="width:30%;">
                                <DatePicker type="date" placeholder="选择日期" v-model="birthday"></DatePicker>
                            </FormItem>
                        </Col>
                        <Col class="tables">
                            <!-- <FormItem label="出生日期" style="width:30%;">
                                <DatePicker type="date" placeholder="选择日期" v-model="birthday"></DatePicker>
                            </FormItem> -->
                            <FormItem label="性别" style="width:30%;">
                                <Select v-model="basicInfo.gender" @on-change="sex">
                                    <Option v-for="item in sexs" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                </Select>
                            </FormItem>
                            <FormItem label="血缘关系" style="width:30%;">
                                <Input v-model="basicInfo.consanguinity"></Input>
                            </FormItem>
                            <FormItem label="民族" style="width:30%;">
                                <Input v-model="basicInfo.nation"></Input>
                            </FormItem>
                        </Col>
                        <!-- <Col class="tables">
                            <FormItem label="血缘关系" style="width:30%;">
                                <Input v-model="basicInfo.consanguinity"></Input>
                            </FormItem>
                            <FormItem label="民族" style="width:30%;">
                                <Input v-model="basicInfo.nation"></Input>
                            </FormItem>
                        </Col> -->
                        <Col class="tables">
                            <FormItem label="临床信息" style="width:78%;">
                                <Input v-model="basicInfo.clinicalinf" type="textarea" :rows="3" :maxlength="800" placeholder="请输入不超过800个字"></Input>
                            </FormItem>
                        </Col>
                    </Row>
                </Form>
            </div>
        </div>
        <div class="back-next">
            <Row>
                <Col span="12">
                    <Button type="primary" @click="next('basicInfo')" >下一步</Button>
                </Col>
                <Col span="12" pull="8">
                    <Button type="primary" @click="backUp('basicInfo')" >返回</Button>
                </Col>
            </Row>
        </div>
    </div>
</div>
</template>
<script>
import {data} from 'api/index.js'
import {getCookie} from '@/common/js/cookie.js'
export default{
    name: 'patientgene',
    data(){
        return {
            sexs:[{value:"true",label:"男"},{value:"false",label:"女"}],  //性别下拉菜单
            birthday: '',  //绑定生日日期
            basicInfo: {},  //基本信息
            rules:{   //表单验证
              patientcode: [
                  { required: true, message: '病人编号不能为空', trigger: 'blur' }
              ]
            }
        }
    },
    updated(){
        this.$emit('binfo',this.basicInfo)
    },
    methods: {
        // 返回
        backUp() {
            this.$router.push('/admin')
        },
        sex(val){ //性别改变
            this.basicInfo.gender=val;
        },
        next(name){
            let obj={
                // userId:getCookie("userid"),
                productname:"TGex",
                // productId:"1",
                birthday:String(this.birthday),
            }
            M.extend(this.basicInfo,obj)
            let newobj={
                userId:getCookie("userid"),
                projecttype:0,
                productId:"1",
            }
            newobj.patient=this.basicInfo;
            this.$refs[name].validate((valid) => {
                if(valid){
                    data.addProject(newobj).then((data)=>{
                        console.log(data)
                        if(data.returnCode==0 || data.returnCode==200){
                            if(data.data!='null' || data.data!=null){
                                this.$store.state.patientInfo.patientId=data.data.patient.patientid;
                                this.$router.push('/admin/gene/newsample')
                            }
                        }else if(data.returnCode==422 || data.returnCode==204){
                            this.$router.push('/login')
                        }else{
                            this.$Message.error(data.msg);
                        }
                    }).catch((error)=>{
                    })
                }
            })  
        },
    }
}
</script>
