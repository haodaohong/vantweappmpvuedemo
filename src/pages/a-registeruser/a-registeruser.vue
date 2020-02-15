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
    <!-- <div v-show="isShowLoading"><span>aaa</span></div> -->
    <div>
        <div v-show="isShowLoading"></div>
        <div class="flex-container" v-show="isShowRegister">
            <div class="selectRole" style="display:none;">
                <van-button
                    type="default"
                    @click="onShowRoles"
                    :disabled="isDisabledSelectedRole"
                    >选择角色：
                    <span
                        :class="[
                            selectedRole == '未知' ? 'font-color-red' : '',
                        ]"
                        >{{ selectedRole }}</span
                    >
                    <van-icon
                        class="middle"
                        custom-class="middle"
                        name="arrow-down"
                /></van-button>
            </div>
            <div>
                <van-cell-group>
                    <van-field
                        :value="phone"
                        label="手机号"
                        placeholder="请输入手机号"
                        :error-message="errorMessagePhoneField"
                        @change="onPhoneFieldChange"
                        :border="isBorder"
                    />
                    <van-field
                        :value="smsCode"
                        center
                        clearable
                        label="短信验证码"
                        placeholder="请输入短信验证码"
                        @change="onSmsCodeFieldChange"
                        :border="isBorder"
                        use-button-slot
                    >
                        <van-button
                            slot="button"
                            size="small"
                            type="primary"
                            :disabled="isBtnSmsCodeDisabled"
                            @click="onClickBtnSendSmsCode"
                            >{{ BtnSendSmsCodeContent }}</van-button
                        >
                    </van-field>
                </van-cell-group>
            </div>
            <mybr />
            <div class="confirmsignbtn">
                <van-button
                    square
                    size="normal"
                    type="info"
                    @click="onConfirmRegister"
                    >确认注册角色</van-button
                >
            </div>
            <mybr />
            <van-dialog id="van-dialog" />
            <van-action-sheet
                :show="isShowRole"
                :actions="Roles"
                title="选择角色类型"
                @close="onCloseRoles"
                @select="onSelectRole"
            />
        </div>
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
            isDisabledSelectedRole: false,
            isShowLoading: true,
            isShowRegister: false,
            //从0开始的
            radio: '1',
            isBorder: false,
            isShowRole: false,
            isBtnSmsCodeDisabled: true,
            BtnSendSmsCodeContent: '发送验证码',
            countdownTime: 59,
            selectedRole: '未知',
            selectedDepartId: '99',
            Roles: [
                {
                    name: 'DTP',
                },
                {
                    name: 'COC',
                },
            ],
            timer: '',
            //value: 0,
            errorMessagePhoneField: '手机号不能为空',
            phone: '',
            smsCode: '',
        }
    },
    //方法
    methods: {
        onChange(event) {
            this.radio = event.mp.detail
        },
        onShowRoles(event) {
            if (this.isDisabledSelectedRole) {
                return
            }
            this.isShowRole = true
        },
        onCloseRoles(event) {
            this.isShowRole = false
        },
        onSelectRole(event) {
            let obj = event.mp.detail
            //取到选择的值
            let name = obj.name
            this.selectedRole = name
            this.isShowRole = false
            console.log('this.selectedRole', this.selectedRole)
            console.log('this.isShowRole', this.isShowRole)
        },
        onPhoneFieldChange(event) {
            this.phone = event.mp.detail
            if (this.phone !== '') {
                //var reg = /^1[3456789]\d{9value}$/
                var reg = /\d{11}/
                if (!reg.test(this.phone)) {
                    this.errorMessagePhoneField = '请输入有效的手机号码'
                    this.isBtnSmsCodeDisabled = true
                } else {
                    console.log(this.phone)
                    this.errorMessagePhoneField = ''
                    this.isBtnSmsCodeDisabled = false
                }
            }
        },
        onClickBtnSendSmsCode(event) {
            if (this.isBtnSmsCodeDisabled) {
                return
            }
            this.$http
                .post({
                    url:
                        '/Users/GetCodeByPhone?phone=' +
                        this.phone,
                })
                .then(res => {
                    console.log('/Users/GetCodeByPhone response:depart id', res)
                    if (res.code == 200) {
                        Dialog.alert({
                                        title: '信息提示',
                                        message: '成功发送验证码'
                        })
                        this.isDisabledSelectedRole = true
                        this.BtnSendSmsCodeContent =
                            this.countdownTime + 's后重新发送'
                        this.isBtnSmsCodeDisabled = true
                        const _this = this
                        this.timer = setInterval(function() {
                            _this.countdownTime--
                            _this.BtnSendSmsCodeContent =
                                _this.countdownTime + 's后重新发送'
                            if (_this.countdownTime < 0) {
                                //当倒计时小于0时清除定时器
                                clearInterval(_this.timer)
                                _this.BtnSendSmsCodeContent = '重新发送验证码'
                                _this.countdownTime = 5
                                _this.isBtnSmsCodeDisabled = false
                            }
                        }, 1000)
                        this.selectedDepartId = res.data
                        this.$globalData.departId = res.data
                    } else {
                        var errorMessage = '请确认手机号是否正确'
                        Dialog.alert({
                            title: '信息提示',
                            message: errorMessage,
                        })
                    }
                })
        },
        onSmsCodeFieldChange(event) {
            this.smsCode = event.mp.detail
        },
        onCreateContactInfo() {
            var that = this
            //登陆验证用户是否已经绑定过，绑定过则直接跳转
            wx.login({
                success(res) {
                    if (res.code) {
                        console.log('login result', res)
                        // 这里可以把code传给后台，后台用此获取openid及session_key
                        that.$http
                            .post({
                                url:
                                    '/Users/UpdateBySessionCode?code=' +
                                    res.code,
                            })
                            .then(res => {
                                console.log(
                                    '/Users/UpdateBySessionCode response',
                                    res
                                )
                            })
                    }
                },
            })
        },
        onConfirmRegister(event) {
            if (this.errorMessagePhoneField !== '') {
                Dialog.alert({
                    title: '信息提示',
                    message: '请输入正确的手机号',
                })
                return
            }
            if (this.smsCode === '') {
                Dialog.alert({
                    title: '信息提示',
                    message: '验证码不能为空',
                })
                return
            }
            var that = this
            wx.login({
                success(res) {
                    if (res.code) {
                        console.log('login result', res)
                        // 这里可以把code传给后台，后台用此获取openid及session_key
                        that.$http
                            .post({
                                url:
                                    '/Users/ConfirmRegisterUser?phone=' +
                                    that.phone +
                                    '&smscode=' +
                                    that.smsCode +
                                    '&sessioncode=' +
                                    res.code,
                            })
                            .then(res => {
                                console.log(
                                    '/Users/ConfirmRegisterUser response',
                                    res
                                )
                                if (res.code == 200) {
                                    var user = res.data
                                    that.$globalData.departId = user.DepartId
                                    that.$globalData.openId = user.MPOpenId
                                    that.$globalData.unionId = user.UnionId
                                    const message = '已成功注册角色！'
                                    Dialog.alert({
                                        title: '信息提示',
                                        message,
                                    }).then(() => {
                                        if (user.Role == 'DTP') {
                                            const url = '../a-dtphome/main'
                                            console.log(
                                                'url',
                                                that.selectedRole + url
                                            ) 
                                            wx.redirectTo({ url: url })
                                        } else if (user.Role == 'COC') {
                                            const url = '../a-cochome/main'
                                            wx.redirectTo({ url: url })
                                            console.log(
                                                'url',
                                                that.selectedRole + url
                                            )
                                        }
                                    })
                                } else {
                                    const message = res.message
                                    Dialog.alert({
                                        title: '信息提示',
                                        message,
                                    })
                                }
                            })
                    }
                },
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
        this.isDisabledSelectedRole = false
        var that = this
        //登陆验证用户是否已经绑定过，绑定过则直接跳转
        wx.login({
            success(res) {
                if (res.code) {
                    console.log('login result', res)
                    // 这里可以把code传给后台，后台用此获取openid及session_key
                    that.$http
                        .get({
                            url: '/Users/GetBySessionCode?code=' + res.code,
                        })
                        .then(res => {
                            console.log('/Users/GetBySessionCode response', res)
                            var user = res.data
                            var code = res.code
                            if (code === 200) {
                                that.$globalData.departId = user.DepartId
                                that.$globalData.openId = user.MPOpenId
                                that.$globalData.unionId = user.UnionId
                                // if (user.UnionId == '') {
                                //     const message =
                                //         '请先搜索关注公众号【Zailab】即可正常使用'
                                //     Dialog.alert({
                                //         title: '信息提示',
                                //         message,
                                //     })
                                //     return
                                // }
                                if (user.Role == 'DTP') {
                                    const url = '../a-dtphome/main'
                                    console.log('url', user.Role + url)
                                    wx.redirectTo({ url: url })
                                } else if (user.Role == 'COC') {
                                    const url = '../a-cochome/main'
                                    wx.redirectTo({ url: url })
                                    console.log('url', user.Role + url)
                                }
                            } else {
                                that.isShowRegister = true
                                that.isShowLoading = false
                                console.log('未绑定过')
                            }
                        })
                }
            },
        })
    },
}
</script>

<!-- 样式代码片段  scoped -->
<style scoped src="./a-registeruser.css"></style>
