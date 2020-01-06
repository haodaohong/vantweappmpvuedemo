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
            <div class="myphoto">
                <img src="/static/img/touxiang.jpg" />
            </div>
            <h5>李斌</h5>
            <div class="editmyprofile">
                <van-button @click="onUpdateInfo" type="default" size="small"
                    >更新资料</van-button
                >
            </div>
        </div>

        <van-tabs :active="active" @change="onChange1">
            <van-tab title="预约服务">
                <div>
                    <div class="flex-width">
                        <div class=".white-padding">
                            <span>选择城市:</span>
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
                <van-card
                    desc="地址：上海市XXX路888号"
                    title="XXX大药房"
                    :thumb="imageURL"
                >
                    <view class="gosubmit" slot="footer">
                        <van-button
                            @click="onMakeAppointment"
                            size="small"
                            type="primary"
                            >立即预约</van-button
                        >
                    </view>
                </van-card>
                <van-card
                    desc="地址：上海市XXX路888号"
                    title="XXX大药房"
                    :thumb="imageURL"
                >
                    <view class="gosubmit" slot="footer">
                        <van-button
                            @click="onMakeAppointment"
                            size="small"
                            type="primary"
                            >立即预约</van-button
                        >
                    </view>
                </van-card>
                <van-card
                    desc="地址：上海市XXX路888号"
                    title="XXX大药房"
                    :thumb="imageURL"
                >
                    <view class="gosubmit" slot="footer">
                        <van-button
                            @click="onMakeAppointment"
                            size="small"
                            type="primary"
                            >立即预约</van-button
                        >
                    </view>
                </van-card>
                <van-card
                    desc="地址：上海市XXX路888号"
                    title="XXX大药房"
                    :thumb="imageURL"
                >
                    <view class="gosubmit" slot="footer">
                        <van-button
                            @click="onMakeAppointment"
                            size="small"
                            type="primary"
                            >立即预约</van-button
                        >
                    </view>
                </van-card>
            </van-tab>
            <van-tab title="历史记录">
                <van-panel
                    title="预约DTP：xxxDTP"
                    desc="地址：上海市XXXXXX"
                    status="待确认"
                    use-footer-slot
                >
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
                                <td>身份证号：3XXXXXXXXXXXXXXX</td>
                                <td>确诊医院：xxx医院</td>
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
                <van-panel
                    title="预约DTP：xxxDTP-B"
                    desc="地址：上海市XXXXXX"
                    status="已确认"
                    use-footer-slot
                >
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
                                <td>身份证号：3XXXXXXXXXXXXXXX</td>
                                <td>确诊医院：xxx医院</td>
                            </tr>
                            <tr>
                                <td>当前已签约DTP：DTP-A</td>
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
                <van-panel
                    title="预约DTP：xxxDTP"
                    desc="地址：上海市XXXXXX"
                    status="待确认"
                    use-footer-slot
                >
                    <div>
                        <table class="content">
                            <tr>
                                <td>预约类型：产品维修</td>
                                <td>预约日期：2019年12月8日 10:00-11:00</td>
                            </tr>
                            <tr>
                                <td>维修单号：R19XXXXXXX</td>
                                <td>产品名称：xxx仪器</td>
                            </tr>
                            <tr>
                                <td>产品类型：主机</td>
                                <td>产品编码：SNXXXXXXXXX</td>
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
                                <td>身份证号：3XXXXXXXXXXXXXXX</td>
                                <td>确诊医院：xxx医院</td>
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
            option1: [
                { text: '上海', value: 0 },
                { text: '北京', value: 1 },
                { text: '杭州', value: 2 },
                { text: '广州', value: 3 },
                { text: '深圳', value: 3 },
            ],
            value1: 0,
        }
    },
    //方法
    methods: {
        onUpdateInfo(event) {
            const url = '../a-patientdetail/main'
            wx.navigateTo({ url: url })
        },
        onMakeAppointment(event) {
            const url = '../a-patientorder/main'
            wx.navigateTo({ url: url })
        },
        onCancelAppointment(event) {
            const message = '已取消此预约'

            Dialog.alert({
                title: '信息提示',
                message,
            })
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
                            var user = res.data
                            if(user){
                              if (user.Role == 'DTP'){
                                    const url = '../a-dtphome/main'
                                    console.log('url', user.Role + url)
                                    wx.navigateTo({ url: url })
                                } else if (user.Role == 'COC') {
                                    const url = '../a-cochome/main'
                                    wx.navigateTo({ url: url })
                                    console.log('url', user.Role + url)
                                }
                            }
                             console.log('未绑定过')
                        });
                        }
                    }
        });
    },
}
</script>

<!-- 样式代码片段  scoped -->
<style scoped src="./a-patienthome.css"></style>
