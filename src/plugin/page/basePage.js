import wepy from 'wepy'

export default class extends wepy.page {
  $toast(content) {
    this.$invoke('toast', 'show', {
      title: content
    })
  }

  $toastError(content) {
    return this.$toast(content)
  }

  $showModal({title, content}) {
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

  onLoad() {
    super.onLoad()
  }
}
