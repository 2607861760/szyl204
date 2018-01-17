<style lang="scss" scope>
// 引入公共变量及方法
@import '~common/scss/public/base-url.scss';
.visual {
    .visual-cont {
        position: absolute;
        width: 100%;
        background: #fff;
        .cont-iframe {
            position: relative;
            width: 100%;
            _height: 700px;
            min-height: 700px;
        }
        .vis-cont {
            position: absolute;
            margin-top: 40px;
            font-size: 18px;
            margin-left: 48%;
        }
    }
}
</style>
<template>
    <div class="visual">
        <div class="visual-cont" v-loading="loading">
            <div class="vis-cont" v-if="dataShow">
                没有文件
            </div>
            <iframe :src="urlSrc" class="cont-iframe" frameborder="0"></iframe>
        </div>
    </div>
</template>
<script>
// 引入任务管理方法
import { task } from 'api/index.js'
import { getCookie } from '@/common/js/cookie.js'
export default {
    name: "visualization",
    data() {
        return {
            cookies: getCookie('userid'),
            urlSrc: "",
            dataShow: false,
            loading: true
        }
    },
    // 实例创建时
    created() {

        this.getJobRowse();
    },
    watch: {

    },
    methods: {
        getJobRowse() {
            let obj = {
                jobid:this.$store.state.jobid,
                userId:this.cookies
            }
            // console.log(obj);
            task.getJobRowse(obj).then((data) => {
                console.log(data);
                if (data.returnCode == 0 || data.returnCode == 200) {
                    if (data.msg == "成功") {
                        this.urlSrc = "http://42.123.124.204:8081/jbrowse/JBrowse-1.11.5/index.html?data=file"
                        this.loading = false;
                    } else {
                        this.dataShow = true;
                        this.$Message.success("路径下没有文件");
                        this.loading = false;
                    }
                } else if (data.returnCode == 422 || data.returnCode == 204) {
                    this.$router.push('/login')
                } else {
                    this.$Message.error(data.msg);
                    this.loading = false;
                }

            })
        },
    }
}

</script>