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
                                :value="value1"
                                :options="option1"
                            />
                        </van-dropdown-menu>
                    </div>
                </div>
            </div>
            <!-- <div>
                <div class="flex-width">
                    <div class=".white-padding">
                        <span>操作日期:</span>
                    </div>
                    <div class="flex-1">
                        <van-dropdown-menu>
                            <van-dropdown-item
                                :value="value2"
                                :options="option2"
                            />
                        </van-dropdown-menu>
                    </div>
                </div>
            </div> -->
            <van-panel
                title="产品编号"
                desc="SNXXXXXXXXXXXXX"
                status="已入库"
                use-footer-slot
            >
                <div>
                    <table class="content">
                        <tr>
                            <td>名称：xxx仪器</td>
                            <td>类别：产品主机</td>
                            <td>规格：20*30</td>
                            <td>单位：台</td>
                            <td>数量：1</td>
                            <td>生产日期：2019年01月01日</td>
                            <td>入库日期：2019年12月30日</td>
                            <td>入库类型：维修入库</td>
                        </tr>
                    </table>
                </div>
                <!--加个样式把按钮搞右边去-->
                <view style="text-align: right;" slot="footer">
                    <van-button
                        class="confirmBooking"
                        @click="onCocOut"
                        size="small"
                        type="info"
                        >产品出库</van-button
                    >
                    <van-button
                        class="confirmBooking"
                        size="small"
                        type="primary"
                        >已清洗</van-button
                    >
                </view>
            </van-panel>
            <van-panel
                title="产品编号"
                desc="SNXXXXXXXXXXXXX"
                status="已质检"
                use-footer-slot
            >
                <div>
                    <table class="content">
                        <tr>
                            <td>名称：xxx仪器</td>
                            <td>类别：产品主机</td>
                            <td>规格：20*30</td>
                            <td>单位：台</td>
                            <td>数量：1</td>
                            <td>生产日期：2019年01月01日</td>
                            <td>入库日期：2019年12月30日</td>
                            <td>入库类型：维修入库</td>
                        </tr>
                    </table>
                </div>
                <!--加个样式把按钮搞右边去-->
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
            active1: 0,
            option1: [
                { text: '维修入库', value: 0 },
                { text: '归还入库', value: 1 },
            ],

            value1: 0,

            option2: [
                { text: '今日', value: 0 },
                { text: '近7日', value: 1 },
                { text: '近一个月', value: 2 },
                { text: '近三个月', value: 3 },
            ],

            value2: 0,
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
    onLoad: function(options) {},
    //生命周期(mounted)
    mounted() {},
}
</script>

<!-- 样式代码片段  scoped -->
<style scoped src="./a-cochome.css"></style>
