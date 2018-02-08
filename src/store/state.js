// 根目录下的状态
const state = {
    // 当前登登录的用户的基本信息
    currentUser: {},
    allfile: [], //存储文件
    load: true, //loading状态
    loadstate: false, //
    uid: '',
    code: '',
    projectid: '', //项目代号
    jobid: '',
    pip: '',
    file: '',
    path: '',
    treeGrid: 1,
    patientInfo: {
        patientCode: '',
        patientId: ''
    },
    sampleInfo: {
        samplecode: ''
    },
    processTempId: '', //流程模板id
    processTempName: '', //流程模板名称
    projecttype: 0,
};

export default state;