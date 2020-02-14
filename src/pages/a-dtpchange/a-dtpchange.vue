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
                    <van-col span="50"
                        >租赁用户：{{ signOrder.Contact.Name }}</van-col
                    >
                </van-row>
                <van-row>
                    <van-col span="50">
                        租赁数量：{{ signOrder.ProductCount }}
                    </van-col>
                </van-row>
            </div>
        </van-panel>
        <mybr />
        <van-panel title="变更协议信息">
            <van-field
                :value="signOrder.LastSignDTPName"
                label="原租赁药房"
                placeholder="请输入原租赁药房"
                clearable
                required
            />
            <van-field
                :value="signOrder.SignDTPName"
                label="现租赁药房"
                placeholder="请输入现租赁药房"
                clearable
                required
            />
            <van-field
                :value="newcontractnumber"
                label="新协议编号"
                placeholder="请输入协议编号"
                clearable
                required
                @change="onChangenewcontractnumber"
            />
            <div>
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
                    :value="selectedDate"
                    label="提交日期"
                    icon="calender-o"
                    icon-class="icon"
                    required
                    @clickicon="showdatetimepicker"
                />
            </div>
            <van-cell title="上传协议(最多三张)"></van-cell>

            <div style="margin:10px;">
                <van-uploader
                    :file-list="fileList"
                    multiple
                    :max-count="maxCount"
                    required
                    preview-image="true"
                    deletable="false"
                    @afterread="afterRead"
                />
            </div>
        </van-panel>
        <mybr />
        <div class="confirmsignbtn">
            <van-button square size="normal" type="info" @click="onConfirmSign"
                >确认提交</van-button
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
            selectedDate: '',
            contractNumber: '',
            isshowdatetimepicker: false,
            signOrderId: 0,
            originaldtpname: '',
            newdtpname: '',
            newcontractnumber: '',
            signOrder: {
                SignDTPName: '',
                LastSignDTPName: '',
                LastSignDTPSmallId: 0,
                Contact: { Name: '' },
                ProductCount: '',
                id: 0
            },
            fileList: [],
            maxCount: 3,
        }
    },
    //方法
    methods: {
        onConfirmSign(event) {
            const message = '已成功签约，并已通知相关用户！'
            if(this.newcontractnumber.length <= 0)
            {
                const message = '请输入新协议编号'

                Dialog.alert({
                    title: '信息提示',
                    message,
                });
                return;
            }

            Dialog.confirm({
                title: '信息提示',
                message: '确认提交变更药店协议吗？',
            })
            .then(() => {
                    this.$http.post({
                        url:
                            '/SignOrder/ChangeDtpSignNewOrder?signOrderSmallId=' +
                            this.signOrder.id +
                            '&signDate=' +
                            this.selectedDate +
                            '&contractNumber=' +
                            this.newcontractnumber +
                            '&lastDtpSmallId=' +
                            this.signOrder.LastSignDTPSmallId,
                    })
                    .then(res => {
                        console.log("ChangeDtpSignNewOrder", res);
                        if (res.code == 200) {
                            Dialog.alert({
                                title: '信息提示',
                                message,
                            }).then(() => {
                                const url = '../a-dtphome/main?activeTabIndex=1'
                                this.$globalData.refresh = true;
                                wx.navigateBack({
                                    delta: 1
                                })
                            })
                        } else {
                            const message = '上传合同操作失败'

                            Dialog.alert({
                                title: '信息提示',
                                message,
                            })
                        }
                    })
            })
            .catch(() => {
                Dialog.close()
            });

        },
        afterRead(event) {
            wx.showLoading({
                title: '加载中...', // 数据请求前loading
            })
            const pics = event.mp.detail.file
            if (pics.length > this.maxCount) {
                const message = 'error'
                Dialog.alert({
                    title: '信息提示',
                    message,
                })
            }
            var that = this
            // 当设置 mutiple 为 true 时, file 为数组格式，否则为对象格式
            for (let index = 0; index < pics.length; index++) {
                const pic = pics[index]
                wx.uploadFile({
                    url:
                        this.$http.host +
                        '/SignOrder/UploadPicture?signOrderSmallId=' +
                        this.signOrder.id, // 仅为示例，非真实的接口地址
                    filePath: pic.path,
                    name: 'file',
                    formData: { user: 'test' },
                    success(res) {
                        let resultJson = JSON.parse(res.data)
                        console.log(resultJson)
                        if (resultJson.code == 200) {
                            // 上传完成需要更新 fileList
                            var returnModel = resultJson.data
                            that.fileList = []
                            for (
                                let index = 0;
                                index <
                                returnModel.RichText.attachmentList.length;
                                index++
                            ) {
                                //const element = array[index];
                                var attachment =
                                    returnModel.RichText.attachmentList[index]
                                that.fileList.push({
                                    url:
                                        that.$http.servicegoHost +
                                        attachment.docAddress,
                                    name: attachment.name,
                                    isImage: true,
                                })
                            }
                            // const { fileList = [] } = this.data
                            // fileList.push({ ...file, url: res.data })
                            // this.setData({ fileList })
                        } else {
                            const message = 'error'
                            Dialog.alert({
                                title: '信息提示',
                                message,
                            })
                        }
                    },
                })
            }
            wx.hideLoading()
            console.log('file list is', this.fileList)
        },
        showdatetimepicker(event) {
            console.log('showdatetimepicker event', event)
            this.isshowdatetimepicker = true
            console.log('this.isshowdatetimepicker', this.isshowdatetimepicker)
        },
        onChangenewcontractnumber(event) {
            console.log('onChangenewcontractnumber event', event)
            this.newcontractnumber = event.mp.detail;
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
    },
    //计算属性
    computed: {
        //name() {
        //代码搞这里
        //return this.data;
        //}
    },
    onLoad: function(options) {
        var signOrderId = this.$root.$mp.query.signOrderId
        this.signOrderId = signOrderId
        var date = new Date()
        this.selectedDate = date.toLocaleDateString()
        console.log('sign order id is:', this.signOrderId)
        this.$http
            .get({
                url:
                    '/SignOrder/GetBySignOrderId?signOrderId=' +
                    this.signOrderId,
            })
            .then(res => {
                if (res.code == 200) {
                    console.log('/SignOrder/GetBySignOrderId response', res)
                    this.signOrder = res.data
                    console.log('sign order data:', this.signOrder)
                } else {
                    const message = res.message
                    Dialog.alert({
                        title: '信息提示',
                        message,
                    })
                }
            })
    },
    //生命周期(mounted)
    mounted() {},
}
</script>

<!-- 样式代码片段  scoped -->
<style scoped src="./a-dtpchange.css"></style>
