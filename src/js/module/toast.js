require('less/toast.less')
class Toast {
  constructor(msg, time) {
    this.msg = msg
    this.dismissTime = time || 1000
    this.createToast()
    this.showToast()
  }
  createToast() {
    const tpl = `<div class="toast">${this.msg}</div>`
    this.$toast = $(tpl)
    $('body').append(this.$toast)
  }
  showToast() {
    const self = this
    this.$toast.fadeIn(300, () => {
      setTimeout(() => {
        self.$toast.fadeOut(300, () => {
          self.$toast.remove()
        })
      }, this.dismissTime)
    })
  }
}

module.exports.Toast = (msg, time) => {
  return new Toast(msg, time)
}