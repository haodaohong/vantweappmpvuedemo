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
                    :desc="product.SNCode"
                    :status="product.TitleStatus"
                    use-footer-slot
                >
                    <div>
                        <table class="content">
                            <tr>
                                <td>名称：{{ product.Name }}</td>
                                <td>类别：{{ product.Type }}</td>
                                <td>规格：{{ product.Specification }}</td>
                                <td>生产日期：{{ product.ProductionDate }}</td>
                                <td>入库日期：{{ product.CheckInDate }}</td>
                                <td>入库类型：{{ product.CurrentStatus }}</td>
                            </tr>
                        </table>
                    </div>
                    <view style="text-align: right;" slot="footer">
                        <van-button
                            class="confirmBooking"
                            @click="onCocOut"
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
            timeFilterActiveValueStr: '今日',
            timeFilterValue: 0,
            timeFilterOption: [
                { text: '近7日', value: 0 },
                { text: '近一个月', value: 1 },
                { text: '近三个月', value: 2 },
            ],
            products: [],
        }
    },
    //方法
    methods: {
        scanProduct(event) {
            const url = '../a-cocproductin/main'
            wx.navigateTo({ url: url })
        },
        scanSearchProduct(event) {
            const url = '../a-cocproductsearch/main'
            wx.navigateTo({ url: url })
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
                        '/COC/GetProductsByFilter?statusFilter=' +
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
        },
        onCocOut(event) {
            const url = '../a-cocout/main'
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
        var that = this
        wx.login({
            success: res => {
                // 调用接口获取openid
                console.log('res:', res)
                this.$http
                    .get({
                        url:
                            '/COC/GetProductsByFilter?statusFilter=' +
                            that.statusFilterActiveValueStr +
                            '&timeFilter=' +
                            that.timeFilterActiveValueStr,
                    })
                    .then(res => {
                        that.products = res.data
                        //console.log('/COC/GetProductsByFilter response', res)
                        console.log(that.products)
                    })
            },
        })
    },
    //生命周期(mounted)
    mounted() {},
}
</script>

<!-- 样式代码片段  scoped -->
<style scoped src="./a-cochome.css"></style>
