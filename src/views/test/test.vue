<style lang="scss">
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
                <el-table-column prop="samplesource" label="样本类型" min-width="10%"></el-table-column>
                <el-table-column prop="sampletype" label="样本来源" min-width="10%"></el-table-column>
                <el-table-column prop="region" label="肿瘤分类" min-width="10%"></el-table-column>
                <el-table-column label="文件状态" width="200">
                    <template slot-scope="scope">
                        <div v-for="(list,index) in scope.row.dchSampleList" style="height:40px;" :key="index">
                            <Poptip placement="bottom-end" v-if="list.fastq_R1!=null" width="300">
                                <div slot="content" style="height: 80px;word-wrap: break-word;text-align: left;">
                                    {{list.fastq_R1}}
                                </div>
                                <div class="imgbox">
                                    <div class="fastq_R1_on"></div>
                                </div>
                            </Poptip>
                            <div class="imgbox" v-else>
                                <div class="fastq_R1_off"></div>
                            </div>
                            <Poptip placement="bottom-end" v-if="list.fastq_R2!=null " width="300">
                                <div slot="content" style="height: 80px;word-wrap: break-word;text-align: left;">
                                    {{list.fastq_R2}}
                                </div>
                                <div class="imgbox">
                                    <div class="fastq_R2_on"></div>
                                </div>
                            </Poptip>
                            <div class="imgbox" v-else>
                                <div class="fastq_R2_off"></div>
                            </div>
                            <Poptip placement="bottom-end" v-if="list.vcf!=null" width="300">
                                <div slot="content" style="height: 80px;word-wrap: break-word;text-align: left;">
                                    {{list.vcf}}
                                </div>
                                <div class="imgbox">
                                    <div class="vcf_on"></div>
                                </div>
                            </Poptip>
                            <div class="imgbox" v-else>
                                <div class="vcf_off"></div>
                            </div>
                            <Poptip placement="bottom-end" v-if="list.etcFiles!=null " width="300">
                                <div class="imgbox">
                                    <div class="etc_on"></div>
                                </div>
                                <div slot="content">
                                    <table>
                                        <tbody>
                                            <tr v-for="(item,index) in list.etcFiles" :key="index" style="height:60px;word-wrap: break-word;text-align: left;">
                                                {{item}}
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                            </Poptip>
                            <div class="imgbox" v-else>
                                <div class="etc_off"></div>
                            </div>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="状态" min-width="10%">
                    <template slot-scope="scope">
                        <div class="handle">
                            <span class="status">{{scope.row.samplestatus | dataFormat}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column label="操作" min-width="20%">
                    <template slot-scope="scope">
                        <div class="handle">
                            <span class="bian" @click="run(scope.$index,scope.row)" v-if="scope.row.isexecute==0">运行</span>
                            <span class="bian" @click="delet(scope.$index,scope.row)">删除</span>
                            <span class="bian" @click="edit(scope.$index,scope.row)">编辑</span>
                        </div>
                    </template>
                </el-table-column>
            </el-table>
            <div>当前显示1-{{total}}条，共{{total}}条</div>
        </div>
        <!--新建样本/编辑-->
        <Modal width="835px" v-model="sampleModal" :mask-closable="false">
            <div class="sample-title">样本信息</div>
            <div class="sample-main">
                <div class="stitle">
                    <Icon type="clipboard" style="font-size:22px;"></Icon>
                    <span style="padding-left:5px;">样本信息（*为必填项）</span>
                </div>
                <div class="sample-inner">
                    <Form :model="sampleInfo" label-position="left" ref="sampleInfo" :label-width="110" inline :rules="ruleCustom">
                        <Row>
                            <Col class="tables">
                                <FormItem label="测序区域" style="width:30%;" prop="region">
                                    <Select v-model="sampleInfo.region">
                                        <Option v-for="item in region" :value="item.value" :key="item.value" :disabled="item.disabled">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="样本编号" style="width:30%;" prop="samplecode">
                                    <Input v-model="sampleInfo.samplecode"></Input>
                                </FormItem>
                            </Col>
                            <Col class="tables">
                                <FormItem label="样本来源" style="width:30%;" prop="sampletype">
                                    <Select v-model="sampleInfo.sampletype">
                                        <Option v-for="item in sampletype" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="样本类型" style="width:30%;" prop="samplesource">
                                    <Select v-model="sampleInfo.samplesource">
                                        <Option v-for="item in samplesource" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
                                        <Option v-for="item in platform" :value="item.value" :key="item.value">{{ item.label }}</Option>
                                    </Select>
                                </FormItem>
                                <FormItem label="收样日期" style="width:30%;">
                                    <DatePicker type="date" v-model="receivedate"></DatePicker>
                                </FormItem>                           
                            </Col>
                            <Col class="tables">
                                <FormItem label="测序类型" style="width:30%;">
                                    <Select v-model="sampleInfo.seqtype">
                                        <Option v-for="item in seqtype" :value="item.value" :key="item.value">{{ item.label }}</Option>
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
                        <Button type="primary" @click="keep('sampleInfo')">保存</Button>
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
import treeGrid from '@/components/treeTable/vue2/TreeGrid'
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
                {
                    text: '传输时间',
                    dataIndex: 'transition',
                    width: '10'
                }
            ],

            sampleInfo: {},
            samplesource: [{
                value: '肿瘤样本',
                label: '肿瘤样本'
            }, {
                value: '对照样本',
                label: '对照样本'
            }],
            sampletype: [{
                value: '手术切除',
                label: '手术切除'
            }, {
                value: '手术活检',
                label: '手术活检'
            }, {
                value: '支气管镜检',
                label: '支气管镜检'
            }, {
                value: '经皮肺穿刺',
                label: '经皮肺穿刺'
            }, {
                value: '恶性胸腔积液',
                label: '恶性胸腔积液'
            }, {
                value: '心包积液',
                label: '心包积液'
            }, {
                value: '痰液/支气管灌洗液',
                label: '痰液/支气管灌洗液'
            }, {
                value: '淋巴结活检',
                label: '淋巴结活检'
            }, {
                value: '全血',
                label: '全血'
            }, {
                value: '血浆',
                label: '血浆'
            }],
            region: [{
                value: '肺癌早筛基因检测panel',
                label: '肺癌早筛基因检测panel',
                disabled: false
            }, {
                value: 'EGFR突变ARMS检测',
                label: 'EGFR突变ARMS检测',
                disabled: false
            }, {
                value: 'EGFR T790M突变检测',
                label: 'EGFR T790M突变检测',
                disabled: false
            }, {
                value: 'ALK融合Ventana免疫组化检测',
                label: 'ALK融合Ventana免疫组化检测',
                disabled: false
            }, {
                value: 'ALK FISH',
                label: 'ALK FISH',
                disabled: false
            }, {
                value: 'ALK RT-PCR检测',
                label: 'ALK RT-PCR检测',
                disabled: false
            }, {
                value: 'ROS1 RT-PCR检测',
                label: 'ROS1 RT-PCR检测',
                disabled: false
            }, {
                value: 'BRAF V600E突变检测',
                label: 'BRAF V600E突变检测',
                disabled: false
            }, {
                value: 'RET基因融合检测',
                label: 'RET基因融合检测',
                disabled: false
            }, {
                value: 'HER2点突变检测',
                label: 'HER2点突变检测',
                disabled: false
            }, {
                value: 'MET表达量或转录本剪切检测',
                label: 'MET表达量或转录本剪切检测',
                disabled: false
            }, {
                value: 'KRAS点突变检测',
                label: 'KRAS点突变检测',
                disabled: false
            }, {
                value: 'PIK3CA突变',
                label: 'PIK3CA突变',
                disabled: false
            }, {
                value: 'NCCN指南8基因检测panel',
                label: 'NCCN指南8基因检测panel',
                disabled: false
            }, {
                value: '耐药性基因检测panel',
                label: '耐药性基因检测panel',
                disabled: false
            }, {
                value: '癌症基因检测panel',
                label: '癌症基因检测panel',
                disabled: false
            }, {
                value: '肿瘤负荷监测',
                label: '肿瘤负荷监测',
                disabled: false
            }],
            platform: [{
                value: 'Ion torrent',
                label: 'Ion torrent'
            }, {
                value: 'Illumina',
                label: 'Illumina'
            }, {
                value: 'BGI',
                label: 'BGI'
            }],
            pipeline: '',
            seqtarget: [{
                value: '点突变+插入缺失',
                label: '点突变+插入缺失'
            }, {
                value: '基因融合',
                label: '基因融合'
            }],
            seqtype: [{
                value: 'DNA',
                label: 'DNA'
            }, {
                value: 'RNA',
                label: 'RNA'
            }],
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
    filters: {
        // 格式化数据
        dataFormat(cellValue) {
            if (cellValue == '0' || cellValue == '5') {
                return cellValue = "----"
            } else if (cellValue == '1') {
                return cellValue = "等待"
            } else if (cellValue == '2') {
                return cellValue = "正在运行"
            } else if (cellValue == '3') {
                return cellValue = "已完成"
            } else if (cellValue == '4') {
                return cellValue = "错误"
            } else if (cellValue == '6') {
                return cellValue = "未执行"
            }
        },
    },
    methods: {
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
                patientid: this.$store.state.patientInfo.patientId,
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
            this.sampleid = row.sampleid;
            this.uploadDisabled = false;
            // this.$refs.tree.sid(row.sampleid);
            console.log(this.sampleid)
            this.sampleModal = true;
            this.upshow = true;
            this.sampleInfo = row;
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
                "path": "/opt/NfsDir/PublicDir/demo/",
                // "path":"/opt/NfsDir/PublicDir/demo/",
                // /opt/NfsDir/PublicDir/demo/  电信云
                // /opt/NfsDir/PublicDir/demo/   159
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
                "path": "/opt/NfsDir/PublicDir/demo/",
                // "path":"/opt/NfsDir/PublicDir/demo/",
                // /opt/NfsDir/PublicDir/demo/  电信云
                // /opt/NfsDir/PublicDir/demo/   159
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
                "patientid": this.$store.state.patientInfo.patientId,
                "userId": getCookie("userid"),
                "productId": "2"
            }
            console.log(obj)
            data.getSampleList(obj).then((data) => {
                console.log(data)
                if (data.returnCode == 0 || data.returnCode == 200) {
                    if (data.data != null || data.data != 'null') {
                        this.samplelist = data.data;
                        this.total = data.data.length;
                    }
                } else if (data.returnCode == 422 || data.returnCode == 204) {
                    this.$router.push('/login')
                } else {
                    this.$Message.error(data.msg);
                }
            })
        }
    },
    mounted() {
        this.getList();
    },
    components: {
        treeGrid,
    }
}
</script>