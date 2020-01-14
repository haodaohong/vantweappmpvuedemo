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
        <div class="scanBtn">
            <h5>您好，{{}}</h5>
            <div class="editmyprofile">
                <van-button @click="onUpdateInfo" type="default" size="small"
                    >更新资料</van-button
                >
            </div>
        </div>
        <div>
            <div class="flex-width">
                <div class=".white-padding">
                    <span>选择城市:</span>
                </div>
                <div class="flex-1">
                    <van-dropdown-menu>
                        <van-dropdown-item
                            :value="selectedCity"
                            :options="Cities"
                            @change="onSelectCity"
                        />
                    </van-dropdown-menu>
                </div>
            </div>
        </div>
        <van-tabs :active="active" @change="onSelectTab">
            <van-tab title="预约服务">
                <van-card v-for="(dtp, index) in dtps" :key="index"
                    :desc="dtp.Address"
                    :title="dtp.Name"
                    :thumb="imageURL"
                >
                    <view class="gosubmit" slot="footer">
                        <van-button
                            @click="onMakeAppointment(dtp.Id)"
                            size="small"
                            type="primary"
                            >立即预约</van-button
                        >
                    </view>
                </van-card>
            </van-tab>
            <van-tab title="历史记录">
                <van-panel v-for="(apply, index) in applys" :key="index"
                    :title="apply.DTP.Name"
                    :desc="apply.DTP.Address"
                    :status="apply.ApplyStatus"
                    use-footer-slot
                >
                    <div>
                        <table class="content">
                            <tr>
                                <td>预约产品：xxx仪器</td>
                            </tr>
                            <tr>
                                <td>预约数量：{{apply.ProductCount}}</td>
                                <td>预约日期：{{apply.ApplyDate}}</td>
                            </tr>
                            <tr>
                                <td>姓名：{{apply.Contact.Name}}</td>
                                <td>性别：{{apply.Contact.Sex}}</td>
                            </tr>
                            <tr>
                                <td>出生日期：{{apply.Contact.Birthday}}</td>
                                <td>手机号码：{{apply.Contact.Phone}}</td>
                            </tr>
                            <tr>
                                <td>身份证号：{{apply.Contact.IDNum}}</td>
                            </tr>
                        </table>
                    </div>
                    <view style="text-align: right;" slot="footer">
                        <van-button
                            @click="onCancelAppointment"
                            size="small"
                            type="danger"
                            >取消预约</van-button
                        >
                    </view>
                </van-panel>
                
            </van-tab>
            <van-tab title="个人中心">
                <van-panel title="基本信息">
                    <div>
                        <table class="content">
                            <tr>
                                <td>预约类型：购买贴片</td>
                                <td>预约产品：xxx仪器</td>
                            </tr>
                            <tr>
                                <td>预约数量：1</td>
                                <td>预约日期：2019年12月8日 10:00-11:00</td>
                            </tr>
                            <tr>
                                <td>姓名：李斌</td>
                                <td>性别：男</td>
                            </tr>
                            <tr>
                                <td>出生日期：1978年12月8日</td>
                                <td>手机号码：197xxxxxxxx</td>
                            </tr>
                            <tr>
                                <td>证件类型：身份证</td>
                                <td>身份证号：3XXXXXXXXXXXXXXX</td>
                            </tr>
                            <tr>
                                <td>确诊医院：xxx医院</td>
                            </tr>
                        </table>
                    </div>
                </van-panel>
                <van-panel title="签约信息">
                    <div>
                        <table class="content">
                            <tr>
                                <td>已签约DTP：xxxDTP</td>
                                <td>协议编号：XXXXXXXXXXXX</td>
                            </tr>
                        </table>
                    </div>
                </van-panel>
                <van-panel title="产品信息">
                    <div>
                        <table class="content">
                            <tr>
                                <td>产品数量：1</td>
                                <td>产品名称：xxx仪器</td>
                            </tr>
                            <tr>
                                <td>产品类别：主机</td>
                                <td>产品编码：SNXXXXXXXXXXXXX</td>
                            </tr>
                        </table>
                    </div>
                    <view class="divLine"></view>
                    <div>
                        <table class="content">
                            <tr>
                                <td>产品数量：1</td>
                                <td>产品名称：xxx仪器</td>
                            </tr>
                            <tr>
                                <td>产品类别：配件</td>
                                <td>产品编码：SNXXXXXXXXXXXXX</td>
                            </tr>
                        </table>
                    </div>
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
            imageURL: '/static/img/yaodian.png',
            touxiang: '/static/img/touxiang.jpg',
            active: 0,
            Cities: [
                { text: '上海', value: '上海' },
                { text: '北京', value: '北京' },
                { text: '杭州', value: '杭州' },
                { text: '广州', value: '广州' },
                { text: '深圳', value: '深圳' },
            ],
            selectedCity: '上海',
            dtps: [
                {
                    Id: 0,
                    Code: "",
                    Name: "",
                    Address: "",
                    Phone: "",
                    PhoneText: "",
                    City: "",
                    Note: ""
                }
            ],
            applys:[
                {
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
            ],
            openid: '',
            MyOrder:{"Products":[{"qrcode":null,"ProductionDateFormat":null,"DTPCheckInDateFormat":null,"DTPCheckOutDateFormat":null,"COCCheckInDateFormat":null,"COCCheckOutDateFormat":null,"ExpiredYearFormat":null,"TitleStatus":null,"ShowReturnFooter":false,"ShowChangeProductFooter":false,"ShowCOCCheckOutFooter":false,"Id":0,"Specification":"","ProductionDate":"","DTPId":0,"COCId":0,"UDICode":"","UDISN":"","UDIDate":"","ProductName":"","Manufacturer":"","Vendor":"","CertificateNumber":"","ExpiredYears":0,"ProductCategory":"","CurrentOrderId":0,"CurrentStatus":"","CheckInFromRentalDate":"0001-01-01 00:00:00","CheckInFromReturnDate":"0001-01-01 00:00:00","CheckInFromMaintenanceDate":"0001-01-01 00:00:00","CheckOutToUserDate":"0001-01-01 00:00:00","CheckOutFromReturnDate":"0001-01-01 00:00:00","CheckOutFromMaintenanceDate":"0001-01-01 00:00:00","COCCheckInDate":"0001-01-01 00:00:00","COCCheckOutDate":"0001-01-01 00:00:00","DTPCheckOutShipCode":"","COCCheckOutShipCode":""}],"OrderDetails":[{"Id":0,"ApplyOrderId":0,"OrderId":0,"ProductId":0,"RepairApplyStatus":""}],"Id":0,"ApplyOrderId":0,"ContactId":0,"DTPId":0,"ProductCount":0,"SignStatus":"","SignNo":"","SignSubmitDate":"0001-01-01 00:00:00","SignPhotos":"","CreateBy":0,"CreateTime":"0001-01-01 00:00:00"}
            
        }
    },
    //方法
    methods: {
        onUpdateInfo(event) {
            const url = '../a-patientdetail/main'
            wx.navigateTo({ url: url })
        },
        onMakeAppointment(dtpid) {
            console.log("onMakeAppointment event",dtpid);
            const url = '../a-patientorder/main?dtpid=' + dtpid
            wx.navigateTo({ url: url });
        },
        onCancelAppointment(event) {
            const message = '已取消此预约'

            Dialog.alert({
                title: '信息提示',
                message,
            })
        },
        onLoadDtps(){
            var that = this;
            that.$http.get({
                url:'/DTP/GetByCity?city='+that.selectedCity
            })
            .then(res => {
                console.log('/DTP/GetByCity?city='+that.selectedCity, res)
                that.dtps = res.data
                console.log('that.dtps', that.dtps);
                
            });
        },
        onLoadApplys(){
            var that = this;
            var url = '/ApplyOrder/GetByStatus?mpopenid='+that.openid+'&status=待执行';
            that.$http.get({
                url: url
            })
            .then(res => {
                console.log(url, res)
                that.applys = res.data
                console.log('that.applys', that.applys);
            });
        },
        onCreateContactInfo(){
            var that = this;
            //登陆验证用户是否已经绑定过，绑定过则直接跳转
            wx.login({
                success (res) {
                    if (res.code){
                        console.log("login result",res)
                        // 这里可以把code传给后台，后台用此获取openid及session_key
                        that.$http.post({
                            url:'/Contact/UpdateBySessionCode?code='+res.code
                        })
                        .then(res => {
                            console.log('/Contact/UpdateBySessionCode response', res)
                            var user = res.data;
                        });
                    }
                }
            });
        },
        onSelectCity(event){
            var that = this;
            console.log('event', event);
            that.selectedCity = event.mp.detail;
            console.log('that.selectedCity', that.selectedCity);
            this.onLoadDtps();
        },
        onGetOpenId(){
            var that = this;
            //登陆验证用户是否已经绑定过，绑定过则直接跳转
            wx.login({
                success (res) {
                    if (res.code){
                        console.log("login result",res)
                        // 这里可以把code传给后台，后台用此获取openid及session_key
                        that.$http.get({
                            url:'/WeChatMP/GetOpenId?code='+res.code
                        })
                        .then(res => {
                            console.log('/WeChatMP/GetOpenId response', res)
                            that.openid = res;
                            that.$globalData.openId = res;
                            that.onCreateContactInfo();
                            that.onLoadDtps();
                            that.onLoadApplys();
                        });
                    }
                }
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
        this.onGetOpenId();
    },
}
</script>

<!-- 样式代码片段  scoped -->
<style scoped src="./a-patienthome.css"></style>
