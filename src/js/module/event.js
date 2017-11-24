

const EventCenter = (() => {
  // 缓存添加的事件
  const events = {}
  // 添加事件函数
  const on = (event, handler) => {
    events[event] = events[event] || []
    events[event].push({
      handler: handler
    })
  }
  // 触发事件函数
  const trigger = (event, args) => {
    if (!events[enent]) {
      throw new Error('No such event')
      return
    }
    for (let i = 0; i < events[event].length; i++) {
      events[event][i].handler(args)
    }
  }

  /**
   * 取消监听事件暂未添加
   */

  // 返回事件监听对象
  return {
    on: on,
    trigger: trigger
  }
})()
module.exports = EventCenter