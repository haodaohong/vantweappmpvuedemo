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

        <van-tabs :active="activeTab" @change="onChangeTab">
            <van-tab title="待入库"  >
            </van-tab>
            <van-tab title="待出库"  >
            </van-tab>
            <van-tab title="已出库" >
            </van-tab>
        </van-tabs>
        <div> 
            <div v-show="false">
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
            <div v-show="showtimeFilterOption">
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
                                <td>
                                    当前状态：{{ product.CurrentStatus }}
                                </td>
                                <!-- <td v-if="product.ShowCOCCheckOutFooter">
                                    入库日期：{{ product.COCCheckInDateFormat }}
                                </td>
                                <td v-else>
                                    出库日期：{{
                                        product.COCCheckOutDateFormat
                                    }}
                                </td> -->
                                <!-- <td v-show="product.ShowCOCCheckOutFooter">
                                    入库类型：{{ product.CurrentStatus }}
                                </td> -->
                            </tr>
                        </table>
                    </div>
                    <view
                        style="text-align: right;"
                        slot="footer"
                        v-show="product.ShowCOCCheckInFooter"
                    >
                        <van-button
                            class="confirmBooking"
                            @click="scanProduct"
                            size="small"
                            type="info"
                            >扫码入库</van-button
                        >
                    </view>
                    <view
                        style="text-align: right;"
                        slot="footer"
                        v-show="product.ShowCOCCheckOutFooter"
                    >
                        <van-button
                            class="confirmBooking"
                            @click="scanProduct"
                            size="small"
                            type="info"
                            >完成出库</van-button
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
            statusFilterActiveValueStr: '待入库',
            statusFilterValue: 0,
            statusFilterOption: [
                { text: '待入库', value: 0 },
                { text: '待出库', value: 1 },
                { text: '已出库', value: 2 },
            ],
            timeFilterActiveValue: 0,
            timeFilterActiveValueStr: '近三天',
            timeFilterValue: 0,
            showtimeFilterOption: false,
            timeFilterOption: [
                { text: '近三天', value: 0 },
                { text: '近一周', value: 1 },
                { text: '近一个月', value: 2 },
            ],
            products: [],
            checkinProductSnCode: 0,
            qrCode: '',
            CheckoutCount: 0,
            CheckinCount: 0,
            activeTab: 0,
            firstTimeRun: true
        }
    },
    //方法
    methods: {
        onChangeTab(event) {
            console.log(event)
            var tabIndex = event.mp.detail['index']
            this.showtimeFilterOption = false; 
            if(tabIndex ===2){
                this.showtimeFilterOption = true; 
            }
            this.activeTab = tabIndex;
            this.onLoadTabData(tabIndex)
        },
        onLoadTabData(tabIndex) {
            console.log('curr tab', tabIndex)
            this.statusFilterActiveValueStr = this.statusFilterOption[tabIndex].text
            this.LoadProducts();
        },
        scanProduct(event) {
            // 允许从相机和相册扫码
            var that = this
            wx.scanCode({
                scanType: ['qrCode', 'barCode', 'datamatrix', 'pdf417'],
                success(res) {
                    console.log('qrcode is: ', res)
                    that.qrCode = res.result
                    that.$http
                        .get({url:'/Product/GetByQRCode?qrCode=' + that.qrCode})
                        .then(res => {
                            console.log('/Product/GetByQRCode response data is',res);
                            if (res.code === 200) {
                                if(res.data.ShowCOCCheckInFooter)
                                {
                                    that.onCocIn('', that.qrCode);
                                }
                                else if(res.data.ShowCOCCheckOutFooter)
                                {
                                    that.onCocOut(res.data.UDISN);
                                }
                                else{
                                    const message = '扫描产品(SN:'+res.data.UDISN+')状态是'+ res.data.CurrentStatus +'，不可操作'
                                    Dialog.alert({
                                        title: '信息提示',
                                        message,
                                    })
                                }
                            } else {
                                const message = '产品获取信息失败:' + that.qrCode
                                Dialog.alert({
                                    title: '信息提示',
                                    message,
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
                    console.log("GetProductsByFilter", res);
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
        LoadProducts(){
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
                    console.log("GetProductsByFilter", res);
                    this.products = res.data;
                    if(this.activeTab === 0){
                        this.CheckinCount = res.data.length;
                    }else if(this.activeTab === 1){
                        this.CheckoutCount = res.data.length;
                    }
                    console.log('this.CheckoutCount ',this.activeTab + '|' + this.CheckoutCount );
                    // if(firstTimeRun){
                    //     this.onLoadTabData(1);
                    // }
                })
        },
        onCocIn(snCode, qrcode){
            console.log("onCocIn snCode/qrcode", snCode + '/' + qrcode)
            var that = this;
            that.$http.get({
                            url:
                                '/Product/GetProductFromCOCScanQrCode?qrcode=' + qrcode + '&snCode=' + snCode,
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
        }
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
        if(this.$globalData.refresh)
        {
            console.log('LoadProducts();')
            this.LoadProducts();
            this.$globalData.refresh = false;
        }
    },
    onLoad: function(options) {
        var that = this
        console.log('departId is:', this.$globalData.departId)
        this.products = []
        var userOpenId = this.$globalData.openId
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
            that.LoadProducts();
        }
    },
    //生命周期(mounted)
    mounted() {},
}
</script>

<!-- 样式代码片段  scoped -->
<style scoped src="./a-cochome.css"></style>
