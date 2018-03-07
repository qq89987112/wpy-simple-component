# tools
## wepy-web
- https://www.npmjs.com/~gcaufy
- 生成web版本
$ wepy build --output web

- 生成微信浏览器版本
$ wepy build --output web --platform wechat

- 生成QQ浏览器版本
$ wepy build --output web --platform qq

## wept 实时预览界面


## 关于实现
### empty的界面可以使用纯css + wx:if 来实现
### loading的效果可以使用纯css + wx:if 来实现(参考empty)
  <div loading>
    <block wx:if={{loading}}>

    </block>
  </div>
  小程序会编译成<div loading></div>
  所以放心换行
### toast的效果可以用纯css实现


## 其他
### wepy 编译报错
#### 重开开发工具
#### 删除dist重新编译

### eslint在webstorm中配置了vue文件支持后,alt+enter不好使的解决方法
#### code format 一下, 全局替换 ; " 一下。

## rem布局
  以 750px 设计稿作为基准，根节点设置 font-size 为 100px ,只考虑 DPR 为 2 的情况，只考虑最简单的情况
   document.querySelector('html').style.fontSize = `${window.innerWidth / 7.5 }px`;

   现在移动端 css3 单位 vw ,wh 兼容性已经很不错了，在不需要兼容太低版本的安卓机情况下可以这样来：

   html{
   font-size: 100vw / 750
   }
