小程序用iconfont的在线地址，复制一下，部署的时候再转BASE64
小程序不好调试，开发工具css不好选中，css属性切换无效，html模板不报错。
小程序css3动画有坑，时间写了不对！
小程序中，在setData中没有set的对象不会被刷新，请确保你要展示的ui所需要的data对象都在setData里！这就解释了 animation那个js问题
<view class="{{['title',music.isHot&&'hot',music.isNew&&'new']}}">{{music.title}}</view> 但是text标签就不好用了。
控制slider滑块大小可以用scale
权重计算在开发者工具中被划线但不一定是失效的

wepy中,有时候使用 this.list = list 出发不了刷新，此时需要调用 this.$digest();直接调用 this.setData({list})也能刷新，但几个操作后就会变白。
