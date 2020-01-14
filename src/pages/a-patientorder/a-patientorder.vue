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
                            <span>{{ApplyOrder.DTP.Name}}</span>
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
                            <span><van-stepper :value="ApplyOrder.ProductCount" integer/></span>
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
                                        :value="CurrApplyOrder"
                                        :options="OrderTypes"
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
                    <span>姓名</span>
                </div>
                <div class="van-cell__value">
                    <input type="text" class="van-field__input" :value="ApplyOrder.Contact.Name" />
                </div>
            </div>
            <div class="van-cell">
                <div class="van-cell__title">
                    <span>性别</span>
                </div>
                <div class="van-cell__value">
                    <van-dropdown-menu>
                        <van-dropdown-item :value="ApplyOrder.Contact.Sex" :options="Sexs" />
                    </van-dropdown-menu>
                </div>
            </div>
            <div class="van-cell">
                <div class="van-cell__title">
                    <span>出生日期</span>
                </div>
                <div  class="van-cell__value">
                    <van-popup :show="isshowdatetimepicker" position="bottom">
                        <van-datetime-picker
                            type="date"
                            :value="currentDate"
                            :min-date="minDate"
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
                    />
                </div>
            </div>
            <div class="van-cell">
                <div class="van-cell__title">
                    <span>手机号码</span>
                </div>
                <div class="van-cell__value">
                    <input
                        type="text"
                        class="van-field__input"
                        :value="ApplyOrder.Contact.Phone"
                    />
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
            OrderTypes: [
                { text: '首次预约', value: '首次预约' },
                { text: '购买贴片', value: '购买贴片' },
                // { text: '产品维修', value: 2 },
            ],
            CurrSex: '',
            Sexs: [
                { text: '男', value: '男' },
                { text: '女', value: '女' },
                // { text: '产品维修', value: 2 },
            ],
            value1: 0,
            dtpName: 'xxxDTP药店',
            CurrApplyOrder: '首次购买',
            appointmentTime: '2019/12/31 11:00-12:00',
            openid: '',
            dtpid: 0,
            ApplyOrder: {
                DTP: {
                    Id: 0,
                    Code: "",
                    Name: "",
                    Address: "",
                    Phone: "",
                    PhoneText: "",
                    City: "",
                    Note: ""
                },
                Contact: {
                    Id: 0,
                    Name: "",
                    Sex: "",
                    Province: "",
                    City: "",
                    Address: "",
                    IDType: "",
                    IDNum: "",
                    Birthday: "0001-01-01T00:00:00",
                    Phone: "",
                    PhoneText: "",
                    OAOpenId: "",
                    MPOpenId: "",
                    UnionId: ""
                },
                Id: 0,
                ContactId: 0,
                OrderType: "",
                DTPId: 0,
                LastDTPId: 0,
                ProductCount: 0,
                ApplyStatus: "",
                ApplyDate: "0001-01-01T00:00:00",
                IsConfirmedWithVendor: false,
                CreateTime: "0001-01-01T00:00:00",
                ComfirmBy: 0,
                ComfirmTime: "0001-01-01T00:00:00"
            }
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
            var that = this;
            that.ApplyOrder.OrderType = that.CurrApplyOrder;
            that.ApplyOrder.Contact.Sex = that.CurrSex;
            console.log('that.ApplyOrder', that.ApplyOrder)
            that.$http.post({
                            url:'/ApplyOrder/Add',
                            data:that.ApplyOrder
                        })
                        .then(res => {
                            console.log('/ApplyOrder/Add response', res)
                            const message =
                                '您将提交如下预约信息:\n' +
                                '预约DTP：' +
                                that.dtpName +
                                '\n' +
                                '预约类型：' +
                                that.appointmentType +
                                '\n' +
                                '预约时间：' +
                                that.appointmentTime +
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
                                });
                        });

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
            this.ApplyOrder.ApplyDate = this.selectedDate;
            this.isshowdatetimepicker = false;
        },
        usercancel(event) {
            this.isshowdatetimepicker = false
        },
        onCreate(){
            var that = this;
            //ApplyOrder/Create
            that.$http.get({
                            url:'/ApplyOrder/Create?dtpid='+ that.dtpid +'&openid=' + that.$globalData.openId
                        })
                        .then(res => {
                            console.log('/ApplyOrder/Create response', res)
                            that.ApplyOrder = res.data;
                            that.currentDate = Date.parse(that.ApplyOrder.Contact.Birthday);
                        });
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
        var that = this;
        this.dtpid = this.$root.$mp.query.dtpid;
        console.log('mounted this.dtpid', this.dtpid)
        console.log("that.globalData.openid",that.$globalData.openId)
        that.onCreate();
    },
}
</script>

<!-- 样式代码片段  scoped -->
<style scoped src="./a-patientorder.css"></style>
