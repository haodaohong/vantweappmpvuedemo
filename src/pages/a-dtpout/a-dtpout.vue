<!-- html代码片段 -->
<template>
    <!--
  这是产品出库页面
  特别提示:
  van-tabs组件的:active="active"不是双向数据绑定,
  所以tab切换后active值已经不是最新的啦!如果需要保持最新,需要在事件change中主动赋值一下

  collapse也有类似情况
  -->
    <div>
        <div class="basicinfo">
            <div>
                <h2 class="van-doc-demo-block__title">产品返厂</h2>
            </div>
            <div>
                <div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>产品编号：SNxxxxxxxxxxxx</span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>名称：XXX仪器</span>
                        </div>
                        <div class="van-cell__title">
                            <span>类型：产品主机</span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>规格：20*30</span>
                        </div>
                        <div class="van-cell__title">
                            <span>单位：台</span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>生产日期：2019-01-01</span>
                        </div>
                        <div class="van-cell__title">
                            <span>数量：1</span>
                        </div>
                    </div>
                </div>
                <view class="divLine"></view>
            </div>
        </div>
        <van-panel title="寄送信息">
            <van-field
                :value="username"
                label="物流单号"
                placeholder="请输入物流单号"
                clearable
                required
            />
        </van-panel>
        <mybr />
        <div class="confirmsignbtn">
            <van-button square size="normal" type="info" @click="onConfirmOut"
                >提交出库</van-button
            >
        </div>
        <!--
    注意要配一个van-dialog,才会显示提示 ,默认id van-dialog
    -->
        <van-dialog id="van-dialog" />
    </div>
</template>

<!-- js脚本代码片段 -->
<script>
import Dialog from '../../../static/vant/dialog/dialog'
import mybr from '@/components/mybr/mybr.vue'

export default {
    name: 'tab',
    components: {
        mybr,
    },
    //数据模型
    data() {
        return {}
    },
    //方法
    methods: {
        onConfirmOut(event) {
            const message = '该产品信息及快递单号将同步至COC！'

            Dialog.alert({
                title: '提交成功',
                message,
            }).then(() => {
                const url = '../a-dtphome/main'
                wx.navigateBack({ url: url })
            })
        },
    },
    //计算属性
    computed: {
        //name() {
        //代码搞这里
        //return this.data;
        //}
    },
    //生命周期(mounted)
    mounted() {},
}
</script>

<!-- 样式代码片段  scoped -->
<style scoped src="./a-dtpout.css"></style>
