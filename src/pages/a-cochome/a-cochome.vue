<!--
作者:chenghao
功能:vue页
-->

<!-- html代码片段 -->
<template>
    <!--
  特别提示:
  van-tabs组件的:active="active"不是双向数据绑定,
  所以tab切换后active值已经不是最新的啦!如果需要保持最新,需要在事件change中主动赋值一下

  collapse也有类似情况
  -->

    <div>
        <div class="flex-container">
            <div>
                <van-icon size="80px" name="qr" @click="scanProduct" />
                <div>
                    <div class="divInlineBlock">
                        <van-icon size="17px" name="down" />
                    </div>
                    <div class="divInlineBlock">
                        <h5>扫码入库</h5>
                    </div>
                </div>
            </div>
            <div>
                <van-icon size="80px" name="qr" @click="scanSearchProduct" />
                <div>
                    <div class="divInlineBlock">
                        <van-icon size="17px" name="search" />
                    </div>
                    <div class="divInlineBlock">
                        <h5>扫码查询</h5>
                    </div>
                </div>
            </div>
        </div>

        <div>
            <div>
                <div class="flex-width">
                    <div class=".white-padding">
                        <span>库存操作:</span>
                    </div>
                    <div class="flex-1">
                        <van-dropdown-menu>
                            <van-dropdown-item
                                :value="statusFilterValue"
                                :options="statusFilterOption"
                                @change="onstatusFilterChange"
                            />
                        </van-dropdown-menu>
                    </div>
                </div>
            </div>
            <div>
                <div class="flex-width">
                    <div class=".white-padding">
                        <span>操作日期:</span>
                    </div>
                    <div class="flex-1">
                        <van-dropdown-menu>
                            <van-dropdown-item
                                :value="timeFilterValue"
                                :options="timeFilterOption"
                                @change="onTimeFilterChange"
                            />
                        </van-dropdown-menu>
                    </div>
                </div>
            </div>
            <div v-for="product in products" :key="product">
                <van-panel
                    title="产品编号"
                    :desc="product.UDISN"
                    :status="product.TitleStatus"
                    use-footer-slot
                >
                    <div>
                        <table class="content">
                            <tr>
                                <td>名称：{{ product.ProductName }}</td>
                                <td>
                                    类别：{{ product.ProductType.PartsName }}
                                </td>
                                <td>规格：{{ product.Specification }}</td>
                                <td>
                                    生产日期：{{ product.ProductionDateFormat }}
                                </td>
                                <td v-if="product.ShowCOCCheckOutFooter">
                                    入库日期：{{ product.COCCheckInDateFormat }}
                                </td>
                                <td v-else>
                                    出库日期：{{
                                        product.COCCheckOutDateFormat
                                    }}
                                </td>
                                <td v-show="product.ShowCOCCheckOutFooter">
                                    入库类型：{{ product.CurrentStatus }}
                                </td>
                            </tr>
                        </table>
                    </div>
                    <view
                        style="text-align: right;"
                        slot="footer"
                        v-show="product.ShowCOCCheckOutFooter"
                    >
                        <van-button
                            class="confirmBooking"
                            @click="onCocOut(product.UDISN)"
                            size="small"
                            type="info"
                            >产品出库</van-button
                        >
                    </view>
                </van-panel>
            </div>
        </div>
        <mybr />
        <mybr />
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
            statusFilterActiveValue: 0,
            statusFilterActiveValueStr: '维修入库',
            statusFilterValue: 0,
            statusFilterOption: [
                { text: '维修入库', value: 0 },
                { text: '归还入库', value: 1 },
                { text: '出库', value: 2 },
            ],
            timeFilterActiveValue: 0,
            timeFilterActiveValueStr: '近三天',
            timeFilterValue: 0,
            timeFilterOption: [
                { text: '近三天', value: 0 },
                { text: '近一周', value: 1 },
                { text: '近一个月', value: 2 },
            ],
            products: [],
            checkinProductSnCode: 0,
            qrCode: '',
        }
    },
    //方法
    methods: {
        scanProduct(event) {
            // 允许从相机和相册扫码
            var that = this
            wx.scanCode({
                scanType: ['qrCode', 'barCode', 'datamatrix', 'pdf417'],
                success(res) {
                    console.log('qrcode is: ', res)
                    that.qrCode = res.result
                    that.$http
                        .get({
                            url:
                                '/Product/GetProductFromCOCScanQrCode?qrcode=' +
                                that.qrCode,
                        })
                        .then(res => {
                            console.log(
                                '/Product/GetProductFromCOCScanQrCode response data is',
                                res
                            )
                            if (res.code === 200) {
                                that.checkinProductSnCode = res.data.UDISN
                                const url =
                                    '../a-cocproductin/main?sncode=' +
                                    that.checkinProductSnCode
                                console.log(url)
                                wx.navigateTo({ url: url })
                            } else {
                                const message = '产品获取信息失败'
                                Dialog.alert({
                                    title: '信息提示',
                                    message: res.message,
                                })
                            }
                        })
                },
            })
        },
        scanSearchProduct(event) {
            // 允许从相机和相册扫码
            var that = this
            wx.scanCode({
                scanType: ['qrCode', 'barCode', 'datamatrix', 'pdf417'],
                success(res) {
                    console.log('qrcode is: ', res.result)
                    var qrCode = res.result
                    that.$http
                        .get({url:'/Product/GetSnCodeFromQrCode?qrCode=' + qrCode})
                        .then(res => {
                            console.log('/Product/GetSnCodeFromQrCode response data is',res);
                            if (res.code === 200) {
                                that.checkinProductSnCode = res.data
                                const url =
                                    '../a-cocproductsearch/main?sncode=' +
                                    that.checkinProductSnCode
                                console.log(url)
                                wx.navigateTo({ url: url })
                            } else {
                                const message = '产品获取信息失败'
                                Dialog.alert({
                                    title: '信息提示',
                                    message,
                                })
                            }
                        })
                },
            })
        },
        onstatusFilterChange(event) {
            this.statusFilterActiveValue = event.mp.detail
            this.statusFilterActiveValueStr = this.statusFilterOption[
                this.statusFilterActiveValue
            ].text
            console.log(this.statusFilterActiveValue)
            console.log(this.statusFilterActiveValueStr)
            this.$http
                .get({
                    url:
                        '/Product/GetProductsByFilter?role=COC&departId=' +
                        this.$globalData.departId +
                        '&statusFilter=' +
                        this.statusFilterActiveValueStr +
                        '&timeFilter=' +
                        this.timeFilterActiveValueStr,
                })
                .then(res => {
                    this.products = res.data
                })
        },
        onTimeFilterChange(event) {
            this.timeFilterActiveValue = event.mp.detail
            this.timeFilterActiveValueStr = this.timeFilterOption[
                this.timeFilterActiveValue
            ].text
            console.log(this.timeFilterActiveValue)
            console.log(this.timeFilterActiveValueStr)
            this.$http
                .get({
                    url:
                        '/Product/GetProductsByFilter?role=COC&departId=' +
                        this.$globalData.departId +
                        '&statusFilter=' +
                        this.statusFilterActiveValueStr +
                        '&timeFilter=' +
                        this.timeFilterActiveValueStr,
                })
                .then(res => {
                    this.products = res.data
                })
        },
        onCocOut(snCode) {
            //console.log('coc out button data', event)
            console.log('snCode', snCode)
            const url = '../a-cocout/main?snCode=' + snCode
            wx.navigateTo({ url: url })
        },
    },
    //计算属性
    computed: {
        //name() {
        //代码搞这里
        //return this.data;
        //}
    },
    onLoad: function(options) {
        console.log('departId is:', this.$globalData.departId)
        this.products = []
        var userOpenId = this.$globalData.openId
        if (!userOpenId) {
            var that = this
            wx.login({
                success: res => {
                    // 调用接口获取openid
                    console.log('wx login result', res)
                    // 这里可以把code传给后台，后台用此获取openid及session_key
                    that.$http
                        .get({
                            url: '/Users/GetBySessionCode?code=' + res.code,
                        })
                        .then(res => {
                            console.log('/Users/GetBySessionCode response', res)
                            var user = res.data
                            if (res.code === 200) {
                                that.$globalData.departId = user.DepartId
                                that.$globalData.openId = user.MPOpenId
                                that.$globalData.unionId = user.UnionId
                                if (user.Role == 'DTP') {
                                    const url = '../a-dtphome/main'
                                    //wx.navigateTo({ url: url })
                                } else if (user.Role == 'COC') {
                                    const url = '../a-cochome/main'
                                    //wx.navigateTo({ url: url })
                                }
                            } else {
                                const url = '../a-registeruser/main'
                                //wx.navigateTo({ url: url })
                            }
                        })
                },
            })
        } else {
            this.$http
                .get({
                    url:
                        '/Product/GetProductsByFilter?role=COC&departId=' +
                        this.$globalData.departId +
                        '&statusFilter=' +
                        this.statusFilterActiveValueStr +
                        '&timeFilter=' +
                        this.timeFilterActiveValueStr,
                })
                .then(res => {
                    this.products = res.data
                    console('GetProductsByFilter', res)
                })
        }
    },
    //生命周期(mounted)
    mounted() {},
}
</script>

<!-- 样式代码片段  scoped -->
<style scoped src="./a-cochome.css"></style>
