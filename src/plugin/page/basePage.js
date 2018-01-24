import wepy from 'wepy'


export default class BasePage extends wepy.page {



  constructor(){
    super();
  }

  onLoad() {
    super.onLoad()
  }

  toast(info){
      wx.showToast({
        title: info,
        icon: 'none',
        duration: 3000
      });
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
  wrapLoading(api,params){
    this.showLoading()
    return api(params).then(data=>{
      this.hideLoading();
      return data;
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
