import { apiUrl } from '@/common/js/Base.js'
export const data = {
    /**
     * [data  树形列表添加按钮]
     * @param  {[type]} param [path,fileName,userId,sampleid,productId]
     * @return {[type]}   obj
     */
    addFastq(obj) {
        return $ajax.post(apiUrl.apiUrl + 'upload/addFastq2Sample', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  创建病人]
     * @param  {[type]} param [病人信息,productId,userId,productname]
     * @return {[type]}   obj
     */
    addProject(obj) {
        return $ajax.post(apiUrl.apiUrl + 'project/addProject', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  创建样本]
     * @param  {[type]} param [样本信息,productId,userId,patientid]
     * @return {[type]}   obj
     */
    addSample(obj) {
        return $ajax.post(apiUrl.apiUrl + 'sample/addSample', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  删除病人]
     * @param  {[type]} param [productId,userId,idList]
     * @return {[type]}   obj
     */
    deletePatientById(obj) {
        return $ajax.post(apiUrl.apiUrl + 'patient/deletePatientById', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  删除样本]
     * @param  {[type]} param [productId,userId,idList]
     * @return {[type]}   obj
     */
    deleteSampleById(obj) {
        return $ajax.post(apiUrl.apiUrl + 'sample/deleteSampleById', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  运行fastq文件]
     * @param  {[type]} param [productId,userId,sampleid,pipeline,templateId]
     * @return {[type]}   obj
     */
    executeSample(obj) {
        return $ajax.post(apiUrl.apiUrl + 'sample/executeSample', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  获取疾病列表---癌症]
     * @param  {[type]} param [userId]
     * @return {[type]}   obj
     */
    getdiseaselist(obj) {
        return $ajax.post(apiUrl.apiUrl + 'disease/getdiseaselist', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  获取fastq文件]
     * @param  {[type]} param [userId,productId,pipeline,sampleId,fileGroupId,templateId]
     * @return {[type]}   obj
     */
    getFatsQList(obj) {
        return $ajax.post(apiUrl.apiUrl + 'sample/getFatsQList', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  获取样本文件信息]
     * @param  {[type]} param [userId,productId,sampleid]
     * @return {[type]}   obj
     */
    getFileList(obj) {
        return $ajax.post(apiUrl.apiUrl + 'sample/getFileList', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  获取树形文件列表]
     * @param  {[type]} param [userId,productId,path]
     * @return {[type]}   obj
     */
    getForldList(obj) {
        return $ajax.post(apiUrl.apiUrl + 'upload/getForldList', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  获取病人信息---点击病人编号]
     * @param  {[type]} param [userId,productId,patientcode,patientid]
     * @return {[type]}   obj
     */
    getProjectDetail(obj) {
        return $ajax.post(apiUrl.apiUrl + 'project/getProjectDetail', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  获取病人数据列表]
     * @param  {[type]} param [userId,productId,pageSize,pageIndex]   getProjectList
     * @return {[type]}   obj
     */
    getProjectList(obj) {
        return $ajax.post(apiUrl.apiUrl + 'project/getProjectLists', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  获取样本列表]
     * @param  {[type]} param [userId,productId,patientid]
     * @return {[type]}   obj
     */
    getSampleList(obj) {
        return $ajax.post(apiUrl.apiUrl + 'patient/getSampleList', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  获取样本下拉列表---测序区域/ek]
     * @param  {[type]} param [userId,productId]
     * @return {[type]}   obj
     */
    getTGexPara(obj) {
        return $ajax.post(apiUrl.apiUrl + 'sample/getTGexPara', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  获取xls列表]
     * @param  {[type]} param [userId,productId,filename]
     * @return {[type]}   obj
     */
    readExcel(obj) {
        return $ajax.post(apiUrl.apiUrl + 'upload/readExcel', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  更新病人信息]
     * @param  {[type]} param [userId,productId,patientid,病人信息]
     * @return {[type]}   obj
     */
    updatePatient(obj) {
        return $ajax.post(apiUrl.apiUrl + 'patient/updatePatient', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  创建样本]
     * @param  {[type]} param [样本信息,productId,userId,patientid,sampleid]
     * @return {[type]}   obj
     */
    updateSample(obj) {
        return $ajax.post(apiUrl.apiUrl + 'sample/updateSample', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  上传列表]
     * @param  {[type]} param [excelList,productId,userId]   uploadExcelFile
     * @return {[type]}   obj
     */
    uploadExcelFile(obj) {
        return $ajax.post(apiUrl.apiUrl + 'upload/uploadExcelFiles', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  vshoo接口]
     * @param  {[type]} param [excelList,productId,userId]
     * @return {[type]}   obj
     */
    vishuourl(obj) {
        return $ajax.post(apiUrl.apiUrl + 'job/vishuourl', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  vshoo接口]                 createCaseByPaientId
     * @param  {[type]} param [paientId]        
     * @return {[type]}   obj
     */
    createCaseByPaientId(obj) {
        return $ajax.post(apiUrl.apiUrl + 'workflow/getCaseid', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  退出接口]
     * @param  {[type]} param [userId]
     * @return {[type]}   obj
     */
    logout(obj) {
        return $ajax.post(apiUrl.apiUrl + 'auth/logout', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  根据样本批次获得病人信息接口]
     * @param  {[type]} param {"productId":"1" ,"batchId":"YM_102th",  getProjectListByBatchId
     * "pageSize":10,"pageIndex":1}
     * @return {[type]}   obj
     */
    getProjectListByBatchId(obj) {
        return $ajax.post(apiUrl.apiUrl + 'project/getProjectListByBatchIds', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  数据分配提交]   assignDeptData
     * @param  {[type]} param { "patientidList":["a","b"],"useridList":["c"]}
     * @return {[type]}   obj
     */
    // assignData(obj) {
    //     return $ajax.post(apiUrl.apiUrl + 'project/assignData', obj).then(function(res) {
    //         return Promise.resolve(res.data)
    //     })
    // },
    /**
     * [data  数据分配提交]   assignDeptData
     * @param  {[type]} param { "patientidList":["a","b"],"deptidList":[c]}
     * @return {[type]}   obj
     */
    assignData(obj) {
        return $ajax.post(apiUrl.apiUrl + 'project/assignDeptData', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  组成员列表]
     * @param  {[type]} cookie
     * @return {[type]}   obj
     */
    queryDeptAndUser(obj) {
        return $ajax.post(apiUrl.apiUrl + 'usercenter/queryDeptAndUser', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  根据部门id获得成员列表]
     * @param  {[type]} cookie
     * @return {[type]}   obj
     */
    // queryUserByDeptId(obj) {
    //     return $ajax.post(apiUrl.apiUrl + 'usercenter/queryUserByDeptId', obj).then(function(res) {
    //         return Promise.resolve(res.data)
    //     })
    // },
    /*
     *显示已分配成员   patient/getUsesByPatientId    sample/getUsesBySampleId
     */
    getUsesBySampleId(obj) {
        return $ajax.post(apiUrl.apiUrl + 'patient/getUsesByPatientId', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /*
     *
     */
    getSingleForldList(obj) {
        return $ajax.post(apiUrl.apiUrl + 'upload/getSingleForldList', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /*
     *
     */
    getCounts(obj) {
        return $ajax.post(apiUrl.apiUrl + 'project/getCounts', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },

    /**肿瘤二期数据接口**/
    /**
     * [data  获取疾病名称列表]
     * @param  {[type]} param [userId,productId,patientid,病人信息]
     */
    getAddNewProjectTemplate(obj) {
        return $ajax.get(apiUrl.apiUrl + 'template/getAddNewProjectTemplate', { params: obj }).then(function(res) {
            return Promise.resolve(res.data);
        })
    },
    /**
     * [data  根据模板id获取模板]
     * @param  {[type]} param [userId,productId,templateId,病人信息]
     */
    getPageTemplateById(obj) {
        return $ajax.get(apiUrl.apiUrl + 'template/getPageTemplateById', { params: obj }).then(function(res) {
            return Promise.resolve(res.data);
        })
    },
    /**
     * [data  提交病人表单]
     * @param  {[type]} param data
     */
    //肿瘤二期 新建病人
    newAddProject(obj) {
        return $ajax.post(apiUrl.apiUrl + 'project/addProject', obj).then(function(res) {
            return Promise.resolve(res.data);
        })
    },
    /**
     * [data  提交病人表单]
     * @param  {[type]} param {patientcode:"",patientid:""}
     */
    //肿瘤二期获取病人页面数据
    getProjectDetail(obj) {
        return $ajax.post(apiUrl.apiUrl + 'project/getProjectDetail', obj).then(function(res) {
            return Promise.resolve(res.data);
        })
    },
    /**
     * [data  修改病人表单]
     * @param  {[type]} param {patientcode:"",patientid:""}
     */
    //修改病人表单
    updateProject(obj) {
        return $ajax.post(apiUrl.apiUrl + 'project/updateProject', obj).then(function(res) {
            return Promise.resolve(res.data);
        })
    },
    /**
     * [data  获取不同癌种的样本数量
     */
    //获取不同癌种的样本数量
    getDiseaseStatistics(obj) {
        return $ajax.post(apiUrl.apiUrl + 'project/getDiseaseStatistics', obj).then(function(res) {
            return Promise.resolve(res.data);
        })
    },
    /**
     * [data  获取当前月不同癌种的样本数量
     */
    //获取当前月不同癌种的样本数量
    statisticalchart(obj) {
        return $ajax.post(apiUrl.apiUrl + 'project/statisticalchart', obj).then(function(res) {
            return Promise.resolve(res.data);
        })
    },
    /**
     * [data  获取样本信息]
     * @param  {[type]} param [sampleid,病人id]
     */
    getSample(obj) {
        return $ajax.post(apiUrl.apiUrl + 'sample/getSample', obj).then(function(res) {
            return Promise.resolve(res.data);
        })
    },
    /**
     * [data  获取新建样本时下拉菜单]
     * @param  {[type]} param [productId 2,病人id]
     */
    getSampleOption(obj) {
        return $ajax.post(apiUrl.apiUrl + 'sample/getSampleOption', obj).then(function(res) {
            return Promise.resolve(res.data);
        })
    },
    /**
     * [data  获取肿瘤二期首页数据]
     * @param  {[type]} param [productId 2,type mm]
     */
    getProjects(obj) {
        return $ajax.post(apiUrl.apiUrl + 'project/getProjects', obj).then(function(res) {
            return Promise.resolve(res.data);
        })
    },
    /**
     * [data  删除病人]
     * @param  {[type]} param [productId,userId,idList]
     * @return {[type]}   obj
     */
    deletePatientAndProjectById(obj) {
        return $ajax.post(apiUrl.apiUrl + 'patient/deletePatientAndProjectById', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    /**
     * [data  获取视频链接]
     * @param  {[type]} param [productId]
     * @return {[type]}   obj
     */
    getPlayVideoPath(obj) {
        return $ajax.post(apiUrl.apiUrl + 'auth/getPlayVideoPath', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
}