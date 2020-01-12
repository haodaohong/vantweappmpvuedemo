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
                            <span>{{ product.UDISN }}</span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>产品名称</span>
                        </div>
                        <div class="van-cell__value">
                            <span>{{ product.ProductName }}</span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>产品类别</span>
                        </div>
                        <div class="van-cell__value">
                            <span>{{ product.ProductCategory }}</span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>生产规格</span>
                        </div>
                        <div class="van-cell__value">
                            <span>{{ product.Specification }}</span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>生产日期</span>
                        </div>
                        <div class="van-cell__value">
                            <span>{{ product.ProductionDateFormat }}</span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>入库日期</span>
                        </div>
                        <div class="van-cell__value">
                            <span>{{ product.COCCheckInDateFormat }}</span>
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
        return {
            product: {},
        }
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
    mounted() {
        //console.log('qrcode', this.$root.$mp.query.qrcode)
        this.qrCode = this.$root.$mp.query.qrcode
        console.log('qrCode:', this.qrCode)
        this.qrCode = 'SN00001001'
        var that = this
        wx.login({
            success: res => {
                // 调用接口获取openid
                console.log('globalData departId', that.$globalData.departId)
                console.log('res:', res)
                this.$http
                    .get({
                        url: '/Product/GetBySN?snCode=' + that.qrCode,
                    })
                    .then(res => {
                        if (res.code == 200) {
                            console.log('/Product/GetBySN response', res)
                            that.product = res.data
                        } else {
                            const message = res.message
                            Dialog.alert({
                                title: '信息提示',
                                message,
                            })
                        }
                    })
            },
        })
    },
}
</script>

<!-- 样式代码片段  scoped -->
<style scoped src="./a-cocproductsearch.css"></style>
