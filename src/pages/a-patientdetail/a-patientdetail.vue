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
                    <input type="text" class="van-field__input" :value="Contact.Name" />
                </div>
            </div>
            <div class="van-cell">
                <div class="van-cell__title">
                    <span>性别</span>
                </div>
                <div>
                    <van-dropdown-menu>
                        <van-dropdown-item :value="Contact.Sex" :options="optionSex" @change="selectSex"/>
                    </van-dropdown-menu>
                </div>
            </div>
            <div class="van-cell">
                <div class="van-cell__title">
                    <span>出生日期</span>
                </div>
                <div>
                    <van-popup :show="isshowdatetimepicker" position="bottom">
                        <van-datetime-picker
                            type="date"
                            :value="currentDate"
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
                        :value="Contact.PhoneText"
                    />
                </div>
            </div>
            <div class="van-cell">
                <div class="van-cell__title">
                    <span>证件类型</span>
                </div>
                <div>
                    <van-dropdown-menu>
                        <van-dropdown-item :value="Contact.IDType" :options="optionID" @change="onSelectIDType"/>
                    </van-dropdown-menu>
                </div>
            </div>
            <div class="van-cell">
                <div class="van-cell__title">
                    <span>证件号码</span>
                </div>
                <div class="van-cell__value">
                    <input
                        type="text"
                        class="van-field__input"
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
            value1: 0,
            optionID: [
                { text: '身份证', value: '身份证' },
                { text: '护照', value: '护照' },
                { text: '回乡证', value: '回乡证' },
                { text: '台胞证', value: '台胞证' },
                { text: '外国人永久居留身份证', value: '外国人永久居留身份证' },
                { text: '港澳台居民居住证', value: '港澳台居民居住证' },
            ],
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
                    Birthday: "0001-01-01T00:00:00",
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

            this.selectedDate = date.toLocaleDateString()
            this.isshowdatetimepicker = false
        },
        usercancel(event) {
            this.isshowdatetimepicker = false
        },
        onSelectIDType(event) {
            this.Contact.IDType = event.mp.detail;
        }, 
        selectSex(event) {
            this.Contact.Sex = event.mp.detail;
        },
        onLoadContact(){
            var that = this;
            var url = '/Contact/GetByOpenId?openid='+that.$globalData.openId;
            that.$http.get({
                url: url
            })
            .then(res => {
                console.log(url, res);

                if(res.data)
               {
                   that.Contact = null;
                   that.Contact = res.data;
               }
               that.$forceUpdate();
            });
        },
        onSave(event) {
            const message = '保存成功！'
            var that = this;
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
    //生命周期(mounted)
    mounted() {
        this.onLoadContact();
    },
}
</script>

<!-- 样式代码片段  scoped -->
<style scoped src="./a-patientdetail.css"></style>
