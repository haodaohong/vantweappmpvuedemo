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
                <h2 class="van-doc-demo-block__title">扫描产品出库</h2>
            </div>
            <div>
                <div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>产品名称：{{ product.ProductName }}</span>
                        </div>
                        <div class="van-cell__title">
                            <span>产品编号：{{ product.UDISN }}</span>
                        </div>
                    </div>

                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>生产规格：{{ product.Specification }}</span>
                        </div>
                        <div class="van-cell__title">
                            <span
                                >生产日期：{{
                                    product.ProductionDateFormat
                                }}</span
                            >
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>入库类型：{{ product.CurrentStatus }}</span>
                        </div>
                    </div>
                </div>
                <view class="divLine"></view>
            </div>
        </div>
        <van-panel title="寄送信息">
            <van-field
                :value="trackingNumber"
                label="物流单号"
                placeholder="请输入物流单号"
                clearable
                required
                @change="onChangeTrackingNumber"
            />
        </van-panel>
        <mybr />
        <div class="confirmsignbtn">
            <van-button
                square
                size="normal"
                type="info"
                @click="onConfirmCheckOut"
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
            product: {ProductType:{PartsName:''}},
            returnDTPHomeTabIndex: 0,
        }
    },
    //方法
    methods: {
        onChangeTrackingNumber(event){
            console.log('onChangeTrackingNumber', event.mp.detail)
            this.trackingNumber = event.mp.detail;
        },
        onConfirmCheckOut(event) {
            const message = '已成功出库产品！'
            console.log('product data is', this.product)
            console.log('trackingNumber is', this.trackingNumber)
            if(this.trackingNumber.length == 0){
                Dialog.alert({
                            title: '信息提示',
                            message: '请输入物流单号',
                        });
                return;
            }
            this.$http
                .post({
                    url:
                        '/Product/CheckOut?role=DTP&productId=' +
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
                            const url =
                                '../a-dtphome/main?activeTabIndex=' +
                                this.returnDTPHomeTabIndex
                            //wx.navigateTo({ url: url })
                            this.$globalData.refresh = true;
                             wx.navigateBack();
                        })
                    } else {
                        const message = res.message
                        Dialog.alert({
                            title: '信息提示',
                            message,
                        }).then(() => {
                            const url = '../a-dtphome/main'
                            //wx.navigateTo({ url: url })
                            wx.navigateBack();
                        })
                    }
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
    mounted() {
        this.snCode = this.$root.$mp.query.snCode
        console.log('snCode:', this.snCode)
        //this.snCode = 'SN00001001'
        var that = this
        wx.login({
            success: res => {
                // 调用接口获取openid
                console.log('globalData departId', that.$globalData.departId)
                console.log('res:', res)
                this.$http
                    .get({
                        url: '/Product/GetBySN?snCode=' + that.snCode,
                    })
                    .then(res => {
                        if (res.code == 200) {
                            console.log('/Product/GetBySN response', res)
                            that.product = res.data
                            if (that.product.CurrentStatus == '用户归还入库') {
                                that.returnDTPHomeTabIndex = 2
                            } else {
                                that.returnDTPHomeTabIndex = 3
                            }
                            console.log(that.returnDTPHomeTabIndex)
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
<style scoped src="./a-dtpcheckout.css"></style>
