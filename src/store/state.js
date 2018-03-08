// 根目录下的状态
const state = {

    // 记录后台一级菜单展开状态
    adminOpenMenus: [],
    // 当前登登录的用户的基本信息
    currentUser: {},
    allfile: [], //存储文件
    load: true, //loading状态
    jumpId: "", //左侧菜单跳转是携带的id
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

    tumourPatientInfo: {
        tumourPatientId: '', //肿瘤二期 病人id
        tumourpatientCode: '', //肿瘤二期 病人编号
        tumourProjectId: '', //肿瘤二期 项目id
    },
};

export default state;