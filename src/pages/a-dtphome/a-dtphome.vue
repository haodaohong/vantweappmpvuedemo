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
                <van-icon size="80px" name="qr" @click="scanProduct2" />
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

        <van-tabs :active="active1" @change="onChange1">
            <van-tab title="预约申请">
                <div>
                    <div>
                        <van-dropdown-menu>
                            <van-dropdown-item
                                :value="value1"
                                :options="option1"
                            />
                        </van-dropdown-menu>
                    </div>
                </div>
                <van-panel
                    title="李斌"
                    desc="确诊自华山医院"
                    status="待确认"
                    use-footer-slot
                >
                    <div>
                        <table class="content">
                            <tr>
                                <td>预约类型：首次购买</td>
                                <td>性别：男</td>
                                <td>出生日期：1960年12月9日</td>
                                <td>手机号码：199xxxxxxxx</td>
                                <td>产品名称：XXX仪器</td>
                                <td>预约数量：1</td>
                                <td>预约日期：2019年12月30日 10:00-11:00</td>
                            </tr>
                        </table>
                    </div>
                    <view style="text-align: right;" slot="footer">
                        <van-button
                            class="confirmRental"
                            @click="confirmRental"
                            size="small"
                            type="info"
                            >已与租赁商签约</van-button
                        >
                        <van-button
                            class="confirmBooking"
                            @click="onConfirmBooking"
                            size="small"
                            type="primary"
                            >确认预约</van-button
                        >
                        <van-button
                            class="confirmBooking"
                            @click="onCancelBooking"
                            size="small"
                            type="default"
                            >取消预约</van-button
                        >
                    </view>
                </van-panel>

                <van-panel
                    title="王武"
                    desc="确诊自华山医院"
                    status="确认"
                    use-footer-slot
                >
                    <div>
                        <table class="content">
                            <tr>
                                <td>预约类型：首次购买</td>
                                <td>性别：男</td>
                                <td>出生日期：1960年12月9日</td>
                                <td>手机号码：199xxxxxxxx</td>
                                <td>产品名称：XXX仪器</td>
                                <td>预约数量：1</td>
                                <td>预约日期：2019年12月30日 10:00-11:00</td>
                            </tr>
                        </table>
                    </div>
                    <view style="text-align: right;" slot="footer">
                        <van-button
                            class="confirmRental"
                            @click="confirmRental"
                            size="small"
                            type="info"
                            >已与租赁商签约</van-button
                        >
                    </view>
                </van-panel>
            </van-tab>
            <van-tab title="签约绑定">
                <div>
                    <div>
                        <van-dropdown-menu>
                            <van-dropdown-item
                                :value="value2"
                                :options="option2"
                            />
                        </van-dropdown-menu>
                    </div>
                </div>
                <van-panel
                    title="李斌"
                    desc="确诊自华山医院"
                    status="待签约"
                    use-footer-slot
                >
                    <div>
                        <table class="content">
                            <tr>
                                <td>预约类型：首次购买</td>
                                <td>性别：男</td>
                                <td>出生日期：1960年12月9日</td>
                                <td>手机号码：199xxxxxxxx</td>
                                <td>产品名称：XXX仪器</td>
                                <td>预约数量：1</td>
                                <td>预约日期：2019年12月30日 10:00-11:00</td>
                            </tr>
                        </table>
                    </div>
                    <!--
          加个样式把按钮搞右边去
          -->
                    <view style="text-align: right;" slot="footer">
                        <van-button
                            @click="onConfirmSign"
                            size="small"
                            type="primary"
                            >提交使用协议</van-button
                        >
                    </view>
                </van-panel>

                <van-panel
                    title="王武"
                    desc="确诊自华山医院"
                    status="已签约"
                    use-footer-slot
                >
                    <div>
                        <table class="content">
                            <tr>
                                <td>预约类型：首次购买</td>
                                <td>性别：男</td>
                                <td>出生日期：1960年12月9日</td>
                                <td>手机号码：199xxxxxxxx</td>
                                <td>产品名称：XXX仪器</td>
                                <td>预约数量：1</td>
                                <td>预约日期：2019年12月30日 10:00-11:00</td>
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

                <van-panel
                    title="李斌"
                    desc="确诊自华山医院"
                    status="待变更"
                    use-footer-slot
                >
                    <div>
                        <table class="content">
                            <tr>
                                <td>产品名称：XXX仪器</td>
                                <td>产品类别：产品主机</td>
                            </tr>
                            <tr>
                                <td>预约数量：1</td>
                                <td>预约日期：2019年12月8日</td>
                            </tr>
                        </table>
                    </div>
                    <!--
          加个样式把按钮搞右边去
          -->
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
                    <div>
                        <van-dropdown-menu>
                            <van-dropdown-item
                                :value="value3"
                                :options="option3"
                            />
                        </van-dropdown-menu>
                    </div>
                </div>
                <div>
                    <van-popup :show="isshowdatetimepicker1" position="bottom">
                        <van-datetime-picker
                            type="date"
                            :value="currentDate"
                            @confirm="userselectdate1"
                            @cancel="usercancel"
                        />
                    </van-popup>
                    <van-field
                        :value="selectedDate1"
                        label="开始日期"
                        icon="calender-o"
                        icon-class="icon"
                        required
                        @clickicon="showdatetimepicker1"
                    />
                </div>
                <div>
                    <van-popup :show="isshowdatetimepicker2" position="bottom">
                        <van-datetime-picker
                            type="date"
                            :value="currentDate"
                            @confirm="userselectdate2"
                            @cancel="usercancel"
                        />
                    </van-popup>
                    <van-field
                        :value="selectedDate2"
                        label="结束日期"
                        icon="calender-o"
                        icon-class="icon"
                        required
                        @clickicon="showdatetimepicker2"
                    />
                </div>
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
                            </tr>
                        </table>
                    </div>
                    <!--
          加个样式把按钮搞右边去
          -->
                    <view style="text-align: right;" slot="footer">
                        <van-button
                            class="confirmBooking"
                            @click="onCocOut"
                            size="small"
                            type="primary"
                            >产品返厂</van-button
                        >
                    </view>
                </van-panel>
            </van-tab>
            <van-tab title="维修管理">
                <van-panel
                    title="产品编号"
                    desc="SNXXXXXXXXXXXXX"
                    status="待更换"
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
                                <td>绑定用户：李斌</td>
                                <td>维修单号：R1XXXXX</td>
                            </tr>
                        </table>
                    </div>
                    <!--
          加个样式把按钮搞右边去
          -->
                    <view style="text-align: right;" slot="footer">
                        <van-button
                            class="confirmBooking"
                            @click="onProductChange"
                            size="small"
                            type="primary"
                            >产品更换</van-button
                        >
                    </view>
                </van-panel>
                <van-panel
                    title="产品编号"
                    desc="SNXXXXXXXXXXXXX"
                    status="已更换"
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
                                <td>绑定用户：李斌</td>
                                <td>维修单号：R1XXXXX</td>
                            </tr>
                        </table>
                    </div>
                    <!--
          加个样式把按钮搞右边去
          -->
                    <view style="text-align: right;" slot="footer">
                        <van-button
                            class="confirmBooking"
                            @click="onCocOut"
                            size="small"
                            type="primary"
                            >维修出库</van-button
                        >
                    </view>
                </van-panel>
            </van-tab>
        </van-tabs>
        <mybr />
        <mybr />
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
            active1: 0,

            active2: 0,

            active3: 0,

            active4: 1,

            option1: [
                { text: '所有申请', value: 0 },
                { text: '首次购买', value: 1 },
                { text: '更换DTP购买贴片', value: 2 },
                { text: '产品维修', value: 3 },
            ],

            value1: 0,

            option2: [
                { text: '所有类型', value: 0 },
                { text: '已签约', value: 1 },
                { text: '待签约', value: 2 },
                { text: '待变更', value: 3 },
            ],

            value2: 0,
            option3: [
                { text: '入库', value: 0 },
                { text: '出库', value: 1 },
            ],

            value3: 0,
            isshowdatetimepicker1: false,
            isshowdatetimepicker2: false,
            selectedDate1: new Date().toLocaleDateString(),
            selectedDate2: new Date().toLocaleDateString(),
            currentDate: new Date().getTime(),
        }
    },
    //方法
    methods: {
        scanProduct(event) {
            const url = '../a-dtpproductin/main'
            wx.navigateTo({ url: url })
        },
        scanProduct2(event) {
            const message =
                '暂未完成此功能设计；预期结果是识别产品条形码并跳转至入库界面'

            Dialog.alert({
                title: '信息提示',
                message,
            })
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
        onConfirmSign(event) {
            const url = '../a-dtpsign/main'
            wx.navigateTo({ url: url })
        },
        onRentOut(event) {
            const url = '../a-dtprentout/main'
            wx.navigateTo({ url: url })
        },
        onCocOut(event) {
            const url = '../a-dtpcocout/main'
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
        onDtpChange(event) {
            const url = '../a-dtpchange/main'
            wx.navigateTo({ url: url })
        },
        showdatetimepicker1(event) {
            this.isshowdatetimepicker1 = true
        },
        showdatetimepicker2(event) {
            this.isshowdatetimepicker2 = true
        },
        userselectdate1(event) {
            //console.log( 'onconfirm2' , event )
            const { detail, currentTarget } = event.mp
            // console.log( detail )
            // console.log( currentTarget )
            const date = new Date(detail)
            this.selectedDate1 = date.toLocaleDateString()
            this.isshowdatetimepicker1 = false
        },
        userselectdate2(event) {
            //console.log( 'onconfirm2' , event )
            const { detail, currentTarget } = event.mp
            // console.log( detail )
            // console.log( currentTarget )
            const date = new Date(detail)
            this.selectedDate2 = date.toLocaleDateString()
            this.isshowdatetimepicker2 = false
        },
        usercancel(event) {
            this.isshowdatetimepicker1 = false
            this.isshowdatetimepicker2 = false
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
        wx.login({
            success: res => {
                // 调用接口获取openid
                console.log('res:', res)
                this.$http
                    .post({
                        url: '/mms/country/queryValidZoneListForMallHome',
                        data: {
                            categoryType: 'SaleGoodsType@sim',
                            streamNo: 'web_bss153570682909641893',
                            reqSource: 'MALL_H5',
                            appid: 'string',
                            timestamp: 1535706829096,
                            sign: 'string',
                        },
                    })
                    .then(res => {
                        console.log(res)
                    })
            },
        })
    },
    //生命周期(mounted)
    mounted() {},
}
</script>

<!-- 样式代码片段  scoped -->
<style scoped src="./a-dtphome.css"></style>
