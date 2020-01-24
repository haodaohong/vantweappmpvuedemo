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
                <h2 class="van-doc-demo-block__title">产品出库</h2>
            </div>
            <div>
                <div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>产品编号：{{ product.UDISN }}</span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>名称：{{ product.ProductName }}</span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>类型：{{ product.ProductType }}</span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>规格：{{ product.Specification }}</span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span
                                >生产日期：{{
                                    product.ProductionDateFormat
                                }}</span
                            >
                        </div>
                    </div>
                </div>
                <view class="divLine"></view>
            </div>
        </div>
        <van-panel title="寄送信息">
            <van-field
                :value="trackingNumber"
                @change="onTrackingNumberFieldChange"
                label="物流单号"
                placeholder="请输入物流单号"
                clearable
                required
            />
        </van-panel>
        <mybr />
        <div class="confirmsignbtn">
            <van-button
                square
                size="normal"
                type="info"
                @click="onConfirmOut(product.Id)"
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
        return {
            trackingNumber: '',
            snCode: '',
            product: {},
        }
    },
    //方法
    methods: {
        onConfirmOut() {
            const message = '已成功出库产品！'
            console.log('product data is', this.product)
            console.log('trackingNumber is', this.trackingNumber)
            var url =
                '/Product/CheckOut?role=DTP&pruductId=' +
                this.product.Id +
                '&currentStatus=' +
                this.product.CurrentStatus +
                '&trackingNumber=' +
                this.trackingNumber
            //console.log('url is', url)
            this.$http
                .post({
                    url:
                        '/Product/CheckOut?role=COC&productId=' +
                        this.product.Id +
                        '&currentStatus=' +
                        this.product.CurrentStatus +
                        '&trackingNumber=' +
                        this.trackingNumber,
                })
                .then(res => {
                    if (res.code == 200) {
                        console.log('/Product/CheckOut response', res)
                        Dialog.alert({
                            title: '信息提示',
                            message,
                        }).then(() => {
                            const url = '../a-cochome/main'
                            wx.navigateTo({ url: url })
                        })
                    } else {
                        const message = res.message
                        Dialog.alert({
                            title: '信息提示',
                            message,
                        }).then(() => {
                            const url = '../a-cochome/main'
                            wx.navigateTo({ url: url })
                        })
                    }
                })
        },
        onTrackingNumberFieldChange(event) {
            this.trackingNumber = event.mp.detail
            console.log('trackingNumber is', this.trackingNumber)
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
    mounted() {
        var snCode = this.$root.$mp.query.snCode
        this.snCode = snCode
        console.log('snCode:', this.snCode)
        var that = this
        this.$http
            .get({
                url: '/Product/GetBySN?snCode=' + this.snCode,
            })
            .then(res => {
                if (res.code == 200) {
                    console.log('/Product/GetBySN response', res)
                    this.product = res.data
                } else {
                    const message = res.message
                    Dialog.alert({
                        title: '信息提示',
                        message,
                    })
                }
            })
    },
}
</script>

<!-- 样式代码片段  scoped -->
<style scoped src="./a-cocout.css"></style>
