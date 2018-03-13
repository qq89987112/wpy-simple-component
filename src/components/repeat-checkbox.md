<view class="product-list-box">
  <repeat for="{{list}}" key="index" index="index" item="item">
  <view class="store-panel">
  <view class="store-title-box">
  <checkbox :item.sync="item"></checkbox>
  <view class="iconfont icon-dianpu"/>
  <text class="store-title">美的热水器官方旗舰店</text>
  <text class="store-edit" @tap="onEditTap">编辑</text>
  </view>
  <view class="product-list">
  <repeat for="{{item.children}}" index="pindex" item="product">
  <subCheckbox  @check.user="onProductCheck" :index="pindex" :flag="index" :item.sync="product"></subCheckbox>
  </repeat>
  </view>
  </view>
  </repeat>
</view>
 components = {
   toast: Toast,
   checkbox,
   subCheckbox:checkbox
 }

 data = {
   list: [
     {
       $checked: false,
       children: [
         {
           $checked: true,
         },
         {
           $checked: true,
         },
       ]
     },
     {
       $checked: false, a: 1,
       children: [
         {
           $checked: true,
         },
         {
           $checked: true,
         },
       ]
     }
   ]
 }
