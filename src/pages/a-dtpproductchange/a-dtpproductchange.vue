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
                <h2 class="van-doc-demo-block__title">添加产品</h2>
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
                                <span>类型：{{ product.ProductCategory }}</span>
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
            <!-- <div>
                <div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>产品编号：{{ product.UDISN }}</span>
                        </div>
                    </div>
                </div>
                <view class="divLine"></view>
            </div> -->
        </div>
        <mybr />
        <div class="confirmsignbtn">
            <van-button square size="normal" type="info" @click="scanProduct"
                >添加产品</van-button
            >
        </div>
        <mybr />
        <div class="footer-container">
            <!-- <div>
                <text>出库件数：2</text>
                <view class="divLine"></view>
            </div> -->
            <van-button
                type="primary"
                size="large"
                @click="onConfirmProductChange"
                >确认提交</van-button
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
            //从0开始的
            products: [],
            oldProductId: '',
            oldProductOrderId: '',
            newProductSNCode: '',
        }
    },
    //方法
    methods: {
        scanProduct(event) {
            if (this.products.length > 0) {
                const message = '产品更换只允许扫描一个产品'
                Dialog.alert({
                    title: '信息提示',
                    message,
                })
                return
            }
            // 允许从相机和相册扫码
            var that = this
            wx.scanCode({
                scanType: ['qrCode', 'barCode', 'datamatrix', 'pdf417'],
                success(res) {
                    var newSnCode = 'SN00001012'
                    console.log('all: ', res)
                    that.$http
                        .get({
                            url: '/Product/GetBySN?snCode=' + newSnCode,
                        })
                        .then(res => {
                            if (res.code == 200) {
                                console.log('/Product/GetBySN response', res)
                                that.products.push(res.data)
                                that.newProductSNCode = res.data.UDISN
                                console.log(
                                    'old product product Id is:',
                                    that.oldProductId
                                )
                                console.log(
                                    'new product sn code is:',
                                    that.newProductSNCode
                                )
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
        onDeleteProduct(productId) {
            var index = this.products.findIndex(x => x.Id == productId)
            this.products.splice(index, 1)
        },
        onConfirmProductChange(event) {
            if (this.products.length == 0) {
                const message = '请先扫描添加产品'
                Dialog.alert({
                    title: '信息提示',
                    message,
                })
            } else {
                this.$http
                    .post({
                        url:
                            '/SignOrderDetail/ProductChange?oldProductId=' +
                            this.oldProductId +
                            '&oldProductOrderId=' +
                            this.oldProductOrderId +
                            '&newProductSnCode=' +
                            this.newProductSNCode,
                    })
                    .then(res => {
                        if (res.code == 200) {
                            const url = '../a-dtphome/main?activeTabIndex=3'
                            const message = '产品更换绑定成功！'
                            Dialog.alert({
                                title: '信息提示',
                                message,
                            }).then(() => {
                                wx.navigateTo({ url: url })
                            })
                        } else {
                            const message = '产品更换绑定操作失败'

                            Dialog.alert({
                                title: '信息提示',
                                message,
                            })
                        }
                    })
            }
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
        var oldProductId = this.$root.$mp.query.oldProductId
        var oldProductOrderId = this.$root.$mp.query.oldProductOrderId
        this.oldProductId = oldProductId
        this.oldProductOrderId = oldProductOrderId
        console.log('productId is:', this.oldProductId)
        console.log('productOrderId is:', this.oldProductOrderId)
    },
}
</script>

<!-- 样式代码片段  scoped -->
<style scoped src="./a-dtpproductchange.css"></style>
