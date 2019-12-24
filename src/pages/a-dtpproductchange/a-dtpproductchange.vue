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
                <h2 class="van-doc-demo-block__title">第二步-添加产品</h2>
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
        <mybr />
        <div class="confirmsignbtn">
            <van-button square size="normal" type="info" @click="scanProduct"
                >添加产品</van-button
            >
        </div>
        <mybr />
        <div class="footer-container">
            <div>
                <text>出库件数：2</text>
                <view class="divLine"></view>
            </div>
            <van-button type="primary" size="large" @click="onConfirmRepairOut"
                >确认提交</van-button
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
        return {
            //从0开始的
            isshowdatetimepicker: false,
            fileList: [],
            contractfile: '',
            selectedDate: new Date().toLocaleDateString(),
            currentDate: new Date().getTime(),
            minDate: new Date().getTime(),
            selectedCount: 1,
        }
    },
    //方法
    methods: {
        onConfirmRepairOut(event) {
            const url = '../a-dtphome/main'
            const message = '产品更换绑定成功！'
            Dialog.alert({
                title: '信息提示',
                message,
            }).then(() => {
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
<style scoped src="./a-dtpproductchange.css"></style>
