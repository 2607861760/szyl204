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
    patientInfo: {
        patientCode: '',
        patientId: ''
    },
    sampleInfo: {
        samplecode: ''
    }
};

export default state;