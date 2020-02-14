<!-- html代码片段 -->
<template>
    <!--
  这是产品出库页面
  特别提示:
  van-tabs组件的:active="active"不是双向数据绑定,
  所以tab切换后active值已经不是最新的啦!如果需要保持最新,需要在事件change中主动赋值一下

  collapse也有类似情况
  -->
    <div v-if="showBind">
        <div class="basicinfo">
            <div>
                <h2 class="van-doc-demo-block__title">第二步-添加产品</h2>
            </div>
            <div v-for="product in products" :key="product">
                <van-panel
                    title="产品编号"
                    :desc="product.UDISN"
                    use-footer-slot
                >
                    <div>
                        <div class="van-cell">
                            <div class="van-cell__title">
                                <span>名称：{{ product.ProductName }}</span>
                            </div>
                            <div class="van-cell__title">
                                <span
                                    >类型：{{
                                        product.ProductType.PartsName
                                    }}</span
                                >
                            </div>
                        </div>
                        <div class="van-cell">
                            <div class="van-cell__title">
                                <span>规格：{{ product.Specification }}</span>
                            </div>
                            <div class="van-cell__title">
                                <span
                                    >生产日期：{{
                                        product.ProductionDateFormat
                                    }}</span
                                >
                            </div>
                        </div>
                    </div>
                    <!--加个样式把按钮搞右边去-->
                    <view style="text-align: right;" slot="footer">
                        <van-button
                            @click="onDeleteProduct(product.Id)"
                            size="small"
                            type="warning"
                            >删除产品</van-button
                        >
                    </view>
                </van-panel>
            </div>
        </div>
        <mybr />
        <div class="confirmsignbtn">
            <van-button square size="normal" type="info" @click="scanProduct"
                >添加产品</van-button
            >
        </div>
        <mybr />
        <div class="footer-container" >
            <div class="confirmProductCount">
                <text>出库件数：{{ productcount }} / {{SignOrder.ProductCount}}</text>
                <view class="divLine"></view>
            </div>
            <div style="text-align: center;">
                <van-button type="primary" size="normal" @click="onGoToConfirmStep">确认绑定产品</van-button>
            </div>
        </div>
        <van-dialog id="van-dialog" />
    </div>
    <div v-else>
        <div class="basicinfo">
            <div>
                <h2 class="van-doc-demo-block__title">第三步-出库确认提交</h2>
            </div>
            <div>
                <div class="van-cell">
                    <div class="van-cell__title">
                        <span>DTP药房：{{ dtpname }}</span>
                    </div>
                </div>
                <div class="van-cell">
                    <div class="van-cell__title">
                        <span>出库件数：{{ productcount }}</span>
                    </div>
                </div>
            </div>
            <div v-for="product in products" :key="product">
                <van-panel
                    title="产品编号"
                    :desc="product.UDISN"
                    use-footer-slot
                >
                    <div>
                        <div class="van-cell">
                            <div class="van-cell__title">
                                <span>名称：{{ product.ProductName }}</span>
                            </div>
                            <div class="van-cell__title">
                                <span>类型：{{ product.ProductType.PartsName }}</span>
                            </div>
                        </div>
                        <div class="van-cell">
                            <div class="van-cell__title">
                                <span>规格：{{ product.Specification }}</span>
                            </div>
                            <div class="van-cell__title">
                                <span
                                    >生产日期：{{
                                        product.ProductionDateFormat
                                    }}</span
                                >
                            </div>
                        </div>
                    </div>
                </van-panel>
            </div>
            <mybr />
            <div class="footer-container" style="text-align: center;">
                <van-button
                    type="primary"
                    size="normal"
                    @click="onConfirmProductBind"
                    >确认提交</van-button
                >
            </div>
        </div>
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
            showBind: true,
            productcount: 0,
            products: [],
            productSnCodes: [],
            productSnCode: {},
            signOrderSmallId: '',
            dtpname: '',
            SignOrder: {}
        }
    },
    //方法
    methods: {
        scanProduct(event) {
            // 允许从相机和相册扫码
            var that = this;
            if(that.productcount >= that.SignOrder.ProductCount){
                const message = '绑定产品数量到上限'
                Dialog.alert({
                    title: '信息提示',
                    message,
                })
                return;
            }
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
                            if (res.code == 200) {
                                console.log(
                                    '/Product/GetSnCodeFromQrCode response',
                                    res
                                )
                                var snCode = res.data
                                that.$http
                                    .get({
                                        url:
                                            '/Product/GetBySN?snCode=' + snCode,
                                    })
                                    .then(res => {
                                        if (res.code == 200) {
                                            var findprod = that.products.find(x => x.id === res.data.id);
                                            if(findprod){
                                                const message = '该产品已添加'
                                                Dialog.alert({
                                                    title: '信息提示',
                                                    message,
                                                });
                                            }else{
                                                that.products.push(res.data)
                                                that.productcount = that.products.length
                                            }
                                 
                                        } else {
                                            const message = '该产品不存在'
                                            Dialog.alert({
                                                title: '信息提示',
                                                message,
                                            })
                                        }
                                    })
                            } else {
                                const message = '读取二维码失败'
                                Dialog.alert({
                                    title: '信息提示',
                                    message,
                                })
                            }
                        })
                },
            })
        },
        onDeleteProduct(productId) {
            var index = this.products.findIndex(x => x.Id == productId)
            this.products.splice(index, 1)
            this.productcount = this.products.length
        },
        onGoToConfirmStep(event) {
            this.showBind = false
        },
        onConfirmProductBind(event) {
            this.productSnCodes = []
            this.products.forEach(element => {
                this.productSnCodes.push(element.UDISN)
            })
            console.log('product sncodes is', this.productSnCodes)
            this.$http
                .post({
                    url:
                        '/SignOrderDetail/SignAddProduct?signOrderSmallId=' +
                        this.signOrderSmallId,
                    data: {
                        productSnCodes: this.productSnCodes,
                    },
                })
                .then(res => {
                    if (res.code == 200) {
                        const url = '../a-dtphome/main?activeTabIndex=1'
                        const message = '产品绑定成功！'
                        Dialog.alert({
                            title: '信息提示',
                            message,
                        }).then(() => {
                            //wx.navigateTo({ url: url })
                            this.$globalData.refresh = true;
                            wx.navigateBack();
                        })
                    } else {
                        const message = '产品绑定操作失败'
                        const url = '../a-dtphome/main?activeTabIndex=1'
                        Dialog.alert({
                            title: '信息提示',
                            message,
                        }).then(() => {
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
        var signOrderSmallId = this.$root.$mp.query.signOrderSmallId
        this.signOrderSmallId = signOrderSmallId
        this.products = []
        this.showBind = true
        this.productSnCodes = []
        this.productcount = 0
        console.log('signOrderSmallId is ', this.signOrderSmallId)
        this.$http
            .get({
                url:
                    '/SignOrder/GetBySignOrderSmallId?signOrderSmallId=' +
                    this.signOrderSmallId,
            })
            .then(res => {
                console.log("GetBySignOrderSmallId", res);
                if (res.code == 200) {
                    this.SignOrder = res.data
                    var dtpName = res.data.SignDTPName
                    this.dtpname = dtpName
                } else {
                    const message = '数据读取失败'
                    const url = '../a-dtphome/main?activeTabIndex=1'
                    Dialog.alert({
                        title: '信息提示',
                        message,
                    }).then(() => {
                        wx.navigateTo({ url: url })
                    }) 
                }
            })
    },
}
</script>

<!-- 样式代码片段  scoped -->
<style scoped src="./a-dtpproductbind.css"></style>
