<!-- html代码片段 -->
<template>
    <!--
  特别提示:
  van-tabs组件的:active="active"不是双向数据绑定,
  所以tab切换后active值已经不是最新的啦!如果需要保持最新,需要在事件change中主动赋值一下

  collapse也有类似情况
  -->

    <div>
        <van-panel title="基本信息">
            <!--
      @click-icon="onClickIcon"
      注册了click-icon事件,好像没有反应

      解决办法:
      到static目录下field目录下的源码的click-icon改成clickicon
      -->
            <div class="basicinfo">
                <van-row>
                    <van-col span="12">租赁药房：国药DTP</van-col>
                    <van-col span="12">租赁用户：李斌</van-col>
                </van-row>
                <van-row>
                    <van-col span="12">产品名称：XXX仪器</van-col>
                    <van-col span="12">产品类别：产品主机</van-col>
                </van-row>
            </div>
            <div>
                <!--
      每次加减为1，可以对组件设置step、min、max属性
      -->

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
                    :value="selectedCount"
                    label="租赁数量"
                    type="number"
                    placeholder=""
                    clearable
                    required
                />
                <van-field
                    :value="selectedDate"
                    label="提交日期"
                    placeholder=""
                    clearable
                    readonly
                    icon="calender-o"
                    icon-class="icon"
                    required
                    @clickicon="showdatetimepicker"
                />
            </div>
        </van-panel>
        <mybr />
        <van-panel title="租赁合约内容">
            <van-field
                :value="username"
                label="租赁合同号"
                placeholder="请输入租赁合同号"
                clearable
                required
            />
            <van-cell title="上传合约" value="不超过2MB" required></van-cell>

            <div style="margin:10px;">
                <van-uploader
                    v-model="fileList"
                    multiple
                    :max-count="1"
                    required
                />
            </div>
        </van-panel>

        <van-panel title="合约注意事项" desc="请仔细阅读条款内容">
            <div class="privacy">
                对于用户信息的收集、使用和保护措施，请务必仔细阅读:<br />
                一、用户个人信息<br />
                1、当您在使用XXX应用时，大部分应用部不需要您提供任何个人信息。<br />
                二、用户行为信息<br />
                2.1、当您在应用时，应用将会收集用户的行为信息，如操作时长、使用频率、常用功能等。这些数据用于我们收集用户的使用习惯及受欢迎的功能，以帮助我们持续改进产品和服务。<br />
                2.2、用户行为信息将作为用户群体的整体概况数据存在和使用，不会存在行为信息与特定用户之间的关联。<br />
                三、用户设备信息<br />
                3.1、为持续优化产品在您的设备上的体验，我们的应用会收集如下非个人化信息：<br />
                操作系统及版本<br />
                设备型号及版本<br />
                屏幕分辨率<br />
                若您对我们的隐私条款有任何疑问，请联系我们。<br />
                联系邮箱：kefu@zailab.com<br />
                客服电话：40088888888<br /><br /><br /><br />
            </div>
            <mybr />
        </van-panel>
        <mybr />
        <div class="confirmsignbtn">
            <van-button round size="normal" type="info" @click="onConfirmSign"
                >同意并确认提交</van-button
            >
        </div>
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
            isshowdatetimepicker: false,
            fileList: [],
            contractfile: '',
            selectedDate: new Date().toLocaleDateString(),
            currentDate: new Date().getTime(),
            minDate: new Date().getTime(),
            selectedCount: 1,
        }
    },
    //方法
    methods: {
        onConfirmSign(event) {
            const message = '已成功签约，并已通知相关用户！'

            Dialog.alert({
                title: '信息提示',
                message,
            }).then(() => {
                const url = '../a-dtphome/main'
                wx.navigateBack({ url: url })
            })
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
            console.log('date', date)
            console.log('date.toLocaleDateString()', date.toLocaleDateString())

            this.selectedDate = date.toLocaleDateString()
            this.isshowdatetimepicker = false
        },
        usercancel(event) {
            this.isshowdatetimepicker = false
        },
        onConfirmBooking(event) {
            const message = '预约已确认，并已通知相关用户！'

            Dialog.alert({
                title: '信息提示',
                message,
            })
        },
        onClickIcon(event) {
            const message = 'onClickIcon！'

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
    mounted() {},
}
</script>

<!-- 样式代码片段  scoped -->
<style scoped src="./a-dtprentout.css"></style>
