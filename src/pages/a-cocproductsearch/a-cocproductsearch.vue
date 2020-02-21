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
                    <!-- <div class="van-cell">
                        <div class="van-cell__title">
                            <span>产品类别</span>
                        </div>
                        <div class="van-cell__value">
                            <span>{{ product.ProductType.PartsName }}</span>
                        </div>
                    </div> -->
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
        <div class="basicinfo">
            <div>
                <h2 class="van-doc-demo-block__title">当前状态</h2>
            </div>
            <div>
                <div style="text-align:center;">
                            <span>{{ product.CurrentStatus }}</span>
                        </div>
            </div>
        </div>
        <div class="basicinfo" style="text-align:center;display:none;">
            <div>
                <h2 class="van-doc-demo-block__title">执行操作</h2>
            </div>
            <div style="text-align:center;display:none;">
                    <!-- 已入库状态，DTP操作 -->
                    <!-- <van-button
                    class="confirmBooking"
                    @click="onCocOut(product.UDISN)"
                    size="small"
                    type="info"
                    v-if="
                    product.IsDTPCheckInFromRental |
                    product.IsDTPCheckInFromUserForReturn |
                    product.IsDTPCheckInFromUserForMaintenance
                    "
                    >维修出库</van-button> -->
                    <!-- 已出库状态 -->
                    <!-- <van-button
                    class="confirmBooking"
                    @click="onCocOut(product.UDISN)"
                    size="small"
                    type="info"
                    v-if="
                    product.IsDTPCheckOutToUser  |
                    product.IsCOCCheckOutToVendor
                    "
                    >产品入库</van-button> -->
                    <!-- 已出库状态 COC端操作-->
                    <!-- <van-button
                    class="confirmBooking"
                    @click="onCocOut(product.UDISN)"
                    size="small"
                    type="info"
                    v-if="
                    product.IsDTPCheckOutToCOCFromUserReturn |
                    product.IsDTPCheckOutToCOCFromUserMaintenance 
                    "
                    >维修入库（收到产品）</van-button> -->
                    <!-- 维修部已入库状态 COC端操作-->
                    <!-- <van-button
                    class="confirmBooking"
                    @click="onCocOut(product.UDISN)"
                    size="small"
                    type="info"
                    v-if="
                    product.IsCOCCheckInFromDTPForUserReturn |
                    product.IsCOCCheckInFromDTPForUserMaintenance 
                    "
                    >维修出库（完成维修）</van-button> -->
            </div>
        </div>
        <mybr />
        <div class="confirmsignbtn">
            <van-button
                square
                size="normal"
                type="info"
                @click="onBack"
                >返回主界面</van-button
            >
        </div>
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
            snCode: '',
            product: {
                ProductType: {
                    PartsName: '',
                },
            },
        }
    },
    //方法
    methods: {
        onBack:function(){
             wx.navigateBack();
        }
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
        //console.log('qrcode', this.$root.$mp.query.qrcode)
        console.log('sncode', this.$root.$mp.query.sncode)
        var snCode = this.$root.$mp.query.sncode
        this.product = {
            ProductType: {
                PartsName: '',
            },
        }
        this.snCode = snCode
        this.$http
            .get({
                url: '/Product/GetBySN?snCode=' + this.snCode,
            })
            .then(res => {
                if (res.code == 200) {
                    console.log('/Product/GetBySN response', res)
                    this.product = res.data
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
<style scoped src="./a-cocproductsearch.css"></style>
