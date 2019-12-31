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
        <div class="basicinfo">
            <div>
                <h2 class="van-doc-demo-block__title">基本信息</h2>
            </div>
            <div>
                <div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>预约DTP：</span>
                        </div>
                        <div class="van-cell__value">
                            <span>xxxDTP药房</span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>预约产品：</span>
                        </div>
                        <div class="van-cell__value">
                            <span>XXX产品</span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>预约数量：</span>
                        </div>
                        <div class="van-cell__value">
                            <span><van-stepper :value="1" integer/></span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>预约类型：</span>
                        </div>
                        <div class="van-cell__value">
                            <span
                                ><van-dropdown-menu>
                                    <van-dropdown-item
                                        :value="value1"
                                        :options="option1"
                                    /> </van-dropdown-menu
                            ></span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>预约时间：</span>
                        </div>
                        <div class="van-cell__value">
                            <span
                                ><van-popup
                                    :show="isshowdatetimepicker"
                                    position="bottom"
                                >
                                    <van-datetime-picker
                                        type="datetime"
                                        :value="currentDate"
                                        :min-date="minDate"
                                        :min-Hour="minHour"
                                        :max-Hour="maxHour"
                                        @confirm="userselectdate"
                                        @cancel="usercancel"
                                    />
                                </van-popup>
                                <van-field
                                    :value="selectedDate"
                                    icon="calender-o"
                                    icon-class="icon"
                                    required
                                    @clickicon="showdatetimepicker"
                                    @input="dateFormat"
                            /></span>
                        </div>
                    </div>
                </div>
                <view class="divLine"></view>
            </div>
        </div>
        <div class="basicinfo">
            <div>
                <h2 class="van-doc-demo-block__title">个人信息</h2>
            </div>
            <div>
                <div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>姓名：</span>
                        </div>
                        <div class="van-cell__value">
                            <span>李斌</span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>性别：</span>
                        </div>
                        <div class="van-cell__value">
                            <span>男</span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>出生年月：</span>
                        </div>
                        <div class="van-cell__value">
                            <span>1970/01/01</span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>手机号码：</span>
                        </div>
                        <div class="van-cell__value">
                            <span>139XXXXXXXX</span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>确诊医院：</span>
                        </div>
                        <div class="van-cell__value">
                            <span>xxx医院</span>
                        </div>
                    </div>
                </div>
                <view class="divLine"></view>
            </div>
        </div>
        <mybr />
        <div class="confirmsignbtn">
            <van-button
                square
                size="normal"
                type="info"
                @click="onConfirmAppointment"
                >确认提交预约</van-button
            >
        </div>
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
            //从0开始的
            dateString: new Date().toLocaleDateString(),
            hour: new Date().getHours().toString,
            isshowdatetimepicker: false,
            selectedDate: new Date().toLocaleDateString(),
            currentDate: new Date().getTime(),
            minDate: new Date().getTime(),
            minHour: 9,
            maxHour: 17,
            option1: [
                { text: '首次预约', value: 0 },
                { text: '购买贴片', value: 1 },
                // { text: '产品维修', value: 2 },
            ],
            value1: 0,
            dtpName: 'xxxDTP药店',
            appointmentType: '首次购买',
            appointmentTime: '2019/12/31 11:00-12:00',
        }
    },
    //方法
    methods: {
        dateFormat: function(time) {
            var date = new Date(time)
            console.log(date)
            var year = date.getFullYear()
            /* 在日期格式中，月份是从0开始的，因此要加0
             * 使用三元表达式在小于10的前面加0，以达到格式统一  如 09:11:05
             * */
            var month =
                date.getMonth() + 1 < 10
                    ? '0' + (date.getMonth() + 1)
                    : date.getMonth() + 1
            var day =
                date.getDate() < 10 ? '0' + date.getDate() : date.getDate()
            var hours =
                date.getHours() < 10 ? '0' + date.getHours() : date.getHours()
            var nexthours =
                date.getHours() + 1 < 10
                    ? '0' + (date.getHours() + 1)
                    : date.getHours() + 1
            var result =
                year +
                '/' +
                month +
                '/' +
                day +
                ' ' +
                hours +
                ':00-' +
                nexthours +
                ':00'
            return result
        },
        onConfirmAppointment(event) {
            const message =
                '您将提交如下预约信息:\n' +
                '预约DTP：' +
                this.dtpName +
                '\n' +
                '预约类型：' +
                this.appointmentType +
                '\n' +
                '预约时间：' +
                this.appointmentTime +
                '\n'
            Dialog.confirm({
                messageAlign: 'left',
                title: '提交确认',
                message,
            })
                .then(() => {
                    const url = '../a-patienthome/main'
                    Dialog.alert({
                        title: ' 提交成功',
                        message: '已经将您的申请发送至DTP药房,请等待确认通知.',
                    }).then(() => {
                        wx.navigateBack({ url: url })
                    })
                })
                .catch(() => {
                    Dialog.close()
                })
        },
        showdatetimepicker(event) {
            console.log('showdatetimepicker event', event)
            this.isshowdatetimepicker = true
            console.log('this.isshowdatetimepicker', this.isshowdatetimepicker)
        },
        userselectdate(event) {
            //console.log( 'onconfirm2' , event )
            const { detail, currentTarget } = event.mp
            // console.log( detail )
            // console.log( currentTarget )
            const date = new Date(detail)

            this.selectedDate = this.dateFormat(date)
            this.isshowdatetimepicker = false
        },
        usercancel(event) {
            this.isshowdatetimepicker = false
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
    mounted() {},
}
</script>

<!-- 样式代码片段  scoped -->
<style scoped src="./a-patientorder.css"></style>
