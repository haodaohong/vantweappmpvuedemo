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
        <div class="searchbar" style="display:none;">
            <van-search
                :value="value2"
                placeholder="请输入用户姓名、手机号进行搜索"
                use-action-slot
                @change="onchange2"
                @search="onSearch2"
            >
                <view slot="action" @tap="userSearch">搜索</view>
            </van-search>
        </div>

        <van-tabs :active="activeTab" @change="onChangeTab">
            <van-tab title="预约申请">
                <div>
                    <div class="flex-width">
                        <div class=".white-padding">
                            <span>预约类型:</span>
                        </div>
                        <div class="flex-1">
                            <van-dropdown-menu>
                                <van-dropdown-item
                                    :value="applyOrderTypeActiveValue"
                                    :options="applyOrderTypeOption"
                                    @change="onApplyOrderTypeOptionChange"
                                />
                            </van-dropdown-menu>
                        </div>
                    </div>
                </div>
                <div v-for="applyOrder in applyOrders" :key="applyOrder">
                    <van-panel
                        :title="applyOrder.ApplyOrderContactName"
                        :status="applyOrder.TitleStatus"
                        use-footer-slot
                    >
                        <div>
                            <table class="content">
                                <tr>
                                    <td>
                                        预约类型：<span
                                            class="font-color-red"
                                            >{{
                                                applyOrder.ApplyOrderTypeFormat
                                            }}</span
                                        >
                                    </td>
                                    <td>
                                        性别：{{
                                            applyOrder.ApplyOrderTypeFormat
                                        }}
                                    </td>
                                    <td>
                                        出生日期：{{
                                            applyOrder.ApplyOrderContactBirthday
                                        }}
                                    </td>
                                    <td>
                                        手机号码：{{
                                            applyOrder.ApplyOrderContactPhoneText
                                        }}
                                    </td>
                                    <td>
                                        预约日期：{{
                                            applyOrder.ApplyOrderDateTimeFormat
                                        }}
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <view
                            style="text-align: right;"
                            slot="footer"
                            v-show="applyOrder.ShowFooter"
                        >
                            <van-button
                                class="confirmRental"
                                @click="confirmRental"
                                size="small"
                                type="info"
                                v-show="applyOrder.ShowSignWithVendorFooter"
                                >已与租赁商签约</van-button
                            >
                            <van-button
                                class="confirmBooking"
                                @click="onConfirmBooking"
                                size="small"
                                type="primary"
                                v-show="applyOrder.ShowConfirmApplyFooter"
                                >确认预约</van-button
                            >
                            <van-button
                                class="confirmBooking"
                                @click="onCancelBooking"
                                size="small"
                                type="default"
                                v-show="applyOrder.ShowCancelApplyFooter"
                                >取消预约</van-button
                            >
                        </view>
                    </van-panel>
                </div>
            </van-tab>
            <van-tab title="签约绑定">
                <div>
                    <div class="flex-width">
                        <div class=".white-padding">
                            <span>签约类型:</span>
                        </div>
                        <div class="flex-1">
                            <van-dropdown-menu>
                                <van-dropdown-item
                                    :value="signOrderTypeActiveValue"
                                    :options="signOrderTypeOption"
                                />
                            </van-dropdown-menu>
                        </div>
                    </div>
                </div>
                <van-panel title="李斌" status="待签约" use-footer-slot>
                    <div>
                        <table class="content">
                            <tr>
                                <td>
                                    预约类型：<span class="font-color-red"
                                        >首次购买</span
                                    >
                                </td>
                                <td>性别：男</td>
                                <td>出生日期：1960年12月9日</td>
                                <td>手机号码：199xxxxxxxx</td>
                                <td>产品名称：XXX仪器</td>
                                <td>预约数量：1</td>
                                <td>预约日期：2019年12月30日 10:00-11:00</td>
                            </tr>
                        </table>
                    </div>
                    <!--加个样式把按钮搞右边去-->
                    <view style="text-align: right;" slot="footer">
                        <van-button
                            @click="onConfirmSign"
                            size="small"
                            type="primary"
                            >提交使用协议</van-button
                        >
                    </view>
                </van-panel>

                <van-panel title="王武" status="已签约" use-footer-slot>
                    <div>
                        <table class="content">
                            <tr>
                                <td>
                                    预约类型：<span class="font-color-red"
                                        >首次购买</span
                                    >
                                </td>
                                <td>性别：男</td>
                                <td>出生日期：1960年12月9日</td>
                                <td>手机号码：199xxxxxxxx</td>
                                <td>产品名称：XXX仪器</td>
                                <td>预约数量：1</td>
                                <td>预约日期：2019年12月30日 10:00-11:00</td>
                                <td>已签约DTP：XXXDTP</td>
                            </tr>
                        </table>
                    </div>
                    <view style="text-align: right;" slot="footer">
                        <van-button
                            @click="onRentOut"
                            size="small"
                            type="primary"
                            >销售出库</van-button
                        >
                    </view>
                </van-panel>
                <van-panel title="李斌" status="待签约" use-footer-slot>
                    <div>
                        <table class="content">
                            <tr>
                                <td>
                                    预约类型：<span class="font-color-red"
                                        >购买贴片</span
                                    >
                                </td>
                                <td>性别：男</td>
                                <td>出生日期：1960年12月9日</td>
                                <td>手机号码：199xxxxxxxx</td>
                                <td>预约日期：2019年12月30日 10:00-11:00</td>
                            </tr>
                        </table>
                    </div>
                    <!--加个样式把按钮搞右边去-->
                    <view style="text-align: right;" slot="footer">
                        <van-button
                            @click="onDtpChange"
                            size="small"
                            type="primary"
                            >DTP变更</van-button
                        >
                    </view>
                </van-panel>
            </van-tab>
            <van-tab title="出入库管理">
                <div>
                    <div class="flex-width">
                        <div class=".white-padding">
                            <span>库存操作:</span>
                        </div>
                        <div class="flex-1">
                            <van-dropdown-menu>
                                <van-dropdown-item
                                    :value="statusFilterActiveValue"
                                    :options="statusFilterOption"
                                    @change="onStatusFilterOptionChange"
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
                                    :value="timeFilterActiveValue"
                                    :options="timeFilterOption"
                                    @change="onTimeFilterOptionChange"
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
                                    <td>类别：{{ product.ProductCategory }}</td>
                                    <td>规格：{{ product.Specification }}</td>
                                    <td>
                                        生产日期：{{
                                            product.ProductionDateFormat
                                        }}
                                    </td>
                                    <td v-if="product.ShowCheckInDateTitle">
                                        入库日期：{{
                                            product.DTPCheckInDateFormat
                                        }}
                                    </td>
                                    <td v-else>
                                        出库日期：{{
                                            product.DTPCheckOutDateFormat
                                        }}
                                    </td>
                                    <td v-if="product.ShowCheckInDateTitle">
                                        入库类型：{{ product.CurrentStatus }}
                                    </td>
                                    <td v-else>
                                        出库类型：{{ product.CurrentStatus }}
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <view
                            style="text-align: right;"
                            slot="footer"
                            v-show="product.ShowReturnFooter"
                        >
                            <van-button
                                class="confirmBooking"
                                @click="onCocOut(product.UDISN)"
                                size="small"
                                type="info"
                                >产品返厂</van-button
                            >
                        </view>
                    </van-panel>
                </div>
            </van-tab>
            <van-tab title="维修管理">
                <div v-for="product in maintenanceProducts" :key="product">
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
                                    <td>类别：{{ product.ProductCategory }}</td>
                                    <td>规格：{{ product.Specification }}</td>
                                    <td>
                                        生产日期：{{
                                            product.ProductionDateFormat
                                        }}
                                    </td>
                                    <td>绑定用户：{{ product.ContactName }}</td>
                                    <td>维修单号：R1XXXXX</td>
                                </tr>
                            </table>
                        </div>
                        <view
                            style="text-align: right;"
                            slot="footer"
                            v-if="product.ShowChangeProductFooter"
                        >
                            <van-button
                                class="confirmBooking"
                                @click="onProductChange"
                                size="small"
                                type="primary"
                                >产品更换</van-button
                            >
                        </view>
                        <view style="text-align: right;" slot="footer" v-else>
                            <van-button
                                class="confirmBooking"
                                @click="onDtpOut"
                                size="small"
                                type="primary"
                                >产品出库</van-button
                            >
                        </view>
                    </van-panel>
                </div>
            </van-tab>
        </van-tabs>
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
            activeUser: { role: '', departId: '', openId: '', unionId: '' },
            //从0开始的
            activeTab: 0,

            applyOrderTypeOption: [
                { text: '所有申请', value: 0 },
                { text: '首次购买', value: 1 },
                { text: '购买贴片', value: 2 },
                { text: '产品维修', value: 3 },
            ],
            applyOrderTypeActiveValue: 0,
            applyOrderTypeActiveValueStr: '所有申请',

            signOrderTypeOption: [
                { text: '所有类型', value: 0 },
                { text: '已签约', value: 1 },
                { text: '待签约', value: 2 },
                { text: '待变更', value: 3 },
            ],
            signOrderTypeActiveValue: 0,
            signOrderTypeActiveValueStr: '所有类型',

            statusFilterOption: [
                { text: '入库', value: 0 },
                { text: '出库', value: 1 },
            ],
            statusFilterActiveValue: 0,
            statusFilterActiveValueStr: '入库',

            timeFilterOption: [
                { text: '近三天', value: 0 },
                { text: '近一周', value: 1 },
                { text: '近一个月', value: 2 },
            ],
            timeFilterActiveValue: 0,
            timeFilterActiveValueStr: '近三天',

            applyOrders: [],
            signOrders: [],
            products: [],
            maintenanceProducts: [],
        }
    },
    //方法
    methods: {
        onChangeTab(event) {
            console.log(event)
            var tabIndex = event.mp.detail['index']
            if (tabIndex == '0') {
                var openId = this.activeUser.openId
                this.$http
                    .get({
                        url:
                            '/ApplyOrder/GetByFilterStatus?mpOpenId=' +
                            openId +
                            '&filterStatus=' +
                            this.applyOrderTypeActiveValueStr,
                    })
                    .then(res => {
                        if (res.code == 200) {
                            this.applyOrders = res.data
                            console.log(
                                '/ApplyOrder/GetByFilterStatus response',
                                res
                            )
                        }
                    })
            }
            if (tabIndex == '1') {
            }
            if (tabIndex == '2') {
                this.$http
                    .get({
                        url:
                            '/Product/GetProductsByFilter?role=DTP&statusFilter=' +
                            this.statusFilterActiveValueStr +
                            '&timeFilter=' +
                            this.timeFilterActiveValueStr,
                    })
                    .then(res => {
                        this.products = res.data
                        console.log(
                            '/Product/GetProductsByFilter response',
                            res
                        )
                    })
            }
            if (tabIndex == '3') {
                this.$http
                    .get({
                        url: '/Product/GetMaintenanceProducts',
                    })
                    .then(res => {
                        this.maintenanceProducts = res.data
                        console.log(
                            '/Product/GetMaintenanceProducts response',
                            res
                        )
                    })
            }
        },
        onApplyOrderTypeOptionChange(event) {
            this.applyOrderTypeActiveValue = event.mp.detail
            this.applyOrderTypeActiveValueStr = this.applyOrderTypeOption[
                this.applyOrderTypeActiveValue
            ].text
            console.log(this.applyOrderTypeActiveValue)
            console.log(this.applyOrderTypeActiveValueStr)
            var openId = this.activeUser.openId
            this.$http
                .get({
                    url:
                        '/ApplyOrder/GetByFilterStatus?mpOpenId=' +
                        openId +
                        '&filterStatus=' +
                        this.applyOrderTypeActiveValueStr,
                })
                .then(res => {
                    if (res.code == 200) {
                        this.applyOrders = res.data
                        console.log(
                            '/ApplyOrder/GetByFilterStatus response',
                            res
                        )
                    }
                })
        },
        onSignOrderTypeOptionChange(event) {
            this.signOrderTypeActiveValue = event.mp.detail
            this.signOrderTypeActiveValueStr = this.signOrderTypeOption[
                this.signOrderTypeActiveValue
            ].text
            console.log(this.signOrderTypeActiveValue)
            console.log(this.signOrderTypeActiveValueStr)
            // this.$http
            //     .get({
            //         url:
            //             '/Product/GetProductsByFilter?role=COC&statusFilter=' +
            //             this.statusFilterActiveValueStr +
            //             '&timeFilter=' +
            //             this.timeFilterActiveValueStr,
            //     })
            //     .then(res => {
            //         this.products = res.data
            //     })
        },
        onStatusFilterOptionChange(event) {
            this.statusFilterActiveValue = event.mp.detail
            this.statusFilterActiveValueStr = this.statusFilterOption[
                this.statusFilterActiveValue
            ].text
            console.log(this.statusFilterActiveValue)
            console.log(this.statusFilterActiveValueStr)
            this.$http
                .get({
                    url:
                        '/Product/GetProductsByFilter?role=DTP&statusFilter=' +
                        this.statusFilterActiveValueStr +
                        '&timeFilter=' +
                        this.timeFilterActiveValueStr,
                })
                .then(res => {
                    this.products = res.data
                    console.log('/Product/GetProductsByFilter response', res)
                })
        },
        onTimeFilterOptionChange(event) {
            this.timeFilterActiveValue = event.mp.detail
            this.timeFilterActiveValueStr = this.timeFilterOption[
                this.timeFilterActiveValue
            ].text
            console.log(this.timeFilterActiveValue)
            console.log(this.timeFilterActiveValueStr)
            this.$http
                .get({
                    url:
                        '/Product/GetProductsByFilter?role=DTP&statusFilter=' +
                        this.statusFilterActiveValueStr +
                        '&timeFilter=' +
                        this.timeFilterActiveValueStr,
                })
                .then(res => {
                    this.products = res.data
                    console.log('/Product/GetProductsByFilter response', res)
                })
        },
        scanProduct(event) {
            // 允许从相机和相册扫码
            wx.scanCode({
                scanType: ['qrCode', 'barCode', 'datamatrix', 'pdf417'],
                success(res) {
                    console.log('all: ', res)
                    const url = '../a-dtpproductin/main?qrcode=' + res.result
                    wx.navigateTo({ url: url })
                },
            })
        },
        scanSearchProduct(event) {
            const url = '../a-dtpproductsearch/main'
            wx.navigateTo({ url: url })
        },
        onCancelBooking(event) {
            const message = '已取消此预约申请，并通知相关人员！'

            Dialog.alert({
                title: '信息提示',
                message,
            })
        },
        onConfirmChangeDTP(event) {
            const message = '已确认此DTP变更预约申请，并通知相关人员！'

            Dialog.alert({
                title: '信息提示',
                message,
            })
        },
        onCancelChangeDTP(event) {
            const message = '已取消此DTP变更申请，并通知相关人员！'

            Dialog.alert({
                title: '信息提示',
                message,
            })
        },
        onChangeSign(event) {
            const message = '暂未完成此功能设计；预期结果是跳转至合约变更界面'

            Dialog.alert({
                title: '信息提示',
                message,
            })
        },
        onCancelSign(event) {
            const message = '已取消此合约，并已通知相关用户！'

            Dialog.alert({
                title: '信息提示',
                message,
            })
        },
        onDtpChange(event) {
            const url = '../a-dtpchange/main'
            wx.navigateTo({ url: url })
        },
        onConfirmSign(event) {
            const url = '../a-dtpsign/main'
            wx.navigateTo({ url: url })
        },
        onRentOut(event) {
            const url = '../a-dtprentout/main'
            wx.navigateTo({ url: url })
        },
        onDtpOut(event) {
            const url = '../a-dtpout/main'
            wx.navigateTo({ url: url })
        },
        onProductChange(event) {
            const url = '../a-dtpproductchange/main'
            wx.navigateTo({ url: url })
        },
        onConfirmBooking(event) {
            const message = '预约已确认，并已通知相关用户！'

            Dialog.alert({
                title: '信息提示',
                message,
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
    onLoad: function(options) {
        // wx.login({
        //     success: res => {
        //         // 调用接口获取openid
        //         console.log('login result', res)
        //         // 这里可以把code传给后台，后台用此获取openid及session_key
        //         that.$http
        //             .get({
        //                 url: '/Users/GetBySessionCode?code=' + res.code,
        //             })
        //             .then(res => {
        //                 console.log('/Users/GetBySessionCode response', res)
        //                 var user = res.data
        //                 var code = res.code
        //                 if (code === 200) {
        //                     if (user.Role == 'DTP') {
        //                         const url = '../a-dtphome/main'
        //                         that.$globalData.departId = user.DepartId
        //                         console.log('url', user.Role + url)
        //                         wx.navigateTo({ url: url })
        //                     } else if (user.Role == 'COC') {
        //                         const url = '../a-cochome/main'
        //                         that.$globalData.departId = user.DepartId
        //                         wx.navigateTo({ url: url })
        //                         console.log('url', user.Role + url)
        //                     }
        //                 } else {
        //                     that.isShowRegister = true
        //                     that.isShowLoading = false
        //                     console.log('未绑定过')
        //                 }
        //             })
        //     },
        // })
    },
    //生命周期(mounted)
    mounted() {
        this.activeUser.role = 'DTP'
        this.activeUser.departId = this.$globalData.departId
        this.activeUser.openId = this.$globalData.openId
        this.activeUser.unionId = this.$globalData.unionId
        console.log('active user data:', this.activeUser)
        var openId = this.activeUser.openId
        this.$http
            .get({
                url:
                    '/ApplyOrder/GetByFilterStatus?mpOpenId=' +
                    openId +
                    '&filterStatus=' +
                    this.applyOrderTypeActiveValueStr,
            })
            .then(res => {
                if (res.code == 200) {
                    this.applyOrders = res.data
                    console.log('/ApplyOrder/GetByFilterStatus response', res)
                }
            })
    },
}
</script>

<!-- 样式代码片段  scoped -->
<style scoped src="./a-dtphome.css"></style>
