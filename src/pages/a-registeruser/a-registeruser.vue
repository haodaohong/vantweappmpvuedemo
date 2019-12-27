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
        <div class="selectRole">
             <van-button type="default" @click="onShowRoles">选择角色：
               <span :class="[selectedRole == '未知'?'font-color-red':'']" >{{selectedRole}}</span>  
                 <van-icon class="middle" custom-class="middle" name="arrow-down" /></van-button>
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
        <van-action-sheet
        :show="isShowRole"
        :actions="Roles"
        title="选择角色类型"
        @close="onCloseRoles"
        @select="onSelectRole"
        />
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
            isShowRole: false,
            selectedRole: '未知',
            icon: {
                normal:
                    'https://img.yzcdn.cn/public_files/2017/10/13/c547715be149dd3faa817e4a948b40c4.png',
                active:
                    'https://img.yzcdn.cn/public_files/2017/10/13/793c77793db8641c4c325b7f25bf130d.png',
            },
             Roles : 
            [
            {
                name : 'DTP'
            } ,
            {
                name : 'COC'
            }
            ]
        }
    },
    //方法
    methods: {
        onChange(event) {
            this.radio = event.mp.detail
        },
        onShowRoles(event){
            this.isShowRole = true;
        },
        onCloseRoles(event){
            this.isShowRole = false;
        }
        ,
        onSelectRole(event){
            let obj = event.mp.detail;
            //取到选择的值
            let name = obj.name;
            this.selectedRole = name;
            this.isShowRole = false;
            console.log("this.selectedRole",this.selectedRole);
            console.log("this.isShowRole",this.isShowRole);
        },
        onConfirmRegister(event) {
            const message = '已成功注册角色！'
            if(this.selectedRole == "未知")
            {
                Dialog.alert({
                    title: '信息提示',
                    message: '请选择用户类型',
                });
                return;
            }
            Dialog.alert({
                title: '信息提示',
                message,
            }).then(() => {
                if(this.selectedRole == "DTP")
                {
                    const url = '../a-dtphome/main'
                    console.log("url",this.selectedRole+url);
                    wx.navigateTo({ url: url })
                }else if(this.selectedRole == "COC")
                {
                    const url = '../a-cochome/main'
                    wx.navigateTo({ url: url })
                    console.log("url",this.selectedRole+url);
                }
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
