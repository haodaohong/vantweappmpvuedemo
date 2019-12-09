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
        <van-icon size="80px"
          name="scan" @click="scanProduct"
          />
          <h5>扫描入库</h5>
    </div>


    <van-tabs :active="active1"
              @change="onChange1">
      <van-tab title="最近预约">
        
        <van-panel title="李斌"
                  desc="确诊自华山医院"
                  status="待确认"
                  use-footer-slot>
          <div>
            <table class="content">
              <tr>
                <td>产品名称：XXX仪器</td><td>产品类别：产品主机</td>
                </tr>
              <tr>
                <td>预约数量：1</td><td>预约日期：2019年12月8日</td>
                </tr>
            </table>
          </div>
          <!--
          加个样式把按钮搞右边去
          -->
          <view style="text-align: right;"
                slot="footer">
            <van-button class="confirmBooking" @click="onConfirmBooking"
                        size="small" type="primary">确认预约
            </van-button>
          </view>
        </van-panel>

        <van-panel title="刘凯"
                  desc="确诊自华山医院"
                  status="已确认，待签约"
                  use-footer-slot>
          <div>
            <table class="content">
              <tr>
                <td>产品名称：XXX仪器</td><td>产品类别：产品主机</td>
                </tr>
              <tr>
                <td>预约数量：1</td><td>预约日期：2019年12月8日</td>
                </tr>
            </table>
          </div>
          <!--
          加个样式把按钮搞右边去
          -->
          <view style="text-align: right;"
                slot="footer">
            <van-button @click="onConfirmSign"
                        size="small"
                        type="info">提交租赁签约
            </van-button>
          </view>
        </van-panel>

      </van-tab>
      <van-tab title="最近签约">
        
       <van-panel title="李斌"
                  desc="确诊自华山医院"
                  status="已签约"
                  use-footer-slot>
          <div>
            <table class="content">
              <tr>
                <td>产品名称：XXX仪器</td><td>产品类别：产品主机</td>
                </tr>
              <tr>
                <td>预约数量：1</td><td>预约日期：2019年12月8日</td>
                </tr>
            </table>
          </div>
          <!--
          加个样式把按钮搞右边去
          -->
          <view style="text-align: right;"
                slot="footer">
            <van-button class="confirmBooking" @click="onChangeSign"
                        size="small" type="primary">变更合约
            </van-button>
            <van-button @click="onCancelSign"
                        size="small"
                        type="danger">取消合约
            </van-button>
          </view>
        </van-panel>

        <van-panel title="李斌"
                  desc="确诊自华山医院"
                  status="已取消"
                  use-footer-slot>
          <div>
            <table class="content">
              <tr>
                <td>产品名称：XXX仪器</td><td>产品类别：产品主机</td>
                </tr>
              <tr>
                <td>预约数量：1</td><td>预约日期：2019年12月8日</td>
                </tr>
            </table>
          </div>
          <!--
          加个样式把按钮搞右边去
          -->
          <view style="text-align: right;"
                slot="footer">
            <van-button disabled class="confirmBooking"
                        size="small" type="primary">变更合约
            </van-button>
            <van-button disabled
                        size="small"
                        type="danger">取消合约
            </van-button>
          </view>
        </van-panel>

      </van-tab>
      <van-tab title="最近出入库">暂未完成此功能【最近出入库】设计</van-tab>
      <van-tab title="最近维修">暂未完成此功能【最近维修】设计</van-tab>
    </van-tabs>
    <mybr/>
    <mybr/>
        <!--
    注意要配一个van-dialog,才会显示提示 ,默认id van-dialog
    -->
    <van-dialog id="van-dialog"/>
  </div>

</template>

<!-- js脚本代码片段 -->
<script>
  import Dialog from '../../../static/vant/dialog/dialog';
  import mybr from '@/components/mybr/mybr.vue'

  export default {
    name : "tab" ,
    components : {
      mybr
    } ,
    //数据模型
    data () {
      return {
        //从0开始的
        active1 : 0 ,

        active2 : 0 ,

        active3 : 0 ,

        active4 : 1
      }
    } ,
    //方法
    methods : {
      scanProduct(event){
            const message = '暂未完成此功能设计；预期结果是识别产品条形码并跳转至入库界面';

          Dialog.alert( {
            title : '信息提示' ,
            message
          } );
      }
      ,
      onChangeSign(event){
        const message = '暂未完成此功能设计；预期结果是跳转至合约变更界面';

        Dialog.alert( {
          title : '信息提示' ,
          message
        } );
      }
      ,
      onCancelSign(event){
        const message = '已取消此合约，并已通知相关用户！';

        Dialog.alert( {
          title : '信息提示' ,
          message
        } );
      }
      ,
      onConfirmSign(event){
            const url = "../a-dtpsign/main"
            wx.navigateTo( { url : url } )
      },
      onConfirmBooking(event) {
        const message = '预约已确认，并已通知相关用户！';

        Dialog.alert( {
          title : '信息提示' ,
          message
        } );
      },
      
    } ,
    //计算属性
    computed : {
      //name() {
      //代码搞这里
      //return this.data;
      //}
    } ,
    //生命周期(mounted)
    mounted () {

    } ,
  }
</script>

<!-- 样式代码片段  scoped -->
<style scoped
       src="./a-dtphome.css">

</style>
