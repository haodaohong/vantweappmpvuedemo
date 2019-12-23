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
                <h2 class="van-doc-demo-block__title">基本信息</h2>
            </div>
            <div>
                <div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>产品编号</span>
                        </div>
                        <div class="van-cell__value">
                            <span>SNxxxxxxxxxxxx</span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>产品名称</span>
                        </div>
                        <div class="van-cell__value">
                            <span>XXX仪器</span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>产品类别</span>
                        </div>
                        <div class="van-cell__value">
                            <span>主机</span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>生产规格</span>
                        </div>
                        <div class="van-cell__value">
                            <span>20*30</span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>生产日期</span>
                        </div>
                        <div class="van-cell__value">
                            <span>2019-01-01</span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>入库日期</span>
                        </div>
                        <div class="van-cell__value">
                            <span>2019-01-01</span>
                        </div>
                    </div>
                </div>
                <view class="divLine"></view>
            </div>
        </div>
        <mybr />
        <!--注意要配一个van-dialog,才会显示提示 ,默认id van-dialog-->
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
    methods: {},
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
<style scoped src="./a-dtpproductsearch.css"></style>
