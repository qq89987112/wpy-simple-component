首先，小程序的动画也是加style而已。。也会出现第一次下拉没有动画的情况。
其次因为小程序的性能检测，
this.setData({
  height:1
},()=>{
  this.setData({
    height:200
  })
})
会直接处于200而没有动画，可能是模仿缓冲。设置一定的延迟才有。

最终解决：
  <view class="music-list" style="height:{{(height||0)+'px'}}">
    <div class="wrapper">
    </div>
  </view>
  slideDown(){
          var query = this.createSelectorQuery();
          query.select(".wrapper").boundingClientRect()
          query.exec((res)=> {
              const height = res[0].height;
              this.setData({
                  height
              })
          })
      }

      .music-list{
        padding: 0 30rpx;
        overflow: hidden;
        transition: height .3s cubic-bezier(0.12, 0.4, 0.29, 1.46);
      }


  配合selectAllComponents放在组件中。

   this.selectAllComponents(".style-list")[0].slideDown();
