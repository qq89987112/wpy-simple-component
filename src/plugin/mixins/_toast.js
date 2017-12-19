import wepy from 'wepy'

export default class testMixin extends wepy.mixin {
  data = {
    __is_toast__: false
  }
  computed = {
    toast() {
      return __is_toast__ ? 'toast' : ''
    }
  }

  $toast(content) {
    this.__is_toast__ = true
    this.$apply()

    return this.$invoke('toast', 'show', {
      title: content
    })
  }

  $toastError(content) {
    return this.$toast(content)
  }

  methods = {
    $toast() {
      this.$toast.apply(this, arguments)
    },
    $toastError() {
      this.$toastError.apply(this, arguments)
    }
  }

  onShow() {
    console.log('mixin onShow')
  }

  onLoad() {
    console.log('mixin onLoad')
  }
}
