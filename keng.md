chrome 里的 css 动态变化没有体现出来。
小程序用iconfont的在线地址，复制一下，部署的时候再转BASE64
小程序不好调试，开发工具css不好选中，css属性切换无效，html模板不报错。
小程序css3动画有坑，时间写了不对！
小程序中，在setData中没有set的对象不会被刷新，请确保你要展示的ui所需要的data对象都在setData里！这就解释了 animation那个js问题
<view class="{{['title',music.isHot&&'hot',music.isNew&&'new']}}">{{music.title}}</view> 但是text标签就不好用了。
控制slider滑块大小可以用scale
权重计算在开发者工具中被划线但不一定是失效的

18-1-25
wepy中,有时候使用 this.list = list 出发不了刷新，此时需要调用 this.$digest();直接调用 this.setData({list})也能刷新，但几个操作后就会变白。
组件内的selectCompon不能用wx，而要用this

# wepy 不支持字面量
- :active="true"  active="{{true}}"  都不可以，只能定义成变量，需要类型声明，然后<steps :steps="steps"></steps>,且props声明的组件必须继承自wepy.component
  - 和 自定义user事件冲突(组件需继承wepy.page)，若是嵌套使用则懵逼。只能在onLoad中通过调用组件的set方法来做。
- 涉及网络请求的记得加 .sync  这里不能用 <bookingIcon :appType.sync="item.appType"/> 需要用 <bookingIcon :appType.sync="appType"/>
- 涉及列表的记得用 <repeat for="{{grouplist.list}}" item="item">
                      <bookingIcon :appType.sync="item.appType"/>
                 </repeat>
                 这里可以用 <bookingIcon :appType.sync="item.appType"/>



调试同一个元素的css不必要重新选中，右侧会保留，点击开发者工具的下侧还能激活回来




# native
- 小程序的好处：  html不用做空值判断
- num+rpx 中间不能有空格

# wepy
- 使用属性选择器在app.wpy中初始化css
  [class$="page"] {
    height: 100vh;
    font-size: 26rpx;
    background-color: #f0f0f0;
    color: #333;
  }
  iconfont的更新需要在app.wpy中触发文件更改才能使用。
- 组件参数名不能是 templates
- cli报错不影响程序正常使用。
- import wepy文件不要加后缀名
- 引入  在components的前后顺序和嵌套顺序必须一致。
- <popup>
           <addressList @address.user="onAddressTap"></addressList>
         </popup>

        使用 .user 的页面必须是继承自 Page 而不是 component
