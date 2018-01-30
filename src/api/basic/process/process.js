import {apiUrl} from '@/common/js/Base.js'

export const process = {
	//获取流程模板列表
    getPipelineTemplateList (obj) {
        return $ajax.post(apiUrl.apiUrl + 'template/getPipelineTemplateList', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    //添加或修改流程模版
    submitPipelineTemplateById(obj){
    	return $ajax.post(apiUrl.apiUrl + 'template/submitPipelineTemplateById', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    //删除模版
    deletePipelineTemplate(obj){
    	return $ajax.post(apiUrl.apiUrl + 'template/deletePipelineTemplate', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    //获取模版详情
    getPipelineTemplateById(obj){
    	return $ajax.get(apiUrl.apiUrl + 'template/getPipelineTemplateById', { params: obj }).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    
    /**
     *流程工具*/
    //获取流程模板工具
    getExecTools(obj){
    	return $ajax.post(apiUrl.apiUrl + 'template/getExecTools',obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    //根据工具id获取工具详情
    getExecToolById(obj){
    	return $ajax.get(apiUrl.apiUrl + 'template/getExecToolById', { params: obj }).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    //添加或修改工具
    submitExecTool(obj){
    	return $ajax.post(apiUrl.apiUrl + 'template/submitExecTool',obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    },
    //删除流程模板工具
	deleteExecTools(obj) {
		return $ajax.post(apiUrl.apiUrl + 'template/deleteExecTools', obj).then(function(res) {
			return Promise.resolve(res.data)
		})
	}
}
