import wepy from 'wepy'


export default class BasePage extends wepy.page {

  constructor(){
    super();
  }

  onLoad() {
    super.onLoad()
  }

  toast(info){
    try{
      this.$invoke('T', 'show', {
        title: info
      });
    }catch (e){
      wx.showToast({
        title: info,
        icon: 'loading',
        duration: 3000
      });
    }
  }
  showLoading(title){
    wx.showLoading({
      title: title||"正在加载",
      mask: true
    });
  }
  hideLoading(){
    wx.hideLoading();
  }

  // if (!this.formCheck(
  //   ['date', v => v, '请选择时间！'],
  //   ['date', v => v, '请选择时间！'],
  // ))
  formCheck(...params){
    return params.find(item=>{
      const
        name = item[0],
        //通过时的条件
        test = item[1],
        message = item[2];
        if(test instanceof Function){
          if (!test(this[name])) {
            this.toast(message);
            //中断循环
            return true;
          }
        }else if(test instanceof RegExp){
          if (!test.test(this[name])) {
            this.toast(message);
            //中断循环
            return true;
          }
        }else{
          throw new Error('不支持的语法')
        }
    })
  }

  wrapLoading(api,...params){
    this.hideLoading();
    this.showLoading()
    return api(...params).then(data=>{
      this.hideLoading();
      return data;
    }).catch(info=>{
      this.hideLoading();
      this.toast(info);
      return Promise.reject(info);
    })
  }

  showModal({title, content}) {
    return new Promise((resolve, reject) => {
      wx.showModal({
        title,
        content,
        showCancel: true,
        success() {
          resolve()
        },
        fail() {
          reject()
        }
      })
    })
  }
}
