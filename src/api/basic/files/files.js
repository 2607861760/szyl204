import { apiUrl } from '@/common/js/Base.js'
export const files = {
    /*
     *文件管理列表
     */
    getUploadSamplesInfo(obj) {
        return $ajax.post(apiUrl.apiUrl + 'data/getUploadSamplesInfo', obj).then(function(res) {
            return Promise.resolve(res.data)
        })
    }
}