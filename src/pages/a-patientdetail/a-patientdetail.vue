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
        <div>
            <div class="van-cell">
                <div class="van-cell__title">
                    <span>姓名</span>
                </div>
                <div class="van-cell__value">
                    <input type="text" class="van-field__input" :value="Contact.Name" placeholder="输入姓名" @change="onChangeName"/>
                </div>
            </div>
            <div class="van-cell">
                <div class="van-cell__title">
                    <span>性别</span>
                </div>
                <div>
                    <picker bindchange="bindViewEvent" data-model="component" data-method="selectSex" data-name="index" @change="selectSex" :value="genderindex" :range="gender">
                        <view class="label-right">
                            {{gender[genderindex]}}
                        </view>
                    </picker>
                    <!-- <van-dropdown-menu>
                        <van-dropdown-item :value="Contact.Sex" :options="optionSex" @change="selectSex"/>
                    </van-dropdown-menu> -->
                </div>
            </div>
            <div class="van-cell">
                <div class="van-cell__title">
                    <span>出生日期</span>
                </div>
                <div>
                    <!-- <picker mode="date" value="{{currentDate}}" :start="minBirthDate" :end="maxBirthDate" @change="userselectdate" bindchange="bindViewEvent" data-model="component" data-method="bindSelect" date-mode="date" data-name="date">
                        <view class="picker">
                        {{currentDate}}
                        </view>
                    </picker> -->
                    <van-popup :show="isshowdatetimepicker" position="bottom">
                        <van-datetime-picker
                            type="date"
                            :value="currentDate"
                            :min-date="minBirthDate"
                            :max-date="maxBirthDate"
                            @confirm="userselectdate"
                            @cancel="usercancel"
                        />
                    </van-popup>
                    <van-field
                        :value="selectedDate"
                        icon="calender-o"
                        icon-class="icon"
                        
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
                        placeholder="输入手机号码"
                         @change="onChangePhone"
                        :value="Contact.PhoneText"
                    />
                </div>
            </div>
            <div class="van-cell">
                <div class="van-cell__title">
                    <span>证件类型</span>
                </div>
                <div>
                    <picker bindchange="bindViewEvent" data-model="component" data-method="selectSex" data-name="index" @change="onSelectIDType" :value="IDindex" :range="IDOptions">
                        <view class="label-right">
                            {{IDOptions[IDindex]}}
                        </view>
                    </picker>
                    <!-- <van-dropdown-menu>
                        <van-dropdown-item :value="Contact.IDType" :options="optionID" @change="onSelectIDType"/>
                    </van-dropdown-menu> -->
                </div>
            </div>
            <div class="van-cell">
                <div class="van-cell__title">
                    <span>证件号码</span>
                </div>
                <div class="van-cell__value">
                    <input
                        type="text"
                        placeholder="输入证件号码"
                        class="van-field__input"
                        @change="onChangeIDNum"
                        :value="Contact.IDNum"
                    />
                </div>
            </div>
        </div>
        <mybr />
        <div class="confirmsignbtn">
            <van-button square size="normal" type="info" @click="onSave"
                >保存</van-button
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
            optionSex: [
                { text: '男', value: '男' },
                { text: '女', value: '女' },
            ],
            gender:['男','女'],
            genderindex: 0,
            value1: 0,
            optionID: [
                { text: '身份证', value: '身份证' },
                { text: '港澳居民来往内地通行证', value: '护照' },
                { text: '台湾居民来往大陆通行证', value: '回乡证' },
                { text: '护照', value: '台胞证' }
                // { text: '外国人永久居留身份证', value: '外国人永久居留身份证' },
                // { text: '港澳台居民居住证', value: '港澳台居民居住证' },
            ],
            IDindex: 0,
            IDOptions: [
                '身份证',
                '港澳居民来往内地通行证',
                '台湾居民来往大陆通行证',
                '护照'
            ],
            minBirthDate: new Date(new Date().getTime() - 24*60*60*1000*30*12*90).getTime(),
            maxBirthDate: new Date(new Date().getTime()).getTime(),
            value2: 0,
            isshowdatetimepicker: false,
            selectedDate: new Date().toLocaleDateString(),
            currentDate: new Date().getTime(),
            minDate: new Date().getTime(),
            Contact: {
                    Id: 0,
                    Name: "",
                    Sex: "",
                    Province: "",
                    City: "",
                    Address: "",
                    IDType: "",
                    IDNum: "",
                    Birthday: "0001-01-01",
                    Phone: "",
                    PhoneText: "",
                    OAOpenId: "",
                    MPOpenId: "",
                    UnionId: ""
                },
        }
    },
    //方法
    methods: {
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
            console.log('date', date)
            console.log('date.toLocaleDateString()', date.toLocaleDateString())

            this.selectedDate = date.toLocaleDateString();
            this.isshowdatetimepicker = false;
            this.Contact.Birthday = date.toLocaleDateString();
            this.currentDate = detail;
        },
        usercancel(event) {
            this.isshowdatetimepicker = false
        },
        onSelectIDType(event) {
            this.IDindex = parseInt(event.mp.detail.value);
            this.Contact.IDType = this.IDOptions[this.IDindex];
            console.log('this.Contact.IDType', this.Contact.IDType)
        }, 
        selectSex(event) {
            this.genderindex = parseInt(event.mp.detail.value);
            this.Contact.Sex = this.gender[this.genderindex];
            console.log('this.Contact.Sex', this.Contact.Sex)
        },
        onChangePhone ( event ) {
            var that = this;
            that.Contact.Phone =  event.mp.detail.value;
            that.Contact.PhoneText =  event.mp.detail.value;
            console.log('that.Phone', that.Contact.Phone)
        } ,
        onChangeIDNum ( event ) {
            var that = this;
            that.Contact.IDNum =  event.mp.detail.value;
            console.log('that.Contact.IDNum', that.Contact.IDNum)
        } ,
        onChangeName ( event ) {
            var that = this;
            that.Contact.Name =  event.mp.detail.value;
            console.log('that.Name', that.Contact.Name)
        } ,
        onLoadContact(){
            var that = this;
            console.log("that contact", that.Contact);
            var url = '/Contact/GetByOpenId?openid='+that.$globalData.openId;
            that.$http.get({
                url: url
            })
            .then(res => {
                console.log(url);
                console.log("contact", res);

                if(res.data)
               {
                   that.Contact = null;
                   that.Contact = res.data;
                   if(that.Contact.IDType.length <= 0)
                   {
                       that.Contact.IDType = '身份证'
                   }
                    that.genderindex = that.gender.indexOf(that.Contact.Sex);
                    that.IDindex = that.IDOptions.indexOf(that.Contact.IDType);
                    that.selectedDate = that.Contact.Birthday.replace(" 00:00:00","");
                    that.currentDate = new Date(that.Contact.Birthday).getTime();
                    console.log("that.selectedDate", that.selectedDate);
                    console.log("that.currentDate", that.currentDate);
               }
               that.$forceUpdate();
            });
        },
        onSave(event) {
            const message = '保存成功！'
            var that = this;
            console.log("contact request", that.Contact);
            var url = '/Contact/Update';
            that.$http.post({
                url: url,
                data:that.Contact
            })
            .then(res => {
                console.log(url, res);
                that.applys = null;
                if(res.code == 200)
               {
                    that.$forceUpdate();
               
                    Dialog.alert({
                        title: '信息提示',
                        message,
                    });
               }else{
                   Dialog.alert({
                        title: '信息提示',
                        message: '保存失败！'
                    });
               }
            });

        },
    },
    //计算属性
    computed: {
        //name() {
        //代码搞这里
        //return this.data;
        //}
    },
    onUnload(){
        this.$globalData.refresh = true;
    },
    //生命周期(mounted)
    mounted() {
        this.onLoadContact();
    },
}
</script>

<!-- 样式代码片段  scoped -->
<style scoped src="./a-patientdetail.css"></style>
