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
                            <span>生产企业名称</span>
                        </div>
                        <div class="van-cell__value">
                            <span>{{ product.Manufacturer }}</span>
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
                            <span>使用期限</span>
                        </div>
                        <div class="van-cell__value">
                            <span>{{ product.ExpiredYearFormat }}</span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>代理商名称</span>
                        </div>
                        <div class="van-cell__value">
                            <span>{{ product.Vendor }}</span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>医疗器械注册证编号</span>
                        </div>
                        <div class="van-cell__value">
                            <span>{{ product.CertificateNumber }}</span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>维修单号</span>
                        </div>
                        <div class="van-cell__value">
                            <span></span>
                        </div>
                    </div>
                </div>
                <view class="divLine"></view>
            </div>
        </div>
        <van-panel title="维护信息">
            <div>
                <div>
                    <van-dropdown-menu>
                        <van-dropdown-item
                            :value="checkInStatusActiveValue"
                            :options="checkInStatusOption"
                            disabled
                            @change="onCheckInStatusChange"
                        />
                    </van-dropdown-menu>
                </div>
            </div>
        </van-panel>
        <mybr />
        <div class="confirmsignbtn">
            <van-button square size="normal" type="info" @click="productIn"
                >提交入库</van-button
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
            checkInStatusActiveValueStr: '维修入库',
            checkInStatusOption: [
                { text: '维修入库', value: 0 },
                { text: '归还入库', value: 1 },
            ],
            checkInStatusActiveValue: 0,
            snCode: '',
            product: {},
        }
    },
    //方法
    methods: {
        onCheckInStatusChange(event) {
            this.checkInStatusActiveValue = event.mp.detail
            this.checkInStatusActiveValueStr = this.checkInStatusOption[
                this.checkInStatusActiveValue
            ].text
            console.log(this.checkInStatusActiveValue)
            console.log(this.checkInStatusActiveValueStr)
        },
        productIn(event) {
            const successMessage = '已成功入库产品!'
            const errorMessage = '产品入库失败!'
            this.$http
                .post({
                    url:
                        '/Product/CocCheckIn?snCode=' +
                        this.product.UDISN +
                        '&departId=' +
                        this.$globalData.departId +
                        '&status=' +
                        this.checkInStatusActiveValueStr,
                })
                .then(res => {
                    if (res.code == 200) {
                        console.log('/Product/CocCheckIn response', res)
                        Dialog.alert({
                            title: '信息提示',
                            message: successMessage,
                        }).then(() => {
                            const url = '../a-cochome/main'
                            wx.navigateTo({ url: url })
                        })
                    } else {
                        const message = '入库操作失败'
                        Dialog.alert({
                            title: '信息提示',
                            message: errorMessage,
                        }).then(() => {
                            const url = '../a-cochome/main'
                            wx.navigateTo({ url: url })
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
        var snCode = this.$root.$mp.query.sncode
        this.snCode = snCode
        console.log('snCode:', this.snCode)
        //this.qrCode = 'SN00001001'
        console.log('globalData departId', this.$globalData.departId)
        this.$http
            .get({
                url: '/Product/GetBySN?snCode=' + this.snCode,
            })
            .then(res => {
                if (res.code == 200) {
                    console.log('/Product/GetBySN response', res)
                    this.product = res.data
                    if (this.product.CurrentStatus == '出库到COC维修') {
                        this.checkInStatusActiveValue = 0
                    } else {
                        this.checkInStatusActiveValue = 1
                    }
                } else {
                    const message = '产品获取信息失败'
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
<style scoped src="./a-cocproductin.css"></style>
