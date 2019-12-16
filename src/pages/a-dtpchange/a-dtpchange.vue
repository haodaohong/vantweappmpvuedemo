
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
          <van-col span="12">产品名称：XXX仪器</van-col>
          <van-col span="12">租赁数量：2</van-col>
        </van-row>
        <van-row>
          <van-col span="12">租赁用户：李斌</van-col>
        </van-row>
      </div>
    </van-panel>
    <mybr />
    <van-panel title="变更协议信息">
      <van-field :value="username" label="原租赁药房" placeholder="请输入原租赁药房" clearable required />
      <van-field :value="username" label="现租赁药房" placeholder="请输入现租赁药房" clearable required />
      <van-field :value="username" label="新协议编号" placeholder="请输入协议编号" clearable required />
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
      <van-cell title="上传新协议"></van-cell>

      <div style="margin:10px;">
        <van-uploader v-model="fileList" multiple :max-count="1" required />
      </div>
    </van-panel>
    <mybr />
    <div class="confirmsignbtn">
      <van-button square size="normal" type="info" @click="onConfirmSign">确认提交</van-button>
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
import Dialog from "../../../static/vant/dialog/dialog";
import mybr from "@/components/mybr/mybr.vue";

export default {
  name: "tab",
  components: {
    mybr
  },
  //数据模型
  data() {
    return {
      //从0开始的
      isshowdatetimepicker: false,
      fileList: [],
      contractfile: "",
      selectedDate: new Date().toLocaleDateString(),
      currentDate: new Date().getTime(),
      minDate: new Date().getTime(),
      selectedCount: 1
    };
  },
  //方法
  methods: {
    onConfirmSign(event) {
      const message = "协议变更成功！";

      Dialog.alert({
        title: "信息提示",
        message
      }).then(() => {
        const url = "../a-dtphome/main";
        wx.navigateBack({ url: url });
      });
    },
    testclick(event) {
      console.log("111test");
    },
    showdatetimepicker(event) {
      console.log("showdatetimepicker event", event);
      this.isshowdatetimepicker = true;
      console.log("this.isshowdatetimepicker", this.isshowdatetimepicker);
    },
    userselectdate(event) {
      //console.log( 'onconfirm2' , event )
      const { detail, currentTarget } = event.mp;
      // console.log( detail )
      // console.log( currentTarget )
      const date = new Date(detail);
      console.log("date", date);
      console.log("date.toLocaleDateString()", date.toLocaleDateString());

      this.selectedDate = date.toLocaleDateString();
      this.isshowdatetimepicker = false;
    },
    usercancel(event) {
      this.isshowdatetimepicker = false;
    },
    onConfirmBooking(event) {
      const message = "预约已确认，并已通知相关用户！";

      Dialog.alert({
        title: "信息提示",
        message
      });
    },
    onClickIcon(event) {
      const message = "onClickIcon！";

      Dialog.alert({
        title: "信息提示",
        message
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
  mounted() {}
};
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./a-dtpchange.css">
</style>
