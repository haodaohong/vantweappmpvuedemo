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
                        :title="applyOrder.Contact.Name"
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
                                    <td>患者性别：{{ applyOrder.Contact.Sex }}</td>
                                    <td>
                                        出生日期：{{
                                            applyOrder.Contact.BirthDayFormat
                                        }}
                                    </td>
                                    <td>
                                        手机号码：{{
                                            applyOrder.Contact.PhoneText
                                        }}
                                    </td>
                                    <td>
                                        设备套数：{{
                                            applyOrder.ProductSetCount
                                        }} 套
                                    </td>
                                    <td>
                                        贴片套数：{{
                                            applyOrder.PasterSetCount
                                        }} 套
                                    </td>
                                    <td>
                                        预约日期：{{
                                            applyOrder.ApplyOrderDateTimeFormat
                                        }}
                                    </td>
                                    <td v-if="applyOrder.ShowLastDTP" style="color:red;">历史签约：{{ applyOrder.LastDTP.Name }}</td>
                                </tr>
                            </table>

                            <table
                                class="content"
                                v-show="applyOrder.Products && applyOrder.Products.length > 0"
                            >
                                <tr>
                                    <td>待维修产品</td>
                                </tr>
                                <tr
                                    v-for="(prod, ind) in applyOrder.Products"
                                    :key="ind"
                                >
                                    <td>
                                        产品名称：{{ prod.ProductName }}
                                    </td>
                                    <td>
                                        产品编号：{{
                                            prod.UDISN
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
                                class="confirmBooking"
                                @click="onConfirmWithVendor(applyOrder.Id)"
                                size="small"
                                type="info"
                                v-if="applyOrder.ShowSignWithVendorFooter"
                                >已与租赁商签约</van-button
                            >
                            <van-button
                                class="confirmBooking"
                                @click="
                                    onConfirmAppointment(
                                        applyOrder.Id,
                                        applyOrder.ProductSetCount,
                                        applyOrder.PasterSetCount,
                                        applyOrder.Contact.Id,
                                        applyOrder.DTP.Id
                                    )
                                "
                                size="small"
                                type="primary"
                                v-if="applyOrder.ShowConfirmApplyFooter"
                                >确认预约</van-button
                            >
                            <van-button
                                class="confirmBooking"
                                @click="onCancelAppointment(applyOrder.Id)"
                                size="small"
                                type="default"
                                v-if="applyOrder.ShowCancelApplyFooter"
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
                                    @change="onSignOrderTypeOptionChange"
                                />
                            </van-dropdown-menu>
                        </div>
                    </div>
                </div>
                <div v-for="signOrder in signOrders" :key="signOrder">
                    <van-panel
                        :title="signOrder.Contact.Name"
                        :status="signOrder.TitleStatus"
                        use-footer-slot
                    >
                        <div>
                            <table class="content">
                                <tr>
                                    <td>
                                        预约类型：<span
                                            class="font-color-red"
                                            >{{
                                                signOrder.ApplyOrder
                                                    .ApplyOrderTypeFormat
                                            }}</span
                                        >
                                    </td>
                                    <td>患者性别：{{ signOrder.Contact.Sex }}</td>
                                    <td>
                                        出生日期：{{
                                            signOrder.Contact.BirthDayFormat
                                        }}
                                    </td>
                                    <td>
                                        手机号码：{{
                                            signOrder.Contact.PhoneText
                                        }}
                                    </td>
                                    <td>
                                        设备套数：{{
                                            signOrder.ApplyOrder.ProductSetCount
                                        }} 套
                                    </td>
                                    <td>
                                        贴片套数：{{
                                            signOrder.ApplyOrder.PasterSetCount
                                        }} 套
                                    </td>
                                    <td v-if="signOrder.ShowSignDetail">
                                        签约药店: {{ signOrder.SignDTPName }}
                                    </td>
                                    <td v-if="signOrder.ShowLastDTP">
                                        历史签约: <span style="color:red;">{{ signOrder.LastDTP.Name }}</span>
                                    </td>
                                </tr>
                            </table>
                        </div>
                        <!--加个样式把按钮搞右边去-->
                        <view style="text-align: right;" slot="footer">
                            <van-button
                                @click="onSignContract(signOrder.Id)"
                                size="small"
                                type="primary"
                                v-if="signOrder.ShowSignFooter"
                                >提交使用协议</van-button
                            >
                            <van-button
                                @click="onProductBind(signOrder.id)"
                                size="small"
                                type="primary"
                                v-if="signOrder.ShowBindFooter"
                                >产品绑定</van-button
                            >
                            <van-button
                                @click="onDtpChange(signOrder.Id)"
                                size="small"
                                type="primary"
                                v-if="signOrder.ShowChangeFooter"
                                >提交变更药店协议</van-button
                            >
                        </view>
                    </van-panel>
                </div>
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
                                    <td>产品名称：{{ product.ProductName }}</td>
                                    <!-- <td>
                                        类别：{{
                                            product.ProductType.PartsName
                                        }}
                                    </td> -->
                                    <td>产品规格：{{ product.Specification }}</td>
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
                                @click="onUserReturnCheckOut(product.UDISN)"
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
                                    <td>产品名称：{{ product.ProductName }}</td>
                                    <td>产品编号：{{ product.UDISN }}</td>
                                    <td>产品规格：{{ product.Specification }}</td>
                                    <td>
                                        生产日期：{{
                                            product.ProductionDateFormat
                                        }}
                                    </td>
                                    <td>绑定患者：{{ product.ContactName }}</td>
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
                                @click="onProductChange(product)"
                                size="small"
                                type="primary"
                                >{{ product.TitleStatus }}</van-button
                            >
                        </view>
                        <view
                            style="text-align: right;"
                            slot="footer"
                            v-else-if="product.ShowChecInForRepairFooter"
                        >
                            <van-button
                                class="confirmBooking"
                                @click="onProductChange(product)"
                                size="small"
                                type="primary"
                                >{{ product.TitleStatus }}</van-button
                            >
                        </view>
                        <view style="text-align: right;" slot="footer" v-else>
                            <van-button
                                class="confirmBooking"
                                @click="
                                    onUserMaintenanceCheckOut(product.UDISN)
                                "
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
            refresh: false,
            applyOrderTypeOption: [
                { text: '所有申请', value: 0 },
                { text: '设备预约', value: 1 },
                { text: '购买贴片预约', value: 2 },
                { text: '产品维修预约', value: 3 },
            ],
            applyOrderTypeActiveValue: 0,
            applyOrderTypeActiveValueStr: '所有申请',
            signOrder: {
                DTPId: 0,
                ContactId: 0,
                ApplyOrderId: 0,
                PasterSetCount: 0,
                ProductSetCount: 0,
            },
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
            checkinProductSnCode: '',
            DTP: {},
        }
    },
    //方法
    methods: {
        onChangeTab(event) {
            console.log(event)
            var tabIndex = event.mp.detail['index']
            this.onLoadTabData(tabIndex)
        },
        onLoadTabData(tabIndex) {
            console.log('curr tab', tabIndex)
            this.onLoadDTP();
            var openId = this.$globalData.openId
            if (tabIndex == '0') {
                this.activeTab = 0
                this.applyOrders = []
                this.$http
                    .get({
                        url:
                            '/ApplyOrder/GetByFilterStatus?mpOpenId=' +
                            openId +
                            '&filterStatus=' +
                            this.applyOrderTypeActiveValueStr,
                    })
                    .then(res => {
                        console.log(
                                '/ApplyOrder/GetByFilterStatus?mpOpenId=' +
                            openId +
                            '&filterStatus=' +
                            this.applyOrderTypeActiveValueStr,
                                res
                            )
                        if (res.code == 200) {
                            this.applyOrders = res.data
                        }
                    })
            }
            if (tabIndex == '1') {
                this.activeTab = 1
                this.signOrders = []
                this.$http
                    .get({
                        url:
                            '/SignOrder/GetByFilterStatus?mpOpenId=' +
                            openId +
                            '&filterStatus=' +
                            this.signOrderTypeActiveValueStr,
                    })
                    .then(res => {
                        if (res.code == 200) {
                            this.signOrders = res.data
                            console.log(
                                '/SignOrder/GetByFilterStatus response',
                                res
                            )
                        }
                    })
            }
            if (tabIndex == '2') {
                this.activeTab = 2
                this.products = []
                this.$http
                    .get({
                        url:
                            '/Product/GetProductsByFilter?role=DTP&departId=' +
                            this.$globalData.departId +
                            '&statusFilter=' +
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
                this.activeTab = 3
                this.maintenanceProducts = []
                this.$http
                    .get({
                        url:
                            '/Product/GetMaintenanceProducts?dtpid=' +
                            this.DTP.id,
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
        //预约选项Filter
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
        //签约选项Filter
        onSignOrderTypeOptionChange(event) {
            this.signOrderTypeActiveValue = event.mp.detail
            this.signOrderTypeActiveValueStr = this.signOrderTypeOption[
                this.signOrderTypeActiveValue
            ].text
            console.log(this.signOrderTypeActiveValue)
            console.log(this.signOrderTypeActiveValueStr)
            var openId = this.activeUser.openId
            this.$http
                .get({
                    url:
                        '/SignOrder/GetByFilterStatus?mpOpenId=' +
                        openId +
                        '&filterStatus=' +
                        this.signOrderTypeActiveValueStr,
                })
                .then(res => {
                    if (res.code == 200) {
                        this.signOrders = res.data
                        console.log(
                            '/SignOrder/GetByFilterStatus response',
                            res
                        )
                    }
                })
        },
        //出入库选项Filter
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
                        '/Product/GetProductsByFilter?role=DTP&departId=' +
                        this.$globalData.departId +
                        '&statusFilter=' +
                        this.statusFilterActiveValueStr +
                        '&timeFilter=' +
                        this.timeFilterActiveValueStr,
                })
                .then(res => {
                    this.products = res.data
                    console.log('/Product/GetProductsByFilter response', res)
                })
        },
        //出入库时间选项Filter
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
                        '/Product/GetProductsByFilter?role=DTP&departId=' +
                        this.$globalData.departId +
                        '&statusFilter=' +
                        this.statusFilterActiveValueStr +
                        '&timeFilter=' +
                        this.timeFilterActiveValueStr,
                })
                .then(res => {
                    this.products = res.data
                    console.log('/Product/GetProductsByFilter response', res)
                })
        },
        //扫码入库产品
        scanProduct(event) {
            // 允许从相机和相册扫码
            var that = this
            wx.scanCode({
                scanType: ['qrCode', 'barCode', 'datamatrix', 'pdf417'],
                success(res) {
                    var qrCode = String(res.result)
                    console.log('qrcode is: ', qrCode)
                    that.$http
                        .get({
                            url: '/Product/GetByQRCode?qrCode=' + qrCode,
                        })
                        .then(res => {
                            console.log(
                                '/Product/GetByQRCode response data is',
                                res
                            )
                            if (res.code === 200) {
                                if (event.UDISN) {
                                    if (event.UDISN != res.data.UDISN) {
                                        const message =
                                            '待入库的产品' +
                                            event.UDISN +
                                            '和已扫描的产品' +
                                            res.data.UDISN +
                                            '不一致，请检查'
                                        Dialog.alert({
                                            title: '信息提示',
                                            message,
                                        })
                                        return
                                    }
                                }
                                if (qrCode) {
                                    console.log(qrCode)
                                    const url = '../a-dtpproductin/main?qrcode=' + qrCode
                                    console.log(url)
                                    wx.navigateTo({ url: url })
                                }
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
                        .get({
                            url:
                                '/Product/GetSnCodeFromQrCode?qrCode=' + qrCode,
                        })
                        .then(res => {
                            console.log(
                                '/Product/GetSnCodeFromQrCode response data is',
                                res
                            )
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
        //确认与租赁商签约
        onConfirmWithVendor(applyOrderId) {
            console.log(applyOrderId)
            this.$http
                .post({
                    url:
                        '/ApplyOrder/ConfirmWithVendor?applyOrderId=' +
                        applyOrderId,
                })
                .then(res => {
                    if (res != null && res.code == 200) {
                        console.log(
                            '/ApplyOrder/ConfirmWithVendor?applyOrderId=' +
                                applyOrderId +
                                ' response',
                            res
                        )
                        const message = '已确认与租赁商签约'

                        Dialog.alert({
                            title: '信息提示',
                            message,
                        }).then(() => {
                            var index = this.applyOrders.findIndex(
                                x => x.Id == applyOrderId
                            )
                            this.applyOrders[
                                index
                            ].ShowSignWithVendorFooter = false
                        })
                    } else {
                        const message = '确认与租赁商签约操作失败'

                        Dialog.alert({
                            title: '信息提示',
                            message,
                        })
                    }
                })
        },
        //确认预约
        onConfirmAppointment(
            applyOrderId,
            productSetCount,
            pasterSetCount,
            contactId,
            dtpId
        ) {
            console.log('applyOrderId:', applyOrderId)
            console.log('productSetCount:', productSetCount)
            console.log('pasterSetCount:', pasterSetCount)
            console.log('contactId:', contactId)
            console.log('dtpId:', dtpId)
            const confirmCancelAppointmentMessage = '是否确认该预约申请？'
            Dialog.confirm({
                title: '信息提示',
                message: confirmCancelAppointmentMessage,
            }).then(() => {
                // on confirm
                var that = this
                this.signOrder.DTPId = dtpId
                this.signOrder.ContactId = contactId
                this.signOrder.ApplyOrderId = applyOrderId
                this.signOrder.ProductSetCount = productSetCount
                this.signOrder.PasterSetCount = pasterSetCount
                console.log('SignOrder data:', this.signOrder)
                var index = this.applyOrders.findIndex(
                    x => x.Id == applyOrderId
                )
                var applyOrder = this.applyOrders[index]
                this.$http
                    .post({
                        url:
                            '/SignOrder/AddSignOrder?applyOrderId=' +
                            this.signOrder.ApplyOrderId +
                            '&productSetCount=' +
                            this.signOrder.ProductSetCount +
                            '&pasterSetCount=' +
                            this.signOrder.PasterSetCount +
                            '&contactId=' +
                            this.signOrder.ContactId +
                            '&dtpId=' +
                            this.signOrder.DTPId +
                            '&openId=' +
                            this.$globalData.openId,
                    })
                    .then(res => {
                        if (res != null && res.code == 200) {
                            console.log('/SignOrder/AddSignOrder response', res)
                            const message = '确认预约成功'
                            Dialog.alert({
                                title: '信息提示',
                                message,
                            }).then(() => {
                                applyOrder.TitleStatus = '已确认'
                                applyOrder.ShowConfirmApplyFooter = false
                                applyOrder.ShowCancelApplyFooter = false
                                applyOrder.ShowFooter =
                                    applyOrder.ShowSignWithVendorFooter ||
                                    applyOrder.ShowConfirmApplyFooter ||
                                    applyOrder.ShowCancelApplyFooter
                                that.rebind()
                            })
                        } else {
                            const message = '确认预约失败'
                            Dialog.alert({
                                title: '信息提示',
                                message,
                            })
                        }
                    })
            })
        },
        //取消预约
        onCancelAppointment(applyOrderId) {
            console.log(applyOrderId)
            var index = this.applyOrders.findIndex(x => x.Id == applyOrderId)
            var applyOrder = this.applyOrders[index]
            const confirmCancelAppointmentMessage = '是否确认取消该预约申请？'
            Dialog.confirm({
                title: '信息提示',
                message: confirmCancelAppointmentMessage,
            })
                .then(() => {
                    // on confirm
                    this.$http
                        .post({
                            url:
                                '/ApplyOrder/CancelApplyOrder?applyOrderId=' +
                                applyOrderId,
                        })
                        .then(res => {
                            if (res != null && res.code == 200) {
                                console.log(
                                    '/SignOrder/AddSignOrder response',
                                    res
                                )
                                const message = '取消预约成功'
                                Dialog.alert({
                                    title: '信息提示',
                                    message,
                                }).then(() => {
                                    applyOrder.TitleStatus = '已取消'
                                    applyOrder.ShowSignWithVendorFooter = false
                                    applyOrder.ShowConfirmApplyFooter = false
                                    applyOrder.ShowCancelApplyFooter = false
                                    applyOrder.ShowFooter =
                                        applyOrder.ShowSignWithVendorFooter ||
                                        applyOrder.ShowConfirmApplyFooter ||
                                        applyOrder.ShowCancelApplyFooter
                                    //this.applyOrders.splice(index, 1)
                                })
                            } else {
                                const message = '取消预约失败'

                                Dialog.alert({
                                    title: '信息提示',
                                    message,
                                })
                            }
                        })
                })
                .catch(() => {
                    // on cancel
                })
        },
        //确认预约后签约
        onSignContract(signOrderId) {
            console.log('signOrderId is:', signOrderId)
            const url = '../a-dtpsign/main?signOrderId=' + signOrderId
            wx.navigateTo({ url: url })
        },
        onProductBind(signOrderSmallId) {
            console.log('signOrderSmallId is:', signOrderSmallId)
            const url =
                '../a-dtpproductbind/main?signOrderSmallId=' + signOrderSmallId
            console.log(url)
            wx.navigateTo({ url: url })
        },
        //变更DTP
        onDtpChange(signOrderId) {
            console.log('signOrderId is:', signOrderId)
            const url = '../a-dtpchange/main?signOrderId=' + signOrderId
            wx.navigateTo({ url: url })
        },
        //用户归还后产品返厂
        onUserReturnCheckOut(productSNCode) {
            console.log('productSNCode is:', productSNCode)
            const url = '../a-dtpcheckout/main?snCode=' + productSNCode
            wx.navigateTo({ url: url })
        },
        rebind() {
            this.onLoadDTP()
            console.log('this globalData departId/activeTab', this.$globalData.departId+'/'+this.activeTab)
            this.activeUser.role = 'DTP'
            this.activeUser.departId = this.$globalData.departId
            this.activeUser.openId = this.$globalData.openId
            this.activeUser.unionId = this.$globalData.unionId
            var activeTabIndex = this.activeTab
            if (activeTabIndex) {
                this.activeTab = activeTabIndex
                this.onLoadTabData(activeTabIndex)
            } else {
                // this.activeTab = 0
                this.$http
                    .get({
                        url:
                            '/ApplyOrder/GetByFilterStatus?mpOpenId=' +
                            this.activeUser.openId +
                            '&filterStatus=' +
                            this.applyOrderTypeActiveValueStr,
                    })
                    .then(res => {
                        if (res.code == 200) {
                            this.applyOrders = res.data
                            console.log(
                                '/ApplyOrder/GetByFilterStatus response rebind',
                                res
                            )
                        }
                    })
            }
        },
        //用户维修归还后DTP员工操作更换产品
        onProductChange(product) {
            var oldProductid = product.id
            var oldSignOrderid = product.CurrentOrderId
            var SignOrderId = product.SignOrderId
            var IsSameDTP = product.IsSameDTP
            console.log('oldProductid is:', oldProductid)
            console.log('oldSignOrderid is:', oldSignOrderid)
            //如果是待维修入库，则显示扫描入库按钮，然后进行产品更换
            if (product.ShowChecInForRepairFooter) {
                this.scanProduct(product)
                return
            }
            if (IsSameDTP) {
                // 扫码获得待维修的产品的信息和传到后台的sncode比对，比对正确后方可进行更换，否则弹框报错
                wx.scanCode({
                    scanType: ['qrCode', 'barCode', 'datamatrix', 'pdf417'],
                    success(res) {
                        console.log('scanCode: ', res)
                        const url =
                            '../a-dtpproductchange/main?oldProductid=' +
                            oldProductid +
                            '&newSnCode=' +
                            res.result +
                            '&oldSignOrderid=' +
                            oldSignOrderid
                        console.log('dtpproductchange url: ', url)
                        wx.navigateTo({ url: url })
                    },
                })
            } else {
                const signurl = '../a-dtpsign/main?signOrderId=' + signOrderId
                wx.navigateTo({ url: signurl })
            }
        },
        //维修更换完后原产品进行出库到COC维修操作
        onUserMaintenanceCheckOut(productSNCode) {
            console.log('productSNCode is:', productSNCode)
            const url = '../a-dtpcheckout/main?snCode=' + productSNCode
            wx.navigateTo({ url: url })
        },
        onLoadDTP() {
            //DTP/GetByOpenId
            var that = this
            that.$http
                .get({
                    url: '/DTP/GetById?dtpId=' + that.$globalData.departId,
                })
                .then(res => {
                    console.log('/DTP/GetById response', res)
                    if (res.code === 200) {
                        that.DTP = res.data
                        wx.setNavigationBarTitle({
                            title: res.data.Name,
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
    onShow: function() {
        console.log('refresh:', this.$globalData.refresh)
        if (this.$globalData.refresh) {
            console.log('refresh this.rebind();')
            this.onLoadTabData(this.activeTab)
            this.$globalData.refresh = false
        }
    },
    onLoad: function(options) {
        var that = this
        that.$globalData.refresh = false
        console.log('departId',that.$globalData.departId)
        console.log('openId',that.$globalData.openId)
        var userOpenId = that.$globalData.openId
        if (!userOpenId) {
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
                                that.activeUser.openId = that.$globalData.openId
                                that.onLoadTabData(this.activeTab)
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
             that.onLoadTabData(this.activeTab)
        }
    },

    //生命周期(mounted)
    mounted() {},
}
</script>

<!-- 样式代码片段  scoped -->
<style scoped src="./a-dtphome.css"></style>
