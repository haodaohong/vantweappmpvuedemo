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
                            <span>医疗产品</span>
                        </div>
                    </div>
                    <div class="van-cell">
                        <div class="van-cell__title">
                            <span>预约数量：</span>
                        </div>
                        <div class="van-cell__value">
                            <span><van-stepper :value="ProductCount" integer @change="onSelectProductCount"/></span>
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
                                        @change="onChangeType"
                                        required
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
                                    :show="isShowApplyDatePicker"
                                    position="bottom"
                                >
                                    <van-datetime-picker
                                        type="date"
                                        :min-date="minDate"
                                        :max-date="maxDate"
                                        @confirm="selectApplyDatePicker"
                                        @cancel="cancelApplyDatePicker"
                                    />
                                </van-popup>
                                <van-field
                                    :value="currentDateStr"
                                    icon="calender-o"
                                    icon-class="icon"
                                    required
                                    @clickicon="showApplyDatePicker"
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
                    <input type="text" class="van-field__input" :value="ApplyOrder.Contact.Name" @change="onChangeName"/>
                </div>
            </div>
            <div class="van-cell">
                <div class="van-cell__title">
                    <span>性别</span>
                </div>
                <div class="van-cell__value">
                    <van-dropdown-menu>
                        <van-dropdown-item :value="ApplyOrder.Contact.Sex" @change="onChangeSex" :options="Sexs" />
                    </van-dropdown-menu>
                </div>
            </div>
            <div class="van-cell">
                <div class="van-cell__title">
                    <span>出生日期</span>
                </div>
                <div  class="van-cell__value">
                    <van-popup :show="isShowBirthdayPicker" position="bottom">
                        <van-datetime-picker
                            type="date"
                            :value="currentBirthDate"
                            :min-date="minBirthDate"
                            :max-date="maxBirthDate"
                            @confirm="selectBirthdayPicker"
                            @cancel="cancelBirthdayPicker"
                        />
                    </van-popup>
                    <van-field
                        :value="currentBirthDateStr"
                        icon="calender-o"
                        icon-class="icon"
                        required
                        @clickicon="showBirthdayPicker"
                    />
                </div>
            </div>
                <van-field
                    :value="Phone"
                    label="手机号"
                    placeholder="请输入手机号"
                    @change="onChangePhone"
                    required
                />

                </div>
                <view class="divLine"></view>
            </div>
        </div>
        <div class="basicinfo" v-for="(SignOrder, index) in SignOrders" :key="index">
            <div>
                <h2 class="van-doc-demo-block__title">签约信息</h2>
            </div>
            <div>
                <div>
                    <div class="van-cell">
                <div class="van-cell__title">
                    <span>签约药店</span>
                </div>
                <div class="van-cell__value signed">
                    {{SignOrder.SignDTPName}}
                </div>
            </div>
            <div class="van-cell">
                <div class="van-cell__title">
                    <span>签约编号</span>
                </div>
                <div class="van-cell__value">
                    {{SignOrder.SignNo}}
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
            isShowBirthdayPicker: false,
            isShowApplyDatePicker: false,
            selectedDate: new Date().toLocaleDateString(),
            currentDate: new Date(new Date().getTime() + 24*60*60*1000*2).getTime(),
            currentDateStr: new Date(new Date().getTime() + 24*60*60*1000*2).toLocaleDateString(),
            currentBirthDate: new Date(new Date().getTime() - 24*60*60*1000*30*12*40).getTime(),
            currentBirthDateStr: new Date(new Date().getTime() - 24*60*60*1000*30*12*40).toLocaleDateString(),
            minBirthDate: new Date(new Date().getTime() - 24*60*60*1000*30*12*90).getTime(),
            maxBirthDate: new Date(new Date().getTime()).getTime(),
            minDate: new Date(new Date().getTime() + 24*60*60*1000*2).getTime(),
            minDateStr: new Date(new Date().getTime() + 24*60*60*1000*2).toLocaleDateString(),
            maxDate: new Date(new Date().getTime() + 24*60*60*1000*3*30).getTime(),
            minHour: 9,
            maxHour: 17,
            OrderTypes: [
                { text: '设备预约', value: '设备预约' },
                { text: '购买贴片预约', value: '购买贴片预约' },
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
            CurrApplyOrder: '设备预约',
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
            },
            SignOrders: [],
            Phone: '',
            ProductCount: 1,
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
      onChangePhone ( event ) {
        var that = this;
        that.ApplyOrder.Contact.Phone =  event.mp.detail;
        that.ApplyOrder.Contact.PhoneText =  event.mp.detail;
        console.log('that.Phone', that.ApplyOrder.Contact.Phone)
      } ,
      onChangeName ( event ) {
        var that = this;
        that.ApplyOrder.Contact.Name =  event.mp.detail.value;
        console.log('that.ApplyOrder.Contact.Name', that.ApplyOrder.Contact.Name)
      } ,
      onSelectProductCount ( event ) {
        var that = this;
        that.ProductCount =  parseInt(event.mp.detail);
        console.log('event.mp.detail', event.mp.detail)
      } ,
      onChangeSex ( event ) {
        var that = this;
        that.ApplyOrder.Contact.Sex =  event.mp.detail;
        console.log('that.Sex', that.ApplyOrder.Contact.Sex)
      } ,
      onChangeType ( event ) {
        var that = this;
        that.ApplyOrder.OrderType =  event.mp.detail;
        that.CurrApplyOrder =  event.mp.detail;
        console.log('that.ApplyOrder.OrderType', that.ApplyOrder.OrderType)
      } ,
        onConfirmAppointment(event) {
            var that = this;
            console.log('that.event', event);
            that.ApplyOrder.OrderType =  that.CurrApplyOrder;
            if(that.ApplyOrder.Contact.PhoneText.length < 11){
                 Dialog.alert({
                        title: ' 提交失败',
                        message: '请填写合法的手机号码.',
                    });
                    return;
            }
            if(that.ApplyOrder.Contact.Name.length <= 0){
                 Dialog.alert({
                        title: ' 提交失败',
                        message: '请填写您的姓名.',
                    });
                    return;
            }
            that.ApplyOrder.ProductCount =  that.ProductCount;
            var newDTP = "";
            if(that.SignOrders.length > 0 && that.SignOrders[0].SignDTPName != that.ApplyOrder.DTP.Name)
            {
                newDTP = "签约药店：" + that.SignOrders[0].SignDTPName + "\n";
                that.ApplyOrder.LastDTPId = that.SignOrders[0].DTP.Id;
            }
            console.log('that.ApplyOrder request', that.ApplyOrder)
            const message =
                '您将提交如下预约信息:\n' +
                '预约药店：' +
                that.ApplyOrder.DTP.Name +
                '\n' + newDTP +
                '预约类型：' +
                that.ApplyOrder.OrderType +
                '\n' +
                '预约时间：' +
                that.currentDateStr +
                '\n';
            Dialog.confirm({
                messageAlign: 'left',
                title: '提交确认',
                message,
            })
            .then(() => {
                that.$http.post({
                    url:'/ApplyOrder/Add',
                    data:that.ApplyOrder
                })
                .then(res => {
                    console.log('/ApplyOrder/Add response', res)
                    const url = '../a-patienthome/main'
                    Dialog.alert({
                        title: ' 提交成功',
                        message: '已经将您的申请发送至DTP药房,请等待确认通知.',
                    }).then(() => {
                        wx.navigateBack({ url: url })
                    })
                });
            })
            .catch(() => {
                Dialog.close()
            });

        },
        showApplyDatePicker(event) {
            console.log('isShowApplyDatePicker event', event)
            this.isShowApplyDatePicker = true
            console.log('this.isShowApplyDatePicker', this.isShowApplyDatePicker)
        },
        selectBirthdayPicker(event){
            const { detail, currentTarget } = event.mp
            // console.log( detail )
            // console.log( currentTarget )
            const date = new Date(detail)

            this.ApplyOrder.Contact.Birthday = this.dateFormat(date);
            this.isShowBirthdayPicker = false;
            this.currentBirthDateStr = date.toLocaleDateString();
            this.currentBirthDate = detail;
        },
        showBirthdayPicker(event){
            this.isShowBirthdayPicker = true;
        },
        cancelBirthdayPicker(event) {
            this.isShowBirthdayPicker = false
        },
        getSignOrders(){
            var that = this;
            var openId = that.$globalData.openId;
            that.$http
                .get({
                    url:
                        '/SignOrder/GetByFilterStatus?mpOpenId=' + openId + '&filterStatus=已签约',
                })
                .then(res => {
                    if (res.code == 200) {
                        that.SignOrders = res.data
                        console.log(
                            '/SignOrder/GetByFilterStatus response',
                            that.SignOrders
                        );
                    }
                })
        },
        selectApplyDatePicker(event) {
            //console.log( 'onconfirm2' , event )
            const { detail, currentTarget } = event.mp
            // console.log( detail )
            // console.log( currentTarget )
            const date = new Date(detail)
            console.log('event.mp.detail', detail);
            console.log('this.currentDate old', this.currentDate);

            this.ApplyOrder.ApplyDate = this.dateFormat(date);
            this.currentDate = detail;
            this.currentDateStr = date.toLocaleDateString();
            console.log('this.currentDate new', this.currentDate);
            console.log('this.ApplyOrder', this.ApplyOrder)
            this.isShowApplyDatePicker = false;
        },
        cancelApplyDatePicker(event) {
            this.isShowApplyDatePicker = false
        },
        onCreate(){
            var that = this;
            //ApplyOrder/Create
            console.log("url",'https://oostest.zailaboratory.com/ApplyOrder/Create?dtpid='+ that.dtpid +'&openid=' + that.$globalData.openId)
            that.$http.get({
                            url:'/ApplyOrder/Create?dtpid='+ that.dtpid +'&openid=' + that.$globalData.openId
                        })
                        .then(res => {
                            console.log('/ApplyOrder/Create response', res)
                            that.ApplyOrder = res.data;
                            that.Phone = that.ApplyOrder.Contact.PhoneText;
                            that.ApplyOrder.Contact.Phone =  that.Phone;
                            that.ApplyOrder.Contact.PhoneText =  that.Phone;
                            that.ApplyOrder.ApplyDate = that.currentDateStr;
                            console.log('that.Phone', that.Phone)
                            console.log('that.ApplyOrder.Contact.Birthday', that.ApplyOrder.Contact.Birthday)

                            if(that.ApplyOrder.Contact.Birthday.length > 0){
                                that.currentBirthDateStr = that.ApplyOrder.Contact.Birthday.replace(" 00:00:00","");
                                // console.log('currentBirthDateStr', that.currentBirthDateStr);
                                // console.log('Date.parse(that.ApplyOrder.Contact.Birthday)', new Date(Date.parse(that.ApplyOrder.Contact.Birthday)));
                                // console.log('new Date(that.ApplyOrder.Contact.Birthday)', new Date(that.ApplyOrder.Contact.Birthday));
                                that.currentBirthDate = new Date(that.ApplyOrder.Contact.Birthday).getTime();
                                console.log('currentBirthDate', that.currentBirthDate);
                            }
                            that.getSignOrders();
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
        that.ApplyOrder.OrderType =  that.CurrApplyOrder;
        this.dtpid = this.$root.$mp.query.dtpid;
        console.log('mounted this.dtpid', this.dtpid)
        console.log("that.globalData.openid",that.$globalData.openId)
        that.onCreate();
        console.log("minDate:",that.minDate);
        console.log("minDate:",new Date(new Date().getTime() + 70*60*60*1000));
    },
}
</script>

<!-- 样式代码片段  scoped -->
<style scoped src="./a-patientorder.css"></style>
