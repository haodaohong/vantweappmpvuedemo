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

    <div class="flex-container">
        <div class="white-padding">
            <van-radio-group :value="radio" @change="onChange">
                <div style="margin-bottom:10px">
                    <van-radio name="1">DTP用户</van-radio>
                </div>
                <div style="margin-bottom:10px">
                    <van-radio name="2">COC用户</van-radio>
                </div>
            </van-radio-group>
        </div>
        <div>
            <van-cell-group>
                <van-field
                    :value="phone"
                    label="手机号"
                    placeholder="请输入手机号"
                    error-message="手机号格式错误"
                    :border="isBorder"
                />
                <van-field
                    :value="sms"
                    center
                    clearable
                    label="短信验证码"
                    placeholder="请输入短信验证码"
                    :border="isBorder"
                    use-button-slot
                >
                    <van-button slot="button" size="small" type="primary"
                        >发送验证码</van-button
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
            radio: '1',
            isBorder: false,
            icon: {
                normal:
                    'https://img.yzcdn.cn/public_files/2017/10/13/c547715be149dd3faa817e4a948b40c4.png',
                active:
                    'https://img.yzcdn.cn/public_files/2017/10/13/793c77793db8641c4c325b7f25bf130d.png',
            },
        }
    },
    //方法
    methods: {
        onChange(event) {
            this.radio = event.mp.detail
        },
        onConfirmRegister(event) {
            const message = '已成功注册角色！'

            Dialog.alert({
                title: '信息提示',
                message,
            }).then(() => {
                const url = '../a-demoindex/main'
                wx.navigateBack({ url: url })
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
    mounted() {},
}
</script>

<!-- 样式代码片段  scoped -->
<style scoped src="./a-registeruser.css"></style>
