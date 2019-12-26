<!--
作者:chenghao
功能:vue页
-->

<!-- html代码片段 -->
<template>
    <div class="demoindex">
        <h1>角色演示</h1>
        <van-row class="user-links">
            <van-col custom-class="dark" span="6">
                <van-icon name="friends-o" @click="goToPatient" size="36px" />
                <br />病患用户
            </van-col>
            <van-col custom-class="dark" @click="goToDTP" span="6">
                <van-icon name="shop-o" size="36px" />
                <br />DTP用户
            </van-col>
            <van-col custom-class="dark" @click="goToCOC" span="6">
                <van-icon name="setting-o" size="36px" />
                <br />COC用户
            </van-col>
            <van-col custom-class="dark" @click="goToRegisterUser" span="6">
                <van-icon name="setting-o" size="36px" />
                <br />角色注册
            </van-col>
        </van-row>
        <mybr />
        <h1>开发使用</h1>
        <van-row class="user-links">
            <van-col custom-class="dark" span="6">
                <a href="/pages/index/main" open-type="switchTab" class="home"
                    >开发组件</a
                >
            </van-col>
        </van-row>
    </div>
</template>

<!-- js脚本代码片段 -->
<script>
import mybr from '@/components/mybr/mybr.vue'

export default {
    name: 'layoutdemo',
    components: {
        mybr,
    },
    //数据模型
    data() {
        return {
            msg: '',
        }
    },
    //方法
    methods: {
        dj() {
            //代码搞这里
            wx.showToast({
                title: '我醒了', //提示的内容,
                icon: 'success', //图标,
                duration: 2000, //延迟时间,
                mask: true, //显示透明蒙层，防止触摸穿透,
                success: res => {
                    console.log(res)
                },
            })
        },
        goToPatient(event) {
            const url = '../a-patienthome/main'
            wx.navigateTo({ url: url })
        },
        goToDTP(event) {
            const url = '../a-dtphome/main'
            wx.navigateTo({ url: url })
        },
        goToCOC(event) {
            const url = '../a-cochome/main'
            wx.navigateTo({ url: url })
        },
        goToRegisterUser(event) {
            const url = '../a-registeruser/main'
            wx.navigateTo({ url: url })
        },
        goToDev(event) {
            // wx.showToast( {
            //   title : '我醒了' , //提示的内容,
            //   icon : 'success' , //图标,
            //   duration : 2000 , //延迟时间,
            //   mask : true , //显示透明蒙层，防止触摸穿透,
            //   success : res => {
            //     console.log( res )
            //   }
            // } );

            const url = '/pages/index/main'
            wx.navigateTo({ url: url })
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
<style src="./a-demoindex.css"></style>
