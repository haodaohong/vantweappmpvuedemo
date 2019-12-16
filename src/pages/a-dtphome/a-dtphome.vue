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
    <div class="searchbar" style="display:none;">
          <van-search :value="value2"
                    placeholder="请输入用户姓名、手机号进行搜索"
                    use-action-slot
                    @change="onchange2"
                    @search="onSearch2">
          <view slot="action"
                @tap="userSearch">搜索
          </view>
        </van-search>
    </div>

    <van-tabs :active="active1"
              @change="onChange1">
      <van-tab title="预约申请">
        <div class="filterBookCategory">
   
          <van-button type="default"  @click="onShowBookCategory">过滤：{{selectedBookCategory}}<van-icon custom-class="middle" name="arrow-down" /></van-button>
          
        </div>
        <van-panel title="李斌"
                  desc="确诊自华山医院"
                  status="待确认"
                  use-footer-slot>
          <div>
       
            <table class="content">
              <tr>
                <td>预约类型：设备预约</td><td></td>
              </tr>
               <tr>
                <td>用户性别：男</td><td></td>
              </tr>
               <tr>
                <td>出生日期：1969年12月9日</td><td></td>
              </tr>
               <tr>
                <td>手机号码：18878999888</td><td></td>
              </tr>
         
              <tr>
                <td>产品名称：XXX仪器</td><td>产品类别：产品主机</td>
                </tr>
              <tr>
                <td>预约数量：1</td><td>预约日期：2019年12月20日</td>
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
            <van-button class="confirmBooking" @click="onCancelBooking"
                        size="small" type="default">取消预约
            </van-button>
          </view>
        </van-panel>

       <van-panel title="王武"
                  desc="确诊自华山医院"
                  status="待确认"
                  use-footer-slot>
          <div>
            <table class="content">

              <tr>
                <td>预约类型：DTP变更</td><td></td>
              </tr>
              <tr>
                <td>用户性别：男</td><td></td>
              </tr>
               <tr>
                <td>出生日期：1969年12月9日</td><td></td>
              </tr>
               <tr>
                <td>手机号码：18878999888</td><td></td>
              </tr>

              <tr>
                <td>产品名称：XXX仪器</td><td>产品类别：产品主机</td>
                </tr>
              <tr>
                <td>预约数量：1</td><td>预约日期：2019年12月30日</td>
                </tr>
            </table>
          </div>
          <!--
          加个样式把按钮搞右边去
          -->
          <view style="text-align: right;"
                slot="footer">
            <van-button class="confirmBooking" @click="onConfirmChangeDTP"
                        size="small" type="primary">确认申请
            </van-button>
            <van-button class="confirmBooking" @click="onCancelChangeDTP"
                        size="small"
                        type="default">取消申请
            </van-button>
          </view>
        </van-panel>
      </van-tab>
      <van-tab title="签约绑定">
        <div class="filterBookCategory">
          <van-button type="default"  @click="onShowSignCategory">过滤：{{selectedSignCategory}}<van-icon custom-class="middle" name="arrow-down" /></van-button>
        </div>


        <van-panel title="李斌"
                  desc="确诊自华山医院"
                  status="待签约"
                  use-footer-slot>
          <div>
            <table class="content">
              <tr>
                <td>签约类型：设备预约</td><td></td>
              </tr>
               <tr>
                <td>用户性别：男</td><td></td>
              </tr>
               <tr>
                <td>出生日期：1969年12月9日</td><td></td>
              </tr>
               <tr>
                <td>手机号码：18878999888</td><td></td>
              </tr>
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
        </van-panel>

      </van-tab>
      <van-tab title="产品出入库">
          <div class="filterBookCategory">
            <van-button type="default"  @click="onShowBookCategory">过滤：{{selectedBookCategory}}<van-icon custom-class="middle" name="arrow-down" /></van-button>
          </div>


       <van-panel title="李斌"
                  desc="确诊自华山医院"
                  status="已签约，待出库"
                  use-footer-slot>
          <div>
            <table class="content">
              <tr>
                <td>预约类型：设备预约</td><td></td>
              </tr>
               <tr>
                <td>用户性别：男</td><td></td>
              </tr>
               <tr>
                <td>出生日期：1969年12月9日</td><td></td>
              </tr>
               <tr>
                <td>手机号码：18878999888</td><td></td>
              </tr>
              <tr>
                <td>产品名称：XXX仪器</td><td>产品类别：产品主机</td>
                </tr>
              <tr>
                <td>预约数量：1</td><td>预约日期：2019年12月8日</td>
                </tr>
            </table>
          </div>
           <view style="text-align: right;"
                slot="footer">
            <van-button @click="onCheckoutProduct"
                        size="small"
                        type="danger">产品出库
            </van-button>
          </view>
        </van-panel>

        <van-panel title="李斌"
                  desc="确诊自华山医院"
                  status="已出库"
                  use-footer-slot>
          <div>
            <table class="content">
              <tr>
                <td>预约类型：设备预约</td><td></td>
              </tr>
               <tr>
                <td>用户性别：男</td><td></td>
              </tr>
               <tr>
                <td>出生日期：1969年12月9日</td><td></td>
              </tr>
               <tr>
                <td>手机号码：18878999888</td><td></td>
              </tr>
              <tr>
                <td>产品名称：XXX仪器</td><td>产品类别：产品主机</td>
                </tr>
              <tr>
                <td>预约数量：1</td><td>预约日期：2019年12月8日</td>
                </tr>
            </table>
          </div>
        </van-panel>

      </van-tab>
      <van-tab title="维修管理">暂未完成此功能【最近维修】设计</van-tab>
    </van-tabs>
    <mybr/>
    <mybr/>
        <!--
    注意要配一个van-dialog,才会显示提示 ,默认id van-dialog
    -->
    <van-dialog id="van-dialog"/>
    <van-action-sheet
      :show="isShowBookCategory"
      :actions="BookCategories"
      title="选择预约类型"
      @close="onCloseBookCategory"
      @select="onSelectBookCategory"
    />
    <van-action-sheet
      :show="isShowSignCategory"
      :actions="SignCategories"
      title="选择签约类型"
      @close="onCloseSignCategory"
      @select="onSelectSignCategory"
    />
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
        isShowBookCategory : false ,
        isShowSignCategory : false,
        selectedSignCategory : '所有类别' ,
        selectedBookCategory : '所有类别' ,
        BookCategories : 
        [
          {
            name : '所有类别'
          } ,
           {
            name : '设备预约'
          } ,
          {
            name : '变更申请' 
          } ,
          {
            name : '维修预约',
          }
        ],
        SignCategories : 
        [
          {
            name : '所有类别'
          } ,
           {
            name : '已签约'
          } ,
          {
            name : 'DTP变更' 
          }
        ] 
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
      onShowBookCategory(event){
        this.isShowBookCategory = true;
      }
      ,
      onCloseBookCategory(event){
         this.isShowBookCategory = false;
      }
      ,
      onSelectBookCategory(event){
        let obj = event.mp.detail;
          //取到选择的值
        let name = obj.name;
        this.selectedBookCategory = name;
        this.isShowBookCategory = false;
        console.log("this.selectedBookCategory",this.selectedBookCategory);
        console.log("this.isShowBookCategory",this.isShowBookCategory);
      }
      ,
      onShowSignCategory(event){
        this.isShowSignCategory = true;
      }
      ,
      onCloseSignCategory(event){
         this.isShowSignCategory = false;
      }
      ,
      onSelectSignCategory(event){
        let obj = event.mp.detail;
          //取到选择的值
        let name = obj.name;
        this.selectedSignCategory = name;
        this.isShowSignCategory = false;
        console.log("this.selectedSignCategory",this.selectedSignCategory);
        console.log("this.isShowSignCategory",this.isShowSignCategory);
      }
      ,
      onCancelBooking(event){
          const message = '已取消此预约申请，并通知相关人员！';

          Dialog.alert( {
            title : '信息提示' ,
            message
          } );
      }
      ,onConfirmChangeDTP(event){
          const message = '已确认此DTP变更预约申请，并通知相关人员！';

          Dialog.alert( {
            title : '信息提示' ,
            message
          } );
      }
      ,onCancelChangeDTP(event){
          const message = '已取消此DTP变更申请，并通知相关人员！';

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
